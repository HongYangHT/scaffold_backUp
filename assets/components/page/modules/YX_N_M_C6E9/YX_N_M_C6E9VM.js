define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_C6E9/YX_N_M_C6E9.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			goodsId: '119',
			sideImg:'http://mimg.127.net/hz/uploader/20160829/14724404035690170.jpg'
		},
		temp:[{
			"id": "1042007",
			"title": "蓝莓曲奇 110克",
			"simpleDesc": "混合蓝莓果味的清香，成就甜蜜滋味",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/c4802627ab8a67c7242ccc09f4053421.png?imageView&quality=95&thumbnail=264x264",
			"primarySkuId": "1040012",
			"offPrice": "16",
			"retailPrice": "16.0",
			"unitPrice": "16"
		},
		{
			"id": "1070000",
			"title": "星云酥 180克/3颗",
			"simpleDesc": "醇香蛋黄融入绿茶，好料层层美味",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/8392725765cdd57fdae3f173877f4bda.png?imageView&quality=95&thumbnail=264x264",
			"primarySkuId": "1074000",
			"offPrice": "26",
			"retailPrice": "26.0",
			"unitPrice": "26"
		},
		{
			"id": "1076019",
			"title": "黄金脆千层 140克",
			"simpleDesc": "层层酥脆，满腹茶香",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/a63ed340dd9e261e3052e0d6184833ab.png?imageView&quality=95&thumbnail=264x264",
			"primarySkuId": "1080041",
			"offPrice": "23",
			"retailPrice": "23.0",
			"unitPrice": "23"
		},
		{
			"id": "1042005",
			"title": "夹心巧克力饼干 90克",
			"simpleDesc": "迷你可爱，一口一个",
			"primaryPicUrl": "http://yanxuan.nosdn.127.net/02a2ea4adf74b63a53563e460d8739b3.png?imageView&quality=95&thumbnail=264x264",
			"primarySkuId": "1040010",
			"offPrice": "16",
			"retailPrice": "16.0",
			"unitPrice": "16"
		}]
	};

	var YX_N_M_C6E9 = Vue.extend({
		name: 'YX_N_M_C6E9',
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
								return {
									id: v.detail.id,
									title: v.detail.title,
									simpleDesc: v.detail.simpleDesc,
									primaryPicUrl: v.detail.primaryPicUrl + '?imageView&quality=95&thumbnail=264x264',
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
							_that.$dispatch('changeDataDefault', _that.id, tempData);
						});
					}
				}
			},
			'contentInfo.sideImg.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'sideImg': {
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

	return YX_N_M_C6E9;
});