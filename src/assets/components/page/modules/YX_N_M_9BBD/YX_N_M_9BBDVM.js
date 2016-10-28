/**
 * @Module YX_N_M_9BBD 
 * @From 严选乐橙活动
 * @author xpf
 * @description 轮播形式的商品位模板
 */
define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {

	var _default = {
		contentInfo: {
			goodsId: '66',
			stat_subject: '66',
			backgroundImage: 'http://mimg.127.net/hz/uploader/20160823/14719320935400200.jpg'
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
		}, {
			id: "1028009",
			newItemFlag: false,
			offPrice: "129",
			primaryPicUrl: "http://mimg.127.net/hz/uploader/20160825/14721242152970846.jpg",
			primarySkuId: "1027044",
			retailPrice: "129.0",
			sellVolume: 1,
			simpleDesc: "超大容量，满足妈咪出行",
			title: "日式妈咪包",
			unitPrice: "1190*",
			extend: {
				tip_key: " Carters制造商"
			}
		}, {
			id: "1030018",
			newItemFlag: false,
			offPrice: "69",
			primaryPicUrl: "http://mimg.127.net/hz/uploader/20160825/14721242153050847.jpg",
			primarySkuId: "1029073",
			retailPrice: "69.0",
			sellVolume: 1,
			simpleDesc: "随时取用，方便照顾宝宝",
			title: "80片3包 婴幼儿全棉湿巾",
			unitPrice: " ",
			extend: {
				tip_key: " Carters制造商"
			}
		}]
	};

	var YX_N_M_9BBD = Vue.extend({
		name: 'YX_N_M_9BBD',
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
					if(value){
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
								}
							}).getResult());

							_that.$data = tempData;
							_that.$dispatch('changeDataDefault', _that.id, tempData);
						});
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
	return YX_N_M_9BBD;
});