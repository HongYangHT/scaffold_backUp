define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_B53B/YX_N_M_B53B.mustache',
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
			title:'一口足以爱不释手',
			tip1:'一口足以爱不释手',
			tip2:'一口足以爱不释手',
			bgColor:'#fff'
		},
		temp:[
			{
				"id": "1042007",
				"title": "蓝莓曲奇 110克",
				"simpleDesc": "混合蓝莓果味的清香，成就甜蜜滋味",
				"primaryPicUrl": "http://yanxuan.nosdn.127.net/c4802627ab8a67c7242ccc09f4053421.png?imageView&thumbnail=600x600&quality=95",
				"primarySkuId": "1040012",
				"offPrice": "16",
				"retailPrice": "16.0",
				"unitPrice": "16",
				"maker":"",
				"scenePicUrl": "http://yanxuan.nosdn.127.net/fe58c81f1436397e485198969b654555.jpg?imageView&thumbnail=600x600&quality=95"
			},{
				"id": "1070000",
				"title": "星云酥 180克/3颗",
				"simpleDesc": "醇香蛋黄融入绿茶，好料层层美味",
				"primaryPicUrl": "http://yanxuan.nosdn.127.net/8392725765cdd57fdae3f173877f4bda.png?imageView&thumbnail=600x600&quality=95",
				"primarySkuId": "1074000",
				"offPrice": "26",
				"retailPrice": "26.0",
				"unitPrice": "26",
				"maker":"",
				"scenePicUrl": "http://yanxuan.nosdn.127.net/efda534f1efc49979d27a68acabd211f.jpg?imageView&thumbnail=600x600&quality=95"
			},{
				"id": "1076019",
				"title": "黄金脆千层 140克",
				"simpleDesc": "层层酥脆，满腹茶香",
				"primaryPicUrl": "http://yanxuan.nosdn.127.net/a63ed340dd9e261e3052e0d6184833ab.png?imageView&thumbnail=600x600&quality=95",
				"primarySkuId": "1080041",
				"offPrice": "23",
				"retailPrice": "23.0",
				"unitPrice": "23",
				"maker":"【 Levis制造商 】",
				"scenePicUrl": "http://yanxuan.nosdn.127.net/61112711088514d125bab92c72e7e3c1.jpg?imageView&thumbnail=600x600&quality=95"
			},{
				"id": "1042005",
				"title": "夹心巧克力饼干 90克",
				"simpleDesc": "迷你可爱，一口一个",
				"primaryPicUrl": "http://yanxuan.nosdn.127.net/02a2ea4adf74b63a53563e460d8739b3.png?imageView&thumbnail=600x600&quality=95",
				"primarySkuId": "1074000",
				"offPrice": "16",
				"retailPrice": "16.0",
				"unitPrice": "16",
				"maker":"【 Levis制造商 】",
				"scenePicUrl": "http://yanxuan.nosdn.127.net/d4d80973e9aa69cdab08290785c1b9c7.jpg?imageView&thumbnail=600x600&quality=95"
			}
		]
	};

	var YX_N_M_B53B = Vue.extend({
		name: 'YX_N_M_B53B',
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
									primaryPicUrl: v.detail.primaryPicUrl+'?imageView&thumbnail=600x600&quality=95',
									primarySkuId: v.detail.primarySkuId,
									retailPrice: v.detail.retailPrice,
									unitPrice: parseFloat(v.detail.unitPrice) == parseFloat(v.detail.offPrice) ? '' : v.detail.unitPrice,
									offPrice: v.detail.offPrice,
									sellVolume: v.detail.sellVolume,
									maker:'',
									scenePicUrl:v.detail.scenePicUrl+'?imageView&thumbnail=600x600&quality=95'
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
			'contentInfo.title.value':{
				'handler':function(value,old){
					if (value) {
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
					if (value) {
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
					if (value) {
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

	return YX_N_M_B53B;
});