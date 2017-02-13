define([
    'Vue',
    'text!components/page/foot/foot.mustache',
    'components/page/shareTemplate/shareTemplateVM',
    'components/page/getShareTemplate/getShareTemplateVM',
    'mustache'
], function(Vue, tpl, ShareTemplateVM, GetShareTemplateVM) {
    var Foot = Vue.extend({
        name: 'foot',
        components: {
            'share-template-view': ShareTemplateVM,
            'get-share-template-view': GetShareTemplateVM
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
