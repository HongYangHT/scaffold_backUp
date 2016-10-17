define([
	'Vue',
	'text!components/page/menu/menu.mustache',
	'common/mixins/pageMixins'
], function(Vue, tpl, pageMixins) {
	var Menu = Vue.extend({
		name: 'list',
		components: {},
		template: tpl,
		mixins: [pageMixins],
		data: function() {
			return {
				id: Math.uuid(32, 16).toLowerCase(),
				showMenu: false,
				master: {
					isMaster: false,
					modules: [],
					units: []
				},
				yanxuan: {
					isYanxuan: true,
					modules: [{
						'name': 'http://mimg.127.net/hz/uploader/20161011/14761714486151576.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485361568.jpg',
						'value': 'yxhd',
						'type': 'yxhd'
					}, {
						'name': 'http://mimg.127.net/hz/uploader/20161011/14761714486221577.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485441569.jpg',
						'value': 'yxBanner',
						'type': 'yxBanner'
					}, {
						'name': 'http://mimg.127.net/hz/uploader/20161011/14761714484941562.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485561570.jpg',
						'value': 'yxBanner2',
						'type': 'yxBanner2'
					}, {
						'name': 'http://mimg.127.net/hz/uploader/20161011/14761714485001563.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485661571.jpg',
						'value': 'yxBackModule',
						'type': 'yxBackModule'
					}, {
						'name': 'http://mimg.127.net/hz/uploader/20161011/14761714485071564.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485771572.jpg',
						'value': 'yxBackModule2',
						'type': 'yxBackModule2'
					}, {
						'name': 'http://mimg.127.net/hz/uploader/20161011/14761714485191566.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485981574.jpg',
						'value': 'yxRule',
						'type': 'yxRule'
					}, {
						'name': 'http://mimg.127.net/hz/uploader/20161011/14761714486091575.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485261567.jpg',
						'value': 'yxTemp',
						'type': 'yxTemp'
					}, {
						'name': 'http://mimg.127.net/hz/uploader/20161011/14761714485131565.jpg',
						'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485881573.jpg',
						'value': 'yxft',
						'type': 'yxft'
					}],
					units: []
				},
				youqian: {
					isYouqian: false,
					modules: [],
					units: []
				},
				yiyuan: {
					isYiyuan: false,
					modules: [],
					units: []
				}
			};
		},
		methods: {
			hideModal: function($event) {
				this.showMenu = false;
			},
			addComponent: function($event) {
				var $target = $($event.target),
					$parent = $target.closest('.u-view');
				var _data = {
					type: $parent.data('type')
				};
				this.$dispatch('NavToinsertComponent', _data);
			},
			hideMenu: function() {
				this.showMenu = false;
				if ($('.J_showMenu').hasClass('active')) {
					this.showMenu = false;
				} else {
					this.showMenu = true;
				}
				$('.J_showMenu').toggleClass('active').find('i').toggleClass('fa-angle-double-right').toggleClass('fa-angle-double-left');
			}
		},
		events: {
			navToShowMenu: function(flag) {
				this.showMenu = flag;
				$('.J_showMenu').addClass('active').find('i').addClass('fa-angle-double-left').removeClass('fa-angle-double-right');
			},
			editShowOrHide: function(picked) {
				if (picked == 0) {
					this.showMenu = true;
					$('.J_showMenu').addClass('active').find('i').addClass('fa-angle-double-left').removeClass('fa-angle-double-right');
				} else if (picked == 1) {
					this.showMenu = false;
					$('.J_showMenu').removeClass('active').find('i').addClass('fa-angle-double-right').removeClass('fa-angle-double-left');
				}
			}
		}
	});

	return Menu;
});