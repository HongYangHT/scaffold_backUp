define([
	'Vue',
    'text!components/page/shareTemplate/shareTemplate.mustache',
    'common/mixins/pageMixins',
    'common/directive/zeroClipboard'
], function(Vue, tpl, pageMixins) {
	var shareTemplateVM = Vue.extend({
		name: 'shareTemplateVM',
        components: {},
        template: tpl,
        mixins: [pageMixins],
        data: function() {
        	return {
        		showFlag : false,
        		shareLink: window.location.host + window.location.pathname
        	};
        },
        watch:{
        },
        methods:{
        	hideModal: function() {
				this.showFlag = false;
			}
        },
        events:{
        	notifyShareModal:function(){
        		this.showFlag = true;
        		if(window.share || window.id) 
					this.shareLink = 'http://' + window.location.host + window.location.pathname + '?share=' + (window.share || window.id);
        	}
        }
	});
	return shareTemplateVM;
});