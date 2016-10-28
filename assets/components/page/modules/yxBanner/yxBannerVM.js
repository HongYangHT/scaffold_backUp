define([
	'Vue',
	'mustache',
	'text!components/page/modules/yxBanner/yxBanner.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/directive/setAttr',
	'common/directive/draggable',
	'uuid'
], function(Vue, mustache, tpl, pageMixins, Tpl2Vue, Data2Vue) {
	var _default = {
		style: {
			bgWrap: 'http://mimg.127.net/hz/uploader/20160918/14741640807231253.jpg',
			bginner: 'http://mimg.127.net/hz/uploader/20160918/14741640812411321.png'
		}
	};
	var YxBanner = Vue.extend({
		name: 'yxBanner',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		data: function(options) {
			// 这里必须每次进来算一遍
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch: {
			'style.bgWrap.value': {
				'handler': function(value, old) {
					var data = {
						style: {
							'bgWrap': {
								'key': this.bgWrap.key,
								'name': this.bgWrap.name,
								'type': this.bgWrap.type,
								'value': old,
								'input': this.bgWrap.input
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'style.bginner.value': {
				'handler': function(value, old) {
					var data = {
						style: {
							'bginner': {
								'key': this.bginner.key,
								'name': this.bginner.name,
								'type': this.bginner.type,
								'value': old,
								'input': this.bginner.input
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			}
		},
		mixins: [pageMixins],
		computed: {
			oparate: function() {
				var _oparate = '';
				_oparate = this.id;
				return _oparate;
			}
		}
	});
	return YxBanner;
});