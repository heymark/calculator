!function(t){function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,n,e){Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=3)}([function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var n=0,e=Array(t.length);n<t.length;n++)e[n]=t[n];return e}return Array.from(t)}function i(t){return t.includes(".")?t:t+"."}function u(t){return function(n){return void 0===n||"0"===n?t.toString():n.toString()+t.toString()}}function c(t){return(0,M.default)(t.memory.toNumber())[t.operator](t.workingValue.toNumber())}function s(t){return A?!t.includes(".")&&t.length===x||t.includes(".")&&t.length===x+1:t.length===x}function l(t){return A?!t.includes(".")&&t.length<=x||t.includes(".")&&t.length<=x+1:t.length<=x}function a(t){if(l(t))return t.toUpperCase();var n=(0,M.default)(t),e=n.s>0?0:1,r=1,o=A?0:1,i=1,u=1,c=n.e.toString().length-(n.e<0?1:0),s=e+r+o+i+u+c,a=x-s;return n.toExponential(a).toUpperCase()}function f(){var t=document.getElementById("display"),n=parseFloat(window.getComputedStyle(t).getPropertyValue("width")),e=parseFloat(window.getComputedStyle(t).getPropertyValue("padding-right")),r=n-2*e;return Math.floor(r/36)}function h(t){return"clearEntry"===t?"clearEntry":"point"===t?"decimal":k.hasOwnProperty(t)?"digit":"equals"===t?"equality":"negative"===t?"negation":["plus","minus","times","div"].includes(t)?"operator":"invalid"}function g(){for(var t=arguments.length,n=Array(t),e=0;e<t;e++)n[e]=arguments[e];var r={contents:[].concat(n),toNumber:function(){return parseFloat(r.toString(r.contents))},toString:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.contents,n=[].concat(o(t)),e=n.pop();return n.length>0?e(r.toString(n)):e()}};return r}function d(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{m:[u(0)],o:"plus",v:[u(0)]},n={memory:g.apply(void 0,o(t.m)),operator:t.o,workingValue:g.apply(void 0,o(t.v))};return n}function p(t){return d({m:t.memory.contents,o:t.operator,v:t.workingValue.contents.concat(i)})}function v(t,n){var e=k[n];return O?(O=!1,d({m:[u(0)],o:"plus",v:t.workingValue.contents.concat(e)})):d({m:t.memory.contents,o:t.operator,v:t.workingValue.contents.concat(e)})}function m(t){return O=!0,d({m:t.workingValue.contents.length>1?[u(c(t))]:t.memory.contents,o:t.operator,v:[u(0)]})}function y(t){return d(O?{m:t.memory.contents.concat(V),o:t.operator,v:t.workingValue.contents}:{m:t.memory.contents,o:t.operator,v:t.workingValue.contents.concat(V)})}function w(t,n){return O&&(O=!1),d({m:t.workingValue.contents.length>1?[u(c(t))]:t.memory.contents,o:n,v:[u(0)]})}function E(t){var n=document.getElementById("display");void n.offsetWidth,"off"===t?n.classList.add("hidden"):n.classList.remove("hidden")}function S(t){try{b=N(t,b),P(b)}catch(t){b=d(),P(b,"ERROR")}}function P(t,n){E("off"),n?document.getElementById("display").innerHTML=n:document.getElementById("display").innerHTML=a(t.workingValue.contents.length>1?t.workingValue.toString():t.memory.toString()),E("on")}function N(t,n){var e=h(t);return s(a(n.workingValue.toString()))&&["decimal","digit","negation"].includes(e)?n:"decimal"===e?p(n):"digit"===e?v(n,t):"equality"===e?m(n):"negation"===e?y(n):"operator"===e?w(n,t):"clearEntry"===e?d({m:n.memory.contents,o:n.operator,v:[u(0)]}):d()}Object.defineProperty(n,"__esModule",{value:!0});var _=e(2),M=r(_),b=d(),k={one:u(1),two:u(2),three:u(3),four:u(4),five:u(5),six:u(6),seven:u(7),eight:u(8),nine:u(9),zero:u(0)},x=f(),O=!1,V=function(t){return t.search(/[^0.]/)>-1?t.includes("-")?t.slice(1):"-"+t:t},A=!0;n.default={input:S}},function(t,n){},function(t,n,e){var r;!function(o){"use strict";function i(){function t(n){var e=this;return e instanceof t?(n instanceof t?(e.s=n.s,e.e=n.e,e.c=n.c.slice()):c(e,n),void(e.constructor=t)):void 0===n?i():new t(n)}return t.prototype=m,t.DP=f,t.RM=h,t.E_NEG=p,t.E_POS=v,t}function u(t,n,e){var r=t.constructor,o=n-(t=new r(t)).e,i=t.c;for(i.length>++n&&s(t,o,r.RM),i[0]?e?o=n:(i=t.c,o=t.e+o+1):++o;i.length<o;i.push(0));return o=t.e,1===e||e&&(n<=o||o<=r.E_NEG)?(t.s<0&&i[0]?"-":"")+(i.length>1?i[0]+"."+i.join("").slice(1):i[0])+(o<0?"e":"e+")+o:t.toString()}function c(t,n){var e,r,o;for(0===n&&1/n<0?n="-0":y.test(n+="")||l(NaN),t.s="-"==n.charAt(0)?(n=n.slice(1),-1):1,(e=n.indexOf("."))>-1&&(n=n.replace(".","")),(r=n.search(/e/i))>0?(e<0&&(e=r),e+=+n.slice(r+1),n=n.substring(0,r)):e<0&&(e=n.length),r=0;"0"==n.charAt(r);r++);if(r==(o=n.length))t.c=[t.e=0];else{for(;"0"==n.charAt(--o););for(t.e=e-r-1,t.c=[],e=0;r<=o;t.c[e++]=+n.charAt(r++));}return t}function s(t,n,e,r){var o,i=t.c,u=t.e+n+1;if(1===e?r=i[u]>=5:2===e?r=i[u]>5||5==i[u]&&(r||u<0||i[u+1]!==o||1&i[u-1]):3===e?r=r||i[u]!==o||u<0:(r=!1,0!==e&&l("!Big.RM!")),u<1||!i[0])r?(t.e=-n,t.c=[1]):t.c=[t.e=0];else{if(i.length=u--,r)for(;++i[u]>9;)i[u]=0,u--||(++t.e,i.unshift(1));for(u=i.length;!i[--u];i.pop());}return t}function l(t){var n=new Error(t);throw n.name="BigError",n}var a,f=20,h=1,g=1e6,d=1e6,p=-7,v=21,m={},y=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;m.abs=function(){var t=new this.constructor(this);return t.s=1,t},m.cmp=function(t){var n,e=this,r=e.c,o=(t=new e.constructor(t)).c,i=e.s,u=t.s,c=e.e,s=t.e;if(!r[0]||!o[0])return r[0]?i:o[0]?-u:0;if(i!=u)return i;if(n=i<0,c!=s)return c>s^n?1:-1;for(i=-1,u=(c=r.length)<(s=o.length)?c:s;++i<u;)if(r[i]!=o[i])return r[i]>o[i]^n?1:-1;return c==s?0:c>s^n?1:-1},m.div=function(t){var n=this,e=n.constructor,r=n.c,o=(t=new e(t)).c,i=n.s==t.s?1:-1,u=e.DP;if((u!==~~u||u<0||u>g)&&l("!Big.DP!"),!r[0]||!o[0])return r[0]==o[0]&&l(NaN),o[0]||l(i/0),new e(0*i);var c,a,f,h,d,p,v=o.slice(),m=c=o.length,y=r.length,w=r.slice(0,c),E=w.length,S=t,P=S.c=[],N=0,_=u+(S.e=n.e-t.e)+1;for(S.s=i,i=_<0?0:_,v.unshift(0);E++<c;w.push(0));do{for(f=0;f<10;f++){if(c!=(E=w.length))h=c>E?1:-1;else for(d=-1,h=0;++d<c;)if(o[d]!=w[d]){h=o[d]>w[d]?1:-1;break}if(!(h<0))break;for(a=E==c?o:v;E;){if(w[--E]<a[E]){for(d=E;d&&!w[--d];w[d]=9);--w[d],w[E]+=10}w[E]-=a[E]}for(;!w[0];w.shift());}P[N++]=h?f:++f,w[0]&&h?w[E]=r[m]||0:w=[r[m]]}while((m++<y||w[0]!==p)&&i--);return P[0]||1==N||(P.shift(),S.e--),N>_&&s(S,u,e.RM,w[0]!==p),S},m.eq=function(t){return!this.cmp(t)},m.gt=function(t){return this.cmp(t)>0},m.gte=function(t){return this.cmp(t)>-1},m.lt=function(t){return this.cmp(t)<0},m.lte=function(t){return this.cmp(t)<1},m.sub=m.minus=function(t){var n,e,r,o,i=this,u=i.constructor,c=i.s,s=(t=new u(t)).s;if(c!=s)return t.s=-s,i.plus(t);var l=i.c.slice(),a=i.e,f=t.c,h=t.e;if(!l[0]||!f[0])return f[0]?(t.s=-s,t):new u(l[0]?i:0);if(c=a-h){for((o=c<0)?(c=-c,r=l):(h=a,r=f),r.reverse(),s=c;s--;r.push(0));r.reverse()}else for(e=((o=l.length<f.length)?l:f).length,c=s=0;s<e;s++)if(l[s]!=f[s]){o=l[s]<f[s];break}if(o&&(r=l,l=f,f=r,t.s=-t.s),(s=(e=f.length)-(n=l.length))>0)for(;s--;l[n++]=0);for(s=n;e>c;){if(l[--e]<f[e]){for(n=e;n&&!l[--n];l[n]=9);--l[n],l[e]+=10}l[e]-=f[e]}for(;0===l[--s];l.pop());for(;0===l[0];)l.shift(),--h;return l[0]||(t.s=1,l=[h=0]),t.c=l,t.e=h,t},m.mod=function(t){var n,e=this,r=e.constructor,o=e.s,i=(t=new r(t)).s;return t.c[0]||l(NaN),e.s=t.s=1,n=1==t.cmp(e),e.s=o,t.s=i,n?new r(e):(o=r.DP,i=r.RM,r.DP=r.RM=0,e=e.div(t),r.DP=o,r.RM=i,this.minus(e.times(t)))},m.add=m.plus=function(t){var n,e=this,r=e.constructor,o=e.s,i=(t=new r(t)).s;if(o!=i)return t.s=-i,e.minus(t);var u=e.e,c=e.c,s=t.e,l=t.c;if(!c[0]||!l[0])return l[0]?t:new r(c[0]?e:0*o);if(c=c.slice(),o=u-s){for(o>0?(s=u,n=l):(o=-o,n=c),n.reverse();o--;n.push(0));n.reverse()}for(c.length-l.length<0&&(n=l,l=c,c=n),o=l.length,i=0;o;)i=(c[--o]=c[o]+l[o]+i)/10|0,c[o]%=10;for(i&&(c.unshift(i),++s),o=c.length;0===c[--o];c.pop());return t.c=c,t.e=s,t},m.pow=function(t){var n=this,e=new n.constructor(1),r=e,o=t<0;for((t!==~~t||t<-d||t>d)&&l("!pow!"),t=o?-t:t;1&t&&(r=r.times(n)),t>>=1,t;)n=n.times(n);return o?e.div(r):r},m.round=function(t,n){var e=this,r=e.constructor;return null==t?t=0:(t!==~~t||t<0||t>g)&&l("!round!"),s(e=new r(e),t,null==n?r.RM:n),e},m.sqrt=function(){var t,n,e,r=this,o=r.constructor,i=r.c,u=r.s,c=r.e,a=new o("0.5");if(!i[0])return new o(r);u<0&&l(NaN),u=Math.sqrt(r.toString()),0===u||u===1/0?(t=i.join(""),t.length+c&1||(t+="0"),n=new o(Math.sqrt(t).toString()),n.e=((c+1)/2|0)-(c<0||1&c)):n=new o(u.toString()),u=n.e+(o.DP+=4);do e=n,n=a.times(e.plus(r.div(e)));while(e.c.slice(0,u).join("")!==n.c.slice(0,u).join(""));return s(n,o.DP-=4,o.RM),n},m.mul=m.times=function(t){var n,e=this,r=e.constructor,o=e.c,i=(t=new r(t)).c,u=o.length,c=i.length,s=e.e,l=t.e;if(t.s=e.s==t.s?1:-1,!o[0]||!i[0])return new r(0*t.s);for(t.e=s+l,u<c&&(n=o,o=i,i=n,l=u,u=c,c=l),n=new Array(l=u+c);l--;n[l]=0);for(s=c;s--;){for(c=0,l=u+s;l>s;)c=n[l]+i[s]*o[l-s-1]+c,n[l--]=c%10,c=c/10|0;n[l]=(n[l]+c)%10}for(c&&++t.e,n[0]||n.shift(),s=n.length;!n[--s];n.pop());return t.c=n,t},m.toString=m.valueOf=m.toJSON=function(){var t=this,n=t.constructor,e=t.e,r=t.c.join(""),o=r.length;if(e<=n.E_NEG||e>=n.E_POS)r=r.charAt(0)+(o>1?"."+r.slice(1):"")+(e<0?"e":"e+")+e;else if(e<0){for(;++e;r="0"+r);r="0."+r}else if(e>0)if(++e>o)for(e-=o;e--;r+="0");else e<o&&(r=r.slice(0,e)+"."+r.slice(e));else o>1&&(r=r.charAt(0)+"."+r.slice(1));return t.s<0&&t.c[0]?"-"+r:r},m.toExponential=function(t){return null==t?t=this.c.length-1:(t!==~~t||t<0||t>g)&&l("!toExp!"),u(this,t,1)},m.toFixed=function(t){var n,e=this,r=e.constructor,o=r.E_NEG,i=r.E_POS;return r.E_NEG=-(r.E_POS=1/0),null==t?n=e.toString():t===~~t&&t>=0&&t<=g&&(n=u(e,e.e+t),e.s<0&&e.c[0]&&n.indexOf("-")<0&&(n="-"+n)),r.E_NEG=o,r.E_POS=i,n||l("!toFix!"),n},m.toPrecision=function(t){return null==t?this.toString():((t!==~~t||t<1||t>g)&&l("!toPre!"),u(this,t-1,2))},a=i(),r=function(){return a}.call(n,e,n,t),!(void 0!==r&&(t.exports=r))}(this)},function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=e(0),i=r(o);e(1);var u=document.getElementsByTagName("button"),c=!0,s=!1,l=void 0;try{for(var a,f=function(){var t=a.value,n=t.id;t.addEventListener("click",function(t){i.default.input(n)})},h=u[Symbol.iterator]();!(c=(a=h.next()).done);c=!0)f()}catch(t){s=!0,l=t}finally{try{!c&&h.return&&h.return()}finally{if(s)throw l}}document.getElementById("display").classList.add("backlit"),i.default.input("zero")}]);