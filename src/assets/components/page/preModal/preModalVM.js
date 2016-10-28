define([
	'Vue',
	'text!components/page/preModal/preModal.mustache',
	'common/mixins/pageMixins'
], function(Vue, tpl, pageMixins) {
	var PreModal = Vue.extend({
		name: 'preModal',
		components: {},
		template: tpl,
		mixins: [pageMixins],
		data: function() {
			return {
				id: Math.uuid(32, 16).toLowerCase(),
				showFlag: false,
				list: true,
				prev: false,
				prevItem: '',
				master: {
					isMaster: false,
					modules: [],
					units: []
				},
				yanxuan: {
					isYanxuan: true,
					modules: [/*{
						'img': 'http://mimg.127.net/hz/uploader/20161011/14761714486151576.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485361568.jpg',
						'value': 'yxhd',
						'type': 'yxhd'
					}, {
						'img': 'http://mimg.127.net/hz/uploader/20161011/14761714486221577.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485441569.jpg',
						'value': 'yxBanner',
						'type': 'yxBanner'
					}, {
						'img': 'http://mimg.127.net/hz/uploader/20161011/14761714484941562.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485561570.jpg',
						'value': 'yxBanner2',
						'type': 'yxBanner2'
					}, */{
						'img': 'http://mimg.127.net/hz/uploader/20161011/14761714485001563.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485661571.jpg',
						'value': 'yxBackModule',
						'type': 'yxBackModule'
					},
					{
						'img': 'http://mimg.127.net/hz/uploader/20161028/14776529914842415.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161028/14776529914842415.jpg',
						'value': 'YX_N_M_9BBD',
						'type': 'YX_N_M_9BBD'
					}/*, {
						'img': 'http://mimg.127.net/hz/uploader/20161011/14761714485071564.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485771572.jpg',
						'value': 'yxBackModule2',
						'type': 'yxBackModule2'
					}, {
						'img': 'http://mimg.127.net/hz/uploader/20161011/14761714485191566.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485981574.jpg',
						'value': 'yxRule',
						'type': 'yxRule'
					}, {
						'img': 'http://mimg.127.net/hz/uploader/20161011/14761714486091575.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485261567.jpg',
						'value': 'yxTemp',
						'type': 'yxTemp'
					}, {
						'img': 'http://mimg.127.net/hz/uploader/20161011/14761714485131565.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485881573.jpg',
						'value': 'yxft',
						'type': 'yxft'
					}*/],
					units: []
				},
				youqian: {
					isYouqian: false,
					modules: [],
					units: []
				},
				yiyuan: {
					isYiyuan: false,
					modules: [],
					units: []
				}
			};
		},
		methods: {
			hideModal: function() {
				this.showFlag = false;
			},
			// 预览图
			changeToView: function($event, zoom) {
				this.list = false;
				this.prev = true;
				this.prevItem = zoom;
			},
			// 增加模块
			changeToAdd: function($event, type) {
				var _data = {
					type: type
				};
				this.$dispatch('NavToinsertComponent', _data);
				this.showFlag = false;
			},
			changeToBack: function() {
				this.list = true;
				this.prev = false;
			}
		},
		events: {
			notifyShowPrevList: function() {
				this.showFlag = true;
			}

		}
	});

	return PreModal;
});