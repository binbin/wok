jQuery.fn.bfd_kw=function(options){
    var container=$(this)
    var dataHost='http://192.168.3.130:6080/suit-rec/show/rec'
    var staticHost=''
    var bfd_box,bfd_tags,outbox,outbox_items,random=''//Math.random().toString(36).substring(2)
    function createDom(){

       bfd_box=document.createElement('div')
       bfd_box.className='box'+random

       var tagsout=document.createElement('span')
       tagsout.className='title'

       var tagtit=document.createElement('p')
       tagtit.className='tit'
       tagtit.innerHTML='推荐搭配'

       bfd_tags=document.createElement('p')
       bfd_tags.className='lin'

       tagsout.appendChild(tagtit)
       tagsout.appendChild(bfd_tags)

       outbox=document.createElement('div')
       outbox.className='outbox'

       outbox_items=document.createElement('div')
       outbox_items.className='items'

       outbox.appendChild(outbox_items)
       
       bfd_box.appendChild(tagsout)
       bfd_box.appendChild(outbox)
       
       $(bfd_box).appendTo(container)
       //options.container.appendChild(bfd_box)
       
    }
     
	var spacing=10
    var listCount = parseInt(options.listCount||6)
	var width = $('body').width()
    var li_w=Math.floor((width - (listCount-1)*spacing) / listCount)
    
    var styleString='.box'+random+'{width:100%;height:200px;margin:0px;padding:0px;font-size: 12px;}'+
                    '.box'+random+' .title{width: 100%;height:30px;line-height:30px;color:#333333;border-bottom:1px #cccccc dashed; display:block;margin-bottom:15px;}'+
                    '.box'+random+' .title .tit{ display:block;width:100px;font-size:14px; float:left;color:#333333;}.box .title .lin{float:right;}'+
                    '.box'+random+' .title .lin a{cursor:pointer; display:block;float:right;margin-left:30px;color:#333333;}'+
                    '.box'+random+' .title .lin .current{color: red;}'+
                    '.box'+random+' ul,li,p,dl,dt,dd,a,img{padding:0px;margin:0px;}'+
                    '.box'+random+' ul,li{list-style:none;}'+
                    '.box'+random+' a:link,a:visited,a:hover{color:#ccc; text-decoration: none;}'+
                    '.box'+random+' .kwicks {'+
                    '   display: block;'+
                    '   list-style-type: none;'+
                    '   list-style: none;'+
                    '   position: relative;'+
                    '   margin: 0;'+
                    '   padding: 0;'+
                    '}'+
                    '.box'+random+' .kwicks.kwicks-processed  li {'+
                    '   margin: 0;'+
                    '   position: absolute;'+
                    '}'+
                    '.box'+random+' .kwicks-horizontal li {'+
                    '   float: left;'+
                    '}'+
                    '.box'+random+' .kwicks-horizontal .kwicks-first-child {'+
                    '   margin-left: 0;'+
                    '}'+
                    '.box'+random+' .kwicks{width:100%;position:relative}'+
                    '.box'+random+' .kwicks li{overflow:hidden;zoom:1;border:none;}'+
                    '.box'+random+' .kwicks li a{float: left;cursor:pointer;}'+
                    '.box'+random+' .kwicks li a .imgborder{padding:5px;background-color:#f2f2f2; text-decoration:none;display: block;/*position:relative;*/}'+
                    '.box'+random+' .kwicks li a img{zoom:1;}'+
                    '.box'+random+' .kwicks li a .imgbottomsqure{height: 6px;margin-top:8px;zoom:1;display: block;}'+
                    '.box'+random+' .kwicks li a img.rec,.kwicks li span img.rec{'+
                    '   position: absolute;'+
                    '   width: 54px;'+
                    '   height: 25px;'+
                    '   left: 10px;'+
                    '   bottom: 10px;'+
                    '   border: none;'+
                    '}'+
                    '.box'+random+' .kwicks li .extension{overflow:hidden;_float:left}'+
                    '.box'+random+' .kwicks li .extension a{margin-right: 10px;float: left;}'+
                    '.box'+random+' .kwicks li .extension a.last{margin-right:0;}'+
                    '.box'+random+' .kwicks li dl{padding:0px 0px 0px 10px;overflow:hidden;margin-left:0px;zoom:1;}'+
                    '.box'+random+' .kwicks li dd{color:#ccc; float:left;}'+
                    '.box'+random+' .imgbottomsqure{background:url("./images/imgbottomsqure.png") repeat scroll 0 0 transparent;}'+
                    '.box'+random+' .theme1 .imgbottomsqure {'+
                    '  background: none;'+
                    '  background-color: yellow;'+
                    '}'+
                    '.box'+random+' .theme2 .imgbottomsqure {'+
                    '  background: none;'+
                    '  background-color: #fff000;'+
                    '}'+
                    '.box'+random+' .theme3 .imgbottomsqure{'+
                    '  background: none;'+
                    '  background-color: #ffa800;'+
                    '}'+
                    '.box'+random+' .theme4 .imgbottomsqure {'+
                    '  background: none;'+
                    '  background-color: #56be60;'+
                    '}'+
                    '.box'+random+' .theme5 .imgbottomsqure {'+
                    '  background: none;'+
                    '  background-color: #49c5ff;'+
                    '}'+
                    '.box'+random+' .theme6 .imgbottomsqure {'+
                    '  background: none;background-color: #735bc3;'+
                    '}'+
                    '.box'+random+' .theme7 .imgbottomsqure {'+
                    '  background: none;'+
                    '  background-color: #4d4d4d;'+
                    '}'

    styleString+='.box'+random+' .kwicks li,.kwicks li a{width:'+li_w+'px;height:'+(li_w+14)+'px} \n'
    //styleString+='.box'+random+' .kwicks li a .imgborder{width:'+li_w+'px;height:'+li_w+'px}'
    styleString+='.box'+random+' .kwicks li img{width:'+(li_w-10)+'px;height:'+(li_w-10)+'px}\n'
    styleString+='.box'+random+' .outbox,.scrollItem{height:'+(li_w+14)+'px;width:'+width+'px}\n'
    
    styleString+='.box'+random+' .outbox{position: relative;overflow: hidden;}\n'
    styleString+='.box'+random+' .outbox .items{position: absolute;height:20000em;}\n'


    styleString+='.box'+random+' .imgborder{width:'+(li_w-10)+'px;height:'+(li_w-10)+'px;}\n'
    
    styleString+='.box'+random+' .imgbottomsqure{width:'+li_w+'px;margin-top:'+(li_w+8)+'px}\n'

    if(options.bgc){
        styleString+='.box'+random+'{background-color:#'+options.bgc+'}'
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

    function getData(){
        if (typeof bfd_kw_testData == "undefined") {
                return $.ajax({
                        type: "GET",
                        cache: false,
                        dataType:'jsonp',
                        url: (options.dataUrl||dataHost)+'?callback=?',
                        data: {item_id:options.productId}
                })
        }else{
           return {
                    done:function(fun){
                          fun(bfd_kw_testData)
                        }  
                   }          
        }
    }

    getData().done(function(data1){
		if(data1['code']===0){
            createDom() 

	    	var data=data1['data']
            
            var tagContainerDom=$(bfd_tags) 
            
            var currentKwIndex=0


	    	$.each(data,function(i,item){
	    		var kw=new KwLine(item)
                
                var tagDom=$('<a href="javascript:void(0)">'+item.tabName+'</a>')
                if(i==0){
                    tagDom.addClass('current')
                }

                tagDom.prependTo(tagContainerDom)

                $('<div class="scrollItem"/>').append(kw.dom).appendTo($(outbox_items))
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
            $(outbox).scrollable({vertical:true})
            var scrollApi = $(outbox).data("scrollable")
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
	    }
	})
	
}