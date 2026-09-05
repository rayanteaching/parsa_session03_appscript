function submitLesson(payload) {
  validateConfig_(); var lock=LockService.getScriptLock(); lock.waitLock(30000);
  try {
    var official=findStudentSubmission_(), attemptType=getAttemptType_(official); validateSubmissionPayload_(payload);
    var graded=gradeMcq_(payload.mcqAnswers), id=Utilities.getUuid();
    var record={submissionId:id,mcqScore:graded.score,mcqAnswers:payload.mcqAnswers,debugCodes:payload.debugCodes,finalCode:payload.finalCode,status:attemptType==='PRACTICE'?'PRACTICE':'PENDING_MANUAL_REVIEW'};
    var row=appendSubmission_(record), studentSent=null, teacherSent=null;
    if(attemptType==='OFFICIAL'){
      studentSent=false; teacherSent=false;
      try{sendInitialStudentEmail_(record);studentSent=true;}catch(e){console.error(e);}
      try{sendTeacherSubmissionEmail_(record,row);teacherSent=true;}catch(e){console.error(e);}
      updateEmailFlags_(row,studentSent,teacherSent);
    }
    return {ok:true,submissionId:id,attemptType:attemptType,isPractice:attemptType==='PRACTICE',mcqScore:graded.score,mcqMax:CONFIG.MCQ_MAX,review:graded.review,message:attemptType==='PRACTICE'?'این تلاش به‌عنوان تمرین ثبت شد و نمره رسمی تغییر نکرد.':'پاسخ رسمی ثبت شد؛ نمره نهایی پس از بررسی کدنویسی اعلام می‌شود.'};
  } finally { lock.releaseLock(); }
}
function getAttemptType_(official){return official?'PRACTICE':'OFFICIAL';}
function validateSubmissionPayload_(p){ if(!p||typeof p!=='object') throw new Error('اطلاعات معتبر نیست.'); var a=p.mcqAnswers||{}; QUESTION_BANK.forEach(function(q){if(!Object.prototype.hasOwnProperty.call(a,q.id))throw new Error('همه سؤال‌های تستی را پاسخ بده.'); var x=Number(a[q.id]); if(!Number.isInteger(x)||x<0||x>=q.options.length)throw new Error('پاسخ تستی نامعتبر است.');}); if(!Array.isArray(p.debugCodes)||p.debugCodes.length!==CONFIG.CODE_REPAIR_COUNT)throw new Error('هر چهار تمرین اصلاح کد باید پاسخ داشته باشند.'); p.debugCodes.forEach(function(c){if(!String(c||'').trim())throw new Error('پاسخ اصلاح کد خالی است.');}); if(!String(p.finalCode||'').trim())throw new Error('تمرین نهایی خالی است.'); }
function gradeMcq_(answers){var score=0,review=[]; QUESTION_BANK.forEach(function(q){var selected=Number(answers[q.id]),ok=selected===q.answerIndex;if(ok)score+=CONFIG.MCQ_MAX/QUESTION_BANK.length;review.push({id:q.id,prompt:q.prompt,code:q.code,options:getDisplayOptions_(q),selectedIndex:selected,correctIndex:q.answerIndex,isCorrect:ok,explanation:q.explanation});});return{score:Math.round(score),review:review};}
function buildMcqReview_(answers){return gradeMcq_(answers).review;}
