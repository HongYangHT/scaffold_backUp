define(['Vue', 'jquery', 'underscore'],function(Vue, $, _){
	Vue.filter('checkGroup', function(param, item, type) {
		return item == type ? true : false;
	});
});