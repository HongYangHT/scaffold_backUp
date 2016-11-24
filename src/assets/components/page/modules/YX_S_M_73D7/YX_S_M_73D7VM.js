define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_73D7/YX_S_M_73D7.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			backgroundImage:'http://mimg.127.net/hz/uploader/20160829/14724404035420167.jpg',
			tipImage:'http://mimg.127.net/hz/uploader/20160829/14724404035540168.png',
			titleImage:'http://mimg.127.net/hz/uploader/20160829/14724404035610169.png'
		}
	};

	var YX_S_M_73D7 = Vue.extend({
		name: 'YX_S_M_73D7',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		computed: {
			oparate: function() {
				var _oparate = '';
				_oparate = this.id;
				return _oparate;
			}
		},
		watch:{
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
			'contentInfo.tipImage.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tipImage': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.titleImage.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'titleImage': {
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

	return YX_S_M_73D7;
});