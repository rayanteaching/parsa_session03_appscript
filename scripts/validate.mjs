import fs from 'node:fs';
import vm from 'node:vm';
let fail=0;
const ok=m=>console.log('PASS '+m),bad=m=>{fail++;console.error('FAIL '+m)},read=f=>fs.readFileSync(f,'utf8');
const required=['Code.gs','Config.gs','DataStore.gs','EmailService.gs','Index.html','Questions.gs','Scripts.html','Styles.html','Submission.gs','TeacherTools.gs','appsscript.json','harness/project-policy.json','docs/STATUS.md','docs/RUNBOOK.md','docs/APPS_SCRIPT_WORKFLOW.md','README-SETUP.txt','scripts/bootstrap-clasp.mjs','.gitignore'];
for(const f of required)fs.existsSync(f)?ok(f):bad('missing '+f);
for(const f of fs.readdirSync('.').filter(x=>x.endsWith('.gs'))){try{new vm.Script(read(f));ok('syntax '+f)}catch(e){bad('syntax '+f+': '+e.message)}}
let policy;try{policy=JSON.parse(read('harness/project-policy.json'));ok('policy json')}catch(e){bad('policy json')}
let sandbox={};vm.createContext(sandbox);try{new vm.Script(read('Config.gs')+';globalThis.C=CONFIG').runInContext(sandbox);let c=sandbox.C;if(c.SESSION_KEY!=='PARSA_S03')bad('session key');else ok('session key');if(c.MCQ_MAX+c.DEBUG_MAX+c.CODING_MAX!==c.TOTAL_MAX)bad('score totals');else ok('score totals')}catch(e){bad('config eval')}
let qbox={};vm.createContext(qbox);try{new vm.Script(read('Questions.gs')+';globalThis.Q=QUESTION_BANK;globalThis.R=CODE_REPAIR_TASKS').runInContext(qbox);let q=qbox.Q,r=qbox.R;if(!Array.isArray(q)||q.length!==15)bad('question count');else ok('15 questions');if(!Array.isArray(r)||r.length!==4)bad('repair count');else ok('4 repairs');let ids=new Set(q.map(x=>x.id));ids.size===q.length?ok('unique ids'):bad('duplicate ids');q.forEach(x=>{if(x.answerIndex<0||x.answerIndex>=x.options.length)bad('answer index '+x.id)});}catch(e){bad('questions eval '+e.message)}
if(policy?.repositoryWritePolicy?.directWritesToDefaultBranchAllowed!==false)bad('main write policy');else ok('main write policy');
const aw=policy?.appsScriptWorkflow;
if(aw?.sourceOfTruth==='github_repository'&&aw?.mutationBridge==='verified_local_clone_with_clasp'&&aw?.localCloneRequired===true&&aw?.manualAppsScriptSourceEditingAllowed===false&&aw?.manualAppsScriptProjectCreationAllowed===false&&aw?.newProjectProvisioningCommand==='npm run bootstrap:clasp'&&aw?.claspConfigTracked===false&&aw?.restoreTrackedManifestAfterCreate===true)ok('Apps Script local-clone provisioning policy');else bad('Apps Script local-clone provisioning policy');
if(!read('.gitignore').split(/\r?\n/).includes('.clasp.json'))bad('.clasp.json is not gitignored');else ok('.clasp.json is gitignored');
if(fs.existsSync('.clasp.json'))bad('.clasp.json must not be tracked/present in repository verification');else ok('no tracked Session 03 clasp target');
const setup=read('README-SETUP.txt');if(setup.includes('git clone')&&setup.includes('npm run bootstrap:clasp')&&setup.includes('local clone'))ok('setup documents local clasp provisioning');else bad('setup missing local clasp provisioning');
const pkg=JSON.parse(read('package.json'));if(pkg.scripts?.['bootstrap:clasp']==='node scripts/bootstrap-clasp.mjs')ok('bootstrap clasp script registered');else bad('bootstrap clasp npm script');
if(read('Config.gs').includes('PARSA_S02'))bad('S02 config leak');else ok('no S02 config leak');
if(fail)process.exit(1);
