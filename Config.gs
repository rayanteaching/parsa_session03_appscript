const CONFIG = Object.freeze({
  SESSION_KEY: 'PARSA_S03',
  SESSION_TITLE: 'جلسه ۳ — حلقه for و ترکیب ساده for با if',
  STUDENT_NAME: 'پارسا',
  RESULTS_SPREADSHEET_NAME: 'Parsa Session 03 Results',
  RESULTS_SHEET: 'Session03Results',
  MCQ_MAX: 60,
  DEBUG_MAX: 20,
  CODING_MAX: 20,
  TOTAL_MAX: 100,
  CODE_REPAIR_COUNT: 4
});

const RUNTIME_PROPERTY_KEYS = Object.freeze({
  STUDENT_EMAIL: 'STUDENT_EMAIL',
  TEACHER_EMAIL: 'TEACHER_EMAIL'
});

function getStudentEmail_() {
  return String(PropertiesService.getScriptProperties().getProperty(RUNTIME_PROPERTY_KEYS.STUDENT_EMAIL) || '').trim();
}

function getTeacherEmail_() {
  return String(PropertiesService.getScriptProperties().getProperty(RUNTIME_PROPERTY_KEYS.TEACHER_EMAIL) || '').trim();
}
