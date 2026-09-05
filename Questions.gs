const QUESTION_BANK = Object.freeze([
  {id:'Q01',prompt:'کد زیر چند بار Hello را چاپ می‌کند؟',code:'for i in range(3):\n    print("Hello")',options:['2 بار','3 بار','4 بار','هیچ‌بار'],answerIndex:1,explanation:'range(3) سه مقدار 0، 1 و 2 می‌سازد؛ پس بدنه حلقه سه بار اجرا می‌شود.'},
  {id:'Q02',prompt:'خروجی این کد چیست؟',code:'for i in range(4):\n    print(i)',options:['0 1 2 3','1 2 3 4','0 1 2 3 4','4 4 4 4'],answerIndex:0,explanation:'range(4) از 0 شروع می‌شود و قبل از 4 متوقف می‌شود.'},
  {id:'Q03',prompt:'کدام range اعداد 1 تا 5 را تولید می‌کند؟',code:'',options:['range(5)','range(1, 5)','range(1, 6)','range(0, 6)'],answerIndex:2,explanation:'عدد دوم در range شامل نمی‌شود، پس برای رسیدن تا 5 باید stop برابر 6 باشد.'},
  {id:'Q04',prompt:'در این حلقه name چه چیزی می‌شود؟',code:'names = ["Ali", "Sara", "Parsa"]\nfor name in names:\n    print(name)',options:['همیشه names','هر بار یکی از اعضای لیست','فقط Ali','شماره عضو'],answerIndex:1,explanation:'در حلقه روی لیست، متغیر حلقه در هر دور مقدار یکی از اعضای لیست را می‌گیرد.'},
  {id:'Q05',prompt:'خروجی کد چیست؟',code:'colors = ["red", "green", "blue"]\nfor color in colors:\n    print(color)',options:['نام لیست','سه رنگ در سه خط','فقط blue','خطا'],answerIndex:1,explanation:'حلقه روی همه اعضای لیست حرکت می‌کند و هر رنگ جداگانه چاپ می‌شود.'},
  {id:'Q06',prompt:'این کد چند عدد چاپ می‌کند؟',code:'for i in range(2, 6):\n    print(i)',options:['3','4','5','6'],answerIndex:1,explanation:'مقادیر 2، 3، 4 و 5 چاپ می‌شوند؛ یعنی چهار عدد.'},
  {id:'Q07',prompt:'کدام کد فقط عددهای بزرگ‌تر از 5 را چاپ می‌کند؟',code:'numbers = [2, 7, 4, 9]',options:['for n in numbers:\n    print(n)','for n in numbers:\n    if n > 5:\n        print(n)','if numbers > 5:\n    print(numbers)','for n in numbers:\n    if n < 5:\n        print(n)'],answerIndex:1,explanation:'شرط باید داخل حلقه روی هر عضو جداگانه بررسی شود.'},
  {id:'Q08',prompt:'خروجی چیست؟',code:'scores = [8, 12, 15]\nfor score in scores:\n    if score >= 10:\n        print(score)',options:['8 12 15','12 15','8','10 12 15'],answerIndex:1,explanation:'فقط نمره‌های 10 یا بیشتر چاپ می‌شوند؛ 8 رد می‌شود.'},
  {id:'Q09',prompt:'چرا در شرط «10 یا بیشتر» باید >= بنویسیم؟',code:'',options:['چون > شامل 10 نمی‌شود','چون >= فقط اعداد بزرگ‌تر را می‌گیرد','چون = کافی است','فرقی ندارد'],answerIndex:0,explanation:'عبارت «یا بیشتر» یعنی خود مرز هم باید پذیرفته شود؛ پس 10 باید شامل باشد.'},
  {id:'Q10',prompt:'در کد زیر چه چیزی چاپ می‌شود؟',code:'names = ["Ali", "Parsa", "Sara"]\nfor name in names:\n    if name == "Parsa":\n        print("Hello Parsa")',options:['سه بار Hello Parsa','یک بار Hello Parsa','هیچ‌چیز','همه نام‌ها'],answerIndex:1,explanation:'شرط فقط وقتی درست است که مقدار name برابر Parsa باشد.'},
  {id:'Q11',prompt:'کدام خط تورفتگی درست دارد؟',code:'',options:['for i in range(3):\nprint(i)','for i in range(3):\n    print(i)','    for i in range(3):\nprint(i)','for i in range(3)\n    print(i)'],answerIndex:1,explanation:'بدنه حلقه باید تورفتگی داشته باشد و بعد از for نیز : لازم است.'},
  {id:'Q12',prompt:'خروجی این کد چیست؟',code:'animals = ["cat", "dog"]\nfor animal in animals:\n    print("I like", animal)',options:['I like cat سپس I like dog','فقط I like','cat dog در یک خط','خطا'],answerIndex:0,explanation:'در هر دور animal یکی از اعضای لیست می‌شود و همراه متن چاپ می‌شود.'},
  {id:'Q13',prompt:'اگر range(1, 4) باشد، آخرین مقدار i چیست؟',code:'for i in range(1, 4):\n    print(i)',options:['1','2','3','4'],answerIndex:2,explanation:'عدد stop یعنی 4 شامل نمی‌شود؛ بنابراین آخرین مقدار 3 است.'},
  {id:'Q14',prompt:'کدام گزینه فقط نمره 15 و بالاتر را چاپ می‌کند؟',code:'scores = [14, 15, 16]',options:['if score > 15','if score >= 15','if score == 16','if score < 15'],answerIndex:1,explanation:'برای «15 و بالاتر» باید خود 15 هم شامل شود؛ پس >= 15 درست است.'},
  {id:'Q15',prompt:'هدف اصلی for چیست؟',code:'',options:['تکرار یک کار روی چند مقدار','گرفتن ورودی از کاربر','ساختن تابع','ذخیره فایل'],answerIndex:0,explanation:'for برای تکرار یک بلوک کد روی مجموعه‌ای از مقدارها یا تعداد مشخصی از تکرارها استفاده می‌شود.'}
]);

const CODE_REPAIR_TASKS = Object.freeze([
  {id:'R1',title:'اصلاح ۱ — دو نقطه',prompt:'کد را طوری اصلاح کن که 0، 1 و 2 را چاپ کند.',starter:'for i in range(3)\n    print(i)'},
  {id:'R2',title:'اصلاح ۲ — تورفتگی',prompt:'کد را طوری اصلاح کن که هر نام در یک خط چاپ شود.',starter:'names = ["Ali", "Sara", "Parsa"]\nfor name in names:\nprint(name)'},
  {id:'R3',title:'اصلاح ۳ — متغیر حلقه',prompt:'کد را طوری اصلاح کن که هر رنگ جدا چاپ شود، نه کل لیست.',starter:'colors = ["red", "green", "blue"]\nfor color in colors:\n    print(colors)'},
  {id:'R4',title:'اصلاح ۴ — for + if',prompt:'کد را طوری اصلاح کن که فقط نمره‌های 10 یا بیشتر را چاپ کند.',starter:'scores = [8, 14, 6, 18]\nfor score in scores:\n    if score >= 10:\n    print(score)'}
]);

const FINAL_CODING_TASK = Object.freeze({
  title:'تمرین نهایی — نمره‌های قبولی',
  prompt:'لیست داده شده را نگه دار. با for و if فقط نمره‌های 10 یا بیشتر را چاپ کن. از input، append و for تو در تو استفاده نکن.',
  starter:'scores = [8, 15, 19, 7, 12]\n\n# کد خودت را از اینجا بنویس',
  expectedOutput:'15\n19\n12'
});

function getPublicQuestionBank_() {
  return QUESTION_BANK.map(function(q) {
    return {id:q.id,prompt:q.prompt,code:q.code,options:getDisplayOptions_(q)};
  });
}

function getDisplayOptions_(q) {
  return q.options.map(function(option) { return String(option); });
}
