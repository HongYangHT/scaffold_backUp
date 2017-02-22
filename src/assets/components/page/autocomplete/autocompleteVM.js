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
				suggestions: [],
				type: '',
				suit: '',
				component: ''
			};
		},
		computed: {
			size: function() {
				return this.suggestions && this.suggestions.length ? true : false;
			},
			filter: function() {
				return this.type + ' ' + this.suit + ' ' + this.component;
			},
			filters: function() {
				var filters = [];
				this.type && filters.push({
					type: 'type',
					value: this.type
				});
				this.suit && filters.push({
					type: 'suit',
					value: this.suit
				});
				this.component && filters.push({
					type: 'component',
					value: this.component
				});
				return filters;
			}
		},
		methods: {
			notifyToView: function($event, zoom) {
				this.$dispatch('notifyChangeToView', zoom);
			},
			notifyToAdd: function($event, type) {
				this.$dispatch('notifyChangeToAdd', type);
			},
			setType: function($event, type) {
				switch (type) {
					case 0:
						this.type = '邮箱大师';
						break;
					case 1:
						this.type = '网易有钱';
						break;
					case 2:
						this.type = '网易严选';
						break;
					case 3:
						this.type = '一元夺宝';
						break;
					case 4:
						this.type = 'VIP邮箱';
						break;
					case 5:
						this.type = '其他';
						break;
					case 6:
						this.type = 'AI商城';
						break;

				}
			},
			setSuit: function($event, suit) {
				switch (suit) {
					case 0:
						this.suit = '移动端';
						break;
					case 1:
						this.suit = 'pc端';
						break;
				}
			},
			setComponent: function($event, component) {
				switch (component) {
					case 0:
						this.component = '公共模板';
						break;
					case 1:
						this.component = 'banner模板';
						break;
					case 2:
						this.component = '商品位模板';
						break;
					case 3:
						this.component = '商品位模板（未接goods系统）';
						break;
					case 4:
						this.component = '活动规则';
						break;
				}
			},
			removeFilter: function($event, type) {
				switch (type) {
					case 'type':
						this.type = '';
						$(this.$el).find('[name="type"]').prop('checked', false);
						break;
					case 'suit':
						this.suit = '';
						$(this.$el).find('[name="suit"]').prop('checked', false);
						break;
					case 'component':
						this.component = '';
						$(this.$el).find('[name="component"]').prop('checked', false);
						break;
				}
			}
		},
		events: {}
	});
	return autocomplete;
});