jQuery.fn.bfd_kw=function(options){
    var defaults={
        listFirst:true
    }
    var setting=$.extend({},defaults,options)

    var container=$(this)
    //
    var dataHost='http://match.baifendian.com/rec/show/rec'
    var staticHost=''
    var bfd_box,tagsout,outbox,outbox_items,random=''//Math.random().toString(36).substring(2)
    function createDom(){

       bfd_box=document.createElement('div')
       bfd_box.className='box'+random

       tagsout=document.createElement('span')
       tagsout.className='title'

       // var tagtit=document.createElement('p')
       // tagtit.className='tit'
       // tagtit.innerHTML='推荐搭配'

       // bfd_tags=document.createElement('p')
       // bfd_tags.className='lin'

       // tagsout.appendChild(tagtit)
       // tagsout.appendChild(bfd_tags)

       outbox=document.createElement('div')
       outbox.className='outbox'

       outbox_items=document.createElement('div')
       outbox_items.className='items'

       outbox.appendChild(outbox_items)
       
       bfd_box.appendChild(tagsout)
       bfd_box.appendChild(outbox)
       
       $(bfd_box).appendTo(container)
       //setting.container.appendChild(bfd_box)
       
    }
     
    var spacing=10
    var listCount = parseInt(setting.listCount||6)
    var width = $('body').width()
    var li_w=Math.floor((width - (listCount-1)*spacing) / listCount)
    var li_c_w=Math.floor(li_w-(21/(listCount-1)))
    

    var styleString='.box'+random+' .kwicks li a{width:'+li_w+'px;height:'+(li_w)+'px;} \n'
    styleString+='.box'+random+' .kwicks li a .imgborder{width:'+Math.floor(li_w*0.94)+'px;height:'+Math.floor(li_w*0.94)+'px} \n'

    styleString+='.box'+random+' .kwicks li .extension a{width:'+Math.floor(li_c_w)+'px;height:'+Math.floor(li_c_w)+'px}'
    styleString+='.box'+random+' .kwicks li .extension a .imgborder{width:'+Math.floor(li_c_w*0.94)+'px;height:'+Math.floor(li_c_w*0.94)+'px}'
    //styleString+='.box'+random+' .kwicks li a .imgborder{width:'+li_w+'px;height:'+li_w+'px}'
    //styleString+='.box'+random+' .kwicks li img{width:'+(li_w-10)+'px;height:'+(li_w-10)+'px}\n'
    styleString+='.box'+random+' .outbox,.box'+random+' .outbox .scrollItem{height:'+(li_w)+'px;width:'+width+'px}\n'
    
    styleString+='.box'+random+' .outbox{position: relative;overflow: hidden;}\n'
    styleString+='.box'+random+' .outbox .items{position: absolute;height:20000em;}\n'


    //styleString+='.box'+random+' .imgborder{width:'+(li_w-10)+'px;height:'+(li_w-10)+'px;}\n'
    
    styleString+='.box'+random+' .imgbottomsqure{width:'+li_w+'px;}\n'
    styleString+='.box'+random+' .extension .imgbottomsqure{width:'+li_c_w+'px;}\n'

    if(setting.bgc){
        styleString+='.box'+random+'{background-color:#'+setting.bgc+'}'
    }
    $('<style type="text/css">'+styleString+'</style>').appendTo('head')



    var KwLine=function(data,viewOption){
        var viewDefaults={
            isFixCombo:true,
            isFixChild:false
        }
        var viewSetting=$.extend({},viewDefaults,viewOption)
  
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
                
                $('<a href="javascript:void(0)" class="arrow"><div></div></a>').appendTo(listContainer)
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
            if(viewSetting.isFixCombo && data.showList.length<listCount ){
                (function(){
                    var l=listCount-data.showList.length
                    for(var i=0;i<l;i++){
                        //$('<li><a href="javascript:void(0)" style="cursor: default;"><div class="imgborder"><img src="./images/blank.png" ></div><div class="imgbottomsqure"></div></a></li>').data('i_kwicks',true).appendTo(self.dom)
                     $('<li></li>').data('i_kwicks',true).appendTo(self.dom)
                    }
                })();
                
            }
        }


        self.init = function(){
            self.buildDom()
   //          self.dom.kwicks({
            //  maxSize: width,
            //  behavior: 'menu',
            //  spacing:spacing
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
                        url: (setting.dataUrl||dataHost)+'?callback=?',
                        data: {item_id:setting.productId,n:5,c:1}
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
            
            var tagContainerDom=$(tagsout) 
            
            var currentKwIndex=0


            $.each(data,function(i,item){
                if(setting.listFirst&&i==0){
                  var kw=new KwLine(item,{isFixCombo:false})    
                }else{
                  var kw=new KwLine(item)    
                }
                
                
                var tagDom=$('<span><a href="javascript:void(0)">'+item.tabName+'</a></span>')
                if(i==0){
                    tagDom.addClass('first')
                    tagDom.addClass('current')
                }
                if(i===data.length-1){
                    tagDom.addClass('last')
                }

                tagDom.appendTo(tagContainerDom)

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
            if(setting.listFirst){
                kws[0].loadChildImgs(0)
            }
            

            $('.kwicks a').hover(function(){
               var self = $(this)
               self.data('status','in')
               setTimeout(function(){
                 if(self.data('status')==='in'){
                    self.find('.imgbottomsqure').animate({height:'50px'},300)
                  }
               },150)
            },function(){
               var self = $(this)
               self.data('status','out')
               setTimeout(function(){
                 if(self.data('status')==='out'){
                    self.find('.imgbottomsqure').animate({height:'0px'},200)
                  }
               },150)
            })
            $(outbox).scrollable({vertical:true})
            var scrollApi = $(outbox).data("scrollable")
            scrollApi.onSeek(function(event){
               currentKwIndex=scrollApi.getIndex()
               kws[currentKwIndex].loadImgs()
            })
            tagContainerDom.find('a').click(function(){
                if(!$(this).parent().hasClass('current')){
                    tagContainerDom.find('span').removeClass('current')
                    $(this).parent().addClass('current')
                    scrollApi.seekTo($(this).parent().index())
                }
            })
        }
    })
    
}