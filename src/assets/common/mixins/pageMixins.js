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
			},
			// 点击某个区域定位到编辑内容
			/**
			 * 配合css选择器禁掉 a[href^="http"]的链接点击事件
			 * 拿出来 id 和 key值，然后定位到具体的一个component
			 */
			focusKeyEdit: function($event) {
				$event.preventDefault();
				var $target = $($event.target),
					id = $target.closest('.J_wrap').data('id'),
					key = $target.data('h55970f92');
				console.log(id + '' + key);
				this.$dispatch('notifyRootFocusKeyEdit', {
					id: id,
					key: key
				});
			},
			/* handle draggable*/
			handleDragStart: function(elem) {
				// console.log('handleDragStart', elem);
				this.loggedEvent = 'handleDragStart';
			},
			handleDragOver: function(elem) {
				// console.log('handleDragOver', elem);
				this.loggedEvent = 'handleDragOver';
			},
			handleDragEnter: function(elem) {
				// console.log('handleDragEnter', elem);
				this.loggedEvent = 'handleDragEnter';
			},
			handleDragLeave: function(elem) {
				// console.log('handleDragLeave', elem);
				this.loggedEvent = 'handleDragLeave';
			},
			handleDragEnd: function(elem) {
				// console.log('handleDragEnd', elem);
				this.loggedEvent = 'handleDragEnd';
			},
			handleDrop: function(itemOne, itemTwo) {
				// console.log('handleDrop', itemOne.id, itemTwo.id);
				this.loggedEvent = 'handleDrop';
				// var dummy = this.tasks[itemOne.id];
				// this.tasks.$set(itemOne.id, this.tasks[itemTwo.id]);
				// this.tasks.$set(itemTwo.id, dummy);
			},
			handleImageDrop: function(itemOne, itemTwo) {
				// console.log('handleImageDrop', itemOne.getAttribute('data-index'), itemTwo.getAttribute('data-index'));
				this.loggedEvent = 'handleImageDrop';
				// var dummy = this.images[itemOne.getAttribute('data-index')];
				// this.images.$set(itemOne.getAttribute('data-index'), this.images[itemTwo.getAttribute('data-index')]);
				// this.images.$set(itemTwo.getAttribute('data-index'), dummy);
			},
			handleDrag: function(elem) {
				//console.log('handleDrag', elem);
				this.loggedEvent = 'handleDrag';
			}
		},
		events: {},
		created: $.noop,
		ready: $.noop,
		destroyed: $.noop
	};
	return pageMixins;
});