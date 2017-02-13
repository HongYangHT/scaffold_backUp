define(['jquery', 'model/base', 'uuid'], function($, BaseModel) {
	var baseModel = new BaseModel();
	var Data2Vue = function(options) {
		this.options = $.extend({}, Data2Vue.default, options);
		this.imageReg = /\.gif|jpg|jpeg|png|bmp$/;
		this.colorReg = /^\#[\w\d]+/;
		this.result = {};
		this.init();
	};

	Data2Vue.default = {
		url: '',
		data: ''
	};

	Data2Vue.prototype.init = function() {
		this.changeData();
		this.setAnchar();
		this.setId();
	};

	Data2Vue.prototype.getResult = function() {
		return this.result;
	};

	Data2Vue.prototype.setId = function() {
		this.options.id ? (this.result.id = this.options.id) : (this.result.id = Math.uuid(32, 16).toLowerCase());
	};

	//设置模块与模块之间的anchar链接
	Data2Vue.prototype.setAnchar = function(){
		var contentInfo = {
			anchar:{
				type:'input',
				name:'模块与模块之间的锚点',
				key:'anchar',
				value:'H5597' + Math.uuid(4, 16).toUpperCase()
			}
		};
		if(this.result.content){
			!this.options.id && (this.result.content = $.extend({},this.result.content,contentInfo));
		}else{
			!this.options.id && (this.result.contentInfo = $.extend({},this.result.contentInfo,contentInfo));
		}
	};

	Data2Vue.prototype.getType = function(obj) {
		var map = {
			'[object Boolean]': 'boolean',
			'[object Number]': 'number',
			'[object String]': 'string',
			'[object Function]': 'function',
			'[object Array]': 'array',
			'[object Data]': 'date',
			'[object RegExp]': 'regExp',
			'[object Undefined]': 'undefined',
			'[object Null]': 'null',
			'[object Object]': 'object'
		};

		if (obj instanceof Element) {
			return 'element';
		}

		return map[Object.prototype.toString.call(obj)];
	};

	Data2Vue.prototype.handleDataString = function(key, value) {
		// body...
	};

	Data2Vue.prototype.handleData = function(key, value) {
		var _that = this,
			_type = _that.getType(value),
			_data = {};
		switch (_type) {
			case 'array':
				if (_that.getType(key) == 'string') {
					// _data[key] = [];
					_data[key] = $.map(value, function(v, k) {
						// var _item = _that.handleData(k,v);
						// _data[key].push(_item);
						return _that.handleData(k, v);
					});
				} else {
					_data = [];
					$.each(value, function(k, v) {
						var _item = _that.handleData(k, v);
						_data.push(_item);
					});
				}
				break;
			case 'object':
				$.each(value, function(k, v) {
					_data[k] = _that.handleData(k, v);
				});
				/*if(key == 'style'){
					_data[key] = $.map(value,function(v,k){
						return _that.handleData(k,v);
					});
				}else{
					$.each(value,function(k,v){
						var _item = _that.handleData(k,v);
						_data[k] = _item;
					});
				}*/
				break;
			default:
				if (key == 'src' || _that.imageReg.test(value)) {
					_data.needUpload = true;
				}
				if (_that.colorReg.test(value)) {
					_data.changeColor = true;
				}
				switch(key){
					case 'needTextarea':
						_data.key = key;
						_data.value = value;
						_data.name = key + '的值';
						_data.type = 'textarea';
						break;
					case 'needScenePicUrl':
						_data.key = key;
						_data.value = value;
						_data.name = key + '的值';
						_data.type = 'select';
						break;
					default:
						_data.key = key;
						_data.value = value;
						_data.name = key + '的值';
						_data.type = 'input';
						break;		
				}
				/*if (key == 'needTextarea') {
					_data.key = key;
					_data.value = value;
					_data.name = key + '的值';
					_data.type = 'textarea';
				} else {
					_data.key = key;
					_data.value = value;
					_data.name = key + '的值';
					_data.type = 'input';
				}*/
				break;
		}
		return _data;
	};

	Data2Vue.prototype.changeData = function() {
		var _that = this;
		if (this.options.url) {
			baseModel.get({
				url: _that.options.url,
				success: function(result) {

				}
			});
		} else {
			// var _type = _that.getType(_that.options.data),
			var _props = Object.getOwnPropertyNames(_that.options.data);
			$.each(_props, function(k, v) {
				var _type = _that.getType(_that.options.data[v]);
				switch (_type) {
					case 'array': // 对象数组
						_that.result[v] = $.map(_that.options.data[v], function(value, key) {
							return _that.handleData(key, value);
						});
						break;
					case 'object': //对象
						if (v == 'style') {
							_that.result.style = {};
							$.each(_that.options.data[v], function(key, value) {
								_that.result.style[key] = _that.handleData(key, value);
							});
						} else {
							_that.result[v] = {};
							$.each(_that.options.data[v], function(key, value) {
								_that.result[v][key] = _that.handleData(key, value);
							});
							/*_that.result[v] = $.map(_that.options.data[v],function(value,key){
								return _that.handleData(key,value);
							});*/
						}
						break;
					case 'string':
						_that.result[v] = _that.handleData(v, _that.options.data[v]);
						break;
					default:
						console.error('数据类型无法解析数据类型，请查看数据类型是否正确');
						break;
				}
			});
		}

		// console.log(_that.result);
	};

	return Data2Vue;
});