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
    'text!components/page/modules/YX_N_M_9E54/YX_N_M_9E54.mustache',
    'common/mixins/pageMixins',
    'common/helper/tpl2vue',
    'common/helper/data2vue',
    'common/helper/tools',
    'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {

    var _default = {
        contentInfo: {
            actLink:'http://you.163.com/act/pub/wvfdR0G0l0.html?anchor=coupon&from=web_mailo_old_old_2',
            actImg:'https://mimg.127.net/hz/uploader/20161207/14811076569910714.jpg',
        }
    };

    var YX_N_M_9E54 = Vue.extend({
        name: 'YX_N_M_9E54',
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
            'contentInfo.actImg.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'actImg': {
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
    return YX_N_M_9E54;
});