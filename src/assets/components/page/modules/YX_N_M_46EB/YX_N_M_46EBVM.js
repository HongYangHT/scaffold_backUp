define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_46EB/YX_N_M_46EB.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {
	var _default = {
		contentInfo: {
			goodsId: '',
			title:'优雅男士皮具好物',
			tip1:'来自Coach制造商的优雅精致皮具，品质典范象征。',
			tip2:'对于男生来说手机、移动电源、数据线、耳机、钥匙都是出门必备，一个不同的钱包已经无法满足了。',
			tip3:'这款D-park数码收纳包便是最好用的，完美收纳各种必备品。'
		},
		temp:[{
			id: "1048002",
			newItemFlag: false,
			offPrice: "69",
			primaryPicUrl: "http://yanxuan.nosdn.127.net/74e41e98cb5c855077d8cfb2c9b4e6d2.png?imageView&quality=95&thumbnail=245x245",
			primarySkuId: "1047007",
			retailPrice: "69.0",
			sellVolume: 1,
			simpleDesc: "日式萌趣设计，环保安全",
			title: "儿童日式卡通储蓄罐",
			unitPrice: "69"
		},{
			id: "1033000",
			newItemFlag: false,
			offPrice: "199",
			primaryPicUrl: "http://yanxuan.nosdn.127.net/c6e2d807b20b204d622decd880795aa7.png?imageView&quality=95&thumbnail=245x245",
			primarySkuId: "1032000",
			retailPrice: "199.0",
			sellVolume: 1,
			simpleDesc: "贴心甄选，诚意之礼",
			title: "新生彩棉初衣礼盒",
			unitPrice: "399"
		},{
			id: "1055015",
			newItemFlag: false,
			offPrice: "299",
			primaryPicUrl: "http://yanxuan.nosdn.127.net/06b253c5ec94141c8351ff0c83159eb2.png?imageView&quality=95&thumbnail=245x245",
			primarySkuId: "1056031",
			retailPrice: "299.0",
			sellVolume: 1,
			simpleDesc: "亲肤舒适，呵护宝贝的每一寸肌肤",
			title: "新生彩棉初衣礼盒",
			unitPrice: "399"
		},{
			id: "1061002",
			newItemFlag: false,
			offPrice: "199",
			primaryPicUrl: "http://yanxuan.nosdn.127.net/95171d1d4173459d4ef375a13f841aff.png?imageView&quality=95&thumbnail=245x245",
			primarySkuId: "1062009",
			retailPrice: "199.0",
			sellVolume: 1,
			simpleDesc: "新疆长绒棉，来自阳光的温暖",
			title: "日式儿童棉花被芯500G",
			unitPrice: "199"
		}]
	};
	var YX_N_M_46EB = Vue.extend({
		name: 'YX_N_M_46EB',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch:{
			'contentInfo.goodsId.value': {
				'handler': function(value, old) {
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
								return {
									id: v.detail.id,
									title: v.detail.title,
									simpleDesc: v.detail.simpleDesc,
									primaryPicUrl: v.detail.primaryPicUrl + '?imageView&quality=95&thumbnail=245x245',
									primarySkuId: v.detail.primarySkuId,
									retailPrice: v.detail.retailPrice,
									unitPrice: v.detail.unitPrice,
									offPrice: v.detail.offPrice,
									sellVolume: v.detail.sellVolume,
									newItemFlag: v.detail.newItemFlag,
									extend: extend
								};
							});
							var tempData = $.extend({}, _that._data, new Data2Vue({
								data: {
									temp: _temp
								},
								id: _that.id
							}).getResult());

							_that.$data = tempData;
							_that.$dispatch('changeDataDefault', _that.id, tempData, true);
						});
					}
				}
			},
			'contentInfo.title.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'title': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip1.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip1': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip2.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip2': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip3.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip3': {
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
	return YX_N_M_46EB;
});