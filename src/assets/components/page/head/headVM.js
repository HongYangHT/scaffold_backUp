define([
	'Vue',
	'text!components/page/head/head.mustache',
	'mustache'
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
				showListVal: false,
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
			}
		},
		methods: {
			handleClick: function($event,picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('editOrPreview', picked);
			},
			downloadHtml: function($event,picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('downloadAndSave');
				this.$dispatch('editOrPreview', picked);
			},
			//撤销
			backHtml: function($event,picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('backHtml');
				this.$dispatch('editOrPreview', picked);
			},
			clearHtml: function($event,picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('clearHtml');
				this.$dispatch('editOrPreview', picked);
			},
			saveHtml: function($event,picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('saveHtml');
				this.$dispatch('editOrPreview', picked);
			},
			publishHtml: function($event,picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('publishHtml');
				this.$dispatch('editOrPreview', picked);
			},
			prevViewHtml: function($event,picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.$dispatch('preViewHtml');
				this.$dispatch('editOrPreview', picked);
			},
			showListTable: function($event,picked) {
				if ($($event.target).is('input')) {
					return;
				}
				this.showListVal = false;
				this.$dispatch('notifyRootShowModal');
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