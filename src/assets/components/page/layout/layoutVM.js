define([
	'Vue',
	'text!components/page/layout/layout.mustache',
	'model/model',
	'common/mixins/pageMixins',
	'mustache',
	'components/page/shareInfo/shareInfoVM',
	'components/page/shareModal/shareModalVM',
	'common/filter/format',
	'common/directive/setStyle',
	'common/directive/sort',
	'uuid'
], function(Vue, tpl, Model, pageMixins, mustache, ShareInfoVM, ShareModalVM) {
	var model = new Model();

	/*
		设置分享信息
		1.需要两个模块，一个配置模块shareModal，一个存储模块shareInfo
		2.数据要重新转换一下
	*/
	var _default = {
		id: Math.uuid(32, 16).toLowerCase(),
		layout: {
			title: {
				"key": "title",
				"value": "",
				"name": "页面标题",
				"type": "textarea"
			},
			description: {
				"key": "description",
				"value": "",
				"name": "页面描述",
				"type": "textarea"
			},
			keywords: {
				"key": "keywords",
				"value": "",
				"name": "页面关键字",
				"type": "textarea"
			},
			startTime: {
				"key": "startTime",
				"value": new Date(parseInt(new Date().getTime(), 10)).toString('yyyy/MM/dd hh:mm:ss'),
				"name": "活动开始时间",
				"type": "input"
			},
			endTime: {
				"key": "endTime",
				"value": new Date(parseInt(new Date().getTime() + 30 * 24 * 3600 * 1000, 10)).toString('yyyy/MM/dd hh:mm:ss'),
				"name": "活动结束时间",
				"type": "input"
			},
			category: {
				"key": "category",
				"value": "2",
				"name": "活动分类",
				"type": "select",
				"options": [{
					"name": "邮箱大师",
					"value": "0"
				}, {
					"name": "有钱",
					"value": "1"
				}, {
					"name": "严选",
					"value": "2"
				}, {
					"name": "一元夺宝",
					"value": "3"
				}, {
					"name": "vip",
					"value": "4"
				}, {
					"name": "AI",
					"value": "6"
				}, {
					"name": "其他",
					"value": "5"
				}]
			},
			admin: {
				"key": "admin",
				"value": "",
				"name": "负责人",
				"type": "input"
			}
		},
		showFlag: true,
		info: {
			img: {
				'type': 'input',
				'name': '分享图',
				'key': 'img',
				'value': '',
				'needUpload': true,
				'tip': '分享小图建议使用1:1,尺寸大小100x100,大小限制在50k以内'
			},
			url: {
				'key': 'url',
				'value': '',
				'name': '分享链接',
				'type': 'input'
			},
			title: {
				'key': 'title',
				'value': '',
				'name': '分享标题',
				'type': 'input'
			},
			desc: {
				'key': 'desc',
				'value': '',
				'name': '分享描述',
				'type': 'textarea'
			}
		}
	};
	var Layout = Vue.extend({
		name: 'layout',
		components: {
			'share-info-view': ShareInfoVM,
			'share-modal-view': ShareModalVM
		},
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
			},
			startTime: function() {
				return this.layout.startTime;
			},
			endTime: function() {
				return this.layout.endTime;
			},
			category: function() {
				return this.layout.category;
			},
			admin: function() {
				return this.layout.admin;
			},
			info: function() {
				return this._data.info;
			}
		},
		methods: {
			showModal: function($event) {
				var $target = $($event.target),
					data = {
						flag: true
					};
				this.$dispatch('addShowModal', data);
			},
			// 通知显示预览弹窗
			addShowPrevList: function() {
				this.$dispatch('showPrevList');
			}
		},
		events: {
			changeLayout: function(layout) {
				this.id = layout.id;
				this.layout = layout.layout;
				this._data.info = layout.info;
			},
			saveShareModalData: function(shareInfo) {
				this.shareInfo = shareInfo;
				this.$broadcast('setShareInfo', shareInfo);
			}
		}
	});

	return Layout;
});