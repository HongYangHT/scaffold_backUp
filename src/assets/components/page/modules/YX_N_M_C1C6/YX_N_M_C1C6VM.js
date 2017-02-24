/**
 * @Module YX_N_M_C1C6 
 * @author LSX
 * @description 商品池需求4.0
 */
define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_C1C6/YX_N_M_C1C6.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {
	var _default = {
		contentInfo: {
			goodsId: '',
			sideImage: 'http://mimg.127.net/hz/uploader/20170220/14875835419550075.jpg',
			backgroundImage:'http://mimg.127.net/hz/uploader/20170220/14875837521520076.jpg',
			needScenePicUrl:1
		},
		temp: [{
			id: "1074000",
			newItemFlag: false,
			offPrice: "199",
			scenePicUrl: "http://yanxuan.nosdn.127.net/347bcb0b1b09436a0155141e9b1149be.jpg",
			primarySkuId: "1030011",
			retailPrice: "199.0",
			sellVolume: 1,
			simpleDesc: "细腻冷雾，安静滋润",
			title: "日式和风超声香薰机",
			unitPrice: "344"
			
		}, {
			id: "1030017",
			newItemFlag: false,
			offPrice: "59",
			scenePicUrl: "http://yanxuan.nosdn.127.net/eb754ee67e2afdb9348c8397a33c465d.jpg",
			primarySkuId: "1030023",
			retailPrice: "299.0",
			sellVolume: 1,
			simpleDesc: "细腻冷雾，安静滋润",
			title: "日式和风超声香薰机",
			unitPrice: "349"
			
		}, {
			id: "1031008",
			newItemFlag: false,
			offPrice: "59",
			scenePicUrl: "http://yanxuan.nosdn.127.net/347bcb0b1b09436a0155141e9b1149be.jpg",
			primarySkuId: "1030020",
			retailPrice: "59.0",
			sellVolume: 1,
			simpleDesc: "细腻冷雾，安静滋润",
			title: "日式和风超声香薰机",
			unitPrice: "158"
			
		}]
	};
	var YX_N_M_C1C6 = Vue.extend({
		name: 'YX_N_M_C1C6',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch: {
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
						Tools.getAjaxData('https://spread.mail.163.com/mail/goods/getGroup', {
							id: value
						}, function(res) {
							var _goods = res.content.goodsList;
							var _temp = $.map(_goods, function(v, k) {
								var extend = v.extend;
								return $.extend({},{
									id: v.id,
									title: v.title,
									simpleDesc: v.simpleDesc,
									primaryPicUrl: v.primaryPicUrl+'?imageView&thumbnail=600x600&quality=95',
									scenePicUrl:v.scenePicUrl+'?imageView&thumbnail=600x600&quality=95',
									primarySkuId: v.notSoldOutGoods.skuId,
									retailPrice: v.retailPrice,
									unitPrice: parseFloat(v.unitPrice) == parseFloat(v.offPrice) ? '' : v.unitPrice,
									offPrice: v.offPrice,
									sellVolume: v.sellVolume,
									maker:'',
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
			'contentInfo.sideImage.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'sideImage': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.backgroundImage.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'backgroundImage': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.needScenePicUrl.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'needScenePicUrl': {
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
	return YX_N_M_C1C6;
});