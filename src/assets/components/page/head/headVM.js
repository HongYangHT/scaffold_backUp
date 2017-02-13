define([
	'Vue',
	'text!components/page/head/head.mustache',
	'mustache',
	'notify'
], function(Vue, tpl, mustache) {
	var Head = Vue.extend({
		name: 'head',
		components: {

		},
		template: tpl,
		data: function() {
			return {
				edit: '编辑',
				prev: '布局',
				download: '下载',
				back: '撤销',
				clear: '清空',
				save: '保存',
				prevView: '预览',
				publish: '发布',
				showList: '上次编辑',
				shareConfig: '页面分享信息', //分享信息设置
				shareModel: '分享模板', // 分享页面模板设置
				getShareTemplate: '搜索上线模板', // 用于搜索模板
				showListVal: false,
				shareConfigVal: true,
				shareModalVal: (window.share || window.id),
				shareGetShareTemplate: !(window.share || window.id),
				picked: 0,
				head: 'head',
				id: ''
			};
		},
		computed: {
			editActive: function() {
				return this.picked == 0 ? true : false;
			},
			prevActive: function() {
				return this.picked == 1 ? true : false;
			},
			downloadActive: function() {
				return this.picked == 2 ? true : false;
			},
			backActive: function() {
				return this.picked == 3 ? true : false;
			},
			clearActive: function() {
				return this.picked == 4 ? true : false;
			},
			saveActive: function() {
				return this.picked == 5 ? true : false;
			},
			publishActive: function() {
				return this.picked == 6 ? true : false;
			},
			prevViewActive: function() {
				return this.picked == 7 ? true : false;
			},
			showListActive: function() {
				return this.picked == 8 ? true : false;
			},
			shareConfigActive: function() {
				return this.picked == 9 ? true : false;
			},
			shareModelActive: function() {
				return this.picked == 10 ? true : false;
			},
			getShareTemplateActive: function() {
				return this.picked == 11 ? true : false;
			}
		},
		methods: {
			handleClick: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('editOrPreview', picked);
			},
			downloadHtml: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('downloadAndSave');
				this.$dispatch('editOrPreview', picked);
			},
			//撤销
			backHtml: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('backHtml');
				this.$dispatch('editOrPreview', picked);
			},
			clearHtml: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('clearHtml');
				this.$dispatch('editOrPreview', picked);
			},
			saveHtml: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('saveHtml');
				this.$dispatch('editOrPreview', picked);
			},
			publishHtml: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('publishHtml');
				this.$dispatch('editOrPreview', picked);
			},
			preViewHtml: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('preViewHtml');
				this.$dispatch('editOrPreview', picked);
			},
			showListTable: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('notifyRootShowModal');
			},
			// 分享内容设置
			shareConfigModal: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('notifyRootShareConfigModal');
			},
			// 分享模板
			shareModalList: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				if (window.share || window.id) {
					this.$dispatch('notifyRootshareModalList');
				} else {
					$.notify({
						title: '只有预览和发布后的模板才能分享哦！',
						type: 'error'
					});
				}
			},
			getShareTemplateFun: function($event, picked) {
				if ($($event.target).is('input')) {
					return;
				}
				// 分发给root
				this.$dispatch('notifyRootGetShareTemplate');
			}
		},
		events: {
			notifyHeadShowList: function() {
				this.showListVal = true;
			}
		}
	});

	return Head;
});