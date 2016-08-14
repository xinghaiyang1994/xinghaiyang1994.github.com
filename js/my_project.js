addReady(function(){
	var project={};
	/*酷炫导航*/	
	project.nav=function(){
		var oNav=document.getElementById('nav');
		var aMod=getByClass(oNav,'mod1');
		var arr=[];
		for(var i=0;i<aMod.length;i++){
			arr.push({left:aMod[i].offsetLeft,top:aMod[i].offsetTop});
		}
		for(var i=0;i<arr.length;i++){
			aMod[i].style.position='absolute';
			aMod[i].style.left=arr[i].left+'px';
			aMod[i].style.top=arr[i].top+'px';
		}
		for(var i=0;i<arr.length;i++){
			(function(index){
				setTimeout(function(){
					move(aMod[index],{left:0,top:0,width:0,height:0,opacity:0},{complete:function(){
					
					if(index==aMod.length-1){
						for(var i=0;i<arr.length;i++){
							(function(index){
								setTimeout(function(){
									move(aMod[index],{left:arr[index].left,top:arr[index].top,width:200,height:200,opacity:1});	
								},(aMod.length-index)*400);	
							})(i);
						}
					}
						
					}});	
				},index*400);	
				
			})(i);
		}
	};
	project.nav();
	/*翻页效果*/
	project.turn=function(){
		var oBox=document.getElementById('turn_box');
		var oPage1=document.getElementById('page_1');
		var oPage2=document.getElementById('page_2');
		var oFront=document.getElementById('page_front');
		var oBack=document.getElementById('page_back');
		var oBtn=document.getElementById('turn_btn');
		var iNow=0;
		var bOk=false;
		oBtn.onclick=function(){
			if(bOk)return;
			bOk=true;
			iNow++;
			oPage1.style.transition='1s all ease';
			oPage1.style.transform='perspective(800px) rotateY(-180deg)';	
			function fnTran(){
				oPage1.removeEventListener('transitionend',fnTran,false);
				oPage1.style.transition='';
				oPage1.style.transform='perspective(800px) rotateY(0deg)';
				oBox.style.backgroundImage='url(img/my_project/turn_'+(iNow%3+1)+'.jpg)';
				oFront.style.backgroundImage='url(img/my_project/turn_'+(iNow%3+1)+'.jpg)';
				oBack.style.backgroundImage='url(img/my_project/turn_'+((iNow+1)%3+1)+'.jpg)';
				oPage2.style.backgroundImage='url(img/my_project/turn_'+((iNow+1)%3+1)+'.jpg)';
				bOk=false;
			}
			oPage1.addEventListener('transitionend',fnTran,false);
		};
		
	};
	project.turn();
	/*时间*/
	project.clock=function(){
		var oClockTxt=document.getElementById('clock_txt');
		var oClockBox=document.getElementById('clock_box');
		var aImage=oClockTxt.getElementsByTagName('img');
		var hour=document.getElementById('hour');
		var minu=document.getElementById('min');
		var sec=document.getElementById('sec');
		for(var i=0;i<60;i++){
			var oS=document.createElement('span');
			oS.style.transform='rotate('+i*6+'deg)';
			oClockBox.appendChild(oS);
			if(i%5==0){
				oS.style.height='20px';
				oS.innerHTML='<b>'+i+'</b>';
				var oB=oS.children[0];
				oB.style.transform='rotate(-'+i*6+'deg)';
			}
		}
		var aS=oClockBox.getElementsByTagName('span');
		function time(){
			var oDate=new Date();
			var h=oDate.getHours();
			var m=oDate.getMinutes();
			var s=oDate.getSeconds();
			hour.style.transform='rotate('+(h%12+m/60)*30+'deg)';
			minu.style.transform='rotate('+(m+s/60)*6+'deg)';
			sec.style.transform='rotate('+s*6+'deg)';
			var str=toDou(h)+toDou(m)+toDou(s);
			for(var i=0;i<aImage.length;i++){
				move(aImage[i],{marginTop:-str.charAt(i)*35});
			}
		}
		time();
		setInterval(time,1000)	
	};
	project.clock();
	/*圆环*/
	project.roundRing=function(){
		var oR=document.getElementById('round_box');
		var oT=document.getElementById('send_num');
		var oBtn=document.getElementById('send_btn');
		oBtn.onclick=function(){
			if((!/^\d+$/.test(oT.value))||(oT.value==0)){
				return alert('请输入正确数字');
			}
			var N=oT.value;
			for(var i=0;i<N;i++){
				var oS=document.createElement('span');
				oR.appendChild(oS);
				oS.style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
			}	
		};
		var aS=oR.children;
		var bOk=true;
		oR.onclick=function(){
			if(bOk){
				for(var i=0;i<aS.length;i++){
					aS[i].style.transform='rotate('+i*(360/aS.length)+'deg)';
				}	
			}else{
				for(var i=0;i<aS.length;i++){
					aS[i].style.transform='rotate(0deg)';
				}	
			}
			bOk=!bOk;
		};
		var oReturn=document.getElementById('return_btn');
		oReturn.onclick=function(){
			var aAll=oR.children;
			for(var i=0;i<aAll.length;i++){
				oR.removeChild(aAll[i]);
				i--;
			}	
		};
	};
	project.roundRing();
	/*图片环*/
	project.photoRing=function(){
		var oAll=document.getElementById('photo_all');
		var aLi=oAll.children;
		var N=360/aLi.length;
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.transition='1s all ease '+(N-i)*50+'ms';
			aLi[i].style.transform='rotateY('+N*i+'deg) translateZ(350px)';
		}
		oAll.onclick=function(){
			oAll.style.transform='perspective(800px) rotateY('+rnd(-360,361)+'deg)';	
		};
	};
	window.onscroll=function(){
		var T=document.getElementById('photo_all').offsetTop;
		var cH=document.documentElement.clientHeight;
		var sT=document.documentElement.scrollTop||document.body.scrollTop;
		if(sT+cH>T){
			project.photoRing();
		}
	};
	/*无缝滚动*/
	project.scrollLeft=function(){
		var oScro=document.getElementById('scroll_box');
		var oUl=oScro.children[0];	
		var aLi=oUl.children;
		oUl.innerHTML+=oUl.innerHTML;
		oUl.style.width=aLi[0].offsetWidth*oUl.children.length+'px';
		var timer=null;
		var l=0;
		timer=setInterval(function(){
			l+=2;
			oUl.style.left=-l%(oUl.offsetWidth/2)+'px';
		},30);
	};
	project.scrollLeft();
});