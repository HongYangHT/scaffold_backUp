define([
	'Vue',
	'text!components/page/editMenu/editMenu.mustache',
	'mustache',
	'underscore',
	'model/model',
	'colorpicker',
	'common/filter/checkType',
	'notify'
], function(Vue, tpl, mustache, _, Model) {
	var _model = new Model();
	var EditMenu = Vue.extend({
		name: 'edit',
		components: {},
		template: tpl,
		data: function() {
			return {
				id: '',
				style: {},
				properties: [],
				layout: {},
				showMenu: false
			};
		},
		computed: {
			editStyle: function() {
				var _style = [],
					_that = this;
				$.each(_that.style, function(i, item) {
					if (_.isArray(item)) {
						$.each(item, function(i, n) {
							if (n.type == 'input') {
								item[i].input = true;
							} else if (n.type == 'textarea') {
								item[i].textArea = true;
							} else if (n.type == 'select') {
								item[i].select = true;
								item[i].options = [];
								// 适用于select选项的元素
								// options {name value}
								// switch(n.key){

								// }
							}
						});
					} else if (_.isObject(item)) {
						if (item.type == 'input') {
							item.input = true;
						} else if (item.type == 'textarea') {
							item.textarea = true;
						} else if (item.type == 'select') {
							item.select = true;
							item.options = [];
							// 适用于select选项的元素
							// options {name value}
							// switch(n.key){

							// }
						}
					}
					_style.push(item);
				});
				return _style;
			},
			editProperties: function() {
				var _properties = [],
					_that = this;
				$.each(_that.properties, function(i, props) {
					if (_.isArray(props)) {
						$.each(props, function(i, prop) {
							if (_.isArray(prop)) {
								$.each(prop, function(i, item) {
									if (_.isArray(item)) {
										console.error('数据结构嵌套太深，请修改数据结构');
										return;
									}

									if (item.type == 'input') {
										prop[i].input = true;
									} else if (item.type == 'textarea') {
										prop[i].textArea = true;
									} else if (item.type == 'select') {
										prop[i].select = true;
										prop[i].options = [];
										// 适用于select选项的元素
										// options {name value}
										// switch(n.key){

										// }
									}
								});
							} else if (_.isObject(prop)) {
								$.map(prop, function(item, i) {
									if (_.isArray(item)) {
										console.error('数据结构嵌套太深，请修改数据结构');
										return;
									}
									if (_.isObject(item)) {
										if (item.type == 'input') {
											item.input = true;
										} else if (item.type == 'textarea') {
											item.textarea = true;
										} else if (item.type == 'select') {
											item.select = true;
											item.options = [];
											// 适用于select选项的元素
											// options {name value}
											// switch(n.key){

											// }
										}
									}
									if (_.isString(item)) {
										if (prop.type == 'input') {
											prop.input = true;
										} else if (prop.type == 'textarea') {
											prop.textarea = true;
										} else if (prop.type == 'select') {
											prop.select = true;
											prop.options = [];
											// 适用于select选项的元素
											// options {name value}
											// switch(n.key){

											// }
										}
									}
								});
							}
						});
					} else if (_.isObject(props)) { // 这种情况一般情况下是不会出现的
						$.map(props, function(prop, i) {
							if (_.isArray(prop)) {
								$.each(prop, function(i, item) {
									if (_.isArray(item)) {
										console.error('数据结构嵌套太深，请修改数据结构');
										return;
									}
									if (item.type == 'input') {
										prop[i].input = true;
									} else if (item.type == 'textarea') {
										prop[i].textArea = true;
									} else if (item.type == 'select') {
										prop[i].select = true;
										prop[i].options = [];
										// 适用于select选项的元素
										// options {name value}
										// switch(n.key){

										// }
									}
								});
							} else if (_.isObject(prop)) {
								$.map(prop, function(item, i) {
									if (_.isArray(item)) {
										console.error('数据结构嵌套太深，请修改数据结构');
										return;
									}
									if (_.isObject(item)) {
										if (item.type == 'input') {
											item.input = true;
										} else if (item.type == 'textarea') {
											item.textarea = true;
										} else if (item.type == 'select') {
											item.select = true;
											item.options = [];
											// 适用于select选项的元素
											// options {name value}
											// switch(n.key){

											// }
										}
									}
									if (_.isString(item)) {
										if (prop.type == 'input') {
											prop.input = true;
										} else if (prop.type == 'textarea') {
											prop.textarea = true;
										} else if (prop.type == 'select') {
											prop.select = true;
											prop.options = [];
											// 适用于select选项的元素
											// options {name value}
											// switch(n.key){

											// }
										}
									}
								});
							}
						});
					}
					_properties.push(props);
				});
				return _properties;
			},
			editLayout: function() {
				var _layout = [],
					_that = this;
				if (_that.layout && _that.layout.layout) {
					$.each(_that.layout.layout, function(i, item) {
						if (_.isArray(item)) {
							$.each(item, function(i, n) {
								if (n.type == 'input') {
									item[i].input = true;
								} else if (n.type == 'textarea') {
									item[i].textArea = true;
								} else if (n.type == 'select') {
									item[i].select = true;
									item[i].options = [];
									// 适用于select选项的元素
									// options {name value}
									// switch(n.key){

									// }
								}
							});
						} else if (_.isObject(item)) {
							if (item.type == 'input') {
								item.input = true;
							} else if (item.type == 'textarea') {
								item.textarea = true;
							} else if (item.type == 'select') {
								item.select = true;
								item.options = [];
								// 适用于select选项的元素
								// options {name value}
								// switch(n.key){

								// }
							}
						}
						_layout.push(item);
					});
				}
				return _layout;
			}
		},
		methods: {
			hideMenu: function() {
				this.showMenu = false;
				if ($('.J_showMenu_left').hasClass('active')) {
					this.showMenu = false;
				} else {
					this.showMenu = true;
				}
				$('.J_showMenu_left').toggleClass('active').find('i').toggleClass('fa-angle-double-left').toggleClass('fa-angle-double-right');
			},
			// 上传图片
			uploadImg: function($event) {
				var $target = $($event.target),
					_that = this,
					id = $target.closest('.m-arrow-right').attr('data-id'),
					key = $target.attr('data-key');
				if (!$target.val()) return;
				if (!$target.val().match(/\.(png|jpg|bmp|jpeg)$/i)) {
					// alert("目前只支持png,jpg,jpeg,bmp文件格式的图片文件，请重试");
					$.notify({
						title: '目前只支持png,jpg,jpeg,bmp文件格式的图片文件，请重试',
						type: 'error'
					});
					$target.parents('form').get(0).reset();
					return;
				}
				var Filesdata = new FormData($target.parents('form')[0]),
					_isCompress = $target.data('type');

				var file = $target[0].files[0];
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(e) {
					console.log(this.result);
					_that.$dispatch('notifyRootPreviewSection', {
						id: id,
						key: key,
						src: this.result
					});
				}
				_model.uploadFiles({
					data: Filesdata,
					compress: _isCompress
				}).done(function(_data) {
					$target.parents('form').get(0).reset();
					if (_data && _data.cdnURL) {
						var upload = [];
						$.each(_data.cdnURL, function(i) {
							var _item = {};
							_item.src = _data.cdnURL[i].remote;
							_item.fileName = _data.cdnURL[i].filename;
							upload.push(_item);
						});
						$target.closest('.u-psc-input-group').find('.u-psc-input').val(upload[0].src);
						// 这里需要直接修改数据，并执行vm.nextTick(callback)
						for (var k in _that._data.properties[0]) {
							if (k == key) {
								_that._data.properties[0][k].value = upload[0].src;
							}
						}
						// _that.nextTick();
						/*_that.$dispatch('updateDataInTime', {
							id: id,
							key: key,
							value: upload[0].src
						});*/
					}
				});
			},
			bindColorPicker: function($event) {
				$($event.target).colorpicker({
					horizontal: true
				});
				$($event.target).data('colorpicker').show();
			},
			// 标识出现在对应的区域
			focusInput: function($event, key, id, value) {
				this.$dispatch('notifyRootFocusSection', {
					key: key,
					id: id,
					val: value
				});
				$('.m-arrow-right').find('.m-group .active').removeClass('active');
			},
			blurInput: function($event, key, id) {
				this.$dispatch('notifyRootBlurSection', {
					key: key,
					id: id
				});
				$($event.target).removeClass('active');
			}
		},
		events: {
			showEditMenu: function(flag) {
				this.showMenu = flag;
				$('.J_showMenu_left').addClass('active').find('i').addClass('fa-angle-double-right').removeClass('fa-angle-double-left');
			},
			navToShowMenu: function(flag) {
				this.showMenu = flag;
				$('.J_showMenu_left').addClass('active').find('i').addClass('fa-angle-double-right').removeClass('fa-angle-double-left');
			},
			// 显示或者隐藏编辑区
			editShowOrHide: function(picked) {
				if (picked == 0) {
					this.showMenu = true;
					$('.J_showMenu_left').addClass('active').find('i').addClass('fa-angle-double-right').removeClass('fa-angle-double-left');
				} else if (picked == 1) {
					this.showMenu = false;
					$('.J_showMenu_left').removeClass('active').find('i').addClass('fa-angle-double-left').removeClass('fa-angle-double-right');
				}
			},
			// 数据驱动编辑区
			createData: function(data) {
				var _properties = [],
					_layout = [],
					_style = [],
					_that = this;
				_that.id = data.id;

				/* 有钱的headerLogo */
				data.YQHeaderLogo && _properties.push(data.YQHeaderLogo);
				data.style && (_style = data.style);

				data && _properties.push(data);
				_that.layout = _layout;
				_that.properties = _properties;
				_that.style = _style;
			},
			// 编辑layout的数据
			setLayoutEdit: function(data) {
				var _properties = [],
					_style = [],
					_layout = {},
					_that = this;
				_that.id = data.id;

				data.layout && (_layout = data);

				_that.layout = _layout;
				_that.properties = _properties;
				_that.style = _style;
			},
			// 更改编辑component 对象
			changeComponentEdit: function(data) {
				var _properties = [],
					_style = [],
					_layout = {},
					_that = this;
				_that.id = data.id;

				data.layout && (_layout = data);
				/* modules YQHeaderLogo*/
				// data.YQHeaderLogo && _properties.push(data.YQHeaderLogo);
				data.style && (_style = data.style);

				data && !data.layout && _properties.push(data);

				_that.layout = _layout;
				_that.properties = _properties;
				_that.style = _style;
			},
			/* 通过编辑区的key来修改 */
			notifyEditMenuChangeComponent: function(info) {
				var _properties = [],
					_style = [],
					_layout = {},
					_that = this;
				_that.id = info.data.id;
				info.data.layout && (_layout = info.data.layout);
				info.data.style && (_style = info.data.style);

				info.data && !info.data.layout && _properties.push(info.data);
				_that.layout = _layout;
				_that.properties = _properties;
				_that.style = _style;
				_that.showMenu = true;
				setTimeout(function(){
					$('.m-arrow-right').find('[data-lable="'+info.keyInfo.key+'"]').addClass('active')
						.closest('.m-group').siblings('.m-group').find('.active').removeClass('active');	
				},500);
				$('.J_showMenu_left').addClass('active').find('i').addClass('fa-angle-double-right');	
			}
		}
	});

	return EditMenu;
});