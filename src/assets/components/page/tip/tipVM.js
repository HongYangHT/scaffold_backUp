define([
	'Vue',
	'text!components/page/tip/tip.mustache',
	'common/mixins/pageMixins'
], function(Vue, tpl, pageMixins) {
	var Tip = Vue.extend({
		name: 'tip',
		components: {},
		template: tpl,
		mixins: [pageMixins],
		data: function() {
			return {
				id: Math.uuid(32, 16).toLowerCase(),
				showFlag: false,
				tip: '',
				operation: '',
				info: ''
			};
		},
		methods: {
			hideModal: function() {
				this.showFlag = false;
			},
			confirmModal: function() {
				this.$dispatch('confirmOperation', {
					operation: this.operation,
					info: this.info
				});
				this.showFlag = false;
			}
		},
		events: {
			// 清空确认
			removeAllConfirm: function(info) {
				this.showFlag = true;
				this.tip = info.tip;
				this.operation = info.type;
				info.info && (this.info = info.info);
			},
			// 删除component 确认
			removeComponentConfirm: function(info){
				this.showFlag = true;
				this.tip = info.tip;
				this.operation = info.type;
				info.info && (this.info = info.info);
			},
			confirmPublish:function(info){
				this.showFlag = true;
				this.tip = info.tip;
				this.operation = info.type;
				info.info && (this.info = info.info);
			}
		}
	});

	return Tip;
});