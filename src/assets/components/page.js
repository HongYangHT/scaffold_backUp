define([
	'Vue',
	'components/page/root/rootVM'
], function(Vue, RootVM) {
	Vue.config.debug = true;
	Vue.config.devtools = true;

	return new Vue({
		replace: false,
		name: 'page',
		components: {
			'root': RootVM
		},
		data: {
			root: 'root'
		},
		methods: {

		},
		events: {

		},
		el: '#mainContainer'
	});
});