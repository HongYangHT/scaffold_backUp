define([
	'Vue',
	'components/page/root/rootVM',
	'model/model'
], function(Vue, RootVM, Model) {
	Vue.config.debug = true;
	Vue.config.devtools = true;
	var _model = new Model();
	return new Vue({
		replace: false,
		name: 'page',
		components: {
			'root': RootVM
		},
		data: function(){
			var _data = {
				root: 'root'
			},
			that = this;
			return _data;
		},
		methods: {

		},
		events: {

		},
		el: '#mainContainer'
	});
});