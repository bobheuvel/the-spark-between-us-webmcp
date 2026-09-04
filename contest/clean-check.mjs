import {mkdirSync,mkdtempSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve,dirname,delimiter} from 'node:path';
const pnpm=process.argv[2];if(!pnpm)throw Error('Pass installed pnpm .mjs path');
mkdirSync('.qa-clean',{recursive:true});
const target=mkdtempSync(resolve('.qa-clean/run-'));
const source=resolve(target,'source');mkdirSync(source);
const archive=resolve(target,'source.tar');
const revision=spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim();
for(const [command,args] of [['git',['archive','--format=tar',`--output=${archive}`,revision]],['tar',['-xf',archive,'-C',source]]]){
 const r=spawnSync(command,args,{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr);
}
const env={...process.env,CI:'true',PATH:dirname(process.execPath)+delimiter+process.env.PATH,pnpm_config_pm_on_fail:'ignore'};
const install=spawnSync(process.execPath,[pnpm,'install','--offline','--frozen-lockfile'],{cwd:source,encoding:'utf8',env});
const result={revision,source,time:new Date().toISOString(),installExit:install.status,buildExit:null};
const out=`contest/TEST_EVIDENCE/clean-install-${Date.now()}`;mkdirSync(out,{recursive:true});writeFileSync(`${out}/install.txt`,String(install.stdout)+String(install.stderr));
if(install.status===0){const build=spawnSync(process.execPath,['node_modules/vinext/dist/cli.js','build'],{cwd:source,encoding:'utf8',env});result.buildExit=build.status;writeFileSync(`${out}/build.txt`,String(build.stdout)+String(build.stderr));}
writeFileSync(`${out}/result.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({...result,evidence:out},null,2));if(install.status!==0||result.buildExit!==0)process.exitCode=1;
