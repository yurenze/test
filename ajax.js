// 创建ajax的核心对象XMLHttpRequest
var getXHR = function() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
};

/*
 * options:
	 {
		 url: "servletURL",
		 method: "get|post",
		 params: "a=1&b=2",
		 sync: true | false,
		 callback: funciton(result) {
		 	// 对result进行处理
	 	 }
 	}
 */
function ajax(options) {
	// 1. 获取核心对象
	var XHR = getXHR();
	// 2. 监听服务器返回状态
	XHR.onreadystatechange = function() {
		if (XHR.readyState == 4 && XHR.status == 200) {
			var resultText = XHR.responseText;
			options.callback(resultText);
		}
	};
	// 默认GET请求
	if (options.method && (options.method.toUpperCase() == "POST" 
			|| options.method.toUpperCase() == "GET")) {
		options.method = options.method.toUpperCase();
	} else {
		options.method = "GET";
	}
	
	// 是否是post请求
	var isPost = options.method === "POST";
	if (!isPost) {
		// url:aServlet?c=123&a=1&b=2
		// params: a=1&b=2
		if (options.url.indexOf("?") > -1) { // 存在?
			options.url += "&" + options.params;
		} else {
			options.url += "?" + options.params;
		}
	}
	/*
	if (options.sync === false) {
		options.sync = false;
	} else {
		options.sync = true;
	}
	*/
	XHR.open(options.method, options.url, options.sync !== false);
	if (isPost) {
		XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	}
	XHR.send(isPost ? options.params : null);
}