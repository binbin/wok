$(function() {

    function getUrlParam(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
      var r = window.location.search.substr(1).match(reg);  
      if (r!=null) {
        return unescape(r[2]);
      }else{
        return null; 
      }
    } 
	var spacing=10
    var listCount = parseInt(getUrlParam('listCount')||6)
	var width = $('body').width()
    var li_w=Math.floor((width - (listCount-1)*spacing) / listCount)
    var styleString='.kwicks li,.kwicks li a{width:'+li_w+'px;height:'+(li_w+14)+'px} \n'
    //styleString+='.kwicks li a .imgborder{width:'+li_w+'px;height:'+li_w+'px}'
    styleString+='.kwicks li img{width:'+(li_w-10)+'px;height:'+(li_w-10)+'px}\n'
    styleString+='#outbox,.scrollItem{height:'+(li_w+14)+'px;width:'+width+'px}\n'
    
    styleString+='.imgborder{width:'+(li_w-10)+'px;height:'+(li_w-10)+'px;}\n'
    
    styleString+='.imgbottomsqure{width:'+li_w+'px;margin-top:'+(li_w+8)+'px}\n'

    if(getUrlParam('bgc')){
        styleString+='body{background-color:#'+getUrlParam('bgc')+'}'
    }

    $('<style type="text/css">'+styleString+'</style>').appendTo('head')



    var KwLine=function(data){
    	var self = this
        
        self._isImgLoad=false
        self._loadimages=[]
        
        //加载列表的图片
        self.loadImgs=function(){
        	if(!self._isImgLoad){
        		$.each(self._loadimages,function(i,item){
                    item()
        		})
                self._isImgLoad=true
        	}
        }

        //加载展开后的图片
        self._loadChildImages=[]
        self._isChildImgLoad=[]
        self.loadChildImgs=function(i){
           if(!self._isChildImgLoad[i]){
              $.each(self._loadChildImages[i],function(x,item){
                 item()
              })
              self._isChildImgLoad[i]=true
           }
        }



        self.buildDom=function() {
        	self.dom = $('<ul class="kwicks"></ul>')
            // console.log(data);
        	$.each(data.showList,function(j,item){
                // console.log(item);
                if(j>=listCount){
                    return
                }
                self._loadChildImages.push([])

                var isRec=item.isRec

        		var li =  $('<li>'+
							'<a href="javascript:void(0)">'+
                            '<div class="imgborder"><img data-src="'+item.pintuUrl+'" ></div>'+
                            '<div class="imgbottomsqure"></div>'+
                            '</a>'+
							'<div class="extension">'+
							'<dl>'+
							'<dd style="overflow:hidden">'+
							'<div>'+
							'</div>'+
							'</dd>'+
							'</dl>'+
							'</div>'+
							'</li>')
        		if(j==0){
        			li.addClass('kwicks-first-child')
        		}

                (function(dom){
                    dom.click(function(){
                             $.each(item.items,function(i,item){
                                if(i>=listCount-1){
                                    return;
                                }
                                window.open(item.url)
                             })
                    })
                    if(isRec){
                        dom.append('<img src="./images/rec.png" class="rec">')
                    }
                    dom.addClass(item['colorCat']||'theme-default')
                })(li.find('a'));
                
                


        		self._loadimages.push((function(dom){
                   return function(){
                   	  dom.attr('src',dom.data('src')).error(function(){
                               $(this).attr('src','./images/blank.png')
                      })
                   }
        		})(li.find('a > div > img:first')));
        		
        		var listContainer=li.find('div.extension div')
                
        		// var _lastIndex=item.items.length-1
                var _lastIndex=listCount-2
        		$.each(item.items,function(i,item){
                    if(i>=listCount-1){
                       return
                    }
                    var a= $('<a href="'+item.url+'" target="_blank">'+
                        '<div class="imgborder"><img data-src="'+item.localImageAddressList[0]+'"/></div>'+
                        '<div class="imgbottomsqure"></div>'+
                        '</a>')
        		    if(i === _lastIndex){
        		    	a.addClass('last')
        		    }
        		    

                    a.addClass(item['colorCat']||'theme-default')

                    if(isRec){
                        a.append('<img src="./images/rec.png" class="rec">')
                    }

                    self._loadChildImages[j].push((function(dom){
                       return function(){
                          dom.attr('src',dom.data('src')).error(function(){
                               $(this).attr('src','./images/blank.png')
                          })
                       }
                    })(a.find('img:first')));
                    
                    a.appendTo(listContainer)
        		    // self._loadimages
        		})
                li.appendTo(self.dom)
        	})
            if(data.showList.length<listCount){
                (function(){
                    var l=listCount-data.showList.length
                    for(var i=0;i<l;i++){
                        $('<li><a href="javascript:void(0)" style="cursor: default;"><div class="imgborder"><img src="./images/blank.png" ></div><div class="imgbottomsqure"></div></a></li>').data('i_kwicks',true).appendTo(self.dom)
                    }
                })();
                
            }
        }


        self.init = function(){
            self.buildDom()
   //          self.dom.kwicks({
			// 	maxSize: width,
			// 	behavior: 'menu',
			// 	spacing:spacing
			// });
        }
        self.init()
    }
    
    var kws=[]

    function getData(mode){
      if(mode&&mode=='test'){
        var testData={
                        "code": 0,
                        "msg": "成功",
                        "data": []
                    };
        (function(){
            var labels=['清新','森系','田园','甜美','通勤','休闲']
            for (var x=0;x<labels.length;x++){
                var d={
                            "tabName": labels[x],
                            "showList":[]
                    }
                for(var i=1;i<7;i++){
                        var d1={
                                        "pintuUrl":'./photos/totals/'+i+'.png',
                                        "items":[]
                                }
                        d.showList.push(d1)
                        for(var j=1;j<6;j++){
                          d1["items"].push({'url':'#',
                                            'localImageAddressList':['./photos/'+i+'/'+j+'.png']
                                           })
                        }
                }
                d['showList'].sort(function(a,b){ return Math.random()>.5 ? -1 : 1;})
                testData['data'].push(d)
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
                        url: "http://192.168.3.130:6080/suit-rec/show/rec?callback=?",
                        data: {item_id:getUrlParam('id')||'wangfujing_17305246208'}
                })
      }
    }

    getData('test').done(function(data1){
		if(data1['code']===0){
	    	var data=data1['data']
            
            var tagContainerDom=$('#bfd_tags') 
            
            var currentKwIndex=0


	    	$.each(data,function(i,item){
	    		var kw=new KwLine(item)
                
                var tagDom=$('<a href="javascript:void(0)">'+item.tabName+'</a>')
                if(i==0){
                    tagDom.addClass('current')
                }

                tagDom.prependTo(tagContainerDom)

                $('<div class="scrollItem"/>').append(kw.dom).appendTo('#items')
				// kw.dom.appendTo('.mainbox')
				if(i==0){
					kw.loadImgs();
				}
	    		kws.push(kw)
	    	})
	    	$('.kwicks').kwicks({
				maxSize: width,
				behavior: 'menu',
				spacing:spacing,
                ignoreClick:true,
                onExpand:function(expendObj,dom){
                    //加载展开后的图片
                    kws[currentKwIndex].loadChildImgs(dom.index())
                    // console.log(kw.opts);
                }
			});
            $('#outbox').scrollable({vertical:true})
            var scrollApi = $('#outbox').data("scrollable")
            scrollApi.onSeek(function(event){
               currentKwIndex=scrollApi.getIndex()
               kws[currentKwIndex].loadImgs()
            })
            tagContainerDom.find('a').click(function(){
                if(!$(this).hasClass('current')){
                    tagContainerDom.find('a').removeClass('current')
                    $(this).addClass('current')
                    scrollApi.seekTo(data.length-$(this).index()-1)
                }
            })
            // $('body').click(function(){
            //     scrollApi.seekTo(1)
            // })
	    }
	})
	
});