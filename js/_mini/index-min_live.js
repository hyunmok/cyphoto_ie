if(typeof window=="undefined"){if(typeof skFn=="undefined"){skFn={};}}else{if(typeof window.skFn=="undefined"){window.skFn={};
}}skFn.string={trim:function(a){return a.replace(/^\s*(.*?)[\s\n]*$/g,"$1");},camelize:function(a){return a.replace(/\-(.)/g,function(b,c){return c.toUpperCase();
});},strpad:function(f,a,c,e){var d="";f=f.toString();for(var b=0;b<c;b++){if(f.substr(b,1)==""){d+=a;
}}if(!e||e!="right"){e="left";}if(e=="left"){return d+f;}else{return f+d;}},getFullToday:function(){var a=new Date();
var b="";b+=a.getYear()+"y";b+=(a.getMonth()+1)+"m";b+=a.getDate()+"d ";b+=a.getHours()+"h";b+=a.getMinutes()+"m";
b+=a.getSeconds()+"s";return b;},timestamp:function(){return Math.floor(new Date().getTime()/1000);},microtime:function(b){var a=new Date().getTime()/1000;
var c=parseInt(a,10);return(b)?a:(Math.round((a-c)*1000)/1000)+" "+c;},getRandom:function(c){var d="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var b="";for(var a=0;a<c;a++){var e=Math.floor(Math.random()*d.length);b+=d.substring(e,e+1);}return b;
},getTimeMSM:function(){dDate=new Date();sR=this.strpad(dDate.getMinutes(),"0",2)+":";sR+=this.strpad(dDate.getSeconds(),"0",2)+":";
sR+=this.strpad(dDate.getMilliseconds(),"0",3);return sR;},getTimeMili:function(){dDate=new Date();sR=this.timestamp()+"."+this.strpad(dDate.getMilliseconds(),"0",3);
return sR;},get_html_translation_table:function(j,g){var d={},f={},c=0,a="";var e={},b={};var k={},h={};
e[0]="HTML_SPECIALCHARS";e[1]="HTML_ENTITIES";b[0]="ENT_NOQUOTES";b[2]="ENT_COMPAT";b[3]="ENT_QUOTES";
k=!isNaN(j)?e[j]:j?j.toUpperCase():"HTML_SPECIALCHARS";h=!isNaN(g)?b[g]:g?g.toUpperCase():"ENT_COMPAT";
if(k!=="HTML_SPECIALCHARS"&&k!=="HTML_ENTITIES"){throw new Error("Table: "+k+" not supported");}d["38"]="&amp;";
if(k==="HTML_ENTITIES"){d["160"]="&nbsp;";d["161"]="&iexcl;";d["162"]="&cent;";d["163"]="&pound;";d["164"]="&curren;";
d["165"]="&yen;";d["166"]="&brvbar;";d["167"]="&sect;";d["168"]="&uml;";d["169"]="&copy;";d["170"]="&ordf;";
d["171"]="&laquo;";d["172"]="&not;";d["173"]="&shy;";d["174"]="&reg;";d["175"]="&macr;";d["176"]="&deg;";
d["177"]="&plusmn;";d["178"]="&sup2;";d["179"]="&sup3;";d["180"]="&acute;";d["181"]="&micro;";d["182"]="&para;";
d["183"]="&middot;";d["184"]="&cedil;";d["185"]="&sup1;";d["186"]="&ordm;";d["187"]="&raquo;";d["188"]="&frac14;";
d["189"]="&frac12;";d["190"]="&frac34;";d["191"]="&iquest;";d["192"]="&Agrave;";d["193"]="&Aacute;";d["194"]="&Acirc;";
d["195"]="&Atilde;";d["196"]="&Auml;";d["197"]="&Aring;";d["198"]="&AElig;";d["199"]="&Ccedil;";d["200"]="&Egrave;";
d["201"]="&Eacute;";d["202"]="&Ecirc;";d["203"]="&Euml;";d["204"]="&Igrave;";d["205"]="&Iacute;";d["206"]="&Icirc;";
d["207"]="&Iuml;";d["208"]="&ETH;";d["209"]="&Ntilde;";d["210"]="&Ograve;";d["211"]="&Oacute;";d["212"]="&Ocirc;";
d["213"]="&Otilde;";d["214"]="&Ouml;";d["215"]="&times;";d["216"]="&Oslash;";d["217"]="&Ugrave;";d["218"]="&Uacute;";
d["219"]="&Ucirc;";d["220"]="&Uuml;";d["221"]="&Yacute;";d["222"]="&THORN;";d["223"]="&szlig;";d["224"]="&agrave;";
d["225"]="&aacute;";d["226"]="&acirc;";d["227"]="&atilde;";d["228"]="&auml;";d["229"]="&aring;";d["230"]="&aelig;";
d["231"]="&ccedil;";d["232"]="&egrave;";d["233"]="&eacute;";d["234"]="&ecirc;";d["235"]="&euml;";d["236"]="&igrave;";
d["237"]="&iacute;";d["238"]="&icirc;";d["239"]="&iuml;";d["240"]="&eth;";d["241"]="&ntilde;";d["242"]="&ograve;";
d["243"]="&oacute;";d["244"]="&ocirc;";d["245"]="&otilde;";d["246"]="&ouml;";d["247"]="&divide;";d["248"]="&oslash;";
d["249"]="&ugrave;";d["250"]="&uacute;";d["251"]="&ucirc;";d["252"]="&uuml;";d["253"]="&yacute;";d["254"]="&thorn;";
d["255"]="&yuml;";}if(h!=="ENT_NOQUOTES"){d["34"]="&quot;";}if(h==="ENT_QUOTES"){d["39"]="&#39;";}d["60"]="&lt;";
d["62"]="&gt;";for(c in d){a=String.fromCharCode(c);f[a]=d[c];}return f;},html_entity_decode:function(c,f){var e={},d="",a="",b="";
a=c.toString();if(false===(e=this.get_html_translation_table("HTML_ENTITIES",f))){return false;}delete (e["&"]);
e["&"]="&amp;";for(d in e){b=e[d];a=a.split(b).join(d);}a=a.split("&#039;").join("'");return a;},urldecode:function(a){return decodeURIComponent((a+"").replace(/\+/g,"%20"));
},strip_tags:function(a,c){c=(((c||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join("");var b=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,d=/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
return a.replace(d,"").replace(b,function(f,e){return c.indexOf("<"+e.toLowerCase()+">")>-1?f:"";});},str_replace:function(t,c,m,l){var g=0,e=0,p="",k="",d=0,o=0,h=[].concat(t),a=[].concat(c),q=m,b=a instanceof Array,n=q instanceof Array;
q=[].concat(q);if(l){this.window[l]=0;}for(g=0,d=q.length;g<d;g++){if(q[g]===""){continue;}for(e=0,o=h.length;
e<o;e++){p=q[g]+"";k=b?(a[e]!==undefined?a[e]:""):a[0];q[g]=(p).split(h[e]).join(k);if(l&&q[g]!==p){this.window[l]+=(p.length-q[g].length)/h[e].length;
}}}return n?q:q[0];},parse_url:function(f,b){var e={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};
var a=e.parser[e.strictMode?"strict":"loose"].exec(f),d={},c=14;while(c--){d[e.key[c]]=a[c]||"";}switch(b){case"PHP_URL_SCHEME":return d.protocol;
case"PHP_URL_HOST":return d.host;case"PHP_URL_PORT":return d.port;case"PHP_URL_USER":return d.user;case"PHP_URL_PASS":return d.password;
case"PHP_URL_PATH":return d.path;case"PHP_URL_QUERY":return d.query;case"PHP_URL_FRAGMENT":return d.anchor;
default:var g={};if(d.protocol!==""){g.scheme=d.protocol;}if(d.host!==""){g.host=d.host;}if(d.port!==""){g.port=d.port;
}if(d.user!==""){g.user=d.user;}if(d.password!==""){g.pass=d.password;}if(d.path!==""){g.path=d.path;
}if(d.query!==""){g.query=d.query;}if(d.anchor!==""){g.fragment=d.anchor;}return g;}},parse_str:function(str,array){var glue1="=",glue2="&",array2=String(str).replace(/^&?([\s\S]*?)&?$/,"$1").split(glue2),i,j,chr,tmp,key,value,bracket,keys,evalStr,that=this,fixStr=function(str){return that.urldecode(str).replace(/([\\"'])/g,"\\$1").replace(/\n/g,"\\n").replace(/\r/g,"\\r");
};if(!array){array=this.window;}for(i=0;i<array2.length;i++){tmp=array2[i].split(glue1);if(tmp.length<2){tmp=[tmp,""];
}key=fixStr(tmp[0]);value=fixStr(tmp[1]);while(key.charAt(0)===" "){key=key.substr(1);}if(key.indexOf("\0")!==-1){key=key.substr(0,key.indexOf("\0"));
}if(key&&key.charAt(0)!=="["){keys=[];bracket=0;for(j=0;j<key.length;j++){if(key.charAt(j)==="["&&!bracket){bracket=j+1;
}else{if(key.charAt(j)==="]"){if(bracket){if(!keys.length){keys.push(key.substr(0,bracket-1));}keys.push(key.substr(bracket,j-bracket));
bracket=0;if(key.charAt(j+1)!=="["){break;}}}}}if(!keys.length){keys=[key];}for(j=0;j<keys[0].length;
j++){chr=keys[0].charAt(j);if(chr===" "||chr==="."||chr==="["){keys[0]=keys[0].substr(0,j)+"_"+keys[0].substr(j+1);
}if(chr==="["){break;}}evalStr="array";for(j=0;j<keys.length;j++){key=keys[j];if((key!==""&&key!==" ")||j===0){key="'"+key+"'";
}else{key=eval(evalStr+".push([]);")-1;}evalStr+="["+key+"]";if(j!==keys.length-1&&eval("typeof "+evalStr)==="undefined"){eval(evalStr+" = [];");
}}evalStr+=" = '"+value+"';\n";eval(evalStr);}}},parse_UrlStr:function(c){var b=this.parse_url(location.href);
var a={};this.parse_str(b.query,a);return a;},getFileName:function(b){var a=this.parse_url(b);pathArray=a.path.split("/");
return pathArray[pathArray.length-1];},md5:function(D){var E;var y=function(b,a){return(b<<a)|(b>>>(32-a));
};var I=function(k,b){var W,a,d,x,c;d=(k&2147483648);x=(b&2147483648);W=(k&1073741824);a=(b&1073741824);
c=(k&1073741823)+(b&1073741823);if(W&a){return(c^2147483648^d^x);}if(W|a){if(c&1073741824){return(c^3221225472^d^x);
}else{return(c^1073741824^d^x);}}else{return(c^d^x);}};var s=function(a,c,b){return(a&c)|((~a)&b);};var r=function(a,c,b){return(a&b)|(c&(~b));
};var q=function(a,c,b){return(a^c^b);};var o=function(a,c,b){return(c^(a|(~b)));};var v=function(X,W,ab,aa,k,Y,Z){X=I(X,I(I(s(W,ab,aa),k),Z));
return I(y(X,Y),W);};var f=function(X,W,ab,aa,k,Y,Z){X=I(X,I(I(r(W,ab,aa),k),Z));return I(y(X,Y),W);};
var G=function(X,W,ab,aa,k,Y,Z){X=I(X,I(I(q(W,ab,aa),k),Z));return I(y(X,Y),W);};var u=function(X,W,ab,aa,k,Y,Z){X=I(X,I(I(o(W,ab,aa),k),Z));
return I(y(X,Y),W);};var e=function(W){var X;var d=W.length;var c=d+8;var b=(c-(c%64))/64;var x=(b+1)*16;
var Y=new Array(x-1);var a=0;var k=0;while(k<d){X=(k-(k%4))/4;a=(k%4)*8;Y[X]=(Y[X]|(W.charCodeAt(k)<<a));
k++;}X=(k-(k%4))/4;a=(k%4)*8;Y[X]=Y[X]|(128<<a);Y[x-2]=d<<3;Y[x-1]=d>>>29;return Y;};var t=function(d){var a="",b="",k,c;
for(c=0;c<=3;c++){k=(d>>>(c*8))&255;b="0"+k.toString(16);a=a+b.substr(b.length-2,2);}return a;};var F=[],M,h,H,w,g,V,U,T,S,P=7,N=12,K=17,J=22,C=5,B=9,A=14,z=20,p=4,n=11,m=16,l=23,R=6,Q=10,O=15,L=21;
D=this.utf8_encode(D);F=e(D);V=1732584193;U=4023233417;T=2562383102;S=271733878;E=F.length;for(M=0;M<E;
M+=16){h=V;H=U;w=T;g=S;V=v(V,U,T,S,F[M+0],P,3614090360);S=v(S,V,U,T,F[M+1],N,3905402710);T=v(T,S,V,U,F[M+2],K,606105819);
U=v(U,T,S,V,F[M+3],J,3250441966);V=v(V,U,T,S,F[M+4],P,4118548399);S=v(S,V,U,T,F[M+5],N,1200080426);T=v(T,S,V,U,F[M+6],K,2821735955);
U=v(U,T,S,V,F[M+7],J,4249261313);V=v(V,U,T,S,F[M+8],P,1770035416);S=v(S,V,U,T,F[M+9],N,2336552879);T=v(T,S,V,U,F[M+10],K,4294925233);
U=v(U,T,S,V,F[M+11],J,2304563134);V=v(V,U,T,S,F[M+12],P,1804603682);S=v(S,V,U,T,F[M+13],N,4254626195);
T=v(T,S,V,U,F[M+14],K,2792965006);U=v(U,T,S,V,F[M+15],J,1236535329);V=f(V,U,T,S,F[M+1],C,4129170786);
S=f(S,V,U,T,F[M+6],B,3225465664);T=f(T,S,V,U,F[M+11],A,643717713);U=f(U,T,S,V,F[M+0],z,3921069994);V=f(V,U,T,S,F[M+5],C,3593408605);
S=f(S,V,U,T,F[M+10],B,38016083);T=f(T,S,V,U,F[M+15],A,3634488961);U=f(U,T,S,V,F[M+4],z,3889429448);V=f(V,U,T,S,F[M+9],C,568446438);
S=f(S,V,U,T,F[M+14],B,3275163606);T=f(T,S,V,U,F[M+3],A,4107603335);U=f(U,T,S,V,F[M+8],z,1163531501);V=f(V,U,T,S,F[M+13],C,2850285829);
S=f(S,V,U,T,F[M+2],B,4243563512);T=f(T,S,V,U,F[M+7],A,1735328473);U=f(U,T,S,V,F[M+12],z,2368359562);V=G(V,U,T,S,F[M+5],p,4294588738);
S=G(S,V,U,T,F[M+8],n,2272392833);T=G(T,S,V,U,F[M+11],m,1839030562);U=G(U,T,S,V,F[M+14],l,4259657740);
V=G(V,U,T,S,F[M+1],p,2763975236);S=G(S,V,U,T,F[M+4],n,1272893353);T=G(T,S,V,U,F[M+7],m,4139469664);U=G(U,T,S,V,F[M+10],l,3200236656);
V=G(V,U,T,S,F[M+13],p,681279174);S=G(S,V,U,T,F[M+0],n,3936430074);T=G(T,S,V,U,F[M+3],m,3572445317);U=G(U,T,S,V,F[M+6],l,76029189);
V=G(V,U,T,S,F[M+9],p,3654602809);S=G(S,V,U,T,F[M+12],n,3873151461);T=G(T,S,V,U,F[M+15],m,530742520);U=G(U,T,S,V,F[M+2],l,3299628645);
V=u(V,U,T,S,F[M+0],R,4096336452);S=u(S,V,U,T,F[M+7],Q,1126891415);T=u(T,S,V,U,F[M+14],O,2878612391);U=u(U,T,S,V,F[M+5],L,4237533241);
V=u(V,U,T,S,F[M+12],R,1700485571);S=u(S,V,U,T,F[M+3],Q,2399980690);T=u(T,S,V,U,F[M+10],O,4293915773);
U=u(U,T,S,V,F[M+1],L,2240044497);V=u(V,U,T,S,F[M+8],R,1873313359);S=u(S,V,U,T,F[M+15],Q,4264355552);T=u(T,S,V,U,F[M+6],O,2734768916);
U=u(U,T,S,V,F[M+13],L,1309151649);V=u(V,U,T,S,F[M+4],R,4149444226);S=u(S,V,U,T,F[M+11],Q,3174756917);
T=u(T,S,V,U,F[M+2],O,718787259);U=u(U,T,S,V,F[M+9],L,3951481745);V=I(V,h);U=I(U,H);T=I(T,w);S=I(S,g);
}var j=t(V)+t(U)+t(T)+t(S);return j.toLowerCase();},utf8_encode:function(a){var h=(a+"");var j="";var b,e;
var c=0;b=e=0;c=h.length;for(var d=0;d<c;d++){var g=h.charCodeAt(d);var f=null;if(g<128){e++;}else{if(g>127&&g<2048){f=String.fromCharCode((g>>6)|192)+String.fromCharCode((g&63)|128);
}else{f=String.fromCharCode((g>>12)|224)+String.fromCharCode(((g>>6)&63)|128)+String.fromCharCode((g&63)|128);
}}if(f!==null){if(e>b){j+=h.substring(b,e);}j+=f;b=e=d+1;}}if(e>b){j+=h.substring(b,h.length);}return j;
}};if(typeof window=="undefined"){if(typeof skTv=="undefined"){skTv={};}}else{if(typeof window.skTv=="undefined"){window.skTv={};
}}skTv.util={catchElementError:function(b,a){if(document.getElementById(b)==undefined){skFn.debug.alert("No such element id : '"+b+"'");
}else{skFn.debug.alert("["+a.name+"] "+a.message);}},focus:function(b){try{document.getElementById(b).className="focus";
}catch(a){this.catchElementError(b,a);}},blur:function(b){try{document.getElementById(b).className="";
}catch(a){this.catchElementError(b,a);}},changeClass:function(c,a){try{c.className=a;}catch(b){this.catchElementError(c,b);
}},cycle:function(a,g,c,h,d,j){try{var l=document.getElementById(a);}catch(f){this.catchElementError(a,f);
return;}if(typeof c=="object"&&c instanceof Array){if(c.length==2&&typeof c[0]=="number"&&typeof c[1]=="number"){for(var b=c[0];
b<c[1];b++){}}else{for(i in c){var k=new RegExp(c[i]);if(k.test(l[g])){if(i>=c.length-1){l[g]=c[0];}else{l[g]=c[parseInt(i)+1];
}break;}}}}}};if(typeof window=="undefined"){if(typeof skFn=="undefined"){skFn={};}}else{if(typeof window.skFn=="undefined"){window.skFn={};
}}skFn.cookie=(function(){var h="Thu, 01-Jan-1970 00:00:01 GMT",b=1000*60*60*24,j=["expires","path","domain"],d=escape,c=unescape,g=document,e;
var k=function(){var l=new Date();l.setTime(l.getTime());return l;};var a=function(o,s){var n,m,q,p=[],l=(arguments.length>2)?arguments[2]:{};
p.push(o+"="+s);for(n=0;n<j.length;n++){m=j[n];if(q=l[m]){p.push(m+"="+q);}}if(l.secure){p.push("secure");
}return p.join("; ");};var f=function(){var m="__EC_TEST__",l=new Date();l=l.toGMTString();this.set(m,l);
this.enabled=(this.remove(m)==l);return this.enabled;};e={set:function(p,t,o){var o=(arguments.length>2)?arguments[2]:{},n=k(),m,l={};
if(o.expires){o.expires*=b;l.expires=new Date(n.getTime()+o.expires);l.expires=l.expires.toGMTString();
}var s=["path","domain","secure"];for(i=0;i<s.length;i++){if(o[s[i]]){l[s[i]]=o[s[i]];}}var q=a(p,t,l);
g.cookie=q;return t;},has:function(m){m=m;var p=g.cookie,o=(p.indexOf("; "+m+"=")==-1)?p.indexOf(m+"="):p.indexOf("; "+m+"="),l=o+m.length+1,n=p.substring(0,m.length);
return((!o&&m!=n)||o<0)?false:true;},get:function(o,n){o=o;var r=g.cookie;if(r.indexOf("; "+o+"=")==-1){var q=r.indexOf(o+"=");
}else{var q=r.indexOf("; "+o+"=")+o.length+1;}var l=q+o.length+1,p=r.substring(0,o.length),m;if((!q&&o!=p)||q<0){return null;
}m=r.indexOf(";",l);if(m<0){m=r.length;}if(n==true){return r.substring(l,m);}else{return decodeURIComponent(r.substring(l,m));
}},remove:function(l){var m={};m.expires=-1;m.path="/";this.set(l,"",m);},keys:function(){var q=g.cookie,o=q.split("; "),l,n,m=[];
for(l=0;l<o.length;l++){n=o[l].split("=");m.push(c(n[0]));}return m;},all:function(){var q=g.cookie,o=q.split("; "),l,n,m=[];
for(l=0;l<o.length;l++){n=o[l].split("=");m.push([c(n[0]),c(n[1])]);}return m;},version:"0.2.1",enabled:true};
return e;}());if(typeof window=="undefined"){if(typeof skFn=="undefined"){skFn={};}}else{if(typeof window.skFn=="undefined"){window.skFn={};
}}skFn.user={id:"",passwd:"",tp:"",nick:"",name:"",sso:"",cmn:"",cookie:"",saveSession:function(a,d,c){var b="id="+a+"&tp="+d+"&"+c;
return skFn.cookie.set("l",b,{expires:"",domain:"",path:"/"});},clearSession:function(){return;},savePasswd:function(b,a,h,f){var e="";
var g=false;ucookie=skFn.cookie.get("u");if(ucookie&&ucookie.length>0){lines=ucookie.split("^");for(var d=0;
d<lines.length;d++){pairs=lines[d].split("&");for(var c=0;c<pairs.length;c++){values=pairs[c].split("=");
if(values[0]=="id"&&values[1]==b){lines[d]="id="+b+"&passwd="+a+"&tp="+h+"&"+f;g=true;}}}if(!g){lines[lines.length]="id="+b+"&passwd="+a+"&tp="+h+"&"+f;
}for(var d=0;d<lines.length;d++){e=e+lines[d]+"^";}e=e.substr(0,e.length-1);}else{e="id="+b+"&passwd="+a+"&tp="+h+"&"+f;
}skFn.cookie.set("u",e,{expires:90,domain:"",path:"/"});},removePasswd:function(a,e){var d="";ucookie=skFn.cookie.get("u");
if(ucookie&&ucookie.length>1){lines=ucookie.split("^");for(var c=0;c<lines.length;c++){pairs=lines[c].split("&");
for(var b=0;b<pairs.length;b++){values=pairs[b].split("=");if(values[0]=="id"&&values[1]==a){lines[c]="";
}}}for(var c=0;c<lines.length;c++){if(lines[c].length>1){d=d+lines[c]+"^";}}d=d.substr(0,d.length-1);
}else{d="";}skFn.cookie.set("u",d,{expires:90,domain:"",path:"/"});},getCookie:function(c,b,a){if(b==""||b==undefined){b="l";
}cookie=skFn.cookie.get(b,a);if(cookie){pairs=cookie.split("&");for(var d=0;d<pairs.length;d++){values=pairs[d].split("=");
if(b=="p"&&c=="oauth_token"){}if(values[0]==c){return values[1];}}}else{}return"";},isLoggedIn:function(){var a=this.getCookie("oauth_token","l");
if(a.length>0){return true;}return false;},checkLoggedIn:function(a){var b=this.getCookie("oauth_token","l");
if(b.length>0){return true;}else{if(a.length>0){document.location.href=a;}else{document.location.href="login.html";
}}},getAccessToken:function(){return this.getCookie("oauth_token","l");},getAccessTokenSecret:function(){return this.getCookie("oauth_token_secret","l");
},getUserId:function(){return this.getCookie("id","u");},getUserTid:function(){return this.getCookie("tid","u");
},getUserName:function(){return this.getCookie("CustNM","l");},getUserNick:function(){return this.getCookie("CustNM","l");
},getUserTp:function(){return this.getCookie("tp","u");},isTownHompy:function(){return this.getCookie("photomenu","u");
},isPhotoMenuOpen:function(){return this.getCookie("istown","u");},isPremium:function(){if(this.getCookie("isPremium","i",true)=="true"){return true;
}else{return false;}},getPremiumUrl:function(){return decodeURIComponent(this.getCookie("url","i"));},isPrivacyOpen:function(){var b=this.getUserId();
var d=skFn.cookie.get("c");var a=false;if(d&&d.length>0){lines=d.split("^");for(var c=0;c<lines.length;
c++){if(lines[c]=="id="+b+"&privacy=close"){return false;}}}return true;},updatePrivacy:function(c){var e="";
var g=skFn.cookie.get("c");var a=this.getUserId();var f=false;if(g&&g.length>0){lines=g.split("^");for(var d=0;
d<lines.length;d++){pairs=lines[d].split("&");for(var b=0;b<pairs.length;b++){values=pairs[b].split("=");
if(values[0]=="id"&&values[1]==a){lines[d]="id="+a+"&privacy="+c;f=true;}}}if(!f){lines[lines.length]="id="+a+"&privacy="+c;
}for(var d=0;d<lines.length;d++){e=e+lines[d]+"^";}e=e.substr(0,e.length-1);}else{e="id="+a+"&privacy="+c;
}skFn.cookie.set("c",e,{expires:900,domain:"",path:"/"});},};var navigation={gotoBack:function(){history.back();
},gotoAppManage:function(){if(skEnv.device.inputDevice!="keyboard"){if(skEnv.device.vendor=="lg"){if(skFn.user.isPremium()==true){document.location.href=skFn.user.getPremiumUrl();
}else{window.NetCastBack();}}}else{history.back();}},gotoExit:function(){if(skEnv.device.inputDevice!="keyboard"){if(skEnv.device.vendor=="lg"){window.NetCastExit();
}}else{self.location.href="index.html";}},gotoPhotoList:function(b,a,f,c){var e="photo_list.html?targetId=";
if(typeof b=="undefined"){if(skFn.user.isLoggedIn()){e=e+skFn.user.getUserTid();}else{navigation.gotoLogin("gotoPhotoList");
return;}}else{e=e+b;}if(typeof c!="undefined"){e=e+"&itemNo="+c;}if(typeof a!="undefined"){e=e+"&folderNo="+a;
}if(typeof f!="undefined"){e=e+"&folderName="+f;}var d=document.URL.substring(document.URL.lastIndexOf("/")+1,document.URL.indexOf(".html")).toLowerCase();
if(d=="photo_detail"){if(skFn.user.isLoggedIn()&&skFn.user.getUserTid()==b){skFn.cookie.set("f","photo_list");
}else{if(typeof c=="undefined"&&typeof a=="undefined"&&typeof f=="undefined"){skFn.cookie.set("f","pado_list");
}else{if(skFn.cookie.get("f")=="people_list"){skFn.cookie.set("f","people_list");}else{skFn.cookie.set("f","pado_list");
}}}}else{if(!(d=="people_list"||d=="pado_list")){skFn.cookie.set("f","photo_list");}}window.location.href=e;
},gotoPhotoSlide:function(b,a,g,f,e,d,c){if(e==false){return false;}else{if(typeof d=="undefined"){d=1;
}if(typeof c=="undefined"){c=encodeURIComponent(document.URL.substring(0,document.URL.indexOf("?")));
}window.location.href="photo_slide.html?targetId="+b+"&itemNo="+f+"&folderNo="+a+"&folderName="+g+"&itemCount="+d+"&referrer="+c;
}},gotoPhotoSlide_null:function(b,a,g,f,e,d,c){if(e==false){return false;}else{if(typeof d=="undefined"){d=1;
}if(typeof c=="undefined"){c=encodeURIComponent(document.URL.substring(0,document.URL.indexOf("?")));
}window.location.href="photo_slide_null.html?targetId="+b+"&itemNo="+f+"&folderNo="+a+"&folderName="+g+"&itemCount="+d+"&referrer="+c;
}},gotoPadoList:function(){skFn.cookie.set("f","pado_list");if(skFn.user.isLoggedIn()){document.location.href="pado_list.html";
}else{navigation.gotoLogin("gotoPadoList");}},gotoPeopleList:function(){skFn.cookie.set("f","people_list");
document.location.href="people_list.html";},gotoBlogPhotoList:function(){skFn.cookie.set("f","blog_photo_list");
document.location.href="blog_photo_list.html";},gotoSetup:function(){skFn.cookie.set("f","setup");if(skFn.user.isLoggedIn()){document.location.href="setup.html";
}else{navigation.gotoLogin("gotoSetup");}},gotoLogin:function(a){var b="login.html";if(typeof a!="undefined"){b=b+"?movef="+a;
}window.location.href=b;}};