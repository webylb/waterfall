/*加载数据时会将整个页面重新排列，用户体验差*/
window.onload = function(){
		//瀑布流
		waterfall("box");


		//需要加载更多的数据
		var json = {"data":[{"src":"1.jpg"},{"src":"0.jpg"},{"src":"3.jpg"},{"src":"2.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]}
		//是否加载更多
		window.onscroll= function(){
			if(loadMore()){
				获取数据，遍历。添加到页面
				var main = document.getElementById("main");
				var length = json.data.length;
				for(var i=0;i<length;i++){
					var img = document.createElement("img"); 
					img.src = "./images/"+json.data[i].src;
					var pic = document.createElement("div"); 
					pic.className = "pic";
					var box = document.createElement("div");
					box.className = "box";
					pic.appendChild(img);
					box.appendChild(pic);
					main.appendChild(box);
				}
				//重新瀑布流
				waterfall("box");
			}
		}
	}

	function waterfall(cls){
		//获取每个条目
		var main = document.getElementById("main");
		var boxs = main.getElementsByClassName(cls);
		//计算页面现实的列数
		var boxw = boxs[0].offsetWidth;
		var clos = Math.floor(document.documentElement.clientWidth/boxw);

		//设置main的宽度并居中
		main.style.cssText = "width:"+clos*boxw+"px;margin:0 auto;";

		//将第一行元素高度存放于数组中
		//获取最小高度，将第二航元素放置于此元素下
		var hArr = [];
		for(var i=0;i<boxs.length;i++){
            // var height = boxs[i].offsetHeight;
			if(i<clos){
				hArr.push(boxs[i].offsetHeight);
			}else{
				var minH = Math.min.apply(null,hArr);
				//遍历数组获取最小值索引，根据索引获取最小高度元素,将原来索引中的值更新为现有值加上第
				var index = hArr.indexOf(minH);
				var left = boxs[index].offsetLeft;
				var height = boxs[i].offsetHeight;  //此时的height应该是跟在hArr中最小高度元素下面的元素的高度即索引为i，如果是索引是index，则获取的是第一行节点中的一个。加上的每列高度都是第一行元素高度的整数倍
				boxs[i].style.cssText="position:absolute;top:"+minH+"px;left:"+left+"px;";
				//更新列高
				hArr[index]+=height;
			}
		}

	}

	//加载更多，当最后一个box距离页面顶部大于窗口可见高度与页面被卷高度之和时，可以加载更多
	function loadMore(){
		var main = document.getElementById("main");
		var boxs = main.getElementsByClassName("box"),length = boxs.length;
		//获取最后一个包含box的div
		var lastBox = boxs[length-1];
		var lastOffsetTop = lastBox.offsetTop+lastBox.offsetHeight-3;//最后一个box距离顶部高度
		var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;//页面被滚去的高度
		var height = (document.body.clientHeight||document.documentElement.clientHeight) + scrollTop; //可见高度与页面被卷去的长度
		// console.log("scrolltop:"+scrollTop+"---height:"+height);
		// console.log(scrollTop);
		return (lastOffsetTop<height)?true:false;
	}