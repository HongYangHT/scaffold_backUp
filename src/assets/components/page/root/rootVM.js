define([
	'Vue',
	'text!components/page/root/root.mustache',
	'components/page/head/headVM',
	'components/page/body/bodyVM',
	'components/page/foot/footVM',
	'model/model',
	'common/helper/url'
], function(Vue, tpl, HeadVM, BodyVM, FootVM, Model, Url) {
	var _model = new Model();
	var reg = /^\d{1,31}$/;
	window.id = Url.getQuery(window.location.href, 'id') || Url.getHash(window.location.hash, 'id');
	window.share = Url.getQuery(window.location.href, 'share') || Url.getHash(window.location.hash, 'share');
	window.share = reg.test(window.share) ? window.share : false;
	window.id = reg.test(window.id) ? window.id : false;

	var Root = Vue.extend({
		name: 'root',
		components: {
			'h-view': HeadVM,
			'b-view': BodyVM,
			'f-view': FootVM
		},
		data: function() {
			var that = this;
			if (window.id || window.share) {
				_model.getActInfo({
					data: {
						id: window.id || window.share || ''
					}
				}).done(function(result) {
					if (result.code == 200) {
						setTimeout(function() {
							that.$broadcast('notifyBodyContinueEdit', {
								id: id,
								item: JSON.parse(result.result.extend)
							});
						}, 0);
					} else {
						$.notify({
							title: result.msg,
							type: 'error'
						});
					}
				});
			}
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
			preViewHtml: function() {
				this.$broadcast('notifyPrevViewHtml');
			},
			notifyRootShowList: function() {
				this.$broadcast('notifyHeadShowList');
			},
			notifyRootShowModal: function() {
				this.$broadcast('notifyModalShowModal');
			},
			notifyRootShareConfigModal: function() {
				this.$broadcast('notifyShareConfigModal');
			},
			notifyRootshareModalList: function() {
				this.$broadcast('notifyShareModal');
			},
			notifyRootGetShareTemplate: function() {
				this.$broadcast('notifyGetShareTemplate');
			},
			// repaint template
			notifyRootToRepaint: function(templateId) {
				var that = this;
				_model.getActInfo({
					data: {
						id: templateId
					}
				}).done(function(result) {
					if (result.code == 200) {
						setTimeout(function() {
							that.$broadcast('notifyBodyContinueEdit', {
								id: id,
								item: JSON.parse(result.result.extend)
							});
						}, 0);
					} else {
						$.notify({
							title: result.msg,
							type: 'error'
						});
					}
				});
			}
		}
	});

	return Root;
});