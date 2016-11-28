/*
// 匹配 {{#xx}} | {{^xx}} | xx={{xx}} | {{/}} | {{{}}} | {{&}} | {{.}} | {{!}} | {{>}} | {{xx}}
mustache中可能的类型有 {{#xx}} | {{^xx}} | xx={{xx}} | {{/}} | {{{}}} | {{&}} (不编译数据源)| {{.}} | {{!}} （注释）| {{>}} | {{xx}} 	
var symbolRe1 = /\{\{#([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //匹配{{#xx}}
	symbolRe2 = /\{\{\/([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //匹配{{/xx}}
	symbolRe3 = /([\s]*[\w\d_]+)="\{\{([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}"/g, // 匹配 xx={{xx}}
	symbolRe4 = /\{\{([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //匹配{{xx}}
	symbolRe5 = /\{\{\/([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //{{/}}
	symbolRe6 = /\{\{(\.)\}\}/g, //{{.}}
	symbolRe7 = /\{\{!([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //{{!}} 注释 删除
	symbolRe8 = /\{\{>([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //{{>}}
	symbolRe9 = /\{\{\{([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}\}|\{\{&([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, // 匹配 {{{}}} {{&}}

var keyRe = /[\w\d_]+/g; //获取key值的正则
解析顺序为 {{#xx}}  ->  {{^xx}}  ->  xx={{xx}}  -> {{xx}} | {{.}}  -> {{{}}} | {{&}} -> {{>}}

目的：为了把mustache的模板转化成Vue的模板 
0.如果存在partials,现将其替换掉
1.使用正则，检测出相关的key值
2.检测data数据中的key类型
3.替换mustache标签
4.再次循环下来 

渲染的优先级
{{!xxx}} {{>xxx}} {{#xxx}}|{{/xxx}} xx={{xxx}} {{xx}} {{.}} {{{xx}}}| {{&xx}}
*/
define(['jquery', 'underscore'], function($, _) {

	//相关的正则
	var symbolRe1 = /\{\{#([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //匹配{{#xxx}}
		symbolRe2 = /\{\{\/([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //匹配{{/xxx}}
		symbolRe3 = /([\w\d_]+)="\{\{([\w\d_]+.{0,1}[\w\d_]+)\}\}/g, // 匹配 xx={{xx}}
		symbolRe4 = /\{\{([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //匹配{{xx}}
		symbolRe5 = /\{\{\/([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //{{/xxx}}
		symbolRe6 = /\{\{(\.)\}\}/g, //{{.}}
		symbolRe7 = /\{\{!([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //{{!}} 注释 删除
		symbolRe8 = /\{\{>([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //{{>}}
		symbolRe9 = /\{\{&([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, // 匹配 {{{}}} {{&}}
		symbolRe10 = /\{\{\^([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}/g, //{{^xx}}
		symbolRe11 = /\{\{\{([\s]*[\w\d_]+.{0,1}[\w\d_]+)\}\}\}/g; // {{{xxx}}}

	var keyRe = /[\w\d_]+/g; //获取key值的正则

	var Tpl2Vue = function(tpl, data, partials) {
		this.tpl = tpl ? tpl : '';
		this.data = data ? data : '';
		this.context = (this.data instanceof Context) ? this.data : new Context(this.data);
		this.tokens = parseTemplate(tpl, defaultTags);
		this.partials = partials;
		this.arrayOrObjectKey = []; // {{#}} 中的key
		// this.propWithKey = []; // xx={{xx}} 中的key
		// this.propKey = []; // {{xx}}中的key
		this.partialKey = []; //{{>xx}}中的key
		this.init();
	};

	Tpl2Vue.prototype.render = function() {
		// var _default = '<div class="m-psc-oparate" v-set-attr="oparate">' +
		// 	'<a href="javascript:;" target="_self" class="u-btn-s f-fr u-delete" v-on:click="operateDelete($event)">删除</a>' +
		// 	'<a href="javascript:;" target="_self" class="u-btn-s f-fr" v-on:click="operateEdit($event)">编辑</a></div>';
		// // console.log(this.tpl); v-drag-and-drop drag-start="handleDragStart" drag-over="handleDragOver" drag-enter="handleDragEnter" drag-leave="handleDragLeave" drag-end="handleDragEnd" drop="handleDrop" drag="handleDrag"	
		// return '<div class="m-wrap J_wrap" v-set-attr="id" v-on:click="showModal($event)" v-on:mouseenter="addClassActive($event)" v-on:mouseleave="removeClassActive($event)">' + _default + this.tpl + '</div>';
		//v-on:click="showModal($event)"
		return [
			'<div class="J_psc_wrap" v-set-attr="id" v-on:dblclick="showModal($event)" v-on:click="focusKeyEdit" v-on:mouseenter="addClassActive($event)" v-on:mouseleave="removeClassActive($event)">',
			'<div class="m-psc-oparate" v-set-attr="oparate">',
			'<a href="javascript:;" target="_self" class="u-btn-s f-fr u-delete" v-on:click="operateDelete($event)">删除</a>',
			'<a href="javascript:;" target="_self" class="u-btn-s f-fr" v-on:click="operateEdit($event)">编辑</a></div>',
			'' + this.tpl + '',
			'</div>'
		].join('');
	};

	Tpl2Vue.prototype.init = function() {
		this.renderNote();
		this.renderPartial();
		this.renderArrayOrObject();
		this.renderPropWith();
		// this.renderPropDefault();
		this.renderProp();
		this.renderHtml();
		this.renderEnd();
		this.clearMoreTag();
	};

	// clear note for {{!xxxx}}
	Tpl2Vue.prototype.renderNote = function() {
		this.tpl.replace(symbolRe7, '');
	};

	// render partial
	Tpl2Vue.prototype.renderPartial = function() {
		var _that = this;
		this.getPartialTag();
		if (this.partialKey && this.partials) {
			_.each(_that.partialKey, function(n, i) {
				var _str = '\{\{>' + n[0] + '\}\}',
					renderRe = new RegExp(_str, 'g');
				_.each(_that.partials, function(value, key) {
					if (key == n[0]) {
						_that.tpl = _that.tpl.replace(renderRe, value);
					}
				});
			});
		} else if (this.partialKey && !this.partials) {
			console.warn('[tpl2vue.js warning]:warning:Template render needs partials!');
		}
	};

	// render {{#xxx}}
	Tpl2Vue.prototype.renderArrayOrObject = function() {
		var _that = this;
		this.getArrayOrObjectTag();
		if (this.arrayOrObjectKey && this.context) {
			_.each(this.arrayOrObjectKey, function(n, i) {
				_that.mapKey(_that.context, n[0]);
			});
		}
	};

	// 遍历数据 
	/*
	 * @param context 数据
	 * @param item 需要遍历的数据
	 * @param prev 前一个的数据类型
	 */
	Tpl2Vue.prototype.mapKey = function(context, item, prev) {
		var _that = this,
			_prev = prev ? prev : '',
			tokens = this.tokens;
		var itemData = context.lookup(item);
		if (itemData && _.isArray(itemData)) {
			var _str = '\{\{#' + item + '\}\}',
				_reg = new RegExp(_str, 'g');

			for (var i = 0, len = tokens.length; i < len; i++) {
				var token = tokens[i],
					child = token[4];
				if (token[0] == '#' && token[1] == item) {
					var _str1 = '\{\{\\^' + item + '\}\}',
						_reg1 = new RegExp(_str1, 'g');
					if (_reg1.test(_that.tpl)) {
						// _that.tpl = _that.tpl.replace(_reg, '<div style="display:inline-block;" v-for="' + item + 'Item in ' + item + '">');
						// _that.tpl = _that.tpl.replace(_reg1, '<div v-show="!' + item + '">');
						/**
						 * 找到第一个标签并把v-for 指令插入进去
						 *
						 */
						var temp = child[0][1],
							regTemp = /<([a-zA-Z][^>]*)+?>/,
							sTemp = temp.replace(regTemp, '<' + '$1' + ' ' + ' v-for="' + item + 'Item in ' + item + '"' + '>'),
							sReg = new RegExp(temp);
						_that.tpl = _that.tpl.replace(sReg, sTemp);

						// _that.tpl = _that.tpl.replace(_reg, '<div style="display:inline-block;" v-for="' + item + 'Item in ' + item + '">');
						_that.tpl = _that.tpl.replace(_reg, '');
						_that.tpl = _that.tpl.replace(_reg1, '<div v-show="!' + item + '">');
					} else {
						var temp = child[0][1],
							regTemp = /<([a-zA-Z][^>]*)+?>/,
							sTemp = temp.replace(regTemp, '<' + '$1' + ' ' + ' v-for="' + item + 'Item in ' + item + '"' + '>'),
							sReg = new RegExp($.trim(temp),'g');
						if(sReg.test(_that.tpl)){
							_that.tpl = _that.tpl.replace(sReg, sTemp);
							_that.tpl = _that.tpl.replace(_reg, '');
						}else{
							var tempMatch = temp.match(regTemp)[0],
								tempMatchVal = tempMatch.replace(regTemp, '<' + '$1' + ' ' + ' v-for="' + item + 'Item in ' + item + '"' + '>'),
								reg = new RegExp(tempMatch,'g');
							_that.tpl = _that.tpl.replace(reg, tempMatchVal);
							_that.tpl = _that.tpl.replace(_reg, '');	
						}	
						// _that.tpl = _that.tpl.replace(_reg, '<div style="display:inline-block;" v-for="' + item + 'Item in ' + item + '">');
					}
					for (var j = 0, tlen = child.length; j < tlen; j++) {
						// if (child[j][0] == 'name' && (child[j][1] in itemData[0])) {
						if (child[j][0] == 'name') {
							// _that.renderPropDefault(item + 'Item', child[j][1]);
							_that.renderPropWith(item + 'Item', child[j][1]);
							_that.renderProp(item + 'Item', child[j][1]);
							_that.renderDefault(item + 'Item', child[j][1]);
							// _that.renderPropDefault(item + 'Item', child[j][1]);
						}
					}
				}
			}
			//接着渲染 子目录下的
		} else if (itemData && _.isObject(itemData)) {
			var _str = '\{\{#(' + item + ')\}\}',
				_reg = new RegExp(_str, 'g');

			for (var i = 0, len = tokens.length; i < len; i++) {
				var token = tokens[i],
					child = token[4];
				if (token[0] == '#' && token[1] == item) {
					// 匹配{{^xx}}
					var _str1 = '\{\{\\^' + item + '\}\}',
						_reg1 = new RegExp(_str1, 'g');
					if (_reg1.test(_that.tpl)) {
						var temp = child[0][1],
							regTemp = /<([a-zA-Z][^>]*)+?>/,
							sTemp = temp.replace(regTemp, '<' + '$1' + ' ' + ' v-for="' + item + 'Item in ' + item + '"' + '>'),
							sReg = new RegExp(temp);
						if(sReg.test(_that.tpl)){
							_that.tpl = _that.tpl.replace(sReg, sTemp);
							_that.tpl = _that.tpl.replace(_reg, '');
						}else{
							var tempMatch = temp.match(regTemp)[0],
								tempMatchVal = tempMatch.replace(regTemp, '<' + '$1' + ' ' + ' v-for="' + item + 'Item in ' + item + '"' + '>'),
								reg = new RegExp(tempMatch,'g');
							_that.tpl = _that.tpl.replace(reg, tempMatchVal);
							_that.tpl = _that.tpl.replace(_reg, '');	
						}	
						// _that.tpl = _that.tpl.replace(_reg, '<div style="display:inline-block;" v-for="' + item + 'Value in ' + item + '">');
						_that.tpl = _that.tpl.replace(_reg1, '<div v-show="!' + item + '">');
					} else {
						var temp = child[0][1],
							regTemp = /<([a-zA-Z][^>]*)+?>/,
							sTemp = temp.replace(regTemp, '<' + '$1' + ' ' + ' v-for="' + item + 'Item in ' + item + '"' + '>'),
							sReg = new RegExp($.trim(temp),'g');
						if(sReg.test(_that.tpl)){
							_that.tpl = _that.tpl.replace(sReg, sTemp);
							_that.tpl = _that.tpl.replace(_reg, '');
						}else{
							var tempMatch = temp.match(regTemp)[0],
								tempMatchVal = tempMatch.replace(regTemp, '<' + '$1' + ' ' + ' v-for="' + item + 'Item in ' + item + '"' + '>'),
								reg = new RegExp(tempMatch,'g');
							_that.tpl = _that.tpl.replace(reg, tempMatchVal);
							_that.tpl = _that.tpl.replace(_reg, '');	
						}	
						// _that.tpl = _that.tpl.replace(_reg, '<div style="display:inline-block;" v-for="' + item + 'Value in ' + item + '">');
					}
					for (var j = 0, tlen = child.length; j < tlen; j++) {
						// if (child[j][0] == 'name' && (child[j][1] in itemData[0])) {
						if (child[j][0] == 'name') {
							// _that.renderPropDefault(item + 'Item', child[j][1]);
							_that.renderPropWith(item + 'Item', child[j][1]);
							_that.renderProp(item + 'Item', child[j][1]);
							_that.renderDefault(item + 'Item', child[j][1]);
							// _that.renderPropDefault(item + 'Item', child[j][1]);
						}
					}
				}
			}
		}
		// console.log(this.tokens);
	};

	// 编译{{/xxx}}
	Tpl2Vue.prototype.renderEnd = function() {
		this.tpl = this.tpl.replace(symbolRe5, '');
	};

	// {{{xxx}}}
	Tpl2Vue.prototype.renderPropDefault = function(parent, item) {
		var _that = this;
		if (parent) {
			var _str = '\{\{\{(' + item + ')\}\}\}',
				_reg = new RegExp(_str, 'g');
			this.tpl = _that.tpl.replace(_reg, '{{{' + parent + '.' + item + '.value}}}');
		} else {
			this.tpl = _that.tpl.replace(symbolRe11, '{{{' + '$1' + '.value}}}');
		}
	};
	// xx={{xx}}
	Tpl2Vue.prototype.renderPropWith = function(parent, item) {
		var _that = this;
		// this.getPropWithTag();
		if (parent) {
			var _str = '([\\w\\d_]+)="\{\{' + item + '\}\}',
				_reg = new RegExp(_str, 'g');
			_that.tpl = _that.tpl.replace(_reg, ('v-bind:' + '$1' + '=' + '"' + parent + '.' + item + '.value').trim());
		} else {
			_that.tpl = _that.tpl.replace(symbolRe3, ('v-bind:' + '$1' + '=' + '"' + '$2' + '.value').trim());
		}
	};
	// {{xx}}
	Tpl2Vue.prototype.renderProp = function(parent, item) {
		var _that = this;
		// this.getPropTag();
		// this.tpl = _that.tpl.replace(symbolRe4, '{{'+ parent + '$1' + '.value}}');
		if (parent) {
			var _str = '\{\{(' + item + ')\}\}',
				_reg = new RegExp(_str, 'g');
			this.tpl = _that.tpl.replace(_reg, '{{' + parent + '.' + item + '.value}}');
		} else {
			this.tpl = _that.tpl.replace(symbolRe4, '{{' + '$1' + '.value}}');
		}
	};

	/*// {{^xxx}}
	Tpl2Vue.prototype.renderNone = function(parent, item) {
		var _that = this;
		if (parent) {
			var _str = '\{\{\^(' + item + ')\}\}',
				_reg = new RegExp(_str, 'g');
			this.tpl = _that.tpl.replace(_reg, '<div v-if=' + '"' + parent + '.' + item + '.value">');
		} else {
			this.tpl = _that.tpl.replace(symbolRe10, '<div v-if=' + '"' + '$1' + '.value">');
		}
	};*/

	// render {{{xx}}}{{&xx}}
	Tpl2Vue.prototype.renderHtml = function(parent, item) {
		var _that = this;
		this.tpl = _that.tpl.replace(symbolRe9, '{{' + '$1' + '.value}}');
	};

	// render {{.}}
	Tpl2Vue.prototype.renderDefault = function(parent, item) {
		this.tpl = this.tpl.replace(symbolRe6, '{{' + item + '.value}}');
	};

	Tpl2Vue.prototype.clearMoreTag = function() {
		var reg = /data-v-bind:([\w\d_]+)="([\w\d_.]*)"/g; // ([\w\d_]+)="\{\{([\w\d_]+.{0,1}[\w\d_]+)\}\}"
		this.tpl = this.tpl.replace(reg, 'data-' + '$1' + '=' + '"{{' + '$2' + '}}"');
	};

	// partials getPartialTag 获取模板中{{>xx}}的key数组
	Tpl2Vue.prototype.getPartialTag = function(tpl) {
		var _tpl = tpl ? tpl : this.tpl,
			_that = this;
		var _partialMatch = _tpl.match(symbolRe8);
		if (_partialMatch) {
			_.each(_partialMatch, function(n, i) {
				_that.partialKey.push(n.match(keyRe))
			});
			return this.partialKey;
		} else {
			return '';
		}
	};

	// getArrayOrObjectTag 获取模板中的{{#xx}} 的key数组
	Tpl2Vue.prototype.getArrayOrObjectTag = function(tpl) {
		var _tpl = tpl ? tpl : this.tpl,
			_that = this;
		var _arrayOrObjectMatch = _tpl.match(symbolRe1);
		if (_arrayOrObjectMatch) {
			_.each(_arrayOrObjectMatch, function(n, i) {
				_that.arrayOrObjectKey.push(n.match(keyRe))
			});
			return this.arrayOrObjectKey;
		} else {
			return '';
		}
	};

	// getPropWithTag 获取模板中xx={{xx}} 的key数组
	Tpl2Vue.prototype.getPropWithTag = function(tpl) {
		var _tpl = tpl ? tpl : this.tpl,
			_that = this;
		var _propWithMatch = _tpl.match(symbolRe3);
		if (_propWithMatch) {
			_.each(_propWithMatch, function(n, i) {
				_that.propWithKey.push(n.match(keyRe))
			});
			return this.propWithKey;
		} else {
			return '';
		}
	};

	// getPropTag 获取模板中{{xx}} 的key数组
	Tpl2Vue.prototype.getPropTag = function(tpl) {
		var _tpl = tpl ? tpl : this.tpl,
			_that = this;
		var _propMatch = _tpl.match(symbolRe4);
		if (_propMatch) {
			_.each(_propMatch, function(n, i) {
				_that.propKey.push(n.match(keyRe))
			});
			return this.propKey;
		} else {
			return '';
		}
	};

	// 处理模板
	var defaultTags = ['{{', '}}'];

	function escapeRegExp(string) {
		return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	}

	var nonSpaceRe = /\S/;
	var regExpTest = RegExp.prototype.test;

	function testRegExp(re, string) {
		return regExpTest.call(re, string);
	}

	function isWhitespace(string) {
		return !testRegExp(nonSpaceRe, string);
	}

	var entityMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'/': '&#x2F;',
		'`': '&#x60;',
		'=': '&#x3D;'
	};

	function escapeHtml(string) {
		return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
			return entityMap[s];
		});
	}

	var whiteRe = /\s*/; // 0个或者以上的空格
	var spaceRe = /\s+/; // 1个或者以上的空格
	var equalsRe = /\s*=/; // 0个或者以上的空格加=
	var curlyRe = /\s*\}/; // 0个或者以上的空格加}
	var tagRe = /#|\^|\/|>|\{|&|=|!/; // 匹配 # ^ / > { & = !

	// 字符扫描
	function Scanner(string) {
		this.string = string; // 模板字符
		this.tail = string; // 未扫描的模板
		this.pos = 0; // 扫描索引
	}
	// 扫描是否结束
	Scanner.prototype.eos = function eos() {
		return this.tail === '';
	};

	// 扫描匹配正则的字符串
	Scanner.prototype.scan = function scan(re) {
		var match = this.tail.match(re);

		if (!match || match.index !== 0)
			return '';

		var string = match[0];

		this.tail = this.tail.substring(string.length);
		this.pos += string.length;

		return string;
	};

	// 扫描到符合re正则匹配的字符串为止，将匹配之前的字符串返回
	Scanner.prototype.scanUntil = function scanUntil(re) {
		var index = this.tail.search(re),
			match;

		switch (index) {
			case -1:
				match = this.tail;
				this.tail = '';
				break;
			case 0:
				match = '';
				break;
			default:
				match = this.tail.substring(0, index);
				this.tail = this.tail.substring(index);
		}

		this.pos += match.length;

		return match;
	};

	function squashTokens(tokens) {
		var squashedTokens = [];

		var token, lastToken;
		for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
			token = tokens[i];

			if (token) {
				if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
					lastToken[1] += token[1];
					lastToken[3] = token[3];
				} else {
					squashedTokens.push(token);
					lastToken = token;
				}
			}
		}

		return squashedTokens;
	}

	function nestTokens(tokens) {
		var nestedTokens = [];
		var collector = nestedTokens;
		var sections = [];

		var token, section;
		for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
			token = tokens[i];

			switch (token[0]) {
				case '#':
				case '^':
					collector.push(token);
					sections.push(token);
					collector = token[4] = [];
					break;
				case '/':
					section = sections.pop();
					section[5] = token[2];
					collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
					break;
				default:
					collector.push(token);
			}
		}

		return nestedTokens;
	}

	function parseTemplate(template, tags) {
		if (!template)
			return [];

		var sections = []; // 用于临时保存解析后的模板标签对象
		var tokens = []; // 保存所有解析后的对象
		var spaces = []; // 保存空格对象在tokens里的索引
		var hasTag = false;
		var nonSpace = false;


		// 去除保存在tokens里的空格标记
		function stripSpace() {
			if (hasTag && !nonSpace) {
				while (spaces.length)
					delete tokens[spaces.pop()];
			} else {
				spaces = [];
			}

			hasTag = false;
			nonSpace = false;
		}

		var openingTagRe, closingTagRe, closingCurlyRe;


		//将tag转成正则，默认的tag为{{和}}，所以转成匹配{{的正则，和匹配}}的正则，已经匹配}}}的正则（因为mustache的解析中如果是{{{}}}里的内容则被解析为html代码）
		function compileTags(tags) {
			if (typeof tags === 'string')
				tags = tags.split(spaceRe, 2);

			if (!_.isArray(tags) || tags.length !== 2)
				throw new Error('Invalid tags: ' + tags);

			openingTagRe = new RegExp(escapeRegExp(tags[0]) + '\\s*');
			closingTagRe = new RegExp('\\s*' + escapeRegExp(tags[1]));
			closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tags[1]));
		}

		compileTags(tags || defaultTags);

		var scanner = new Scanner(template);

		var start, type, value, chr, token, openSection;
		while (!scanner.eos()) {
			start = scanner.pos;

			// 开始扫描模板，扫描至{{时停止扫描，并且将此前扫描过的字符保存为value
			value = scanner.scanUntil(openingTagRe);

			if (value) {
				//遍历{{前的字符
				for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
					chr = value.charAt(i);

					//如果当前字符为空格，则用spaces数组记录保存至tokens里的索引
					if (isWhitespace(chr)) {
						spaces.push(tokens.length);
					} else {
						nonSpace = true;
					}

					tokens.push(['text', chr, start, start + 1]);

					start += 1;

					// 如果遇到换行符，则将前一行的空格去掉
					if (chr === '\n')
						stripSpace();
				}
			}

			// 判断下一个字符串中是否有{{，同时更新扫描索引至{{后一位
			if (!scanner.scan(openingTagRe))
				break;

			hasTag = true;

			//扫描标签类型，是{{#}}还是{{=}}还是其他
			type = scanner.scan(tagRe) || 'name';
			scanner.scan(whiteRe);

			//根据标签类型获取标签里的值，同时通过扫描器，刷新扫描索引
			if (type === '=') {
				value = scanner.scanUntil(equalsRe);

				//使扫描索引更新为\s*=后
				scanner.scan(equalsRe);

				//使扫描索引更新为}}后，下面同理
				scanner.scanUntil(closingTagRe);
			} else if (type === '{') {
				value = scanner.scanUntil(closingCurlyRe);
				scanner.scan(curlyRe);
				scanner.scanUntil(closingTagRe);
				type = '&';
			} else {
				value = scanner.scanUntil(closingTagRe);
			}

			// 匹配模板闭合标签即}}，如果没有匹配到则抛出异常，同时更新扫描索引至}}后一位,至此时即完成了一个模板标签{{#tag}}的扫描
			if (!scanner.scan(closingTagRe))
				throw new Error('Unclosed tag at ' + scanner.pos);

			// 将模板标签也保存至tokens数组中
			token = [type, value, start, scanner.pos];
			tokens.push(token);

			//如果type为#或者^，也将tokens保存至sections
			if (type === '#' || type === '^') {
				sections.push(token);
			} else if (type === '/') { //如果type为/则说明当前扫描到的模板标签为{{/tag}}，则判断是否有{{#tag}}与其对应

				// 检查模板标签是否闭合，{{#}}是否与{{/}}对应，即临时保存在sections最后的{{#tag}}，是否跟当前扫描到的{{/tag}}的tagName相同
				// 具体原理：扫描第一个tag，sections为[{{#tag}}]，扫描第二个后sections为[{{#tag}} , {{#tag2}}]以此类推扫描多个开始tag后，sections为[{{#tag}} , {{#tag2}} ... {{#tag}}]
				// 所以接下来如果扫描到{{/tag}}则需跟sections的最后一个相对应才能算标签闭合。同时比较后还需将sections的最后一个删除，才能进行下一轮比较
				openSection = sections.pop();

				if (!openSection)
					throw new Error('Unopened section "' + value + '" at ' + start);

				if (openSection[1] !== value)
					throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
			} else if (type === 'name' || type === '{' || type === '&') {
				nonSpace = true;
			} else if (type === '=') {
				compileTags(value);
			}
		}

		// 保证sections里没有对象，如果有对象则说明标签未闭合
		openSection = sections.pop();

		if (openSection)
			throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

		//在对tokens里的数组对象进行筛选，进行数据的合并及剔除
		return nestTokens(squashTokens(tokens));
	}

	// 以下是处理数据的部分
	var Context = function(view, parentContext) {
		this.view = view == null ? {} : view;
		this.cache = {
			'.': this.view
		};
		this.parent = parentContext;
	};

	/**
	 * 实例化一个新的context对象，传入当前context对象成为新生成context对象的父对象属性parent中
	 */
	Context.prototype.push = function(view) {
		return new Context(view, this);
	};

	/**
	 * 获取name在js对象中的值
	 */
	Context.prototype.lookup = function(name) {
		var cache = this.cache;

		var value;
		if (name in cache) {
			value = cache[name];
		} else {
			var context = this,
				names, index;

			while (context) {
				if (name.indexOf('.') > 0) {
					value = context.view;
					names = name.split('.');
					index = 0;

					while (value != null && index < names.length)
						value = value[names[index++]];
				} else if (typeof context.view == 'object') {
					value = context.view[name];
				}

				if (value != null)
					break;

				context = context.parent;
			}

			cache[name] = value;
		}

		if (_.isFunction(value))
			value = value.call(this.view);

		// console.log(value)
		return value;
	};
	return Tpl2Vue;
});