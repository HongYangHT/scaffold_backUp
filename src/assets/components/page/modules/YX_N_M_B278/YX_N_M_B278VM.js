define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_B278/YX_N_M_B278.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			goodsId: '',
			titleImg: 'https://mimg.127.net/hz/uploader/20161221/14822893950961767.png'
		},
		temp:[{
			"id": "1042007",
			"title": "蓝莓曲奇 110克",
			"simpleDesc": "混合蓝莓果味的清香，成就甜蜜滋味",
			"primaryPicUrl":"http://yanxuan.nosdn.127.net/74e41e98cb5c855077d8cfb2c9b4e6d2.png?imageView&quality=95&thumbnail=285x285",
			"primarySkuId": "1040012",
			"offPrice": "16",
			"retailPrice": "16.0",
			"unitPrice": "16",
			"newItemFlag": true,
			"flag1":false,
			"flag2":false,
			"maker":"双立人制造商"
		},
		{
			"id": "1070000",
			"title": "星云酥 180克/3颗",
			"simpleDesc": "醇香蛋黄融入绿茶，好料层层美味",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/74e41e98cb5c855077d8cfb2c9b4e6d2.png?imageView&quality=95&thumbnail=285x285",
			"primarySkuId": "1074000",
			"offPrice": "26",
			"retailPrice": "26.0",
			"unitPrice": "26",
			"newItemFlag": false,
			"flag1":true,
			"flag2":false,
			"maker":""
		}]
	};

	var YX_N_M_B278 = Vue.extend({
		name: 'YX_N_M_B278',
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
									primaryPicUrl: v.detail.primaryPicUrl + '?imageView&quality=95&thumbnail=285x285',
									primarySkuId: v.detail.primarySkuId,
									retailPrice: v.detail.retailPrice,
									unitPrice: (parseFloat(v.detail.unitPrice) == parseFloat(v.detail.offPrice) ? '': v.detail.unitPrice),
									offPrice: v.detail.offPrice,
									sellVolume: v.detail.sellVolume,
									newItemFlag: v.detail.newItemFlag,
									underShelf:false,
									maker:'',
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
			'contentInfo.titleImg.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'titleImg': {
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

	return YX_N_M_B278;
});