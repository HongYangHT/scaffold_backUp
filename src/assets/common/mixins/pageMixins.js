define(['jquery', 'underscore'], function($, _) {
	var pageMixins = {
		methods: {
			// 添加组件
			showModal: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				var $target = $($event.target),
					data = {
						insertId: $target.attr('data-id') ? $target.attr('data-id') : $($event.currentTarget).attr('data-id'),
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
					_id = $target.attr('data-id');
				if (this.$parent.picked == 0) {
					$target.find('.m-psc-oparate[data-oparate="' + _id + '"]').show();
				}
				// this.showFlag ? this.$set('showOrHideFlag',true) : this.$set('showOrHideFlag',false);
			},
			// 移除 active Class
			removeClassActive: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				var $target = $($event.target),
					_id = $target.attr('data-id');
				if (this.$parent.picked == 0) {
					$target.find('.m-psc-oparate[data-oparate="' + _id + '"]').hide();
				}
				// this.$set('showOrHideFlag',false);
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
					_changeEditId = $target.closest('.J_psc_wrap').parent('*[data-id]').attr('data-id');
				// $target.closest('.m-psc-oparate').closest('[data-id="' + _id + '"]').remove().end().remove();
				// this.$dispatch('removeComponent', {
				// 	removeId: _id,
				// 	changeEditId: _changeEditId,
				// 	oparate: 2
				// });
				// 向上通知需要删除
				this.$dispatch('notifyRootForRemoveComponent', {
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
			},
			// 点击某个区域定位到编辑内容
			/**
			 * 配合css选择器禁掉 a[href^="http"]的链接点击事件
			 * 拿出来 id 和 key值，然后定位到具体的一个component
			 */
			focusKeyEdit: function($event) {
				$event.preventDefault();
				var $target = $($event.target),
					id = $target.closest('.J_psc_wrap').attr('data-id'),
					key = $target.data('h55970f92group'),
					location = $target.data('h55970f92');
				if (key) {
					this.$dispatch('notifyRootFocusKeyEdit', {
						id: id,
						key: key,
						location: location
					});
				}
			},
				/* handle draggable*/
			/*handleDragStart: function(elem) {
				this.loggedEvent = 'handleDragStart';
			},
			handleDragOver: function(elem) {
				this.loggedEvent = 'handleDragOver';
			},
			handleDragEnter: function(elem) {
				this.loggedEvent = 'handleDragEnter';
			},
			handleDragLeave: function(elem) {
				this.loggedEvent = 'handleDragLeave';
			},
			handleDragEnd: function(elem) {
				this.loggedEvent = 'handleDragEnd';
			},
			handleDrop: function(itemOne, itemTwo) {
				this.loggedEvent = 'handleDrop';
			},
			handleImageDrop: function(itemOne, itemTwo) {
				this.loggedEvent = 'handleImageDrop';
			},
			handleDrag: function(elem) {
				this.loggedEvent = 'handleDrag';
			}*/
		},
		events: {
			// 显示编辑或者隐藏编辑区域
			notifyComponentEditShowOrHide: function(info) {
				parseInt(info) == 0 ? (this.$set('showFlag', true)) : (this.$set('showFlag', false));
			}
		},
		created: $.noop,
		ready: $.noop,
		destroyed: $.noop
	};
	return pageMixins;
});