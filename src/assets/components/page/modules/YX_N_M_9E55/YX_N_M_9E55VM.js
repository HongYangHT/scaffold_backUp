/**
 * @Module YX_N_M_9E52
 * @From 严选定期直邮
 * @author cqr
 * @description 直邮模块
 */
define([
    'Vue',
    'mustache',
    'jquery',
    'text!components/page/modules/YX_N_M_9E55/YX_N_M_9E55.mustache',
    'common/mixins/pageMixins',
    'common/helper/tpl2vue',
    'common/helper/data2vue',
    'common/helper/tools',
    'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {

    var _default = {
        contentInfo: {
            actLink:'http://you.163.com/act/pub/wvfdR0G0l0.html?from=web_mailo_old_old_2',
            newGoodLink:'http://you.163.com/item/newItem?from=web_mailo_old_old_2',
        }
    };

    var YX_N_M_9E55 = Vue.extend({
        name: 'YX_N_M_9E55',
        components: {},
        template: new Tpl2Vue(tpl, _default).render(),
        mixins: [pageMixins],
        data: function() {
            return new Data2Vue({
                data: _default
            }).getResult();
        },
        watch: {
            'contentInfo.actLink.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'actLink': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.newGoodLink.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'newGoodLink': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            }
        },
        computed: {
            oparate: function() {
                var _oparate = '';
                _oparate = this.id;
                return _oparate;
            }
        },
        methods: {},
        events: {}
    });
    return YX_N_M_9E55;
});