$(function(){
	waterfall();
	//需要加载更多的数据
	var json = {"data":[{"src":"1.jpg"},{"src":"0.jpg"},{"src":"3.jpg"},{"src":"2.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]}
	$(window).on("scroll",function(){
		if (loadmore()) {
			//遍历传过来的数据
			$(json.data).each(function(index,value){
				//创建节点
				// $("<div class='box'><div class='pic'><img src='images/"+value.src+"'></div></div>").appendTo("#main");
				var $img = $("<img>").attr("src",'./images/'+value.src);
				var $pic = $("<div>").addClass("pic").append($img);
				var $box = $("<div>").addClass("box").append($pic);

				$("#main").append($box);
			});

			//重新洗牌,应该只排列json的数据
			setTimeout(waterfall,300);
		}
	
	});
});

var num = 0, hArr=[];
function waterfall(){
	//获取盒子的宽度，求得整个页面可以容纳多少列,设置外包裹的宽度并居中
	var $boxs = $("#main>.box");
	console.log($boxs.length);
	var w = $boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/w);
	$("#main").width(cols*w).css("margin","0 auto");

	//将第一行元素的高存入数组;获取数组中最小值与索引，在其后面添加下一个元素,然后加上这个元素的高在索引所在数组中
	var i,minH,minIndex;
	for(i=num;i<$boxs.length;i++){
		if(i<cols){
			hArr.push($boxs.eq(i).outerHeight());
		}else{
			minH = Math.min.apply(null,hArr);
			minIndex = $.inArray(minH,hArr);
			$boxs.eq(i).css({
				"position":"absolute",
				"top":minH+"px",
				"left":w*minIndex+"px"
			});
			//将元素的高添加到hArr中
			hArr[minIndex]+=$boxs.eq(i).outerHeight();
		}

	}
	num = $boxs.length;
}


// 判断是否加载更多，当页面最后一个盒子距离顶部的高度小于页面卷去的高度与页面可见高度之和,需要加载更多
function loadmore(){
	//获取最后一个盒子
	var $lastBox = $("#main>.box:last");
	var offsetTop = $lastBox.offset().top+$lastBox.outerHeight()-1;
	var scrollTop = $(document).scrollTop()+$(window).height();
	// console.log(scrollTop+"------"+offsetTop);
	return scrollTop>offsetTop?true:false;
}