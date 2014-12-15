class Animate
  constructor:(options={})->
    @options = options
    options.duration = options.duration or 300
    self = this
    self.easing =
      swing: (p, n, firstNum, diff) ->
        ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum

      linear: (p, n, firstNum, diff) ->
        firstNum + diff * p
  start : ->
    options=@options
    self=this
    self.startTime = +new Date
    self.interval = setInterval(->
      action = self.step or option.step
      t = +new Date
      n = t - self.startTime
      if n < options.duration
        self.state = n / options.duration
        self.pos = self.easing[options.easing or "swing"](self.state, n, 0, 1, options.duration)
        action self.pos
      else
        clearInterval self.interval 
        # when open new tab the interval will seted to 1000ms in chrome and firefox  
        action 1
        complete = self.complete or options.complete
        complete()  if complete
      return
    , 13)
    return

  stop : ->
    options=@options
    self=this
    clearInterval self.interval if self.interval
    onStop = self.onStop or options.onStop
    onStop() if onStop
    return
isIE = /msie/i.test(navigator.userAgent)
traverseChildren = (elem)->
    pushAll = (elemArray) ->
      q.push item for item in elemArray
    children = [];
    q = [];
    q.push(elem);
    while q.length > 0
      elem = q.pop();
      children.push(elem);
      pushAll(elem.children);
    return children;
mouseoutEvent = (event,dom,callback)->
    elem = event.toElement || event.relatedTarget
    list = traverseChildren(dom)
    if elem in list
      return;
    callback()
    return


appendEvent = (dom, event, fun) ->  
    if isIE
        dom.attachEvent("on" + event, fun)  
    else  
        dom.addEventListener(event, fun, false)
    return

hasClass = (ele,cls)->
  if not ele
    return  
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))
addClass = (ele,cls)->
  if not ele
    return 
  if not hasClass(ele,cls) then ele.className += " "+cls
  return 
removeClass = (ele,cls)->
  if not ele
    return  
  if hasClass(ele,cls)
      reg = new RegExp('(\\s|^)'+cls+'(\\s|$)')
      ele.className=ele.className.replace(reg,' ')
  return
getDomIndex = (e)->
  i=0
  while e.previousSibling
    e=e.previousSibling
    if(e.nodeType is 1)
      i=i+1    
  return i

jsonp = (url)->
  _href = window.location.href
  if _href.indexOf('https://') is 0
    url = url.replace('http://','https://')
  methodName = 'jsonp' + Math.random().toString(36).substring(2)
  data = null
  callbackChain=[]

  window[methodName] = (callbackData)->
    data=callbackData
    for m in callbackChain
      m(data)
    return
  url=url.replace('callback=?','callback='+methodName)  
  script = document.createElement( 'script' )
  script.setAttribute( 'src', url )
  script.setAttribute( 'charset', "utf-8" )
  document.getElementsByTagName( 'head' )[0].appendChild(script)
  return {
    done:(fun)->
      if(data)
        fun(data)
      callbackChain.push(fun)
      return  
  }


window.Animate = Animate
window.isIE = isIE
window.traverseChildren = traverseChildren
window.mouseoutEvent = mouseoutEvent
window.appendEvent = appendEvent
window.hasClass = hasClass
window.addClass = addClass
window.removeClass = removeClass
window.getDomIndex = getDomIndex
window.jsonp = jsonp
