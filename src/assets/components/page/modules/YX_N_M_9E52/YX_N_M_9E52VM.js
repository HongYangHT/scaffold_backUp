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
    'text!components/page/modules/YX_N_M_9E52/YX_N_M_9E52.mustache',
    'common/mixins/pageMixins',
    'common/helper/tpl2vue',
    'common/helper/data2vue',
    'common/helper/tools',
    'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {

    var _default = {
        contentInfo: {
            url:'https://you.163.com/item/detail?id=1075003&from=web_mailo_old_old_2',
            img:'https://mimg.127.net/hz/uploader/20161123/14798936014900200.jpg',
            label:'美国进口原料',
            name:'15色糖果水彩笔套装',
            price:'15',
            addtionalInfo:'双11底价:￥279.2',
            desc:'孩子本身是最大的礼物。美国进口原料，GMP无尘车间严控调配，可直接接触宝贝肌肤，安全无毒，即便不小心画在皮肤或衣服上也可以清洗。送给孩子，尽情想象自由作画吧！',

        }
    };

    var YX_N_M_9E52 = Vue.extend({
        name: 'YX_N_M_9E52',
        components: {},
        template: new Tpl2Vue(tpl, _default).render(),
        mixins: [pageMixins],
        data: function() {
            return new Data2Vue({
                data: _default
            }).getResult();
        },
        watch: {
            'contentInfo.url.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'url': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.img.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'img': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.label.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'label': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.name.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'name': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.price.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'price': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.addtionalInfo.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'addtionalInfo': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.desc.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'desc': {
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
    return YX_N_M_9E52;
});