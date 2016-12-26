define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_07DA/YX_S_M_07DA.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			title:'南方中证国企改革 160136',
			type1:'指数',
			tip1:'基金类型',
			type2:'18.15%',
			tip2:'近6个月收益率',
			type3:'100元',
			tip3:'起购金额',
			btnText:'立即购买 申购费率1折 >>',
			link:''
		}
	};

	var YX_S_M_07DA = Vue.extend({
		name: 'YX_S_M_07DA',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch:{
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
			'contentInfo.type1.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'type1': {
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
			'contentInfo.type2.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'type2': {
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
			},
			'contentInfo.type3.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'type3': {
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
			},
			'contentInfo.btnText.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'btnText': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.link.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'link': {
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
	return YX_S_M_07DA;
});