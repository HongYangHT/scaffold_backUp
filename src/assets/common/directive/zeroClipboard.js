define(['Vue', 'jquery','clipboard'],function(Vue,$,Clipboard){
	Vue.directive('clip',{
		bind: function() {
			var that = this;
			var clipboard = new Clipboard(this.el);
		},
		update: function() {},
		unbind: function() {}
	});
});