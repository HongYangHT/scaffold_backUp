define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_N_M_417A/YX_N_M_417A.mustache',
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
			titurl: "http://you.163.com/item/list?categoryId=1005000&subCategoryId=1008016&_stat_subject=512",
        	titimg: "http://mimg.127.net/hz/uploader/20160922/14745168604540507.jpg"
		},		
		temp:[
			{
				"id": "1042007",
				"title": "日式多功能颈枕 针织款",
				"simpleDesc": "细腻天竺棉，亲肤舒适",
				"primaryPicUrl": "https://yanxuan.nosdn.127.net/b0ca92e8bc5a1b17bb90330fb353267c.png",
				"primarySkuId": "1040012",
				"retailPrice": "1200.00",
				"unitPrice": "1200.00",
				"offPrice": "599.00",
				"maker":"",
				"scenePicUrl": "https://yanxuan.nosdn.127.net/af36f4c8bc344c9f1f363cacb63cde5b.jpg",
				"goodurl": "http://you.163.com/item/detail?id=1009024&_stat_subject=512"

			},{
				"id": "1070000",
				"title": "双宫茧桑蚕丝被  空调被",
				"simpleDesc": "天然桑蚕丝，吸湿透气柔软",
				"primaryPicUrl": "https://yanxuan.nosdn.127.net/347facad1b8ce31baec16a61c19accbb.png",
				"primarySkuId": "1074000",
				"offPrice": "79.00",
				"retailPrice": "79.00",
				"unitPrice": "79.00",
				"maker":"罗莱制造商",
				"scenePicUrl": "https://yanxuan.nosdn.127.net/d83cbd9ec177276ba2582ee393eff3db.jpg",
				"goodurl": "http://you.163.com/item/detail?id=1039051&_stat_subject=512"
			},{
				"id": "1076019",
				"title": "全棉针织条纹四件套",
				"simpleDesc": "裸睡必备",
				"primaryPicUrl": "https://yanxuan.nosdn.127.net/c8ff97623df8a9beece54afe501c3ff6.png",
				"primarySkuId": "1080041",
				"offPrice": "69.00",
				"retailPrice": "69.00",
				"unitPrice": "69.00",
				"maker":"MUJI制造商",
				"scenePicUrl": "https://yanxuan.nosdn.127.net/81b7751427969b2561f65c6992636a2b.jpg",
				"goodurl": "http://you.163.com/item/detail?id=1035006&_stat_subject=512"
			}
		]

	};

	var YX_N_M_417A = Vue.extend({
		name: 'YX_N_M_417A',
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
									primaryPicUrl: v.primaryPicUrl+'?imageView&thumbnail=600x600&quality=95',
									primarySkuId: v.primarySkuId,
									retailPrice: v.retailPrice,
									unitPrice: parseFloat(v.unitPrice) == parseFloat(v.offPrice) ? '' : v.unitPrice,
									offPrice: v.offPrice,
									sellVolume: v.sellVolume,
									maker:'',
									scenePicUrl:v.scenePicUrl+'?imageView&thumbnail=600x600&quality=95'
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

	return YX_N_M_417A;
});