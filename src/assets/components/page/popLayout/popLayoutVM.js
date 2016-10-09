define([
	'Vue',
	'text!components/page/popLayout/popLayout.mustache',
	'mustache',
	'common/directive/setStyle',
	'uuid'
], function(Vue, tpl, mustache) {
	var _default = {
		id: Math.uuid(32, 16).toLowerCase()
	};
	var PopLayout = Vue.extend({
		name: 'popLayout',
		components: {},
		template: tpl,
		data: function() {
			var _data = _default;
			return _data;
		}
	});
	return PopLayout;
});