;
window.onload = function() {
	var Sele = $$("Sele");
	var select = Sele.children[0];
	var btn = Sele.children[1];
	var imgs = $$("imgs");
	var step = Sele.children[2];

	function $$(idName) {
		return document.getElementById(idName);
	}
	var level=3, list, steps = 0,path;

	function load(level) {

		imgs.innerHTML = (list + "").replace(/(\d+)\D*/g, `<div><img src="${level}/${path}/$1.jpeg" index="$1)"></div>`);
		if(list.length != 0){
			imgs.children[list.indexOf(Math.pow(level, 2))].innerHTML = "";
            imgs.children[list.indexOf(Math.pow(level, 2))].style.backgroundColor="antiquewhite";
		}
			
	}

	function imgsStyle(level) {
		imgs.setAttribute("style", `width:${150*level}px;height:${150*level}px;display:block`);
		
	}

	function getstyle(ele, attr) {
		var res = null;
		if(ele.currentStyle) {
			res = ele.currentStyle[attr];
		} else {
			res = window.getComputedStyle(ele, null)[attr];
		}
		return parseFloat(res);
	}

	function randData(n) {
		var Datas = [];
		var max = Math.pow(n, 2) - 1;
		while(Datas.length < max) {
			var data = Math.floor(Math.random() * max) + 1;
			if(Datas.indexOf(data) == -1) {
				Datas.push(data);
			}
		}
		Datas.push(max + 1);
		return Datas;
	}

	function rightData(level) {
		var str = "";
		for(var i = 1, len = Math.pow(level, 2); i <= len; i++) {
			str += i;
		}
		return str
	}
//		console.log(rightData(3));
	btn.onclick = function() {
		that = this;
		path=Math.floor(Math.random()*level)+1;
		level = parseInt(select.value);
		 
		if(that.innerHTML == "重玩") {
			steps = 0;
			step.innerHTML = steps;
		}
		that.innerHTML = "重玩";
		imgsStyle(level);
		list = randData(level);
		console.log(list);
		
		load(level);
		document.onkeyup = function(e) {
			var evt = e || window.event;
			var c = evt.keyCode;
			//找空白格子
			var nullPos = list.indexOf(Math.pow(level, 2));
			if(c >= 37 && c <= 40) {
				step.innerHTML = ++steps;

			}
			
			//        	console.log(nullPos);
			//左键的键值37  上38   右39    下40
			switch(true) {
				case c == 37:
					var replacePos = nullPos + 1;
					if(nullPos % level == level - 1) return;
					list[nullPos] = list[replacePos];
					list[replacePos] = Math.pow(level, 2);
					load(level);
					break;
				case c == 38:
					var replacePos = nullPos + level;
					if(replacePos > list.length - 1) return;
					list[nullPos] = list[replacePos];
					list[replacePos] = Math.pow(level, 2);
					load(level);
					break;
				case c == 39:
					var replacePos = nullPos - 1;
					if(nullPos % level == 0) return;
					list[nullPos] = list[replacePos];
					list[replacePos] = Math.pow(level, 2);
					load(level);
					break;
				case c == 40:
					var replacePos = nullPos - level;
					if(replacePos < 0) return;
					list[nullPos] = list[replacePos];
					list[replacePos] = Math.pow(level, 2);
					load(level);
					break;
			}
			if(list.join("")==rightData(level)) {
				alert("拼图完成。。。");
				that.innerHTML = "开始游戏";
				steps = 0;
				step.innerHTML = steps;
				list = [];
				load();
				imgs.style.display = "none";
			}
		}

	}

	imgs.onclick = function(e) {
		var evt = e || window.event;
		var target = evt.srcElement || evt.target; //在IE 中srcElement 表示产生事件的源，比如是哪个按钮触发的onclick 事件，火狐中则是target。  
		var clickPos = list.indexOf(parseInt(target.getAttribute("index")));
		var nullPos = list.indexOf(Math.pow(level, 2));
		//空格位置在最左边，点击右边上个方格时，也能交换==》错误
		//空格位置在最右边，点击左边上个方格时，也能交换==》错误
		
		var wro = (nullPos % level == 0 && clickPos % level == level - 1)||(　nullPos % level == level - 1 && clickPos % level == 0);
		if(!wro) {
			if(clickPos == nullPos - level || clickPos == nullPos - 1 || clickPos == nullPos + 1 || clickPos == nullPos + level) {
				list[nullPos] = list[clickPos];
				list[clickPos] = Math.pow(level,2);
				step.innerHTML = ++steps;		      
				load(level); 
				if(list.join("") == rightData(level)) {
				alert("拼图完成。。。");
				that.innerHTML = "开始游戏";
				steps = 0;
				step.innerHTML = steps;
				list = [];
				load();
				imgs.style.display = "none";
			       }
			}
		}

	}

}