define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_64E0/YX_N_M_64E0.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			goodsId: '',
			needScenePicUrl:1,
			sideImg:'https://mimg.127.net/hz/uploader/20170110/14840374195180391.jpg',
			bgColor:'#f6ede0'
		},
		temp:[
			{
				"id": "1042007",
				"title": "蓝莓曲奇 110克",
				"simpleDesc": "混合蓝莓果味的清香，成就甜蜜滋味",
				"primaryPicUrl": "http://yanxuan.nosdn.127.net/c4802627ab8a67c7242ccc09f4053421.png?imageView&thumbnail=250x250&quality=95",
				"primarySkuId": "1040012",
				"offPrice": "16",
				"retailPrice": "16.0",
				"unitPrice": "16",
				"maker":"",
				"scenePicUrl": "http://yanxuan.nosdn.127.net/fe58c81f1436397e485198969b654555.jpg?imageView&thumbnail=250x250&quality=95"
			},{
				"id": "1070000",
				"title": "星云酥 180克/3颗",
				"simpleDesc": "醇香蛋黄融入绿茶，好料层层美味",
				"primaryPicUrl": "http://yanxuan.nosdn.127.net/8392725765cdd57fdae3f173877f4bda.png?imageView&thumbnail=250x250&quality=95",
				"primarySkuId": "1074000",
				"offPrice": "26",
				"retailPrice": "26.0",
				"unitPrice": "26",
				"maker":"",
				"scenePicUrl": "http://yanxuan.nosdn.127.net/efda534f1efc49979d27a68acabd211f.jpg?imageView&thumbnail=250x250&quality=95"
			},{
				"id": "1076019",
				"title": "黄金脆千层 140克",
				"simpleDesc": "层层酥脆，满腹茶香",
				"primaryPicUrl": "http://yanxuan.nosdn.127.net/a63ed340dd9e261e3052e0d6184833ab.png?imageView&thumbnail=250x250&quality=95",
				"primarySkuId": "1080041",
				"offPrice": "23",
				"retailPrice": "23.0",
				"unitPrice": "23",
				"maker":"【 Levis制造商 】",
				"scenePicUrl": "http://yanxuan.nosdn.127.net/61112711088514d125bab92c72e7e3c1.jpg?imageView&thumbnail=250x250&quality=95"
			}
		]
	};

	var YX_N_M_64E0 = Vue.extend({
		name: 'YX_N_M_64E0',
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
									primaryPicUrl: v.primaryPicUrl+'?imageView&thumbnail=250x250&quality=95',
									primarySkuId: v.primarySkuId,
									retailPrice: v.retailPrice,
									unitPrice: parseFloat(v.unitPrice) == parseFloat(v.offPrice) ? '' : v.unitPrice,
									offPrice: v.offPrice,
									sellVolume: v.sellVolume,
									maker:'',
									scenePicUrl:v.scenePicUrl+'?imageView&thumbnail=250x250&quality=95'
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
			'contentInfo.needScenePicUrl.value':{
				'handler':function(value,old){
					if (value) {
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
			},
			'contentInfo.sideImg.value':{
				'handler':function(value,old){
					if (value) {
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
			},
			'contentInfo.bgColor.value':{
				'handler':function(value,old){
					if (value) {
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

	return YX_N_M_64E0;
});