addReady(function(){
	var project={};
	var T1=document.getElementById('t1').offsetTop;
	var T2=document.getElementById('clock').offsetTop;
	var T3=document.getElementById('t3').offsetTop;
	var T4=document.getElementById('photo_all').offsetTop;
	var T5=document.getElementById('t5').offsetTop;
	var T6=document.getElementById('t6').offsetTop;
	var T7=document.getElementById('t7').offsetTop;
	var T8=document.getElementById('t8').offsetTop;
	var oToTop=document.getElementById('to_top');
	var bSys=false;
	window.onscroll=function(){
		if(bSys)clearInterval(oToTop.timer);
		bSys=true;
		var cH=document.documentElement.clientHeight;
		var sT=document.documentElement.scrollTop||document.body.scrollTop;
		if(sT+cH>T4){
			project.photoRing();
		}
		if(sT>1000){
			oToTop.style.display='block';
		}else{
			oToTop.style.display='none';
		}
	};
	oToTop.onclick=function(){
		var start=document.documentElement.scrollTop||document.body.scrollTop;
		var target=0;
		var dis=target-start;
		var count=Math.round(3000/30);
		var n=0;
		clearInterval(oToTop.timer);
		oToTop.timer=setInterval(function(){
			bSys=false;
			n++;
			var a=n/count;
			var cur=start+dis*Math.pow(a,3);
			document.documentElement.scrollTop=document.body.scrollTop=cur;
			if(n==count){
				clearInterval(oToTop.timer);
			}	
		},30);	
	};
	/*酷炫导航*/	
	var oNav=document.getElementById('nav');
	var aMod=getByClass(oNav,'mod1');
	var arr=[T1,T2,T3,T4,T5,T6,T7,T8];
	for(var i=0;i<aMod.length;i++){
		(function(index){
			aMod[index].onclick=function(){
				scrollMove(aMod[index],arr[index],500*(index+1));
			};
		})(i);
	}
	project.nav=function(){
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
	/*酷炫菜单*/
	project.menu=function(){
		var oMen=document.getElementById('menu');
		var aLi=oMen.children;
		var oBar=document.getElementById('menu_bar');
		var iNow=0;
		var w=aLi[0].offsetWidth;
		for(var i=0;i<aLi.length-1;i++){
			aLi[i].index=i;
			aLi[i].onmouseover=function(){
				doMove(oBar,this.offsetLeft);
			};
			aLi[i].onmouseout=function(){
				doMove(oBar,iNow*w);
			};
			aLi[i].onclick=function(){
				iNow=this.index;	
			};
		}	
	};
	project.menu();
	/*滚动翻页*/
	project.scrollPage=function(){
		var oS=document.getElementById('scroll_page');
		var aLi=oS.children;
		var oL=document.getElementById('left');
		var oR=document.getElementById('right');
		var arr=[];
		for(var i=0;i<aLi.length;i++){
			arr.push(aLi[i].className);
		}
		var bOk=false;
		function fnScroll(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].style.transition='1s all ease';
				aLi[i].className=arr[i];
			}
			var oCur=getByClass(oS,'cur')[0];	
			function fnTran(){
				oCur.removeEventListener('transitionend',fnTran,false);
				
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.transition='';
				}
				bOk=false;
			}
			oCur.addEventListener('transitionend',fnTran,false);
		}
		oL.onclick=function(){
			if(bOk)return;
			bOk=true;
			arr.unshift(arr.pop());
			fnScroll();
		};	
		oR.onclick=function(){
			if(bOk)return;
			bOk=true;
			arr.push(arr.shift());
			fnScroll();
		};	
	};
	project.scrollPage();
	/*翻墙*/
	project.turnWall=function(){
		var oT=document.getElementById('turn_wall');
		var aLi=oT.children;
		function run(obj){
			obj.onmouseover=function(ev){
				var oEvent=ev||event;
				var oFrom=oEvent.fromElement||oEvent.relatedTaregt;
				if(obj.contains(oFrom))return;
				var sT=document.documentElement.scrollTop||document.body.scrollTop;
				var x=getPos(obj).left+obj.offsetWidth/2-oEvent.clientX;
				var y=getPos(obj).top+obj.offsetHeight/2-oEvent.clientY-sT;
				var c=Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
				var oS=obj.children[0];
				oS.style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
				switch(c){
					case 0:
					oS.style.left='150px';
					oS.style.top=0;
					break;
					case 1:
					oS.style.left=0;
					oS.style.top='150px';
					break;
					case 2:
					oS.style.left='-150px';
					oS.style.top=0;
					break;
					case 3:
					oS.style.left=0;
					oS.style.top='-150px';
					break;
				}
				move(oS,{top:0,left:0});
			};	
			obj.onmouseout=function(ev){
				var oEvent=ev||event;
				var oT=oEvent.toElement||oEvent.relatedTaregt;
				if(obj.contains(oT))return;
				var sT=document.documentElement.scrollTop||document.body.scrollTop;
				var x=getPos(obj).left+obj.offsetWidth/2-oEvent.clientX;
				var y=getPos(obj).top+obj.offsetHeight/2-oEvent.clientY-sT;
				var c=Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
				var oS=obj.children[0];
				oS.style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
				switch(c){
					case 0:
					move(oS,{top:0,left:150});
					break;
					case 1:
					move(oS,{top:-150,left:0});
					break;
					case 2:
					move(oS,{top:0,left:-150});
					break;
					case 3:
					move(oS,{top:-150,left:0});
					break;
				}
			};	
		}
		for(var i=0;i<aLi.length;i++){
			run(aLi[i]);
		}
	};
	project.turnWall(); 
});