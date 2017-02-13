/*
 * 该模块用于搜索模块，可进行模糊查询
 * 1. 可进行模糊查询，所以需要对所有的模块进行统一的命名(提供两种搜索方式，一种是名字搜索、一种是type搜索)
 * 2. 模块查询时可以显示小图标 （名字加图片显示）
 * 3. 模块分域化（YX YQ DB DS VIP AI）
 * 4. 选中之后直接显示在下方，跟以前预览一样，可以直接点击添加和搜索
 */

define([
	'Vue',
	'text!components/page/autocomplete/autocomplete.mustache',
	'common/mixins/pageMixins',
	'mustache',
	'common/directive/autocomplete'
], function(Vue, tpl, pageMixins, mustache) {
	var autocomplete = Vue.extend({
		name: 'autocomplete',
		components: {},
		template: tpl,
		mixins: [pageMixins],
		data: function() {
			return {
				autocomplete: '',
				suggestions:[]
			};
		},
		computed: {
			size:function(){
				return this.suggestions && this.suggestions.length ? true : false;
			}
		},
		methods: {
			notifyToView: function($event, zoom) {
				this.$dispatch('notifyChangeToView', zoom);
			},
			notifyToAdd: function($event, type) {
				this.$dispatch('notifyChangeToAdd', type);
			}
		},
		events: {}
	});
	return autocomplete;
});