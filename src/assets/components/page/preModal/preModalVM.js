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
				yanxuan:{
					isYanxuan: true,
					modules:{
						common:{
							title:'公共模块',
							modules:[{
								'img': 'http://mimg.127.net/hz/uploader/20161011/14761714486151576.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485361568.jpg',
								'value': 'yxhd',
								'type': 'yxhd',
								'suitWeb': true,
								'suitH5': true
							},
							{
								'img': 'http://mimg.127.net/hz/uploader/20161011/14761714485131565.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485881573.jpg',
								'value': 'yxft',
								'type': 'yxft',
								'suitWeb': true,
								'suitH5': true
							}]
						},
						banner:{
							title:'Banner模块',
							modules:[{
								'img': 'https://mimg.127.net/hz/uploader/20161205/14809066191120355.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161205/14809066191120355.jpg',
								'value': 'YX_S_M_97D8',
								'type': 'YX_S_M_97D8',
								'suitWeb': true,
								'suitH5': true
							},
							{
								'img': 'https://mimg.127.net/hz/uploader/20161205/14809121475660356.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161205/14809121475660356.jpg',
								'value': 'YX_S_M_0AA8',
								'type': 'YX_S_M_0AA8',
								'suitWeb': true,
								'suitH5': true
							},{
								'img': 'http://mimg.127.net/hz/uploader/20161129/14804085064791443.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161129/14804085064791443.jpg',
								'value': 'YX_S_M_19AB',
								'type': 'YX_S_M_19AB',
								'suitWeb': true,
								'suitH5': true
							},{
								'img': 'http://mimg.127.net/hz/uploader/20161202/14806436916670873.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161202/14806436916670873.jpg',
								'value': 'YX_S_M_6D5E',
								'type': 'YX_S_M_6D5E',
								'suitWeb': true,
								'suitH5': true
							},{
								'img': 'http://mimg.127.net/hz/uploader/20161121/14797117654230219.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161121/14797117654230219.jpg',
								'value': 'YX_S_M_AFA4',
								'type': 'YX_S_M_AFA4',
								'suitWeb': true,
								'suitH5': true
							},{
								'img': 'http://mimg.127.net/hz/uploader/20161117/14793539817441331.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161117/14793539817441331.jpg',
								'value': 'YX_S_M_73D7',
								'type': 'YX_S_M_73D7',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'http://mimg.127.net/hz/uploader/20161117/14793668815171343.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161117/14793668815171343.jpg',
								'value': 'YX_S_M_0CE9',
								'type': 'YX_S_M_0CE9',
								'suitWeb': true,
								'suitH5': false
							}]
						},
						GoodsModules:{
							title:'商品位模块(接入goods系统)',
							modules:[{
								'img': 'https://mimg.127.net/hz/uploader/20161205/14809274258960399.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161205/14809274258960399.jpg',
								'value': 'YX_N_M_92C9',
								'type': 'YX_N_M_92C9',
								'suitWeb': true,
								'suitH5': true
							},{
								'img': 'http://mimg.127.net/hz/uploader/20161122/14797812303460424.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161122/14797812303460424.jpg',
								'value': 'YX_N_M_46EB',
								'type': 'YX_N_M_46EB',
								'suitWeb': true,
								'suitH5': true
							},{
								'img': 'http://mimg.127.net/hz/uploader/20161102/14780522153243951.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161102/14780522153243951.jpg',
								'value': 'YX_N_M_9BBD',
								'type': 'YX_N_M_9BBD',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'http://mimg.127.net/hz/uploader/20161102/14780522153353952.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161102/14780522153353952.jpg',
								'value': 'YX_N_M_2BE2',
								'type': 'YX_N_M_2BE2',
								'suitWeb': true,
								'suitH5': false
							},{
								'img':'http://mimg.127.net/hz/uploader/20161102/14780522153453953.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161102/14780522153453953.jpg',
								'value': 'YX_N_M_7A5D',
								'type': 'YX_N_M_7A5D',
								'suitWeb': true,
								'suitH5': false
							},{
								'img':'http://mimg.127.net/hz/uploader/20161102/14780522153133950.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161102/14780522153133950.jpg',
								'value': 'YX_N_M_A1C6',
								'type': 'YX_N_M_A1C6',
								'suitWeb': true,
								'suitH5': false
							},{
								'img':'http://mimg.127.net/hz/uploader/20161116/14792617349681175.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161116/14792617349681175.jpg',
								'value': 'YX_N_M_881B',
								'type': 'YX_N_M_881B',
								'suitWeb': true,
								'suitH5': false
							},{
								'img':'http://mimg.127.net/hz/uploader/20161128/14802985110610600.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161128/14802985110610600.jpg',
								'value': 'YX_N_M_C6E9',
								'type': 'YX_N_M_C6E9',
								'suitWeb': true,
								'suitH5': false
							},{
								'img':'http://mimg.127.net/hz/uploader/20161128/14803040464190649.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161128/14803040464190649.jpg',
								'value': 'YX_N_M_DB08',
								'type': 'YX_N_M_DB08',
								'suitWeb': true,
								'suitH5': false
							}]
						},
						NoneGoodsModules:{
							title:'商品位模块（未接入goods系统）',
							modules:[{
								'img': 'http://mimg.127.net/hz/uploader/20161011/14761714485001563.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485661571.jpg',
								'value': 'yxBackModule',
								'type': 'yxBackModule',
								'suitWeb': true,
								'suitH5': false
							}]
						}
					}
				},
				/*yanxuan: {
					isYanxuan: true,
					modules: [{
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
					}, {
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
					},{
						'img': 'http://mimg.127.net/hz/uploader/20161101/14779796005773817.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161101/14779796005773817.jpg',
						'value': 'YX_N_M_2BE2',
						'type': 'YX_N_M_2BE2'
					}, {
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
					}],
					units: []
				},*/
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