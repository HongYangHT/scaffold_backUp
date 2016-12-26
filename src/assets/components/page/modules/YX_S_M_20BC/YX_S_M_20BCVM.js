define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_20BC/YX_S_M_20BC.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			bgImage:'https://mimg.127.net/hz/uploader/20161221/14822858503211763.jpg',
			title:'活动规则',
			line1:'活动时间：7月8日-7月14日',
			line2:'活动详情',
			line3:'1、优惠券仅限厨房类目商品使用。',
			line4:'2、优惠券可与珐琅锅买一赠一、厨具套装价等优惠措施叠加使用。',
			line5:'3、请在7月14日24点前使用优惠券，届时未使用的优惠券将自动作废。',
			line6:'4、单笔订单限用一张优惠券。',
			line7:'5、使用优惠券支付的订单，若产生退货，优惠券均不退回，退款金额按优惠后的小计金额退款。',
			line8:'',
			line9:''
		}
	};

	var YX_S_M_20BC = Vue.extend({
		name: 'YX_S_M_20BC',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch:{
			'contentInfo.bgImage.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'bgImage': {
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
			'contentInfo.line1.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'line1': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.line2.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'line2': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.line3.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'line3': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.line4.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'line4': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.line5.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'line5': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.line6.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'line6': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.line7.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'line7': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.line8.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'line8': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.line9.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'line9': {
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
	return YX_S_M_20BC;
});