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
						'name': 'assets/imgs/preview_yxTemp_18.jpg',
						'zoom': 'assets/imgs/preview_yxTemp_l_18.jpg',
						'value': 'yxhd',
						'type': 'yxhd'
					}, {
						'name': 'assets/imgs/preview_yxTemp_19.jpg',
						'zoom': 'assets/imgs/preview_yxTemp_l_19.jpg',
						'value': 'yxBanner',
						'type': 'yxBanner'
					}, {
						'name': 'assets/imgs/preview_yxTemp_20.jpg',
						'zoom': 'assets/imgs/preview_yxTemp_l_20.jpg',
						'value': 'yxBanner2',
						'type': 'yxBanner2'
					}, {
						'name': 'assets/imgs/preview_yxTemp_21.jpg',
						'zoom': 'assets/imgs/preview_yxTemp_l_21.jpg',
						'value': 'yxBackModule',
						'type': 'yxBackModule'
					}, {
						'name': 'assets/imgs/preview_yxTemp_22.jpg',
						'zoom': 'assets/imgs/preview_yxTemp_l_22.jpg',
						'value': 'yxBackModule2',
						'type': 'yxBackModule2'
					}, {
						'name': 'assets/imgs/preview_yxTemp_24.jpg',
						'zoom': 'assets/imgs/preview_yxTemp_l_24.jpg',
						'value': 'yxRule',
						'type': 'yxRule'
					}, {
						'name': 'assets/imgs/preview_yxTemp_1.jpg',
						'zoom': 'assets/imgs/preview_yxTemp_l_1.jpg',
						'value': 'yxTemp',
						'type': 'yxTemp'
					}, {
						'name': 'assets/imgs/preview_yxTemp_23.jpg',
						'zoom': 'assets/imgs/preview_yxTemp_l_23.jpg',
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