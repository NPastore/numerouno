!function(t){function e(r){if(i[r])return i[r].exports;var s=i[r]={exports:{},id:r,loaded:!1};return t[r].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){var r,s;r=i(1),s=function(t){var e,i,s;return e=new r(t.width,t.height),0===t.index?e.writeHeader():e.firstFrame=!1,e.setTransparent(t.transparent),e.setRepeat(t.repeat),e.setDelay(t.delay),e.setQuality(t.quality),e.setDither(t.dither),e.setGlobalPalette(t.globalPalette),e.addFrame(t.data),t.last&&e.finish(),!0===t.globalPalette&&(t.globalPalette=e.getGlobalPalette()),i=e.stream(),t.data=i.pages,t.cursor=i.cursor,t.pageSize=i.constructor.pageSize,t.canTransfer?(s=function(){var e,i,r,s;for(s=[],e=0,i=(r=t.data).length;e<i;e++)s.push(r[e].buffer);return s}(),self.postMessage(t,s)):self.postMessage(t)},self.onmessage=function(t){return s(t.data)}},function(t,e,i){function r(){this.page=-1,this.pages=[],this.newPage()}function s(t,e){this.width=~~t,this.height=~~e,this.transparent=null,this.transIndex=0,this.repeat=-1,this.delay=0,this.image=null,this.pixels=null,this.indexedPixels=null,this.colorDepth=null,this.colorTab=null,this.neuQuant=null,this.usedEntry=new Array,this.palSize=7,this.dispose=-1,this.firstFrame=!0,this.sample=10,this.dither=!1,this.globalPalette=!1,this.out=new r}var n=i(2),o=i(3);r.pageSize=4096,r.charMap={};for(var a=0;a<256;a++)r.charMap[a]=String.fromCharCode(a);r.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(r.pageSize),this.cursor=0},r.prototype.getData=function(){for(var t="",e=0;e<this.pages.length;e++)for(var i=0;i<r.pageSize;i++)t+=r.charMap[this.pages[e][i]];return t},r.prototype.writeByte=function(t){this.cursor>=r.pageSize&&this.newPage(),this.pages[this.page][this.cursor++]=t},r.prototype.writeUTFBytes=function(t){for(var e=t.length,i=0;i<e;i++)this.writeByte(t.charCodeAt(i))},r.prototype.writeBytes=function(t,e,i){for(var r=i||t.length,s=e||0;s<r;s++)this.writeByte(t[s])},s.prototype.setDelay=function(t){this.delay=Math.round(t/10)},s.prototype.setFrameRate=function(t){this.delay=Math.round(100/t)},s.prototype.setDispose=function(t){t>=0&&(this.dispose=t)},s.prototype.setRepeat=function(t){this.repeat=t},s.prototype.setTransparent=function(t){this.transparent=t},s.prototype.addFrame=function(t){this.image=t,this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null,this.getImagePixels(),this.analyzePixels(),!0===this.globalPalette&&(this.globalPalette=this.colorTab),this.firstFrame&&(this.writeLSD(),this.writePalette(),this.repeat>=0&&this.writeNetscapeExt()),this.writeGraphicCtrlExt(),this.writeImageDesc(),this.firstFrame||this.globalPalette||this.writePalette(),this.writePixels(),this.firstFrame=!1},s.prototype.finish=function(){this.out.writeByte(59)},s.prototype.setQuality=function(t){t<1&&(t=1),this.sample=t},s.prototype.setDither=function(t){!0===t&&(t="FloydSteinberg"),this.dither=t},s.prototype.setGlobalPalette=function(t){this.globalPalette=t},s.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette},s.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")},s.prototype.analyzePixels=function(){this.colorTab||(this.neuQuant=new n(this.pixels,this.sample),this.neuQuant.buildColormap(),this.colorTab=this.neuQuant.getColormap()),this.dither?this.ditherPixels(this.dither.replace("-serpentine",""),null!==this.dither.match(/-serpentine/)):this.indexPixels(),this.pixels=null,this.colorDepth=8,this.palSize=7,null!==this.transparent&&(this.transIndex=this.findClosest(this.transparent,!0))},s.prototype.indexPixels=function(){var t=this.pixels.length/3;this.indexedPixels=new Uint8Array(t);for(var e=0,i=0;i<t;i++){var r=this.findClosestRGB(255&this.pixels[e++],255&this.pixels[e++],255&this.pixels[e++]);this.usedEntry[r]=!0,this.indexedPixels[i]=r}},s.prototype.ditherPixels=function(t,e){var i={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[.25,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!t||!i[t])throw"Unknown dithering kernel: "+t;var r=i[t],s=0,n=this.height,o=this.width,a=this.pixels,h=e?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var l=0;l<n;l++){e&&(h*=-1);for(var u=1==h?0:o-1,p=1==h?o:0;u!==p;u+=h){var f=3*(s=l*o+u),c=a[f],d=a[f+1],g=a[f+2];f=this.findClosestRGB(c,d,g),this.usedEntry[f]=!0,this.indexedPixels[s]=f;for(var v=c-this.colorTab[f*=3],m=d-this.colorTab[f+1],y=g-this.colorTab[f+2],w=1==h?0:r.length-1,x=1==h?r.length:0;w!==x;w+=h){var b=r[w][1],_=r[w][2];if(b+u>=0&&b+u<o&&_+l>=0&&_+l<n){var P=r[w][0];f=s+b+_*o,a[f*=3]=Math.max(0,Math.min(255,a[f]+v*P)),a[f+1]=Math.max(0,Math.min(255,a[f+1]+m*P)),a[f+2]=Math.max(0,Math.min(255,a[f+2]+y*P))}}}}},s.prototype.findClosest=function(t,e){return this.findClosestRGB((16711680&t)>>16,(65280&t)>>8,255&t,e)},s.prototype.findClosestRGB=function(t,e,i,r){if(null===this.colorTab)return-1;if(this.neuQuant&&!r)return this.neuQuant.lookupRGB(t,e,i);for(var s=0,n=16777216,o=this.colorTab.length,a=0,h=0;a<o;h++){var l=t-(255&this.colorTab[a++]),u=e-(255&this.colorTab[a++]),p=i-(255&this.colorTab[a++]),f=l*l+u*u+p*p;(!r||this.usedEntry[h])&&f<n&&(n=f,s=h)}return s},s.prototype.getImagePixels=function(){var t=this.width,e=this.height;this.pixels=new Uint8Array(t*e*3);for(var i=this.image,r=0,s=0,n=0;n<e;n++)for(var o=0;o<t;o++)this.pixels[s++]=i[r++],this.pixels[s++]=i[r++],this.pixels[s++]=i[r++],r++},s.prototype.writeGraphicCtrlExt=function(){var t,e;this.out.writeByte(33),this.out.writeByte(249),this.out.writeByte(4),null===this.transparent?(t=0,e=0):(t=1,e=2),this.dispose>=0&&(e=7&dispose),this.out.writeByte(0|(e<<=2)|t),this.writeShort(this.delay),this.out.writeByte(this.transIndex),this.out.writeByte(0)},s.prototype.writeImageDesc=function(){this.out.writeByte(44),this.writeShort(0),this.writeShort(0),this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(this.firstFrame||this.globalPalette?0:128|this.palSize)},s.prototype.writeLSD=function(){this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(240|this.palSize),this.out.writeByte(0),this.out.writeByte(0)},s.prototype.writeNetscapeExt=function(){this.out.writeByte(33),this.out.writeByte(255),this.out.writeByte(11),this.out.writeUTFBytes("NETSCAPE2.0"),this.out.writeByte(3),this.out.writeByte(1),this.writeShort(this.repeat),this.out.writeByte(0)},s.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);for(var t=768-this.colorTab.length,e=0;e<t;e++)this.out.writeByte(0)},s.prototype.writeShort=function(t){this.out.writeByte(255&t),this.out.writeByte(t>>8&255)},s.prototype.writePixels=function(){new o(this.width,this.height,this.indexedPixels,this.colorDepth).encode(this.out)},s.prototype.stream=function(){return this.out},t.exports=s},function(t,e){var i=256,r=1024,s=1<<18;t.exports=function(t,e){function n(t,e,i,s,n){h[e][0]-=t*(h[e][0]-i)/r,h[e][1]-=t*(h[e][1]-s)/r,h[e][2]-=t*(h[e][2]-n)/r}function o(t,e,r,n,o){for(var a,l,u=Math.abs(e-t),p=Math.min(e+t,i),c=e+1,d=e-1,g=1;c<p||d>u;)l=f[g++],c<p&&((a=h[c++])[0]-=l*(a[0]-r)/s,a[1]-=l*(a[1]-n)/s,a[2]-=l*(a[2]-o)/s),d>u&&((a=h[d--])[0]-=l*(a[0]-r)/s,a[1]-=l*(a[1]-n)/s,a[2]-=l*(a[2]-o)/s)}function a(t,e,r){t|=0,e|=0,r|=0;var s,n,o,a,l,f=~(1<<31),c=f,d=-1,g=d;for(s=0;s<i;s++)n=h[s],(o=Math.abs((0|n[0])-t)+Math.abs((0|n[1])-e)+Math.abs((0|n[2])-r)|0)<f&&(f=o,d=s),(a=o-((0|u[s])>>12))<c&&(c=a,g=s),p[s]-=l=p[s]>>10,u[s]+=l<<10;return p[d]+=64,u[d]-=65536,g}var h,l,u,p,f;this.buildColormap=function(){(function(){var t,e;for(h=[],l=new Int32Array(256),u=new Int32Array(i),p=new Int32Array(i),f=new Int32Array(32),t=0;t<i;t++)e=(t<<12)/i,h[t]=new Float64Array([e,e,e,0]),p[t]=256,u[t]=0})(),function(){var i,s,h=t.length,l=30+(e-1)/3,u=h/(3*e),p=~~(u/100),c=r,d=2048,g=d>>6;for(g<=1&&(g=0),i=0;i<g;i++)f[i]=c*(256*(g*g-i*i)/(g*g));h<1509?(e=1,s=3):s=h%499!=0?1497:h%491!=0?1473:h%487!=0?1461:1509;var v,m,y,w,x=0;for(i=0;i<u;)if(n(c,w=a(v=(255&t[x])<<4,m=(255&t[x+1])<<4,y=(255&t[x+2])<<4),v,m,y),0!==g&&o(g,w,v,m,y),(x+=s)>=h&&(x-=h),0===p&&(p=1),++i%p==0)for(c-=c/l,(g=(d-=d/30)>>6)<=1&&(g=0),w=0;w<g;w++)f[w]=c*(256*(g*g-w*w)/(g*g))}(),function(){for(var t=0;t<i;t++)h[t][0]>>=4,h[t][1]>>=4,h[t][2]>>=4,h[t][3]=t}(),function(){var t,e,r,s,n,o,a=0,u=0;for(t=0;t<i;t++){for(n=t,o=(r=h[t])[1],e=t+1;e<i;e++)(s=h[e])[1]<o&&(n=e,o=s[1]);if(s=h[n],t!=n&&(e=s[0],s[0]=r[0],r[0]=e,e=s[1],s[1]=r[1],r[1]=e,e=s[2],s[2]=r[2],r[2]=e,e=s[3],s[3]=r[3],r[3]=e),o!=a){for(l[a]=u+t>>1,e=a+1;e<o;e++)l[e]=t;a=o,u=t}}for(l[a]=u+255>>1,e=a+1;e<256;e++)l[e]=255}()},this.getColormap=function(){for(var t=[],e=[],r=0;r<i;r++)e[h[r][3]]=r;for(var s=0,n=0;n<i;n++){var o=e[n];t[s++]=h[o][0],t[s++]=h[o][1],t[s++]=h[o][2]}return t},this.lookupRGB=function(t,e,r){t|=0,r|=0;for(var s,n,o,a=1e3,u=-1,p=0|l[e|=0],f=p-1;p<i||f>=0;)p<i&&((o=(0|(n=h[p])[1])-e)>=a?p=i:(p++,o<0&&(o=-o),(s=(0|n[0])-t)<0&&(s=-s),(o+=s)<a&&((s=(0|n[2])-r)<0&&(s=-s),(o+=s)<a&&(a=o,u=0|n[3])))),f>=0&&((o=e-(0|(n=h[f])[1]))>=a?f=-1:(f--,o<0&&(o=-o),(s=(0|n[0])-t)<0&&(s=-s),(o+=s)<a&&((s=(0|n[2])-r)<0&&(s=-s),(o+=s)<a&&(a=o,u=0|n[3]))));return u}}},function(t,e){var i=5003,r=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];t.exports=function(t,e,s,n){function o(t,e){x[d++]=t,d>=254&&l(e)}function a(t){h(i),k=m+2,B=!0,f(m,t)}function h(t){for(var e=0;e<t;++e)b[e]=-1}function l(t){d>0&&(t.writeByte(d),t.writeBytes(x,0,d),d=0)}function u(t){return(1<<t)-1}function p(){return 0===remaining?-1:(--remaining,255&s[curPixel++])}function f(t,e){for(c&=r[P],P>0?c|=t<<P:c=t,P+=n_bits;P>=8;)o(255&c,e),c>>=8,P-=8;if((k>g||B)&&(B?(g=u(n_bits=v),B=!1):(++n_bits,g=12==n_bits?4096:u(n_bits))),t==y){for(;P>0;)o(255&c,e),c>>=8,P-=8;l(e)}}var c,d,g,v,m,y,w=Math.max(2,n),x=new Uint8Array(256),b=new Int32Array(i),_=new Int32Array(i),P=0,k=0,B=!1;this.encode=function(r){r.writeByte(w),remaining=t*e,curPixel=0,function(t,e){var r,s,n,o,l,c;for(v=t,B=!1,n_bits=v,g=u(n_bits),y=1+(m=1<<t-1),k=m+2,d=0,o=p(),c=0,r=i;r<65536;r*=2)++c;c=8-c,h(i),f(m,e);t:for(;-1!=(s=p());)if(r=(s<<12)+o,n=s<<c^o,b[n]!==r){if(b[n]>=0){l=5003-n,0===n&&(l=1);do{if((n-=l)<0&&(n+=5003),b[n]===r){o=_[n];continue t}}while(b[n]>=0)}f(o,e),o=s,k<4096?(_[n]=k++,b[n]=r):a(e)}else o=_[n];f(o,e),f(y,e)}(w+1,r),r.writeByte(0)}}}]),function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.GIF=e():t.GIF=e()}(this,(function(){return function(t){function e(r){if(i[r])return i[r].exports;var s=i[r]={exports:{},id:r,loaded:!1};return t[r].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){var r,s,n={}.hasOwnProperty,o=[].indexOf||function(t){for(var e=0,i=this.length;e<i;e++)if(e in this&&this[e]===t)return e;return-1};r=i(1).EventEmitter,i(2),s=function(t){function e(t){var e,r;for(r in this.running=!1,this.options={},this.frames=[],this.groups=new Map,this.freeWorkers=[],this.activeWorkers=[],i)null==(e=this.options)[r]&&(e[r]=i[r])}var i,r;return function(t,e){function i(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype}(e,t),i={workerScript:"gif.worker.js",workers:2,repeat:0,background:"#fff",quality:10,width:null,height:null,transparent:null,debug:!1},r={delay:500,copy:!1},e.prototype.setOption=function(t,e){if(this.options[t]=e,null!=this._canvas&&("width"===t||"height"===t))return this._canvas[t]=e},e.prototype.setOptions=function(t){var e,i;for(e in i=[],t)n.call(t,e)&&i.push(this.setOption(e,t[e]));return i},e.prototype.addFrame=function(t,e){var i,s,n;for(n in null==e&&(e={}),(i={}).transparent=this.options.transparent,r)i[n]=e[n]||r[n];if(null==this.options.width&&this.setOption("width",t.width),null==this.options.height&&this.setOption("height",t.height),"undefined"!=typeof ImageData&&null!==ImageData&&t instanceof ImageData)i.data=t.data;else if("undefined"!=typeof CanvasRenderingContext2D&&null!==CanvasRenderingContext2D&&t instanceof CanvasRenderingContext2D||"undefined"!=typeof WebGLRenderingContext&&null!==WebGLRenderingContext&&t instanceof WebGLRenderingContext)e.copy?i.data=this.getContextData(t):i.context=t;else{if(null==t.childNodes)throw new Error("Invalid image");e.copy?i.data=this.getImageData(t):i.image=t}return(s=this.frames.length)>0&&i.data&&(this.groups.has(i.data)?this.groups.get(i.data).push(s):this.groups.set(i.data,[s])),this.frames.push(i)},e.prototype.render=function(){var t,e,i;if(this.running)throw new Error("Already running");if(null==this.options.width||null==this.options.height)throw new Error("Width and height must be set prior to rendering");if(this.running=!0,this.nextFrame=0,this.finishedFrames=0,this.imageParts=(function(){var t,e,i;for(i=[],t=0,e=this.frames.length;0<=e?t<e:t>e;0<=e?++t:--t)i.push(null);return i}).call(this),e=this.spawnWorkers(),!0===this.options.globalPalette)this.renderNextFrame();else for(t=0,i=e;0<=i?t<i:t>i;0<=i?++t:--t)this.renderNextFrame();return this.emit("start"),this.emit("progress",0)},e.prototype.abort=function(){for(var t;null!=(t=this.activeWorkers.shift());)this.log("killing active worker"),t.terminate();return this.running=!1,this.emit("abort")},e.prototype.spawnWorkers=function(){var t,e,i;return t=Math.min(this.options.workers,this.frames.length),(function(){i=[];for(var r=e=this.freeWorkers.length;e<=t?r<t:r>t;e<=t?r++:r--)i.push(r);return i}).apply(this).forEach(function(t){return function(e){var i;return t.log("spawning worker "+e),(i=new Worker(t.options.workerScript)).onmessage=function(e){return t.activeWorkers.splice(t.activeWorkers.indexOf(i),1),t.freeWorkers.push(i),t.frameFinished(e.data,!1)},t.freeWorkers.push(i)}}(this)),t},e.prototype.frameFinished=function(t,e){var i,r,s,n;if(this.finishedFrames++,e?(i=this.frames.indexOf(t),r=this.groups.get(t.data)[0],this.log("frame "+(i+1)+" is duplicate of "+r+" - "+this.activeWorkers.length+" active"),this.imageParts[i]={indexOfFirstInGroup:r}):(this.log("frame "+(t.index+1)+" finished - "+this.activeWorkers.length+" active"),this.emit("progress",this.finishedFrames/this.frames.length),this.imageParts[t.index]=t),!0===this.options.globalPalette&&!e&&(this.options.globalPalette=t.globalPalette,this.log("global palette analyzed"),this.frames.length>2))for(s=1,n=this.freeWorkers.length;1<=n?s<n:s>n;1<=n?++s:--s)this.renderNextFrame();return o.call(this.imageParts,null)>=0?this.renderNextFrame():this.finishRendering()},e.prototype.finishRendering=function(){var t,e,i,r,s,n,o,a,h,l,u,p,f,c,d,g,v,m,y;for(s=n=0,l=(g=this.imageParts).length;n<l;s=++n)(e=g[s]).indexOfFirstInGroup&&(this.imageParts[s]=this.imageParts[e.indexOfFirstInGroup]);for(h=0,o=0,u=(v=this.imageParts).length;o<u;o++)h+=((e=v[o]).data.length-1)*e.pageSize+e.cursor;for(h+=e.pageSize-e.cursor,this.log("rendering finished - filesize "+Math.round(h/1e3)+"kb"),t=new Uint8Array(h),d=0,a=0,p=(m=this.imageParts).length;a<p;a++)for(i=c=0,f=(y=(e=m[a]).data).length;c<f;i=++c)t.set(y[i],d),d+=i===e.data.length-1?e.cursor:e.pageSize;return r=new Blob([t],{type:"image/gif"}),this.emit("finished",r,t)},e.prototype.renderNextFrame=function(){var t,e,i,r;if(0===this.freeWorkers.length)throw new Error("No free workers");if(!(this.nextFrame>=this.frames.length))return t=this.frames[this.nextFrame++],(e=this.frames.indexOf(t))>0&&this.groups.has(t.data)&&this.groups.get(t.data)[0]!==e?void setTimeout(function(e){return function(){return e.frameFinished(t,!0)}}(this),0):(r=this.freeWorkers.shift(),i=this.getTask(t),this.log("starting frame "+(i.index+1)+" of "+this.frames.length),this.activeWorkers.push(r),r.postMessage(i))},e.prototype.getContextData=function(t){return t.getImageData(0,0,this.options.width,this.options.height).data},e.prototype.getImageData=function(t){var e;return null==this._canvas&&(this._canvas=document.createElement("canvas"),this._canvas.width=this.options.width,this._canvas.height=this.options.height),(e=this._canvas.getContext("2d")).setFill=this.options.background,e.fillRect(0,0,this.options.width,this.options.height),e.drawImage(t,0,0),this.getContextData(e)},e.prototype.getTask=function(t){var e,i;if(i={index:e=this.frames.indexOf(t),last:e===this.frames.length-1,delay:t.delay,transparent:t.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,dither:this.options.dither,globalPalette:this.options.globalPalette,repeat:this.options.repeat,canTransfer:!0},null!=t.data)i.data=t.data;else if(null!=t.context)i.data=this.getContextData(t.context);else{if(null==t.image)throw new Error("Invalid frame");i.data=this.getImageData(t.image)}return i},e.prototype.log=function(t){if(this.options.debug)return console.log(t)},e}(r),t.exports=s},function(t,e){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(t){return"function"==typeof t}function s(t){return"object"==typeof t&&null!==t}function n(t){return void 0===t}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(t){if(!function(t){return"number"==typeof t}(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},i.prototype.emit=function(t){var e,i,o,a,h,l;if(this._events||(this._events={}),"error"===t&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var u=new Error('Uncaught, unspecified "error" event. ('+e+")");throw u.context=e,u}if(n(i=this._events[t]))return!1;if(r(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),i.apply(this,a)}else if(s(i))for(a=Array.prototype.slice.call(arguments,1),o=(l=i.slice()).length,h=0;h<o;h++)l[h].apply(this,a);return!0},i.prototype.on=i.prototype.addListener=function(t,e){var o;if(!r(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,r(e.listener)?e.listener:e),this._events[t]?s(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,s(this._events[t])&&!this._events[t].warned&&(o=n(this._maxListeners)?i.defaultMaxListeners:this._maxListeners)&&o>0&&this._events[t].length>o&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},i.prototype.once=function(t,e){function i(){this.removeListener(t,i),s||(s=!0,e.apply(this,arguments))}if(!r(e))throw TypeError("listener must be a function");var s=!1;return i.listener=e,this.on(t,i),this},i.prototype.removeListener=function(t,e){var i,n,o,a;if(!r(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(o=(i=this._events[t]).length,n=-1,i===e||r(i.listener)&&i.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(s(i)){for(a=o;a-- >0;)if(i[a]===e||i[a].listener&&i[a].listener===e){n=a;break}if(n<0)return this;1===i.length?(i.length=0,delete this._events[t]):i.splice(n,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},i.prototype.removeAllListeners=function(t){var e,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(r(i=this._events[t]))this.removeListener(t,i);else if(i)for(;i.length;)this.removeListener(t,i[i.length-1]);return delete this._events[t],this},i.prototype.listeners=function(t){return this._events&&this._events[t]?r(this._events[t])?[this._events[t]]:this._events[t].slice():[]},i.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(r(e))return 1;if(e)return e.length}return 0},i.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e){var i,r,s,n,o;o=navigator.userAgent.toLowerCase(),n=navigator.platform.toLowerCase(),s="ie"===(i=o.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0])[1]&&document.documentMode,(r={name:"version"===i[1]?i[3]:i[1],version:s||parseFloat("opera"===i[1]&&i[4]?i[4]:i[2]),platform:{name:o.match(/ip(?:ad|od|hone)/)?"ios":(o.match(/(?:webos|android)/)||n.match(/mac|win|linux/)||["other"])[0]}})[r.name]=!0,r[r.name+parseInt(r.version,10)]=!0,r.platform[r.platform.name]=!0,t.exports=r}])}));