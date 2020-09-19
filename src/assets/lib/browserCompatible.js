/** For Check Browser Complatible
 * 1. check browser version
 * 2. check borswer localStorage is not undefined
 * @create by sittiporn
 */


function getBrowserInfo(){

    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1])};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/);
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
}


function browserRule(browserName,browserVersion){
	var rulesObj 	= {"opera":99,"chrome":43,"safari":8,"firefox":38,"msie":10,"ie":10};
	var name 		= browserName.toLowerCase();
	var userVersion = browserVersion || 0;

	if(rulesObj[name] != undefined){
		if(rulesObj[name] <= userVersion){
			return true;
		}else{
			return false;
		}
	}else{
		//case undefined browser rules
		return true;
	}
}

//close
//@param  bool 
function closeLogger(status){
	var DEBUG = status;
	if(DEBUG){
	    if(!window.console) window.console = {};
	    var methods = ["log", "debug", "warn", "info","error"];
	    for(var i=0;i<methods.length;i++){
	    	console[methods[i]] = function(){};
	    }
	}
	
}

function init(){
	var browserInfo = getBrowserInfo();
	var isAllow		= browserRule(browserInfo.name,browserInfo.version);
	var isBrowserNotSupportPage = window.location.href.indexOf("browsernotsupport.html") !== -1;
	
	if((!isAllow || typeof(Storage) ===  "undefined") && !isBrowserNotSupportPage){
		window.location.href = "browsernotsupport.html";
	}
	else if(isAllow && typeof(Storage) !== "undefined" && isBrowserNotSupportPage){
		// window.location.href = "https://ebanking.kkpfg.com/ebanking/";
	}
	
	closeLogger(false);
	
}


//extend number obj insert leading zero
Number.prototype.pad = function() {
      var s = String(this);
      var size = 3;
      while (s.length < (size || 2)) {s = "0" + s;}//NOSONAR
      return s;
};

init();
