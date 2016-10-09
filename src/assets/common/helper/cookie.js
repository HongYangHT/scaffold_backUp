define(['jquery'], function($) {
	return {
		setCookie: function(name, value, expire) {
			var _str = name + "=" + escape(value);
			if (expire > 0) {
				var date = new Date();
				date.setTime(date.getTime() + expire * 1000);
				_str += ";expires=" + date.toGMTString();
			}
			document.cookie = _str;
		},
		getCookie: function(name) {
			var _reg = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
			var _value = document.cookie.match(_reg);
			return (!_value ? null : _value[2]);
		},
		delCookie: function(name) {
			document.cookie = name + '=;expires=-1';
		}
	};
});