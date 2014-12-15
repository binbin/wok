(function($){
	var ie = false;
	if (!!window.ActiveXObject) {
		ie = true;
	}
	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};
			
    var methods={
        init:function(option) {
        	var defaults={
        		photoW:184,
        		photoH:205
        	}
        	var setting=$.extend(true,{},defaults,option)

        	$(this).data({
        		idx: -1,
        		idxLarge:-1,
                navPage:0
        	}).data('setting',setting)

        	var $container=$(this)

        	function start(){
                var tableW 			= $container.width();
				var tableH 			= $container.height();
				
				var horizontalMax	= tableW - $container.data('setting').photoW;
				var verticalMax		= tableH - $container.data('setting').photoH;

				var cntPhotos = 0;
				$container.find('.pd_photo').each(function(i){
					var $photo 	= $(this);
					$('<img />').load(function(){
						++cntPhotos;
						var $image 	= $(this);
						
						var r		= Math.floor(Math.random()*201)-100;//*41
						var maxzidx = parseInt(findHighestZIndex()) + 1;
						var param	= {
							'top' 		: Math.floor(Math.random()*verticalMax) +'px',       
							'left'		: Math.floor(Math.random()*horizontalMax) +'px',
							'z-index'	: maxzidx
						};
						
						$photo.css(param);
						if(!ie){
							$photo.transform({'rotate'	: r + 'deg'});
						}
						$photo.show();	
						if(cntPhotos == photosSize){
							bindEvents();
						}
					}).attr('src',$photo.find('img').attr('src'));	
				});	
        	}
        	

        	function findHighestZIndex(){
				var photos = $container.find('.pd_photo');
				var highest = 0;
				photos.each(function(){
					var $photo = $(this);
					var zindex = $photo.css('z-index');
					if (parseInt(zindex) > highest) {
						highest = zindex;
					}
				});
				return highest;
			}
			
			function findElementHighestZIndex(){
				var photos = $container.find('.pd_photo');
				var highest = 0;
				var $elem;
				photos.each(function(){
					var $photo = $(this);
					var zindex = $photo.css('z-index');
					if (parseInt(zindex) > highest) {
						highest = zindex;
						$elem	= $photo;
					}
				});
				return $elem;
			}
			
			
        }
    }
    $.fn.PhotoDesk=function(method){
						if (methods[method]) {
				            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
				        }else if (typeof method === 'object' || !method) {
				                return methods.init.apply(this, arguments);
				        }else {
				                $.error('Method ' + method + ' does not exist on jQuery.PhotoDesk');
				        }
	}
})(jQuery);