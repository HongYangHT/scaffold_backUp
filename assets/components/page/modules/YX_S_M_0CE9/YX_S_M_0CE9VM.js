define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			height:640,
			backgroundImage:'http://mimg.127.net/hz/uploader/20160927/14749481296920310.jpg',
			titleImage:'http://mimg.127.net/hz/uploader/20160927/14749481297490316.png',
			district1:'http://mimg.127.net/hz/uploader/20160927/14749481297070311.png',
			district2:'http://mimg.127.net/hz/uploader/20160927/14749481297160312.png',
			district3:'http://mimg.127.net/hz/uploader/20160927/14749481297240313.png',
			district4:'http://mimg.127.net/hz/uploader/20160927/14749481297320314.png',
			district5:'http://mimg.127.net/hz/uploader/20160927/14749481297400315.png'
		}
	};

	var YX_S_M_0CE9 = Vue.extend({
		name: 'YX_S_M_0CE9',
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
			},
			'contentInfo.district1.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'district1': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.district1.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'district1': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.district2.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'district2': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.district3.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'district3': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.district4.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'district4': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.district5.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'district5': {
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

	return YX_S_M_0CE9;
});