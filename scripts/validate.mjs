import fs from 'node:fs';
import vm from 'node:vm';
let fail=0;
const ok=m=>console.log('PASS '+m),bad=m=>{fail++;console.error('FAIL '+m)},read=f=>fs.readFileSync(f,'utf8');
const required=['Code.gs','Config.gs','CopyButtons.html','DataStore.gs','EmailService.gs','Index.html','Questions.gs','Scripts.html','Styles.html','Submission.gs','TeacherTools.gs','appsscript.json','harness/project-policy.json','docs/STATUS.md','docs/RUNBOOK.md','docs/APPS_SCRIPT_WORKFLOW.md','docs/HARNESS_INCIDENTS.md','README-SETUP.txt','scripts/clasp-preflight.mjs','.gitignore'];
for(const f of required)fs.existsSync(f)?ok(f):bad('missing '+f);
for(const f of fs.readdirSync('.').filter(x=>x.endsWith('.gs'))){try{new vm.Script(read(f));ok('syntax '+f)}catch(e){bad('syntax '+f+': '+e.message)}}
let policy;try{policy=JSON.parse(read('harness/project-policy.json'));ok('policy json')}catch(e){bad('policy json')}
let sandbox={};vm.createContext(sandbox);try{new vm.Script(read('Config.gs')+';globalThis.C=CONFIG').runInContext(sandbox);let c=sandbox.C;if(c.SESSION_KEY!=='PARSA_S03')bad('session key');else ok('session key');if(c.MCQ_MAX+c.DEBUG_MAX+c.CODING_MAX!==c.TOTAL_MAX)bad('score totals');else ok('score totals')}catch(e){bad('config eval')}
let qbox={};vm.createContext(qbox);try{new vm.Script(read('Questions.gs')+';globalThis.Q=QUESTION_BANK;globalThis.R=CODE_REPAIR_TASKS').runInContext(qbox);let q=qbox.Q,r=qbox.R;if(!Array.isArray(q)||q.length!==15)bad('question count');else ok('15 questions');if(!Array.isArray(r)||r.length!==4)bad('repair count');else ok('4 repairs');let ids=new Set(q.map(x=>x.id));ids.size===q.length?ok('unique ids'):bad('duplicate ids');q.forEach(x=>{if(x.answerIndex<0||x.answerIndex>=x.options.length)bad('answer index '+x.id)});}catch(e){bad('questions eval '+e.message)}
if(policy?.repositoryWritePolicy?.directWritesToDefaultBranchAllowed!==false)bad('main write policy');else ok('main write policy');
const aw=policy?.appsScriptWorkflow;
const claspGuardOk=aw?.sourceOfTruth==='github_repository'&&aw?.mutationBridge==='verified_local_clone_with_clasp'&&aw?.localCloneRequired===true&&aw?.manualAppsScriptSourceEditingAllowed===false&&aw?.manualAppsScriptProjectCreationAllowed===false&&aw?.claspEnvironmentMustBeObservedBeforeProvisioning===true&&Array.isArray(aw?.requiredClaspObservations)&&aw.requiredClaspObservations.includes('clasp --version')&&aw.requiredClaspObservations.includes('clasp create-script --help')&&aw?.provisioningMode==='direct_owner_command_after_preflight'&&aw?.creationScriptType==='standalone'&&aw?.webAppConfiguredAtDeployment===true&&aw?.remoteCreationHiddenInsideWrapperAllowed===false&&aw?.claspSyntaxMayBeInferredFromChatHistory===false&&aw?.claspSyntaxMayBeInferredFromRemoteDocsWithoutLocalHelp===false&&aw?.preflightCommand==='npm run clasp:preflight'&&aw?.claspConfigTracked===false;
claspGuardOk?ok('clasp environment-aware provisioning policy'):bad('clasp environment-aware provisioning policy');
if(!read('.gitignore').split(/\r?\n/).includes('.clasp.json'))bad('.clasp.json is not gitignored');else ok('.clasp.json is gitignored');
if(fs.existsSync('.clasp.json'))bad('.clasp.json must not be tracked/present in repository verification');else ok('no tracked Session 03 clasp target');
if(fs.existsSync('scripts/bootstrap-clasp.mjs'))bad('unsafe remote bootstrap wrapper must not exist');else ok('no remote bootstrap wrapper');
const setup=read('README-SETUP.txt');if(setup.includes('clasp --version')&&setup.includes('clasp create-script --help')&&setup.includes('npm run clasp:preflight')&&setup.includes('--type standalone'))ok('setup documents observed clasp provisioning');else bad('setup missing observed clasp provisioning');
const workflow=read('docs/APPS_SCRIPT_WORKFLOW.md');if(workflow.includes('Do not infer create syntax')&&workflow.includes('standalone')&&workflow.includes('must not create a remote project'))ok('workflow contains clasp guardrail');else bad('workflow missing clasp guardrail');
const pkg=JSON.parse(read('package.json'));if(pkg.scripts?.['clasp:preflight']==='node scripts/clasp-preflight.mjs'&&!pkg.scripts?.['bootstrap:clasp'])ok('preflight-only clasp npm script');else bad('clasp npm scripts are unsafe');
if(read('Config.gs').includes('PARSA_S02'))bad('S02 config leak');else ok('no S02 config leak');
const index=read('Index.html'),scripts=read('Scripts.html'),copy=read('CopyButtons.html');
if(index.includes("include('CopyButtons')")&&scripts.includes('addCopyButton')&&scripts.includes('copyText(')&&copy.includes('function copyText'))ok('code copy buttons wired');else bad('code copy buttons are not fully wired');
if(fail)process.exit(1);
