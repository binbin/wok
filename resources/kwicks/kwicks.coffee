kwicks = (opts) ->
    defaults={
        maxSize: -1,
        minSize: -1,
        spacing: 5,
        duration: 500,
        isVertical: false,
        easing: undefined,
        behavior: null,
        autoResize: true
    }
    setting={}

    result={}
    (->(setting[x]=item for x,item of defaults);return)()
    (->(setting[x]=item for x,item of opts);return)()

    # console.log setting 
    
    if setting.minSize isnt -1 and setting.maxSize isnt -1
    	throw new Error("minSize and maxSize 不能同时设置")
    
    if setting.behavior and setting.behavior isnt 'menu' then throw new Error('目前只有menu一种行为')
       
    ((prop)->
        val = setting[prop]
        switch typeof  val
            when 'number' then setting[prop+'Units']='px'
            when 'string'  
                if val.slice(-1) is '%'
       	            setting[prop+'Units']='%'
       	            setting[prop] = +val.slice(0, -1)
       	        else if val.slice(-2) is 'px'
       	            setting[prop + 'Units'] = 'px'
       	            setting[prop] = +val.slice 0 -2
       	        else
       	            throw new Error('Invalid value for Kwicks option ' + prop + ': ' + val);
       	    else
       	        throw new Error('Invalid value for Kwicks option ' + prop + ': ' + val);
       	return                   
    )(item) for item in ['minSize', 'maxSize']

    


    class Kwick
    	constructor:(@container,@opts)->
          self = this
          orientation =   if opts.isVertical then 'vertical' else 'horizontal';
          @container.className += ' kwicks';
          @container.className += ' kwicks'+ orientation
          @panels=@container.children

          # @selectedIndex=((doms)->
          #        (index for dom,index in doms when dom.hasClass('kwicks-selected'))[0]  
          #   )(@panels)||"none";
          @selectedIndex= (index for _tempdom,index in self.panels when hasClass(_tempdom,'kwicks-selected'))[0]
          @selectedIndex = @selectedIndex||-1

          @expandedIndex = @selectedIndex

          @primaryDimension = if opts.isVertical then 'height' else 'width';
          @secondaryDimension = if opts.isVertical then 'width' else 'height'; 

          @calculatePanelSizes(); 

          @primaryAlignment = if opts.isVertical then 'top' else 'left';
          @secondaryAlignment = if opts.isVertical then 'bottom' else 'right';

          # @$timer = $({ progress : 0 });
          @animate = new Animate({duration:500})

          @offsets = @getOffsetsForExpanded();

          @initStyles();
          @initBehavior();
          @initWindowResizeHandler();
    
    Kwick::calculatePanelSizes = ->
      opts = @opts
      numPanels = @panels.length
      containerSize = @getContainerSize(true)
      sumSpacing = opts.spacing * (numPanels - 1)
      sumPanelSize = containerSize - sumSpacing

      @panelSize = sumPanelSize / numPanels

      if opts.minSize is -1
            if opts.maxSize is -1
            # // if neither minSize or maxSize or set, then we try to pick a sensible default
              if numPanels < 5
                @panelMaxSize = containerSize / 3 * 2;
              else 
                @panelMaxSize = containerSize / 3;
            else if opts.maxSizeUnits is '%'
              @panelMaxSize = sumPanelSize * opts.maxSize;
            # // this.panelMaxSize = opts.maxSize;
            else 
              @panelMaxSize = opts.maxSize;        
          # // at this point we know that this.panelMaxSize is set
            @panelMinSize = (sumPanelSize - @panelMaxSize) / (numPanels - 1);
      else if opts.maxSize is -1
          # // at this point we know that opts.minSize is set
          if opts.minSizeUnits is '%'
            @panelMinSize = sumPanelSize * opts.minSize;
            @panelMinSize=0
          else 
            @panelMinSize = opts.minSize;
          # // at this point we know that this.panelMinSize is set
          @panelMaxSize = sumPanelSize - (@panelMinSize * (numPanels - 1));
      return  
    
    Kwick::getOffsetsForExpanded = ->
      expandedIndex = @expandedIndex
      numPanels = @panels.length
      spacing = @opts.spacing
      size = @panelSize
      minSize = @panelMinSize
      maxSize = @panelMaxSize

      offsets = [0]


      for i in [1...numPanels]  
        # // no panel is expanded
        if expandedIndex is -1
          offsets[i] = i * (size + spacing)
        # // this panel is before or is the expanded panel
        else if i <= expandedIndex
          offsets[i] = i * (minSize + spacing);
        # // this panel is after the expanded panel
        else 
          offsets[i] = maxSize + (minSize * (i - 1)) + (i * spacing);
      return offsets;
    Kwick::setStyle=(el, style)->
      el.style.cssText = style
    Kwick::updatePanelStyles=->
      offsets = @offsets
      panels = @panels
      pDim = @primaryDimension
      pAlign = @primaryAlignment
      sAlign = @secondaryAlignment
      spacing = @opts.spacing
      containerSize = @getContainerSize()
      stylePrefix = if !!this._stylesInited then '' else 'position:absolute;'
      # console.log(offsets)
      # console.log(panels)
      # console.log(pDim)
      # console.log(pAlign)
      # console.log(sAlign)
      # console.log(spacing)
      # console.log(containerSize)
      for j in [panels.length...0]
        i=j-1
        prevOffset = offset
        offset = Math.round(offsets[i])
        if i is  panels.length - 1
          size = containerSize - offset
          if size<0
            size=0
          style = sAlign + ':0;' + pDim + ':' + size + 'px;'
        else
          size = prevOffset - offset - spacing
          if size<0
            size=0
          style = pAlign + ':' + offset + 'px;' + pDim + ':' + size + 'px;'
        this.setStyle(panels[i], stylePrefix + style)
        # console.log(prevOffset)
        # console.log(offset)
        # console.log(stylePrefix + style) 
      if not this._stylesInited
        addClass(this.container,'kwicks-processed');
        this._stylesInited = true;
      return 
    Kwick::initStyles = ()-> 
        # opts = @opts
        # container = @container
        # panels = @$panels
        # numPanels = panels.length
        # pDim = @primaryDimension
        # sDim = @secondaryDimension
        this.updatePanelStyles();
        return
    Kwick::initBehavior = ()->
      self = this
      container = @container
      appendEvent(container,'mouseout',
        (event)->
            mouseoutEvent(event,container,
              ()->
                 result.expand(container, -1)
                 return
            )
            return 
        )
      for c_dom in container.children
        ((_dom)->
          appendEvent(_dom,'mouseover',
            (event)->
              # mouseoverEvent(event,_dom,
              #   ()->
              if not _dom.i_kwicks
                if self.opts.onExpand
                  self.opts.onExpand(self,_dom)
                result.expand(_dom)
                #   return
                # )
              return        
            )
          return
        )(c_dom)        
      return

    Kwick::initWindowResizeHandler = ->
      if not @opts.autoResize
        return 
      self = this
      prevTime = 0
      execScheduled = false  
      onResize=(e)->
        if not e 
          execScheduled = false
        now = +new Date()
        if now - prevTime < 20
          if execScheduled 
            return
          setTimeout(onResize, 20 - (now - prevTime))
          execScheduled = true
          return
        prevTime = now;
        self.resize()
      appendEvent(window,'resize',onResize)
      return

    Kwick::getContainerSize = (clearCache)->
      containerSize = @_containerSize
      if clearCache || !containerSize
        # containerSize = @_containerSize = @container[this.primaryDimension]()
        containerSize = @_containerSize = @container.scrollWidth
      return containerSize

    Kwick::getExpandedPanel = ->
      return if @expandedIndex is -1 then  null else @panels[@expandedIndex]

    Kwick::getSelectedPanel = ->
      return if @selectedIndex is -1 then  null else @panels[@selectedIndex]

    Kwick::resize = (index)->
      if @getContainerSize() is @getContainerSize(true)
        return
      @calculatePanelSizes()
      @offsets = @getOffsetsForExpanded()
      if @isAnimated
        @_dirtyOffsets = true
      else 
        @updatePanelStyles()
      return

    Kwick::select = (index)->
      if index is @selectedIndex
        return @expand(index)
      removeClass(@getSelectedPanel(),'kwicks-selected')
      @selectedIndex = index
      addClass(@getSelectedPanel(),'kwicks-selected')
      @expand(index)
      return

    Kwick::expand = (index)->
      self = this
      if index is -1 then index = @selectedIndex
      # if index is this.expandedIndex then return

      removeClass(@getExpandedPanel(),'kwicks-expanded')
      @expandedIndex = index;
      addClass(@getExpandedPanel(),'kwicks-expanded')

      animate = @animate
      numPanels = @panels.length
      startOffsets = @offsets.slice()
      offsets = @offsets
      targetOffsets = @getOffsetsForExpanded()

      animate.stop()
      @isAnimated = true
      
      animate.step = (progress)->
        # console.log(progress)
        if self._dirtyOffsets
          offsets = self.offsets
          targetOffsets = self.getOffsetsForExpanded()
          self._dirtyOffsets = false
        offsets.length = 0
        for i in [0 ... numPanels]
          targetOffset = targetOffsets[i]
          newOffset = targetOffset - ((targetOffset - startOffsets[i]) * (1 - progress))
          offsets[i] = newOffset;
        self.updatePanelStyles()
        return
      animate.complete = ->
        self.isAnimated = false
      animate.start()
      return

    kw_obj = new Kwick(setting.container, setting)  

    result.expand= (container,index)->
      # =setting.container
      if hasClass(container,'kwicks-processed')
        if typeof index isnt 'number'
          throw new Error('Kwicks method "expand" requires an index')
        if (index >= 0) 
          panel = container.children[index]
      else if hasClass(container.parentNode,'kwicks-processed')
        panel = container
        index = getDomIndex(panel)
        # console.log(index)
      else
        throw new Error('Cannot call "expand" method on a non-Kwicks element')
      kw_obj.expand(index)
      return
    result.expanded =()->
      kw_obj.expandedIndex
    result.select=(index)->
      container=setting.container
      if hasClass(container,'kwicks-processed')
        if typeof(index) isnt 'number'
          throw new Error('Kwicks method "select" requires an index')
        if (index >= 0) 
          panel = container.children[index]
      else if hasClass(container.parentNode,'kwicks-processed')
        panel = container
        index = getDomIndex(panel)
      else
        throw new Error('Cannot call "select" method on a non-Kwicks element')
      kw_obj.select(index)
      return
    result.selected=()->
      kw_obj.selectedIndex
    result.resize=()->
      kw_obj.resize()

    result

window.kwicks = kwicks




