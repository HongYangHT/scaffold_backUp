/* 用于自定义style
 * el: 指令绑定的元素
 * vm: 拥有该指令的上下文 ViewModel
 * expression: 指令的表达式，不包括参数和过滤器
 * arg: 指令的参数
 * raw: 未被解析的原始表达式
 * name: 不带前缀的指令名
 * 单个指令实例处理多个参数，可以利用字面量对象作为表达式
 */
define(['Vue', 'jquery', 'underscore'], function(Vue, $, _) {
	Vue.directive('set-attr', {
		bind: function(data) {
			// 做绑定的准备工作
			// 比如添加事件监听器，或是其他只需要执行一次的复杂操作

		},
		update: function(data) {
			var _that = this;
			// 判断数据类型
			if (_.isArray(data)) {
				var _order = $(this.el).data('order');
				if (_that.expression == 'id' || _that.expression == 'oparate') {
					$(_that.el).attr('data-' + _that.expression, data);
				} else {
					$(_that.el).attr(_that.expression, data[_order].value);
				}
			} else if (_.isObject(data)) {
				if (_that.expression == 'id' || _that.expression == 'oparate') {
					$(_that.el).attr('data-' + _that.expression, data);
				} else {
					$(_that.el).attr(_that.expression, data.value);
				}
			} else {
				if (_that.expression == 'id' || _that.expression == 'oparate') {
					$(_that.el).attr('data-' + _that.expression, data);
				} else {
					$(_that.el).attr(_that.expression, data);
				}
			}
		},
		unbind: function() {

		}
	});
});