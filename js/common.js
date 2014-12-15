/**
 * JSONP方法
 * @param {String} url 要请求的URL
 * @private
 */
function jsonp( /**String*/url ) {
	//修改HTTPS模式url
	var _href = window.location.href;
	if(_href.indexOf("https://")==0){
		url = url.replace("http://","https://");
	}

	//URL中增加时间戳，避免缓存
	if(url.indexOf("?") ===-1 ){
		url+="?random="+(new Date()).getTime();
	}else{
		url+="&random="+(new Date()).getTime();
	}
	
	// 动态添加JS脚本，是JSONP技术的核心
	var script = document.createElement( 'script' );
	script.setAttribute( 'src', url );
	script.setAttribute( 'charset', "utf-8" );

	// 执行脚本，这个脚本实际上是百分点推荐引擎返回的一个回调函数，回调函数名
	// 已经由url中的callback参数指定，回调函数的参数则是此次请求返回的JSON数据结果
	document.getElementsByTagName( 'head' )[ 0 ].appendChild( script );
	
}
/**
 * 取样式属性值
 * @method getRealStyle
 * @param {Object} DOM元素
 * @param {Object} 属性名称
 * @return {Object} 属性值
 */
function getRealStyle(el, cssName) {
	var len = arguments.length,
	sty,
	f,
	fv;
	'currentStyle' in el ? sty = el.currentStyle : 'getComputedStyle' in window ? sty = window.getComputedStyle(el, null) : null;

	if (cssName === "opacity" && document.all) {
		f = el.filters;
		f && f.length > 0 && f.alpha ? fv = f.alpha.opacity / 100 : fv = 1;
		return fv;
	}
	cssName === "float" ? document.all ? cssName = 'styleFloat' : cssName = 'cssFloat' : cssName;
	sty = (len == 2) ? sty[cssName] : sty;
	return sty;
}