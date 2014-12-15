// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {		
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {		
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {		
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {		
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

(function ($) {
	$.fn.kwicks = function (n) {
		var p = {
			isVertical : false,
			sticky : false,
			defaultKwick : 0,
			event : 'mouseover',
			spacing : 0,
			duration : 500
		};
		var o = $.extend(p, n);
		var q = (o.isVertical ? 'height' : 'width');
		var r = (o.isVertical ? 'top' : 'left');
		return this.each(function () {
			container = $(this);
			var k = container.children('li');
			var l = k.eq(0).css(q).replace(/px/, '');
			if (!o.max) {
				o.max = (l * k.size()) - (o.min * (k.size() - 1))
			} else {
				o.min = ((l * k.size()) - o.max) / (k.size() - 1)
			}
			if (o.isVertical) {
				container.css({
					width : k.eq(0).css('width'),
					height : (l * k.size()) + (o.spacing * (k.size() - 1)) + 'px'
				})
			} else {
				container.css({
					width : (l * k.size()) + (o.spacing * (k.size() - 1)) + 'px',
					height : k.eq(0).css('height')
				})
			}
			var m = [];
			for (i = 0; i < k.size(); i++) {
				m[i] = [];
				for (j = 1; j < k.size() - 1; j++) {
					if (i == j) {
						m[i][j] = o.isVertical ? j * o.min + (j * o.spacing) : j * o.min + (j * o.spacing)
					} else {
						m[i][j] = (j <= i ? (j * o.min) : (j - 1) * o.min + o.max) + (j * o.spacing)
					}
				}
			}
			k.each(function (i) {
				var h = $(this);
				if (i === 0) {
					h.css(r, '0px')
				} else if (i == k.size() - 1) {
					h.css(o.isVertical ? 'bottom' : 'right', '0px')
				} else {
					if (o.sticky) {
						h.css(r, m[o.defaultKwick][i])
					} else {
						h.css(r, (i * l) + (i * o.spacing))
					}
				}
				if (o.sticky) {
					if (o.defaultKwick == i) {
						h.css(q, o.max + 'px');
						h.addClass('active')
					} else {
						h.css(q, o.min + 'px')
					}
				}
				h.css({
					margin : 0,
					position : 'absolute'
				});
				h.bind(o.event, function () {
					var c = [];
					var d = [];
					k.stop().removeClass('active');
					for (j = 0; j < k.size(); j++) {
						c[j] = k.eq(j).css(q).replace(/px/, '');
						d[j] = k.eq(j).css(r).replace(/px/, '')
					}
					var e = {};
					e[q] = o.max;
					var f = o.max - c[i];
					var g = c[i] / f;
					h.addClass('active').animate(e, {
						step : function (a) {							
							var b = f != 0 ? a / f - g : 1;
							k.each(function (j) {
								if (j != i) {
									//小于1置0
									var point = c[j] - ((c[j] - o.min) * b);
									if(point < 1) {
										point = 0;
									}
									k.eq(j).css(q, point + 'px')
								}
								if (j > 0 && j < k.size() - 1) {
									k.eq(j).css(r, d[j] - ((d[j] - m[i][j]) * b) + 'px');
								}
							})							
						},
						duration : o.duration,
						easing : o.easing
					});					
				})
			});
			if (!o.sticky) {
				container.bind("mouseleave", function () {
					var c = [];
					var d = [];
					k.removeClass('active').stop();
					for (i = 0; i < k.size(); i++) {
						c[i] = k.eq(i).css(q).replace(/px/, '');
						d[i] = k.eq(i).css(r).replace(/px/, '')
					}
					var e = {};
					e[q] = l;
					var f = l - c[0];
					k.eq(0).animate(e, {
						step : function (a) {
							var b = f != 0 ? (a - c[0]) / f : 1;
							for (i = 1; i < k.size(); i++) {
								k.eq(i).css(q, c[i] - ((c[i] - l) * b) + 'px');
								if (i < k.size() - 1) {
									k.eq(i).css(r, d[i] - ((d[i] - ((i * l) + (i * o.spacing))) * b) + 'px')
								}
							}
						},
						duration : o.duration,
						easing : o.easing
					})
				})
			}
		})
	}
})(jQuery);
//假数据
/*
var data = [	
	//推荐
	{
		name : "推荐",
		data : [
			{id:"a123",href:"http://www.baifendian11.com",img:"photos/6.png",pics:[
				{id:123,href:"http://www.baifendian22.com",img:"photos/1.png"},
				{id:123,href:"http://www.baifendian33.com",img:"photos/2.png"},
				{id:123,href:"http://www.baifendian44.com",img:"photos/3.png"},
				{id:123,href:"http://www.baifendian55.com",img:"photos/4.png"},
				{id:123,href:"http://www.baifendian66.com",img:"photos/5.png"}
			]},
			{id:"b123",href:"http://www.baifendian1.com",img:"photos/6.jpg",pics:[
				{id:123,href:"http://www.baifendian2.com",img:"photos/1.png"},
				{id:123,href:"http://www.baifendian3.com",img:"photos/2.png"},
				{id:123,href:"http://www.baifendian4.com",img:"photos/3.png"},
				{id:123,href:"http://www.baifendian5.com",img:"photos/4.png"},
				{id:123,href:"http://www.baifendian6.com",img:"photos/5.png"}
			]},
			{id:"a123",href:"http://www.baifendian11.com",img:"http://g.search2.alicdn.com/img/bao/uploaded/i4/i3/T1MV6RXi0lXXXl0XfX_083742.jpg_210x210.jpg",pics:[
				{id:123,href:"http://www.baifendian22.com",img:"http://g.search2.alicdn.com/img/bao/uploaded/i4/i3/T1MV6RXi0lXXXl0XfX_083742.jpg_210x210.jpg"},
				{id:123,href:"http://www.baifendian33.com",img:"http://g.search2.alicdn.com/img/bao/uploaded/i4/i3/T1MV6RXi0lXXXl0XfX_083742.jpg_210x210.jpg"},
				{id:123,href:"http://www.baifendian44.com",img:"http://g.search2.alicdn.com/img/bao/uploaded/i4/i3/T1MV6RXi0lXXXl0XfX_083742.jpg_210x210.jpg"},
				{id:123,href:"http://www.baifendian55.com",img:"http://g.search2.alicdn.com/img/bao/uploaded/i4/i3/T1MV6RXi0lXXXl0XfX_083742.jpg_210x210.jpg"},
				{id:123,href:"http://www.baifendian66.com",img:"http://g.search2.alicdn.com/img/bao/uploaded/i4/i3/T1MV6RXi0lXXXl0XfX_083742.jpg_210x210.jpg"}
			]},
			{id:"b123",href:"http://www.baifendian1.com",img:"photos/6.jpg",pics:[
				{id:123,href:"http://www.baifendian2.com",img:"photos/1.png"},
				{id:123,href:"http://www.baifendian3.com",img:"photos/2.png"},
				{id:123,href:"http://www.baifendian4.com",img:"photos/3.png"},
				{id:123,href:"http://www.baifendian5.com",img:"photos/4.png"},
				{id:123,href:"http://www.baifendian6.com",img:"photos/5.png"}
			]}
		]
	},
	//日韩
	{
		name : "日韩",
		data : [
			{id:"a123",href:"http://www.baifendian.com",img:"photos/5.png",pics:[
				{id:123,href:"http://www.baifendian.com",img:"photos/6.png"},
				{id:123,href:"http://www.baifendian.com",img:"photos/4.png"},
				{id:123,href:"http://www.baifendian.com",img:"photos/3.png"},
				
			]},
			{id:"b123",href:"http://www.baifendian.com",img:"photos/4.png",pics:[
				{id:123,href:"http://www.baifendian.com",img:"photos/1.png"},
				{id:123,href:"http://www.baifendian.com",img:"photos/2.png"},
				{id:123,href:"http://www.baifendian.com",img:"photos/3.png"},
				{id:123,href:"http://www.baifendian.com",img:"photos/4.png"},
				{id:123,href:"http://www.baifendian.com",img:"photos/5.png"}
			]}
		]
	}
]
*/
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg);  
	if (r!=null) {
		return unescape(r[2]);
	}else{
		return null; 
	}
} 
Bfd = {}
Bfd.Pic = function(){

}
Bfd.Pic.prototype = {
	width : 100,
	$ : function(id){
		return document.getElementById(id);
	},
	//数据加载
	init : function() {
		// var url = "http://localhost:8080/start.jsp?callback=Bfd.Pic.prototype.loadData"
		// jsonp(url);
		// this.loadData();
		var self = this
		$.ajax({
	    	type: "GET",
	    	cache: false,
	    	dataType:'jsonp',
	        url: "http://192.168.32.193:5080/suit-rec/show/rec?callback=?",
			data: {item_id:getUrlParam('id')}
	    }).done(function(data1){
	    	if(data1['code']===0){
	    		var data=data1['data']
	    		$.each(data,function(i,item){
                    item.name=item.tabName
                    item.data=item.showList
                    $.each(item.data,function(i,item){
                         item.pics=item.items
                         item.img=item.pintuUrl
                         item.href="javascript:void(0)"
                         $.each(item.pics,function(i,item){
                              item.href=item.url
                              item.img=item.localImageAddressList[0]
                         })
                    })
	    		})
	    		//console.log(data);
	    	    self.loadData(data)
	    	}
	    })
	},
	loadData : function(result) {
	    this.data = result//result;假数据
		var tag1 = result[0];
		for(var i=0; i<tag1.data.length; i++) {
			var li = this.$("bfd_pic_main"+(i+1));
			li.style.display = "block";
			var a = li.getElementsByTagName("a")[0];
			a.href = tag1.data[i].href;
			var img = a.getElementsByTagName("img")[0];
			img.src = tag1.data[i].img;
			this.setTags();
			var picDiv = this.$("bfd_pic_main"+(i+1)+"_pics");
			this.setPics(picDiv, tag1.data[i].pics);			
		};	
	},
	setTags :function() {
		var tagsDiv = this.$("bfd_tags");
		tagsDiv.innerHTML = "";
		for(var i=this.data.length-1; i>=0; i--) {
			var a = document.createElement("a");
			a.href = "javascript:void(0)";
			a.num = i;
			a.innerHTML = this.data[i].name;
			a.onclick = function(e){
				e = e || window.event;
				var target = e.srcElement ? e.srcElement : e.target;
				Bfd.Pic.prototype.tagClickEvent.call(Bfd.Pic.prototype,target);
			}
			tagsDiv.appendChild(a);
			// //默认第一个页签颜色
		    if(i==0){
		    	$(a).css('color','red')
		    } 
		}
	},
	setPics : function(el, pics) {
		el.innerHTML = "";
		for(var i=0; i< pics.length; i++) {
			var a = document.createElement("a");
			a.href = pics[i].href;
			a.taget = "_blank";
			var img = document.createElement("img");
			img.src = pics[i].img;
			img.style.width = this.width +"px";
			img.style.height = this.width +"px";
			el.appendChild(a);
			a.appendChild(img);
		}
	},
	tagClickEvent : function(el) {
		var tag = this.data[el.num];//大类别
		for(var i=0; i<tag.data.length; i++) {
			var index = i+1;//数据索引
			var li = this.$("bfd_pic_main"+index);
			li.style.display = "block";
			var a = li.getElementsByTagName("a")[0];
			a.href = tag.data[i].href;
			var img = a.getElementsByTagName("img")[0];
			img.src = tag.data[i].img;
			
			
			var picDiv = this.$("bfd_pic_main"+index+"_pics");
			this.setPics(picDiv, tag.data[i].pics);	
            
            //切换页签颜色
			$(el).css('color','red').siblings().css('color','#333333')
		}
	}
}
$(function() {

	var box = document.getElementById("bfd_box");
	//var width = getRealStyle(box, "width");
	var width=$(box).width().toString()
	var maxW = 730;
	width = width.replace(/\D*/g, '');
	if (!isNaN(width)) {
		var one = Math.floor((width) / 6) - 10;//li宽度
		Bfd.Pic.prototype.width = one - 10;//图片宽度
		var lis = box.getElementsByTagName("li");
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.width = one + "px";
			lis[i].style.height = one + "px";
		}
		var imgs = box.getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.width = one - 10 + "px";
			imgs[i].style.height = one - 10 + "px";
		}
		maxW = one * 6 + 10;
	}
	//等比例缩放
	$('.kwicks').kwicks({
		max : maxW, //控制.extension区块的宽度
		spacing : 10 //控制图片之间的距离
	});
	// $('#bfd_tags').css('margin-right',$('.mainbox').width()-$('.mainbox >ul').width()+'px')
	$('.title').width($('.mainbox >ul').width())
	Bfd.Pic.prototype.init();
	// console.log($('.mainbox').width()-$('.mainbox >ul').width()+'px');
});



