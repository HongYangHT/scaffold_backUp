/**
 * @Module YX_N_M_2BE2 
 * @From 严选乐橙活动
 * @author xpf
 * @description 平铺的商品位模板
 */
define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {
	var _default = {
		contentInfo: {
			goodsId: '',
			backgroundImage: 'http://mimg.127.net/hz/uploader/20160823/14719320936020207.jpg',
			bgColor:'#fafafa'
		},
		temp: [{
			id: "1031004",
			newItemFlag: false,
			offPrice: "19.9",
			primaryPicUrl: "http://mimg.127.net/hz/uploader/20160825/14721242152530840.jpg",
			primarySkuId: "1030011",
			retailPrice: "19.9",
			sellVolume: 1,
			simpleDesc: "弹力设计不勒脚",
			title: "3双 婴儿彩棉袜子",
			unitPrice: "59*",
			extend: {
				tip_key: " Carters制造商"
			}
		}, {
			id: "1031009",
			newItemFlag: false,
			offPrice: "59",
			primaryPicUrl: "http://mimg.127.net/hz/uploader/20160825/14721242152600841.jpg",
			primarySkuId: "1030023",
			retailPrice: "59.0",
			sellVolume: 1,
			simpleDesc: "排除湿气，宝宝更舒适",
			title: "婴儿彩棉抱被",
			unitPrice: "269*",
			extend: {
				tip_key: " Carters制造商"
			}
		}, {
			id: "1031008",
			newItemFlag: false,
			offPrice: "59",
			primaryPicUrl: "http://mimg.127.net/hz/uploader/20160825/14721242152680842.jpg",
			primarySkuId: "1030020",
			retailPrice: "59.0",
			sellVolume: 1,
			simpleDesc: "会呼吸的柔软面料",
			title: "婴儿彩棉长爬连体衣",
			unitPrice: "158*",
			extend: {
				tip_key: " Carters制造商"
			}
		}, {
			id: "1033000",
			newItemFlag: false,
			offPrice: "199",
			primaryPicUrl: "http://mimg.127.net/hz/uploader/20160825/14721242152750843.jpg",
			primarySkuId: "1032000",
			retailPrice: "199.0",
			sellVolume: 1,
			simpleDesc: "品质上乘的诚意首选",
			title: "婴儿彩棉礼盒八件套",
			unitPrice: "399*",
			extend: {
				tip_key: " Carters制造商"
			}
		}, {
			id: "1046015",
			newItemFlag: false,
			offPrice: "69",
			primaryPicUrl: "http://mimg.127.net/hz/uploader/20160825/14721242152830844.jpg",
			primarySkuId: "1044041",
			retailPrice: "69.0",
			sellVolume: 1,
			simpleDesc: "医用级纱布，抗菌不过敏",
			title: "8条 婴儿纱布尿布",
			unitPrice: "138*",
			extend: {
				tip_key: " Carters制造商"
			}
		}, {
			id: "1006017",
			newItemFlag: false,
			offPrice: "139",
			primaryPicUrl: "http://mimg.127.net/hz/uploader/20160825/14721242152900845.jpg",
			primarySkuId: "1006057",
			retailPrice: "139.0",
			sellVolume: 1,
			simpleDesc: "轻薄吸水防着凉",
			title: "2条 5层纱婴儿纱布浴巾",
			unitPrice: "320*",
			extend: {
				tip_key: " Carters制造商"
			}
		}]
	};
	var YX_N_M_2BE2 = Vue.extend({
		name: 'YX_N_M_2BE2',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch: {
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
									primaryPicUrl: v.detail.primaryPicUrl,
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
							_that.$dispatch('changeDataDefault', _that.id, tempData,true);
						});
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
	return YX_N_M_2BE2;
});