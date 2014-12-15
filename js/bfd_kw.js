function bfd_kw(options) {

  var dataHost='http://192.168.3.130:6080/suit-rec/show/rec'
  var staticHost=''

  var bfd_box,bfd_tags,outbox,outbox_items,random=Math.random().toString(36).substring(2)
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

    options.container.appendChild(bfd_box)
       
  }
  

  function prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  }
  var spacing = 10
  var listCount = options.listCount||6
  var width = document.body.offsetWidth
  var li_w = Math.floor((width - (listCount-1)*spacing) / listCount)
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

  if (options) {
    styleString += 'body{background-color:#' + options + '}'
  }

  // $('<style type="text/css">'+styleString+'</style>').appendTo('head')
  (function() {
    var head = document.getElementsByTagName('head')[0],
      style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = styleString;
    } else {
      style.appendChild(document.createTextNode(styleString));
    }
    head.appendChild(style)
  })();



  var KwLine = function(data) {
    var self = this

    self._isImgLoad = false
    self._loadimages = []

    //加载列表的图片
    self.loadImgs = function() {
      if (!self._isImgLoad) {
        for(var i=0;i<self._loadimages.length;i++){
          self._loadimages[i]()
        }
        // $.each(self._loadimages, function(i, item) {
        //   item()
        // })
        self._isImgLoad = true
      }
    }

    //加载展开后的图片
    self._loadChildImages = []
    self._isChildImgLoad = []
    self.loadChildImgs = function(i) {
      if (!self._isChildImgLoad[i]) {
        for (var x = 0; x < self._loadChildImages[i].length; x++) {
          self._loadChildImages[i][x] && self._loadChildImages[i][x]()
        }
        self._isChildImgLoad[i] = true
      }
    }



    self.buildDom = function() {
      // self.dom = $('<ul class="kwicks"></ul>')
      self.dom = document.createElement('ul')
      self.dom.className = 'kwicks'
      // console.log(data);
      // $.each(data.showList,function(j,item){
      for (var j = 0; j < Math.min(listCount,data.showList.length); j++) {
        var item = data.showList[j]
        // console.log(item);
        self._loadChildImages.push([])

        var isRec = item.isRec
        var li = document.createElement('li')
        li.innerHTML = '<a href="javascript:void(0)">' +
          '<div class="imgborder"><img/></div>' +
          '<div class="imgbottomsqure"></div>' +
          '</a>' +
          '<div class="extension">' +
          '<dl>' +
          '<dd style="overflow:hidden">' +
          '<div>' +
          '</div>' +
          '</dd>' +
          '</dl>' +
          '</div>';
         li.getElementsByTagName('img')[0]['data-src']= item.pintuUrl

        if (j == 0) {
          addClass(li, 'kwicks-first-child')
        }

        (function(dom) {
          appendEvent(dom, 'click', function() {
              for (var i = 0; i < Math.min(listCount-1,item.items.length); i++) {
                window.open(item.items[i]['url'])
              }
          })
          if (isRec){
            var img = document.createElement('img')
            img.src = './images/rec.png'
            img.className = 'rec'
            dom.appendChild(img)
            // dom.append('<img src="./images/rec.png" class="rec">')
          }
          addClass(dom, item['colorCat'] || 'theme-default')
        })(li.children[0]);



        self._loadimages.push((function(dom) {
          return function() {
            dom.src = dom['data-src']
            appendEvent(dom, 'error', function() {
              dom.src = './images/blank.png'
            })
          }
        })(li.getElementsByTagName('img')[0]));


        var listContainer = li.children[1].getElementsByTagName('div')[0]

        var _lastIndex = listCount-2
        
        for (var x = 0; x < Math.min(listCount-1,item.items.length); x++) {
          (function(i, item) {
            var a = document.createElement('a')
            a.href = item.url
            a.target = "_blank"
            a.innerHTML = '<div class="imgborder"><img/></div>' +
              '<div class="imgbottomsqure"></div>'
            
            a.getElementsByTagName('img')[0]['data-src']= item.localImageAddressList[0]
            
            if (i === _lastIndex) {
              addClass(a, 'last')
            }


            addClass(a, item['colorCat'] || 'theme-default')

            if (isRec) {
              var img = document.createElement('img')
              img.src = './images/rec.png'
              img.className = 'rec'
              a.appendChild(img)
            }
            
            self._loadChildImages[j].push((function(dom) {
              return function() {
                dom.src = dom['data-src']
                appendEvent(dom, 'error', function() {
                  dom.src = './images/blank.png'
                })
              }
            })(a.getElementsByTagName('img')[0]));

            listContainer.appendChild(a)
          })(x, item.items[x]);
        }
        self.dom.appendChild(li)
      }

      if (data.showList.length < listCount) {
        (function() {
          var l = listCount - data.showList.length
          for (var i = 0; i < l; i++) {
            var li = document.createElement('li')
            li.innerHTML = '<a href="javascript:void(0)" style="cursor: default;"><div class="imgborder"><img src="./images/blank.png" ></div><div class="imgbottomsqure"></div></a>'
            li.i_kwicks = true
            self.dom.appendChild(li)
          }
        })();

      }
    }


    self.init = function() {
      self.buildDom()
      //          self.dom.kwicks({
      //  maxSize: width,
      //  behavior: 'menu',
      //  spacing:spacing
      // });
    }
    self.init()
  }

  var kws = []

  function getData() {
      if (typeof bfd_kw_testData == "undefined") {
          var jsonpurl = dataHost+'?item_id=' + options.productId + '&callback=?'
          return jsonp(jsonpurl)
      }else{
        return {
                    done:function(fun){
                        fun(bfd_kw_testData)
                    }
                }      
      }
  }

  getData().done(function(data1) {
    if (data1['code'] === 0) {
      createDom()
      var data = data1['data']

      // var tagContainerDom = $('#bfd_tags')
      var tagContainerDom = bfd_tags

      var currentKwIndex = 0

      for(var i=0;i<data.length;i++){
        (function(i,item){
          var kw = new KwLine(item)
          // var tagDom = $('<a href="javascript:void(0)">' + item.tabName + '</a>')
          var tagDom=document.createElement('a')
          // tagDom.href='javascript:void(0)'
          tagDom.innerHTML=item.tabName
          if (i == 0) {
            addClass(tagDom,'current')
          }

          prependChild(tagContainerDom,tagDom)
          
          var itemsDom=outbox_items
          var scrollItem=document.createElement('div')
          scrollItem.className='scrollItem'
          scrollItem.appendChild(kw.dom)
          itemsDom.appendChild(scrollItem)
          // $('<div class="scrollItem"/>').append(kw.dom).appendTo('#items')
          if (i == 0) {
            kw.loadImgs();
          }
          kws.push(kw)
        })(i,data[i]);
      }
      var kwicksDoms=outbox_items.getElementsByTagName('ul')//document.getElementsByClassName('kwicks')
      for(var i=0;i<kwicksDoms.length;i++){
        (function(i,kDom){
            kwicks({
                container: kDom,
                maxSize: width,
                behavior: 'menu',
                spacing: spacing,
                ignoreClick: true,
                onExpand: function(expendObj, dom) {
                  kws[currentKwIndex].loadChildImgs(getDomIndex(dom))

                  // kws[currentKwIndex].loadChildImgs(i)
                }
            })
        })(i,kwicksDoms[i]);
      }
      var scrollApi = scrollable({
        vertical: true,
        container: outbox
      })
      // var scrollApi = $('#outbox').data("scrollable")
      scrollApi.onSeek(function(event) {
        currentKwIndex = scrollApi.getIndex()
        kws[currentKwIndex].loadImgs()
      })
      for(var i=0;i<tagContainerDom.children.length;i++){
        (function(i,dom,length){
            appendEvent(dom,'click',function(){
              if(!hasClass(dom,'current')){
                if(tagContainerDom.getElementsByClassName){
                  removeClass(tagContainerDom.getElementsByClassName('current')[0],'current')
                }else{
                  for(var x=0;x<tagContainerDom.children.length;x++){
                    removeClass(tagContainerDom.children[x],'current')
                  }
                }
                
                addClass(dom,'current')
                scrollApi.seekTo(data.length - i - 1)
              }
            })
            
        })(i,tagContainerDom.children[i],tagContainerDom.children.length);
      }
    }
  })

}