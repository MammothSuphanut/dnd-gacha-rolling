const {execFileSync}=require("child_process");const path=require("path");
const [pack,...names]=process.argv.slice(2);
for(const n of names){const b=execFileSync("node",[path.join(__dirname,"pcklist.cjs"),pack,n],{maxBuffer:1<<28});
let w,h;const t=b.toString("ascii",12,16);
if(t==="VP8 "){w=b.readUInt16LE(26)&0x3fff;h=b.readUInt16LE(28)&0x3fff}
else if(t==="VP8L"){const v=b.readUInt32LE(21);w=(v&0x3fff)+1;h=((v>>14)&0x3fff)+1}
else if(t==="VP8X"){w=(b.readUIntLE(24,3))+1;h=(b.readUIntLE(27,3))+1}
else if(b.toString("ascii",1,4)==="PNG"){w=b.readUInt32BE(16);h=b.readUInt32BE(20)}
console.log(n,w,h,(w/256).toFixed(2)+"x"+(h/256).toFixed(2));}
