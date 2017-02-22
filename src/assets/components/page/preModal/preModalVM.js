define([
	'Vue',
	'text!components/page/preModal/preModal.mustache',
	'common/mixins/pageMixins',
	'components/page/autocomplete/autocompleteVM'
], function(Vue, tpl, pageMixins, autocompleteVM) {
	var PreModal = Vue.extend({
		name: 'preModal',
		components: {
			'autocomplete-view':autocompleteVM
		},
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
							modules:[/*{
								'img': 'https://mimg.127.net/hz/uploader/20170112/14842229407800115.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170112/14842229407800115.jpg',
								'value': 'YX_S_M_D500',
								'type': 'YX_S_M_D500',
								'suitWeb': true,
								'suitH5': false
							},*/{
								'img': 'https://mimg.127.net/hz/uploader/20170112/14842229407800115.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170112/14842229407800115.jpg',
								'value': 'YX_S_M_35FD',
								'type': 'YX_S_M_35FD',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170112/14842028042970033.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170112/14842028042970033.jpg',
								'value': 'YX_S_M_BF3A',
								'type': 'YX_S_M_BF3A',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170112/14841931301530023.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170112/14841931301530023.jpg',
								'value': 'YX_S_M_D9D0',
								'type': 'YX_S_M_D9D0',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170109/14839664630630182.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839664630630182.jpg',
								'value': 'YX_S_M_EA3D',
								'type': 'YX_S_M_EA3D',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170109/14839647158100097.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839647158100097.jpg',
								'value': 'YX_S_M_CE2D',
								'type': 'YX_S_M_CE2D',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161220/14822229722431545.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161220/14822229722431545.jpg',
								'value': 'YX_S_M_A86B',
								'type': 'YX_S_M_A86B',
								'suitWeb': true,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161219/14821145858471145.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161219/14821145858471145.jpg',
								'value': 'YX_S_M_EE29',
								'type': 'YX_S_M_EE29',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170120/14849011447760139.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170120/14849011447760139.jpg',
								'value': 'YX_S_M_4FDB',
								'type': 'YX_S_M_4FDB',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161219/14821507028151318.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161219/14821507028151318.jpg',
								'value': 'YX_S_M_07DA',
								'type': 'YX_S_M_07DA',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161220/14822033145081424.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161220/14822033145081424.jpg',
								'value': 'YX_S_M_BFA7',
								'type': 'YX_S_M_BFA7',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161216/14818742150761006.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161216/14818742150761006.jpg',
								'value': 'YX_S_M_51E1',
								'type': 'YX_S_M_51E1',
								'suitWeb': true,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161226/14827198248382663.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161226/14827198248382663.jpg',
								'value': 'YX_S_M_3DA7',
								'type': 'YX_S_M_3DA7',
								'suitWeb': true,
								'suitH5': true
							},{
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
								'img': 'https://mimg.127.net/hz/uploader/20161226/14827198248232662.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161226/14827198248232662.jpg',
								'value': 'YX_S_M_19AB',
								'type': 'YX_S_M_19AB',
								'suitWeb': true,
								'suitH5': true
							}/*,{
								'img': 'http://mimg.127.net/hz/uploader/20161202/14806436916670873.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161202/14806436916670873.jpg',
								'value': 'YX_S_M_6D5E',
								'type': 'YX_S_M_6D5E',
								'suitWeb': true,
								'suitH5': true
							}*//*,{
								'img': 'http://mimg.127.net/hz/uploader/20161121/14797117654230219.jpg',
								'zoom': 'http://mimg.127.net/hz/uploader/20161121/14797117654230219.jpg',
								'value': 'YX_S_M_AFA4',
								'type': 'YX_S_M_AFA4',
								'suitWeb': true,
								'suitH5': true
							}*/,{
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
							modules:[/*{
								'img': 'https://mimg.127.net/hz/uploader/20170111/14841386508360004.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170111/14841386508360004.jpg',
								'value': 'YX_N_M_417A',
								'type': 'YX_N_M_417A',
								'suitWeb': true,
								'suitH5': false
							},*/{
								'img':'https://mimg.127.net/hz/uploader/20170209/14866118621490036.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170209/14866118621490036.jpg',
								'value': 'YX_N_M_BCD0',
								'type': 'YX_N_M_BCD0',
								'suitWeb': false,
								'suitH5': true
							}/*,{
								'img': 'https://mimg.127.net/hz/uploader/20170111/14841386508360004.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170111/14841386508360004.jpg',
								'value': 'YX_N_M_4A12',
								'type': 'YX_N_M_4A12',
								'suitWeb': false,
								'suitH5': true
							}*/,{
								'img': 'https://mimg.127.net/hz/uploader/20170110/14840499619080539.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170110/14840499619080539.jpg',
								'value': 'YX_N_M_CB4D',
								'type': 'YX_N_M_CB4D',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170110/14840499034700538.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170110/14840499034700538.jpg',
								'value': 'YX_N_M_A4F1',
								'type': 'YX_N_M_A4F1',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170110/14840370665660387.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170110/14840370665660387.jpg',
								'value': 'YX_N_M_64E0',
								'type': 'YX_N_M_64E0',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170110/14840370379940386.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170110/14840370379940386.jpg',
								'value': 'YX_N_M_D45D',
								'type': 'YX_N_M_D45D',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170109/14839609227630065.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839609227630065.jpg',
								'value': 'YX_N_M_BE90',
								'type': 'YX_N_M_BE90',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170109/14839540766420019.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839540766420019.jpg',
								'value': 'YX_N_M_77DE',
								'type': 'YX_N_M_77DE',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170109/14839435087250039.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839435087250039.jpg',
								'value': 'YX_N_M_94FE',
								'type': 'YX_N_M_94FE',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20170105/14836032681770101.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20170105/14836032681770101.jpg',
								'value': 'YX_N_M_B53B',
								'type': 'YX_N_M_B53B',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161221/14823124571861834.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161221/14823124571861834.jpg',
								'value': 'YX_N_M_B278',
								'type': 'YX_N_M_B278',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161221/14823032926141800.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161221/14823032926141800.jpg',
								'value': 'YX_N_M_C1C3',
								'type': 'YX_N_M_C1C3',
								'suitWeb': false,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161216/14818543574380739.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161216/14818543574380739.jpg',
								'value': 'YX_N_M_FDC0',
								'type': 'YX_N_M_FDC0',
								'suitWeb': true,
								'suitH5': true
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161212/14815242485321232.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161212/14815242485321232.jpg',
								'value': 'YX_N_M_EAB5',
								'type': 'YX_N_M_EAB5',
								'suitWeb': true,
								'suitH5': false
							},{
								'img': 'https://mimg.127.net/hz/uploader/20161209/14812666937120883.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161209/14812666937120883.jpg',
								'value': 'YX_N_M_ACBA',
								'type': 'YX_N_M_ACBA',
								'suitWeb': true,
								'suitH5': false
							},{
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
						},
						rule:{
							title:'活动规则模块',
							modules:[{
								'img': 'https://mimg.127.net/hz/uploader/20161221/14822859093801764.jpg',
								'zoom': 'https://mimg.127.net/hz/uploader/20161221/14822859093801764.jpg',
								'value': 'YX_S_M_20BC',
								'type': 'YX_S_M_20BC',
								'suitWeb': true,
								'suitH5': true
							}]
						}
					}
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
			},
			notifyChangeToView:function(zoom){
				this.list = false;
				this.prev = true;
				this.prevItem = zoom;
			},
			notifyChangeToAdd:function(type){
				var _data = {
					type: type
				};
				this.$dispatch('NavToinsertComponent', _data);
				this.showFlag = false;
			}
		}
	});

	return PreModal;
});