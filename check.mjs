import fs from 'node:fs';
import path from 'node:path';
let n=0;
for(const dir of ['','yuwei-wu','dandan-wang','jia-cao']){
 const f=path.resolve(dir,'index.html'),s=fs.readFileSync(f,'utf8');
 if(!s.includes('lang="en"'))throw Error('Language');
 for(const m of s.matchAll(/href="([^"]+)"/g)){
  const h=m[1];if(h.startsWith('mailto:'))continue;
  if(h.startsWith('#')){if(!s.includes('id="'+h.slice(1)+'"'))throw Error('Anchor '+h);continue;}
  const target=path.resolve(path.dirname(f),h);if(!fs.existsSync(target))throw Error('Missing '+target);n++;
 }
 if(/[\u4e00-\u9fff]/.test(s))throw Error('Non-English content');
}
for(const [slug,email] of [['yuwei-wu','yuweiwu@bjmu.edu.cn'],['dandan-wang','wangdandan@pkuss.bjmu.edu.cn'],['jia-cao','caojia0211@163.com']]){
 if(!fs.readFileSync(`${slug}/index.html`,'utf8').includes(`mailto:${email}`))throw Error('Email mismatch');
}
console.log(`PASS: 4 English pages, ${n} local links/assets, section anchors and all 3 email addresses.`);
