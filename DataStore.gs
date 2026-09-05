const RESULT_HEADERS = Object.freeze(['Timestamp','SubmissionId','SessionKey','StudentName','StudentEmail','MCQScore','MCQMax','MCQAnswersJSON','DebugCode1','DebugCode2','DebugCode3','DebugCode4','FinalCode','ManualDebugScore','ManualCodingScore','TeacherFeedback','FinalScore','Status','InitialStudentEmailSent','TeacherEmailSent','FinalEmailSent','FinalEmailSentAt']);
const RESULTS_SPREADSHEET_ID_PROPERTY = 'RESULTS_SPREADSHEET_ID';
const RESULTS_SPREADSHEET_INITIALIZED_PROPERTY = 'RESULTS_SPREADSHEET_INITIALIZED';

function getSpreadsheet_() {
  var props = PropertiesService.getScriptProperties();
  var storedId = String(props.getProperty(RESULTS_SPREADSHEET_ID_PROPERTY) || '').trim();
  if (!storedId) throw new Error('Spreadsheet نتایج ثبت نشده است. ابتدا setupResultsSpreadsheet() را اجرا کن.');
  return openRegisteredSpreadsheet_(storedId);
}
function openRegisteredSpreadsheet_(id) { try { return SpreadsheetApp.openById(id); } catch (e) { throw new Error('Spreadsheet ثبت‌شده قابل باز شدن نیست؛ فایل جدید ساخته نشد. ' + e.message); } }
function setupResultsSpreadsheet() {
  var lock = LockService.getScriptLock(); lock.waitLock(30000);
  try {
    var props = PropertiesService.getScriptProperties();
    var storedId = String(props.getProperty(RESULTS_SPREADSHEET_ID_PROPERTY) || '').trim();
    if (storedId) { var existing = openRegisteredSpreadsheet_(storedId); ensureResultsSheetInSpreadsheet_(existing); return storedId; }
    if (props.getProperty(RESULTS_SPREADSHEET_INITIALIZED_PROPERTY) === 'true') throw new Error('راه‌اندازی قبلاً شروع شده؛ برای ایمنی فایل جدید ساخته نشد.');
    props.setProperty(RESULTS_SPREADSHEET_INITIALIZED_PROPERTY, 'true');
    var ss = SpreadsheetApp.create(CONFIG.RESULTS_SPREADSHEET_NAME);
    props.setProperty(RESULTS_SPREADSHEET_ID_PROPERTY, ss.getId());
    ensureResultsSheetInSpreadsheet_(ss);
    return ss.getId();
  } finally { lock.releaseLock(); }
}
function registerExistingResultsSpreadsheet(spreadsheetId) {
  var id = String(spreadsheetId || '').trim(); if (!id) throw new Error('شناسه Spreadsheet را وارد کن.');
  var props = PropertiesService.getScriptProperties();
  var storedId = String(props.getProperty(RESULTS_SPREADSHEET_ID_PROPERTY) || '').trim();
  if (storedId && storedId !== id) throw new Error('Spreadsheet دیگری قبلاً ثبت شده و خودکار جایگزین نشد.');
  var ss = openRegisteredSpreadsheet_(id); ensureResultsSheetInSpreadsheet_(ss);
  props.setProperties({RESULTS_SPREADSHEET_ID:id,RESULTS_SPREADSHEET_INITIALIZED:'true'}, false); return id;
}
function ensureResultsSheet_() { return ensureResultsSheetInSpreadsheet_(getSpreadsheet_()); }
function ensureResultsSheetInSpreadsheet_(ss) {
  var sheet = ss.getSheetByName(CONFIG.RESULTS_SHEET); if (!sheet) sheet = ss.insertSheet(CONFIG.RESULTS_SHEET);
  if (sheet.getLastRow() === 0) { sheet.getRange(1,1,1,RESULT_HEADERS.length).setValues([RESULT_HEADERS]); sheet.setFrozenRows(1); }
  else { var existing = sheet.getRange(1,1,1,RESULT_HEADERS.length).getValues()[0]; if (RESULT_HEADERS.some(function(h,i){return existing[i]!==h;})) throw new Error('Headerهای Sheet با پروژه هماهنگ نیستند.'); }
  return sheet;
}
function findStudentSubmission_() {
  var sheet=ensureResultsSheet_(), last=sheet.getLastRow(); if(last<2) return null;
  var values=sheet.getRange(2,1,last-1,RESULT_HEADERS.length).getValues(), email=getStudentEmail_().toLowerCase(), statusIndex=RESULT_HEADERS.indexOf('Status');
  for(var i=0;i<values.length;i++){ if(String(values[i][2])===CONFIG.SESSION_KEY && String(values[i][4]).toLowerCase()===email && !isPracticeStatus_(values[i][statusIndex])) return rowToSubmission_(values[i],i+2); }
  return null;
}
function isPracticeStatus_(status){ return String(status||'').toUpperCase()==='PRACTICE'; }
function rowToSubmission_(row,rowNumber){ var obj={rowNumber:rowNumber}; RESULT_HEADERS.forEach(function(h,i){obj[h]=row[i];}); return obj; }
function appendSubmission_(r){ var s=ensureResultsSheet_(); s.appendRow([new Date(),r.submissionId,CONFIG.SESSION_KEY,CONFIG.STUDENT_NAME,getStudentEmail_(),r.mcqScore,CONFIG.MCQ_MAX,JSON.stringify(r.mcqAnswers),r.debugCodes[0],r.debugCodes[1],r.debugCodes[2],r.debugCodes[3],r.finalCode,'','','','',r.status||'PENDING_MANUAL_REVIEW',false,false,false,'']); return s.getLastRow(); }
function updateEmailFlags_(rowNumber,studentSent,teacherSent){ var s=ensureResultsSheet_(); if(typeof studentSent==='boolean') s.getRange(rowNumber,RESULT_HEADERS.indexOf('InitialStudentEmailSent')+1).setValue(studentSent); if(typeof teacherSent==='boolean') s.getRange(rowNumber,RESULT_HEADERS.indexOf('TeacherEmailSent')+1).setValue(teacherSent); }
function buildSavedResult_(submission){ var answers={}; try{answers=JSON.parse(submission.MCQAnswersJSON||'{}');}catch(e){} return {mcqScore:Number(submission.MCQScore||0),mcqMax:Number(submission.MCQMax||CONFIG.MCQ_MAX),status:String(submission.Status||'PENDING_MANUAL_REVIEW'),finalScore:submission.FinalScore===''?null:Number(submission.FinalScore),review:buildMcqReview_(answers)}; }
