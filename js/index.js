addReady(function(){
	var str='Welcome to you';	
	var oH1=document.getElementsByTagName('h1')[0];
	var oMain=document.getElementById('main');
	var oDiv=document.createElement('div');
	oDiv.className='show';
	oMain.appendChild(oDiv);
	var arr=str.split('');
	for(var i=0;i<str.length;i++){
		var aS=document.createElement('span');
		aS.innerHTML=arr[i];
		oDiv.appendChild(aS);
	}
	var aSpan=oDiv.children;
	var timer=null;
	var iNow=0;
	clearInterval(timer);
	timer=setInterval(function(){
		move(aSpan[iNow],{opacity:1});
		iNow++;	
		if(iNow==aSpan.length){
			clearInterval(timer);
		}
	},150);
	
	
});