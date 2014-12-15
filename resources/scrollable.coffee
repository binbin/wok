scrollable=(opts)->
  defaults={vertical:false}
  setting={}
  result={}
  (->(setting[x]=item for x,item of defaults);return)()
  (->(setting[x]=item for x,item of opts);return)()
  if setting.vertical
    pDim = 'top'
    pSize = setting.container.offsetHeight
  else
    pDim = 'left'
    pSize = setting.container.offsetWidth
  operateDom = setting.container.children[0]
  animate = new Animate()

  index=0
  currentVal=0
  targetVal=0

  animate.step = (progress)->
    distance = targetVal - currentVal
    operateDom.style[pDim] =  - (currentVal + distance * progress) + 'px'
    return
  animate.complete = ()-> 
    currentVal = targetVal
    # operateDom.style[pDim] =  -currentVal + 'px'
    return
  result.seekTo = (i)->
    animate.stop()
    targetVal = i * pSize
    animate.start()
    index = i
    if setting.onSeek
      setting.onSeek()  
    return
  result.onSeek = (fun)->
    setting.onSeek=fun
    return
  result.getIndex = ()->
    index
  result


window.scrollable = scrollable


