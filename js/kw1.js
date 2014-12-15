window.onload=function() {
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    } else {
      return null;
    }
  }

  function prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  }
  var spacing = 10
  var listCount = parseInt(getUrlParam('listCount')||6)
  var width = document.body.offsetWidth
  var li_w = Math.floor((width - (listCount-1)*spacing) / listCount)
  var styleString = '.kwicks li,.kwicks li a{width:' + li_w + 'px;height:' + (li_w + 14) + 'px} \n'
  //styleString+='.kwicks li a .imgborder{width:'+li_w+'px;height:'+li_w+'px}'
  styleString += '.kwicks li img{width:' + (li_w - 10) + 'px;height:' + (li_w - 10) + 'px}\n'
  styleString += '#outbox,.scrollItem{height:' + (li_w + 14) + 'px;width:' + width + 'px}\n'

  styleString += '.imgborder{width:' + (li_w - 10) + 'px;height:' + (li_w - 10) + 'px;}\n'

  styleString += '.imgbottomsqure{width:' + li_w + 'px;margin-top:' + (li_w + 8) + 'px}\n'

  if (getUrlParam('bgc')) {
    styleString += 'body{background-color:#' + getUrlParam('bgc') + '}'
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

    function getData(mode) {
      if (mode && mode == 'test') {
        var testData = {
          "code": 0,
          "msg": "成功",
          "data": []
        };
        (function() {
          var labels = ['清新', '森系', '田园', '甜美', '通勤', '休闲']
          for (var x = 0; x < labels.length; x++) {
            var d = {
              "tabName": labels[x],
              "showList": []
            }
            for (var i = 1; i < 7; i++) {
              var d1 = {
                "pintuUrl": './photos/totals/' + i + '.png',
                "items": []
              }
              d.showList.push(d1)
              for (var j = 1; j < 6; j++) {
                d1["items"].push({
                  'url': 'http://www.sina.com.cn',
                  'localImageAddressList': ['./photos/' + i + '/' + j + '.png']
                })
              }
            }
            d['showList'].sort(function(a, b) {
              return Math.random() > .5 ? -1 : 1;
            })
            testData['data'].push(d)
          }
        })();
        return {
          done: function(fun) {
            fun(testData)
          }
        }
      } else {
        var jsonpurl = 'http://192.168.3.130:6080/suit-rec/show/rec?item_id=' + (getUrlParam('id') || 'wangfujing_17305246208') + '&callback=?'
        return jsonp(jsonpurl)
      }
    }

  getData().done(function(data1) {
    if (data1['code'] === 0) {
      var data = data1['data']

      // var tagContainerDom = $('#bfd_tags')
      var tagContainerDom = document.getElementById('bfd_tags')

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
          
          var itemsDom=document.getElementById('items')
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
      var kwicksDoms=document.getElementById('items').getElementsByTagName('ul')//document.getElementsByClassName('kwicks')
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
        container: document.getElementById('outbox')
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