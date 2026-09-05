function doGet() {
  validateConfig_();
  var template = HtmlService.createTemplateFromFile('Index');
  template.appTitle = CONFIG.SESSION_TITLE;
  return template.evaluate().setTitle(CONFIG.SESSION_TITLE).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getInitialData() {
  validateConfig_();
  ensureResultsSheet_();
  var officialSubmission = findStudentSubmission_();
  var hasOfficialAttempt = !!officialSubmission;
  return {
    sessionTitle: CONFIG.SESSION_TITLE,
    studentName: CONFIG.STUDENT_NAME,
    hasOfficialAttempt: hasOfficialAttempt,
    nextAttemptType: hasOfficialAttempt ? 'PRACTICE' : 'OFFICIAL',
    previousResult: officialSubmission ? buildSavedResult_(officialSubmission) : null,
    questions: getPublicQuestionBank_(),
    repairTasks: CODE_REPAIR_TASKS,
    finalTask: FINAL_CODING_TASK,
    scoring: { mcqMax: CONFIG.MCQ_MAX, debugMax: CONFIG.DEBUG_MAX, codingMax: CONFIG.CODING_MAX, totalMax: CONFIG.TOTAL_MAX }
  };
}

function validateConfig_() {
  if (!getStudentEmail_()) throw new Error('STUDENT_EMAIL در Script Properties تنظیم نشده است.');
  if (!getTeacherEmail_()) throw new Error('TEACHER_EMAIL در Script Properties تنظیم نشده است.');
}
