//addReady事件
function addReady(fn){
	//FF chrome
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false);
	//IE	
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState == 'complete'){
				fn();
			}
		});
	}

}
//move
function getStyle(obj,name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,options){
	options = options||{};
	options.easing = options.easing||'ease-out';
	options.duration = options.duration||700;
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name)); 				        //parseFloat(filter:alpha(opacity:100))
		if(isNaN(start[name])){ //转换失败
			switch(name){
				case 'width':
				start[name] = obj.offsetWidth;
				break;
				case 'height':
				start[name] = obj.offsetHeight;
				break;
				case 'left':
				start[name] = obj.offsetLeft;
				break;
				case 'top':
				start[name] = obj.offsetTop;
				break;
				case 'opacity':
				start[name] = 1;
				break;
				case 'borderWidth':
				start[name] = 0;
				break;
			}
		}
		dis[name] = json[name] - start[name];
	}
	var count = Math.round(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
				var a = n/count;
				var cur = start[name]+dis[name]*a;
				break;
				case 'ease-in':
				var a = n/count;
				var cur = start[name]+dis[name]*Math.pow(a,3);
				break;
				case 'ease-out':
				var a = 1-n/count;
				var cur = start[name]+dis[name]*(1-Math.pow(a,3));
				break;
			}
			if(name == 'opacity'){
				obj.style[name] = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';	
			}else{
				obj.style[name] = cur+'px';	
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			options.complete&&options.complete();
		}
	},30);
}
//获取
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);	
	}else{
		var res = [];
		var aAll = oUl.getElementsByTagName('*');
		for(var i = 0;i<aAll.length;i++){
			var re = new RegExp('\\b'+sClass+'\\b','g');
			if(re.test(aAll[i].className)){
				res.push(aAll[i]);
			}
		}
		return res;	
	}
}
//判断
function hasClass(obj,sClass){
	var re = new RegExp('\\b'+sClass+'\\b','g');
	if(re.test(obj.className)){
		return true;
	}
	return false;	
}	
//添加
function addClass(obj,sClass){
	if(obj.className){
		if(!hasClass(obj,sClass)){
			//obj.className = obj.className+' '+sClass;
			obj.className +=' '+sClass;
		}
	}else{
		obj.className = sClass;
	}
}
//删除
function removeClass(obj,sClass){
	var re = new RegExp('\\b'+sClass+'\\b','g');
	obj.className = obj.className.replace(re,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
}
//toDou
function toDou(n){
	return n<10?'0'+n:''+n;	
}
//rnd
function rnd(m,n){
	return parseInt(m+Math.random()*(n-m));	
}
//酷炫菜单doMove
function doMove(obj,target){
	var iSpeed=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		iSpeed+=(target-obj.offsetLeft)/5;
		iSpeed*=0.8;
		obj.style.left=obj.offsetLeft+iSpeed+'px';
		if(Math.round(iSpeed)==0&&obj.offsetLeft==target){
			clearInterval(obj.timer);	
		}	
	},30);
}
//getPos
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l,top:t}
}
//a2d
function a2d(n){
	return n*180/Math.PI;	
}
//scrollMove
function scrollMove(obj,dis,time){
	var count=Math.round(time/30);
	var n=0;
	clearInterval(obj.timer);	
	obj.timer=setInterval(function(){
		n++;
		var a=n/count;
		var cur=dis*Math.pow(a,3);
		document.documentElement.scrollTop=document.body.scrollTop=cur;
		if(n==count){
			clearInterval(obj.timer);	
		}	
	},30);
}












