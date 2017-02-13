define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_97D8/YX_S_M_97D8.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			dotImage:'https://mimg.127.net/hz/uploader/20161205/14809053699500354.png',
			height:'74',
			bgColor:'#fff'
		}
	};
	var YX_S_M_97D8 = Vue.extend({
		name: 'YX_S_M_97D8',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch:{
			'contentInfo.dotImage.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'dotImage': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.height.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'height': {
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
	 return YX_S_M_97D8;
});