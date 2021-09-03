;
window.onload = function() {
	var g = $$("glass");
	
	load();
	function load(){
		for(var i=1;i<=g.length;i++){
			g[i-1].innerHTML=`<img src="img/k1-${i}.png">`;
		}
	}
	function $$(className) {
		return document.getElementsByClassName(className);
	}
	g[0].onmouseenter = function enter(e){
		    n=0;
		    enterg(n);			
        }
	g[1].onmouseenter = function enter(e){
		    n=1;
		    enterg(n);			
        }
	g[2].onmouseenter = function enter(e){
		    n=2;
		    enterg(n);			
        }
	function enterg(n){
		switch(n){
			case 0:
			    s = "生涯介绍";
			    break;
			case 1:
			    s = "生涯集锦";
			    break;
			case 2:
			    s = "互动游戏";
			    break;    
		}
		    g[n].innerHTML=`<button class="btn" value="${n}"><span>${s}</span></button>`;
//		    var x = $$("btn").getAttribute("value");
//		    console.log(x);
			g[n].style.cssText =`backdrop-filter:blur(0px);background-color:rgba(255, 255, 255, 0.00);`;
			 event.preventDefault();
	}
	g[0].onmouseleave = function leave(){
		n=0;
		leaveg(n);
	}
	g[1].onmouseleave = function leave(){
		n=1;
		leaveg(n);
	}
	g[2].onmouseleave = function leave(){
		n=2;
		leaveg(n);
	}
	function leaveg(n){
		n=n+1;
		g[n-1].innerHTML=`<img src="img/k1-${n}.png">`;
		 event.preventDefault();
	}
}