define(['jquery', 'underscore'], function($, _) {
	var pageMixins = {
		methods: {
			// 添加组件
			showModal: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				var $target = $($event.target),
					data = {
						insertId: $target.data('id') ? $target.data('id') : $($event.currentTarget).data('id'),
						flag: true
					};
				if (this.$parent.picked == 0) {
					this.$dispatch('addShowModal', data);
				}
			},
			// 加上 active Class
			addClassActive: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				var $target = $($event.target),
					_id = $target.data('id');
				if (this.$parent.picked == 0) {
					$target.find('.m-psc-oparate[data-oparate="' + _id + '"]').show();
				}
			},
			// 移除 active Class
			removeClassActive: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				var $target = $($event.target),
					_id = $target.data('id');
				if (this.$parent.picked == 0) {
					$target.find('.m-psc-oparate[data-oparate="' + _id + '"]').hide();
				}
			},
			// 编辑组件或者模块
			operateEdit: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				var $target = $($event.target),
					_id = $target.closest('.m-psc-oparate').data('oparate');
				this.$dispatch('editComponent', {
					changeEditId: _id,
					oparate: 1
				});
			},
			// 删除组件或者模块
			operateDelete: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				var $target = $($event.target),
					_id = $target.closest('.m-psc-oparate').data('oparate'),
					_changeEditId = $target.closest('.m-wrap').parent('*[data-id]').data('id');
				$target.closest('.m-psc-oparate').closest('[data-id="' + _id + '"]').remove().end().remove();
				this.$dispatch('removeComponent', {
					removeId: _id,
					changeEditId: _changeEditId,
					oparate: 2
				});
			},
			// 显示zoom
			showZoom: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				var $target = $($event.target),
					_zoom = $target.data('zoom');
				$target.closest('.m-arrow').find('.m-zoom').find('img').attr('src', _zoom).end().show();
			},
			// 隐藏zoom
			hideZoom: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				var $target = $($event.target);
				$target.closest('.m-arrow').find('.m-zoom').hide();
			}
		},
		events: {},
		created: $.noop,
		ready: $.noop,
		destroyed: $.noop
	};
	return pageMixins;
});