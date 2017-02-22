define(['Vue', 'jquery', 'underscore', 'app/moduleInfo', 'autocomplete'], function(Vue, $, _, ModuleInfo) {

	Vue.directive('autocomplete', {
		bind: function() {
			var vm = this.vm;
			var moduleInfo = $.map(ModuleInfo, function(value, key) {
				return {
					value: value.shortCut,
					keywords: value.keywords,
					data: value.data,
					type: key
				};
			});
			$(this.el).autocomplete({
				lookup: moduleInfo,
				lookupLimit: 20,
				lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
					var filter = vm.filter; // 筛选条件
					var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
					var keywords = suggestion.keywords.replace(/\s+/g, '');
					var filterQuery = !!vm.filter.trim() ? (vm.filter.trim() + ' ' + originalQuery) : originalQuery;
					var splitQuery = filterQuery.split(' '),
						flag = true;
					$.each(splitQuery, function(i, n) {
						var reg = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(n), 'gi');
						flag = flag && (reg.test(keywords) || reg.test(suggestion.keywords) || (suggestion.keywords.toLowerCase().indexOf(n) !== -1));
					});
					return re.test(keywords) || re.test(suggestion.keywords) || (suggestion.keywords.toLowerCase().indexOf(originalQuery) !== -1) || (suggestion.keywords.toLowerCase().indexOf(queryLowerCase) !== -1) || flag;
				},
				onSearchComplete: function(query, suggestions) {
					var arr = $.map(suggestions, function(value, key) {
						return value.data;
					});
					vm.$data.suggestions = arr;
				},
				onSelect: function(suggestion) {
					var arr = [];
					arr.push(suggestion.data);
					vm.$data.suggestions = arr;
				},
				formatResult: function(suggest, val) {
					return '<div class="u-suggestion-selected" data-type="' + suggest.type + '" title="' + suggest.value + '"><span>' + suggest.value + '</span><img src="' + suggest.data.img + '"/><i></i></div>';
				},
				showNoSuggestionNotice: true,
				noSuggestionNotice: '当前没有搜索到您需要的模板，请提模板需求过来哟...'
			});
		},
		update: function() {

		},
		unbind: function() {}
	});
});