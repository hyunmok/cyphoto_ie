{"pageName" : "", "results" : "    <b>/share/MD0_DATA/work_skp/[0] Temp/cyphoto/js/_mini/ merging failed</b><br/><br/><br/>", "errNo" : "400"}trim:function(a){return a.replace(/^\s*(.*?)[\s\n]*$/g,"$1");},camelize:function(a){return a.replace(/\-(.)/g,function(b,c){return c.toUpperCase();
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
d["183"]="&middot;";d["184"]="&cedil;";d["