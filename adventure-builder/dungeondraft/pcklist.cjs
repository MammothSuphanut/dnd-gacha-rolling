const fs=require("fs");
const f=process.argv[2];const fd=fs.openSync(f,"r");const b=Buffer.alloc(16*1024*1024);
const n=fs.readSync(fd,b,0,b.length,0);
if(b.toString("ascii",0,4)!=="GDPC")throw "not pck";
let p=4+4*4+16*4;const count=b.readUInt32LE(p);p+=4;const out=[];
for(let i=0;i<count;i++){const l=b.readUInt32LE(p);p+=4;const path=b.toString("utf8",p,p+l).replace(/\0+$/,"");p+=l;const off=Number(b.readBigUInt64LE(p));p+=8;const size=Number(b.readBigUInt64LE(p));p+=8;p+=16;out.push({path,off,size});}
if(process.argv[3]){const e=out.find(o=>o.path.endsWith(process.argv[3]));const bb=Buffer.alloc(e.size);fs.readSync(fd,bb,0,e.size,e.off);process.stdout.write(bb);}
else console.log(out.map(o=>o.path).join("\n"));
