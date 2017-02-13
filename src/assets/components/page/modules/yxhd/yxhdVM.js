define([
	'Vue',
	'mustache',
	'text!components/page/modules/yxhd/yxhd.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/directive/setAttr',
	'common/directive/draggable',
	'uuid'
], function(Vue, mustache, tpl, pageMixins, Tpl2Vue, Data2Vue) {
	var _default = {

	};
	var Yxhd = Vue.extend({
		name: 'yxhd',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		data: function(options) {
			// 这里必须每次进来算一遍
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		mixins: [pageMixins],
		watch:{
		},
		computed: {
			oparate: function() {
				var _oparate = '';
				_oparate = this.id;
				return _oparate;
			}
		},
		methods: {},
		events: {}
	});
	return Yxhd;
});