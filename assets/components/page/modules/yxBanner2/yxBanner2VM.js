define([
	'Vue',
	'mustache',
	'text!components/page/modules/yxBanner2/yxBanner2.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/directive/setAttr',
	'common/directive/draggable',
	'uuid'
], function(Vue, mustache, tpl, pageMixins, Tpl2Vue, Data2Vue) {
	var _default = {
		tlt1: '预热9.8-9.9',
		tip1: '提前领中秋券',
		tlt2: '正式 9.10-9.15',
		tip2: '全场满送星云酥',
		tlt3: '团聚三位朋友',
		tip3: '免费送中秋礼',
		tlt4: '9.16-9.18',
		tip4: '免费领人字拖',
		codeImg: 'http://mimg.127.net/hz/uploader/20160918/14741640811641312.jpg',
		style: {
			bg: 'http://mimg.127.net/hz/uploader/20160918/14741640807771260.jpg',
			collectionBg: 'http://mimg.127.net/hz/uploader/20160918/14741640807491256.png',
			shareBg: 'http://mimg.127.net/hz/uploader/20160918/14741640807551257.png',
			i1: 'http://mimg.127.net/hz/uploader/20160918/14741640808811275.png',
			i2: 'http://mimg.127.net/hz/uploader/20160918/14741640808871276.png',
			i3: 'http://mimg.127.net/hz/uploader/20160918/14741640808931277.png',
			i4: 'http://mimg.127.net/hz/uploader/20160918/14741640808991278.png'
		}
	};
	var YxBanner2 = Vue.extend({
		name: 'yxBanner2',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		data: function(options) {
			// 这里必须每次进来算一遍
			return new Data2Vue({
				data: _default
			}).getResult();
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
	return YxBanner2;
});