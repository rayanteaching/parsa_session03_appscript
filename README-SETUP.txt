PARSA SESSION 03 — SETUP

========================================
0) مسیر استاندارد و اجباری پروژه
========================================

منبع حقیقت کد GitHub است و مسیر انتقال کد فقط این است:

GitHub repo -> local clone -> clasp -> Apps Script

پروژه Session 03 را به‌صورت دستی در Apps Script Editor نساز و کدهای tracked را آنجا ویرایش نکن.
ابتدا foundation باید با تست و PR وارد main شود.

روی سیستم مالک پروژه:

git clone https://github.com/rayanteaching/parsa_session03_appscript.git
cd parsa_session03_appscript
git switch main
git pull --ff-only
git status --short
npm test

اگر clasp برای حساب Google موردنظر login نشده، ابتدا authentication را انجام بده.
سپس از ریشه همین repo اجرا کن:

npm run bootstrap:clasp

این دستور:
- صحت repo و branch main را چک می‌کند؛
- working tree تمیز می‌خواهد؛
- پروژه جدید Apps Script با عنوان Parsa Session 03 را از طریق clasp می‌سازد؛
- .clasp.json محلی را ایجاد می‌کند؛
- appsscript.json نسخه repo را بعد از clasp create برمی‌گرداند؛
- target را بررسی می‌کند؛
- هیچ clasp push انجام نمی‌دهد.

.clasp.json برای این repo عمومی local-only است و نباید commit شود.

========================================
1) Push اولیه
========================================

ساخت پروژه Apps Script مجوز push نیست.
قبل از push:
- local main با GitHub sync باشد؛
- git status تمیز باشد؛
- npm test پاس شود؛
- git rev-parse HEAD به‌عنوان rollback SHA ثبت شود؛
- clasp status و .clasp.json بررسی شوند؛
- مالک برای همان clasp push صریحاً اجازه بدهد.

========================================
2) Runtime configuration
========================================

بعد از push تأییدشده، در Script Properties پروژه جدید این کلیدها تنظیم می‌شوند:
STUDENT_EMAIL
TEACHER_EMAIL

سپس setupResultsSpreadsheet() یک بار توسط مالک اجرا می‌شود تا Results Spreadsheet مخصوص Session 03 ساخته و ثبت شود.

========================================
3) سیاست تلاش و نمره
========================================

- اولین ارسال کامل = OFFICIAL
- ارسال‌های بعدی = PRACTICE نامحدود
- Practice نمره رسمی را تغییر نمی‌دهد
- MCQ = 60
- Code Repair = 20
- Final Coding = 20
- Total = 100

بعد از تصحیح دستی، ManualDebugScore و ManualCodingScore و در صورت نیاز TeacherFeedback پر می‌شوند و sendFinalEmailForLatestSubmission() اجرا می‌شود.

========================================
4) Deploy
========================================

بعد از push، smoke test کامل انجام می‌شود.
Production deploy فقط با اجازه صریح مالک و از source متناظر با Git commit شناخته‌شده انجام می‌شود.
