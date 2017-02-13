define(['jquery'], function() {
	var url = {
		getQuery: function(str, name) {
			var result = str.match(new RegExp("[\?\&]*" + name + "=([^\&]+)", "i"));
			if (result == null || result.length < 1) {
				return "";
			}
			return result[1];
		},
		getHash: function(str, name) {
			var params = {};
			var a = str ? str.split('&') : location.hash.slice(1).split('&');
			if (a.length == 1 && a[0] == '') return params['' + name + ''];
			for (var i = 0; i < a.length; i++) {
				var o = a[i];
				var a1 = o.split('=');
				var k = a1[0].replace(/script|%22|%3E|%3C|'|"|>|<|\\/g, '_');
				var v = a1[1].replace(/script|%22|%3E|%3C|'|"|>|<|\\/g, '_');
				if (k in params) {
					if (/array/i.test(Object.prototype.toString.call(params[k]))) {
						//
					} else {
						var old = params[k];
						params[k] = [];
						params[k].push(old);
					}
					params[k].push(v);
				} else {
					params[k] = v;
				}
			}
			return params['' + name + ''];
		}
	};
	return url;
});