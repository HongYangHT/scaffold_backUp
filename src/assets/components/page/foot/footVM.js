define([
	'Vue',
	'text!components/page/foot/foot.mustache',
	'mustache'
], function(Vue, tpl) {
	var Foot = Vue.extend({
		name: 'foot',
		components: {

		},
		data: function() {
			return {
				foot: 'foot',
				id: ''
			};
		},
		template: tpl,
		methods: {},
		events: {}
	});
	return Foot;
});