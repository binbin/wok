$(function(){
  function getUrlParam(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
      var r = window.location.search.substr(1).match(reg);  
      if (r!=null) {
        return unescape(r[2]);
      }else{
        return null; 
      }
  } 

  var listCount = parseInt(getUrlParam('listCount')||6)

  var ie=!!window.ActiveXObject;
  var ie6=ie&&!window.XMLHttpRequest;

  var styleString = ".box .content-box ul.content li.liborder{width:"
  styleString += 100/listCount
  styleString += '%;}'
  $('<style type="text/css">'+styleString+'</style>').appendTo('head')

	var buildDom=function(data){
       var dom=$('<li class="liborder '+(data['colorCat']||'theme-default')+'">'+
					'<div class="p-content">'+
					'<a class="img-content" target="_blank" href="'+(data['url']||'#')+'">'+
          
          '<div class="imgborder">'+

					'<img src="'+data['localImageAddressList'][0]+'" alt="" />'+
					'<ul class="des">'+
					'<li>'+data['itemName']+'</li>'+
					'<li>￥'+data['price']+'</li>'+
					'</ul>'+

           '</div>'+
           '<div class="imgbottomsqure"></div>'+

					'</a>'+
					'</div>'+
				'</li>')
       var dom1=dom.find('a'),dom2=dom.find('ul')
       dom1.hover(function(){
       	    dom1.data('status','in')
       	    setTimeout(function(){
              if(dom1.data('status')==='in'){
              	 dom2.animate({height:'40px'},400)
              }
       	    },100)
       },function(){
       	    dom1.data('status','out')
       	    setTimeout(function(){
              if(dom1.data('status')==='out'){
              	 dom2.animate({height:'0px'},200)
              }
       	    },100)
       }).find('img').error(function(){
                               $(this).attr('src','./images/blank.png')
                      })
       return dom
	}
	var callback=function(data){
		var ul=$('ul.content')
    $.each(data,function(i,item){
        if(i>=listCount){
          return;
        }
        ul.append(buildDom(item))
    })
    if(ie6){
        
      $('ul.content ul.des').css('opacity',0.5)
      // $('ul.content').find('ul.des').each(function(){
      //   //$(this).width($(this).parent().parent().width())
      // })
    }
	}
    
    function getData(mode){
      if(mode&&mode=='test'){
          var testData={
                        "code": 0,
                        "msg": "成功",
                        "data": []
                    };
          (function(){
            var i=Math.floor(Math.random()*6)+1;
            
            var labels=['2013夏装宽松女雪纺衫',
                        '韩版纯色百搭短袖女t恤上衣',
                        '韩版显瘦修身翻领衬衫',
                        '休闲短裤女夏装宽松',
                        '宽松大码七分裤休闲中裤',
                        '修身中长款花色小衫女']
            testData['data'].push({
              price:100,
              itemName:'组合',
              "localImageAddressList":['./photos/totals/'+i+'.png']
            })
            for(var j=1;j<6;j++){
               testData['data'].push({
                  price:20,
                  itemName:labels[j-1],
                  "localImageAddressList":['./photos/'+i+'/'+j+'.png']
               })
            }
           
          })();          
          return {
                   done:function(fun){
                          fun(testData)
                        }
                }
      }else{
          return $.ajax({
                          type: "GET",
                          cache: false,
                          dataType:'jsonp',
                          url: "http://192.168.3.130:6080/suit-rec/item/rec?callback=?",
                          data: {item_id:getUrlParam('id')||'wangfujing_17305246208'}
                        })
      }
    }
    getData('test').done(function(data1){
      if(data1['code']===0){
          callback(data1['data'])
      }
    })
})