import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
const [aPath,bPath,x0,y0,x1,y1] = process.argv.slice(2);
const a=PNG.sync.read(readFileSync(aPath)), b=PNG.sync.read(readFileSync(bPath));
const X0=+x0,Y0=+y0,X1=+x1,Y1=+y1;
function col(img,x){let n=0;for(let y=Y0;y<Y1;y++){const i=(img.width*y+x)<<2;if(img.data[i]*0.299+img.data[i+1]*0.587+img.data[i+2]*0.114<200)n++;}return n;}
function runs(img){const out=[];let s=-1;for(let x=X0;x<X1;x++){const e=col(img,x)===0;if(e&&s<0)s=x;if(!e&&s>=0){if(x-s>=5)out.push([s,x-1,x-s]);s=-1;}}if(s>=0)out.push([s,X1-1,X1-s]);return out;}
console.log("MINE  gaps:", runs(a).map(r=>`${r[0]}-${r[1]}(${r[2]})`).join(" "));
console.log("FIGMA gaps:", runs(b).map(r=>`${r[0]}-${r[1]}(${r[2]})`).join(" "));
