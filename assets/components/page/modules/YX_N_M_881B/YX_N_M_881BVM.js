define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_881B/YX_N_M_881B.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo: {
			goodsId: '76',
			titleImage:'http://mimg.127.net/hz/uploader/20160829/14724404035340166.png',
			bgColor:'#f6f6f6'
		},
		temp:[{
			"id": "1023004",
			"title": "月牙白新骨瓷餐具套装",
			"simpleDesc": "时尚简约，坚实耐用",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/6257825bfc4143b5367c99fdd0d7b5e2.png?imageView&thumbnail=360x360&quality=95",
			"primarySkuId": "1022011",
			"retailPrice": "29.0",
			"unitPrice": "1673",
			"offPrice": "299",
			"sellVolume": 1,
			"newItemFlag": false,
			"flag1":false,
			"flag2":false
		},{
			"id": "1006014",
			"title": "双宫茧桑蚕丝被子母被",
			"simpleDesc": "子母被设计，四季皆可使用",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/fb4878f030214859389cde8c5594bd69.png?imageView&thumbnail=360x360&quality=95",
			"primarySkuId": "1006046",
			"retailPrice": "1199.0",
			"unitPrice": "1199",
			"offPrice": "1199",
			"sellVolume": 1,
			"newItemFlag": false,
			"flag1":false,
			"flag2":false
		},{
			"id": "1030001",
			"title": "160*230羊毛手工地毯",
			"simpleDesc": "印度进口，手工编织，简约百搭",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/82ae5cc7390fe8e176f3471ffb6d36b3.png?imageView&thumbnail=360x360&quality=95",
			"primarySkuId": "1029001",
			"retailPrice": "969.0",
			"unitPrice": "1399",
			"offPrice": "969",
			"sellVolume": 1,
			"newItemFlag": false,
			"flag1":true,
			"flag2":false
		},{
			"id": "1030021",
			"title": "锅具组合",
			"simpleDesc": "24cm珐琅锅+不锈钢炒锅组合",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/808856496b8bcd69287f33c043f176cf.png?imageView&thumbnail=360x360&quality=95",
			"primarySkuId": "1079000",
			"retailPrice": "699.0",
			"unitPrice": "699",
			"offPrice": "699",
			"sellVolume": 1,
			"newItemFlag": true,
			"flag1":false,
			"flag2":false
		},{
			"id": "1024002",
			"title": "色织双层格子浴衣",
			"simpleDesc": "弱捻色织纱布，柔软亲肤，更加透气",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/e173ad67dcebb6526a27703a7e9fbb40.png?imageView&thumbnail=360x360&quality=95",
			"primarySkuId": "1023005",
			"retailPrice": "199.0",
			"unitPrice": "799",
			"offPrice": "199",
			"sellVolume": 1,
			"newItemFlag": true,
			"flag1":false,
			"flag2":false
		},{
			"id": "1030006",
			"title": "日式纯棉色织AB格四件套",
			"simpleDesc": "凹凸立体格纹，细节体现质感",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/ee5b1ad4245f6e2d6ba6b9ebb93c4137.png?imageView&thumbnail=360x360&quality=95",
			"primarySkuId": "1029020",
			"retailPrice": "459.0",
			"unitPrice": "899",
			"offPrice": "459",
			"sellVolume": 1,
			"newItemFlag": true,
			"flag1":false,
			"flag2":false
		}]
	};
	var YX_N_M_881B = Vue.extend({
		name: 'YX_N_M_881B',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch:{
			'contentInfo.goodsId.value':{
				'handler':function(value,old){
					if (value) {
						var data = {
								'contentInfo': {
									'goodsId': {
										'value': old
									}
								}
							},
							_that = this;
						Tools.getAjaxData('http://activity.mail.163.com/hdapi/api2/goods/ajax/getGroup.do', {
							id: value
						}, function(res) {
							var _goods = res.content.goodsList;
							var _temp = $.map(_goods, function(v, k) {
								var extend = Tools.handleData(v.detail.extend);
								return $.extend({},{
									id: v.detail.id,
									title: v.detail.title,
									simpleDesc: v.detail.simpleDesc,
									primaryPicUrl: v.detail.primaryPicUrl + '?imageView&thumbnail=360x360&quality=95',
									primarySkuId: v.detail.primarySkuId,
									retailPrice: v.detail.retailPrice,
									unitPrice: v.detail.unitPrice,
									offPrice: v.detail.offPrice,
									sellVolume: v.detail.sellVolume,
									newItemFlag: v.detail.newItemFlag,
									flag1:'',
									flag2:''
								},extend);
							});
							var tempData = $.extend({}, _that._data, new Data2Vue({
								data: {
									temp: _temp
								},
								id: _that.id
							}).getResult());

							_that.$data = tempData;
							_that.$dispatch('changeDataDefault', _that.id, tempData,true);
						});
					}
				}
			},
			'contentInfo.titleImage.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'titleImage': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.bgColor.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'bgColor': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			}
		},
		computed: {
			oparate: function() {
				var _oparate = '';
				_oparate = this.id;
				return _oparate;
			}
		},
		methods: {},
		events: {}
	});	
	return YX_N_M_881B;
});