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
    'text!components/page/modules/YX_N_M_9E51/YX_N_M_9E51.mustache',
    'common/mixins/pageMixins',
    'common/helper/tpl2vue',
    'common/helper/data2vue',
    'common/helper/tools',
    'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {

    var _default = {
        contentInfo: {
            leftUrl:'https://you.163.com/item/detail?id=1092023&from=web_mailo_old_old_2',
            rightUrl:'https://you.163.com/item/detail?id=1092021&from=web_mailo_old_old_2',
            btnUrl:'https://you.163.com/item/detail?id=1092023&from=web_mailo_old_old_2',
            imgLeft:'https://mimg.127.net/hz/uploader/20161207/14811076570300718.jpg',
            imgRight:'https://mimg.127.net/hz/uploader/20161207/14811076570390719.jpg',
            label:'CK制造商',
            name:'男式免洗袜',
            price:'￥24.9/10双',
            addtionalInfo:'',
            desc:'差旅出行必备一次性便携袜，但该款袜子可以重复穿着。除了出行必备，生活中偶尔偷个小懒也是相当不错。适合商务的简约中筒袜和轻便隐形袜供挑选，双12期间仅需1.49元/双。',

        }
    };

    var YX_N_M_9E51 = Vue.extend({
        name: 'YX_N_M_9E51',
        components: {},
        template: new Tpl2Vue(tpl, _default).render(),
        mixins: [pageMixins],
        data: function() {
            return new Data2Vue({
                data: _default
            }).getResult();
        },
        watch: {
            'contentInfo.leftUrl.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'leftUrl': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.rightUrl.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'rightUrl': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.btnUrl.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'btnUrl': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.imgLeft.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'imgLeft': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.imgRight.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'imgRight': {
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
    return YX_N_M_9E51;
});