define([
	'Vue',
	'text!components/page/root/root.mustache',
	'components/page/head/headVM',
	'components/page/body/bodyVM',
	'components/page/foot/footVM'
], function(Vue, tpl, HeadVM, BodyVM, FootVM) {
	var Root = Vue.extend({
		name: 'root',
		components: {
			'h-view': HeadVM,
			'b-view': BodyVM,
			'f-view': FootVM
		},
		data: function() {
			return {
				root: 'root',
				id: '',
				picked: 0
			};
		},
		template: tpl,
		methods: {

		},
		events: {
			editOrPreview: function(picked) {
				this.picked = picked;
				this.$broadcast('notifyBody', picked);
			},
			downloadAndSave: function() {
				this.$broadcast('notifyBodyToDownload');
			},
			backHtml: function() {
				this.$broadcast('notifyBackHtml');
			},
			clearHtml: function() {
				this.$broadcast('notifyClearHtml');
			},
			saveHtml: function() {
				this.$broadcast('notifySaveHtml');
			},
			publishHtml: function() {
				this.$broadcast('notifyPublishHtml');
			},
			prevViewHtml: function() {
				this.$broadcast('notifyPrevViewHtml');
			},
			notifyRootShowList: function() {
				this.$broadcast('notifyHeadShowList');
			},
			notifyRootShowModal: function() {
				this.$broadcast('notifyModalShowModal');
			}
		}
	});

	return Root;
});