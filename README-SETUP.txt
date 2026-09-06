PARSA SESSION 03 — SETUP

========================================
0) مسیر استاندارد و اجباری پروژه
========================================

منبع حقیقت کد GitHub است و مسیر انتقال کد فقط این است:

GitHub repo -> local clone -> clasp -> Apps Script

کدهای tracked را در Apps Script Editor ویرایش نکن.

روی سیستم مالک پروژه:

git switch main
git pull --ff-only
git status --short
npm test

قبل از اولین اتصال Apps Script، syntax را حدس نزن. اول محیط واقعی را مشاهده کن:

clasp --version
clasp create-script --help

سپس preflight غیرمخرب را اجرا کن:

npm run clasp:preflight

preflight فقط repo، branch، working tree، تست‌ها، نسخه/help محلی clasp و نبودن .clasp.json را بررسی می‌کند. هیچ Apps Script project نمی‌سازد، push نمی‌کند و deploy نمی‌کند.

بعد از preflight موفق، owner ساخت remote project را مستقیم و قابل‌مشاهده اجرا می‌کند. Session 03 در مرحله create به‌صورت standalone ساخته می‌شود؛ Web App بودن مربوط به deployment است:

rm -rf .clasp-bootstrap-tmp
mkdir .clasp-bootstrap-tmp
clasp create-script --type standalone --title "Parsa Session 03" --rootDir .clasp-bootstrap-tmp

پوشه موقت باعث می‌شود فایل‌های اولیه‌ای که clasp هنگام create pull می‌کند روی source tracked پروژه overwrite نشوند.

بعد از ساخت موفق:
- .clasp.json را بررسی کن و مطمئن شو scriptId متعلق به Session 03 جدید است؛
- rootDir در .clasp.json را قبل از push روی . تنظیم کن؛
- .clasp-bootstrap-tmp را حذف کن؛
- clasp status را اجرا کن؛
- git status --short باید تمیز بماند؛
- توقف کن و clasp push نزن.

.clasp.json local-only و Git-ignored است.

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

========================================
4) Deploy
========================================

بعد از push، smoke test کامل انجام می‌شود.
Production deploy فقط با اجازه صریح مالک و از source متناظر با Git commit شناخته‌شده انجام می‌شود.
