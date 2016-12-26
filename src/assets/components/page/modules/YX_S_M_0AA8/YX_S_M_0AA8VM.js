define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_0AA8/YX_S_M_0AA8.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			title:'做一个有格调的上班族',
			tip1:'上班族怎么穿才能绅士优雅？如何升级工位提升舒适感？有哪些好用的高颜值办公神器？',
			tip2:'严选通勤好物，治愈周一综合症，让上班的每一秒都美好',
			tip3:'',
			tip4:'',
			tip5:'',
			tip6:'',
			tip7:''
		}
	};
	var YX_S_M_0AA8 = Vue.extend({
		name: 'YX_S_M_0AA8',
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
			},
			'contentInfo.tip4.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip4': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip5.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip5': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip6.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip6': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip7.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip7': {
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
	 return YX_S_M_0AA8;
});