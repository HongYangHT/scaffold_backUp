define(['jquery'], function($) {
    var Load = function() {};

    //生成link标签
    Load.prototype.loadStyle = function(url) {
        var _link = document.createElement('link');
        _link.type = 'text/css';
        _link.rel = 'stylesheet';
        _link.href = url;
        var _head = document.getElementsByTagName('head')[0];
        _head.appendChild(_link);
        /*var doc = document;
        var style = doc.createElement('style');
        style.setAttribute("type", "text/css");
        var heads = doc.getElementsByTagName("head");
        heads.length ? heads[0].appendChild(style) : doc.documentElement.appendChild(style);
        $(style).load(url,function(data){});*/
    };

    //生成script
    Load.prototype.loadScript = function(url) {
        var _script = document.createElement('script');
        _script.setAttribute("type", "text/javascript");
        _script.setAttribute("src", url);
        try {
            _script.setAttribute("defer", "defer")
        } catch (e) {
            console.error('not support defer');
        }
        document.body ? document.body.appendChild(_script) : document.getElementsByTagName("head")[0].appendChild(_script);
        /*var _script = document.createElement('script');
        _script.setAttribute("type", "text/javascript");
        document.body ? document.body.appendChild(_script) : document.getElementsByTagName("head")[0].appendChild(_script);
        $(_script).load(url,function(data){});*/
    };

    //动态创建style方式
    Load.prototype.loadStyleBase = function(cssString) {
        var doc = document;
        var style = doc.createElement("style");
        style.setAttribute("type", "text/css");

        if (style.styleSheet) { // IE  
            style.styleSheet.cssText = cssString;
        } else { // w3c  
            var cssText = doc.createTextNode(cssString);
            style.appendChild(cssText);
        }

        var heads = doc.getElementsByTagName("head");
        heads.length ? heads[0].appendChild(style) : doc.documentElement.appendChild(style);
    };

    Load.prototype.loadScriptBase = function(jsString) {
        document.write('<script>' + jsString + '</script>')
    };

    return Load;
});