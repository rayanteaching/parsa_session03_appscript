PARSA SESSION 03 — SETUP

1) این repo به پروژه Apps Script جلسه ۲ وصل نیست.
2) ابتدا یک Apps Script project جدید برای Session 03 بساز.
3) سپس .clasp.json محلی را با Script ID جدید بساز؛ Script ID جلسه ۲ را reuse نکن.
4) در Script Properties این کلیدها را تنظیم کن:
   STUDENT_EMAIL
   TEACHER_EMAIL
5) یک بار setupResultsSpreadsheet() را دستی اجرا کن تا Results Spreadsheet مخصوص Session 03 ساخته و ثبت شود.
6) اولین ارسال رسمی است؛ ارسال‌های بعدی PRACTICE هستند و نمره رسمی را عوض نمی‌کنند.
7) نمره: MCQ=60، Code Repair=20، Final Coding=20، Total=100.
8) بعد از تصحیح دستی، ManualDebugScore و ManualCodingScore و در صورت نیاز TeacherFeedback را پر کن و sendFinalEmailForLatestSubmission() را اجرا کن.
9) قبل از clasp push: npm test + diff review + اجازه صریح مالک.
10) قبل از production deploy: smoke test + اجازه صریح مالک.
