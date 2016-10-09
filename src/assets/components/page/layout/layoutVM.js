define([
	'Vue',
	'text!components/page/layout/layout.mustache',
	'model/model',
	'common/mixins/pageMixins',
	'mustache',
	'common/directive/setStyle',
	'uuid'
], function(Vue, tpl, Model, pageMixins, mustache) {
	var model = new Model();
	var _default = {
		id: Math.uuid(32, 16).toLowerCase(),
		layout: {
			title: {
				"key": "title",
				"value": "页面 title",
				"name": "页面 title",
				"type": "textarea"
			},
			description: {
				"key": "description",
				"value": "页面 description",
				"name": "页面 description",
				"type": "textarea"
			},
			keywords: {
				"key": "keywords",
				"value": "页面 keywords",
				"name": "页面 keywords",
				"type": "textarea"
			}
		}
	};
	var Layout = Vue.extend({
		name: 'layout',
		components: {},
		template: tpl,
		data: function() {
			var _data = _default;
			this.$dispatch('saveLayoutData', _data); //让root保存一份数据
			return _data;
		},
		mixins: [pageMixins],
		computed: {
			title: function() {
				return this.layout.title;
			},
			description: function() {
				return this.layout.description;
			},
			keywords: function() {
				return this.layout.keywords;
			}
		},
		methods: {
			showModal: function($event) {
				var $target = $($event.target),
					data = {
						flag: true
					};
				this.$dispatch('addShowModal', data);
			}
		},
		events: {
			changeLayout: function(layout) {
				this.id = layout.id;
				this.layout = layout.layout;
			}
		}
	});

	return Layout;
});