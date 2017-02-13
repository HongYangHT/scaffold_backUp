define(['Vue', 'sortable'], function(Vue, Sortable) {
	Vue.directive('sort', {
		bind: function() {

		},
		update: function(options) {
			var that = this;
			options = $.extend({}, {
				group: {
					put: false
				},
				handle: '.J_psc_wrap',
				onEnd: function(result) {
					var targetId = $(result.item).data('id'),
						purposeId = $(result.from).find('.J_psc_wrap').eq(result.newIndex - 2).data('id');
					// 通知content 修改和保存数据	
					that.vm.$dispatch('notifyDragLocation', {
						newIndex: result.newIndex,
						oldIndex: result.oldIndex,
						from: result.from,
						targetId: targetId,
						purposeId: purposeId
					});
					console.log(result);
				},
				onChoose:function(e){
					// console.log(e);
				}
			}, options);
			var sort = new Sortable(this.el, options);
			if (this.arg && !this.vm.sort) {
				this.vm.sort = {};
			}
			//  Throw an error if the given ID is not unique
			if (this.arg && this.vm.sort[this.arg]) {
				console.warn('[vue-sort] cannot set already defined sort id: \'' + this.arg + '\'');
			} else if (this.arg) {
				this.vm.sort[this.arg] = sort;
			}
		},
		unbind: function() {

		}
	});
});