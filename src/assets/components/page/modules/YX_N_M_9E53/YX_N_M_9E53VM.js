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
    'text!components/page/modules/YX_N_M_9E53/YX_N_M_9E53.mustache',
    'common/mixins/pageMixins',
    'common/helper/tpl2vue',
    'common/helper/data2vue',
    'common/helper/tools',
    'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {

    var _default = {
        contentInfo: {
            logoUrl:'http://you.163.com/?from=web_mailo_old_old_2',
            logo:'https://mimg.127.net/hz/uploader/20161207/14811076570850723.jpg',
            category_img_1:'https://mimg.127.net/hz/uploader/20161207/14811076569520708.png',
            category_link_1:'http://you.163.com/item/list?categoryId=1005000&from=web_mailo_old_old_2',
            category_img_2:'https://mimg.127.net/hz/uploader/20161207/14811076569590709.png',
            category_link_2:'http://you.163.com/item/list?categoryId=1005001&from=web_mailo_old_old_2',
            category_img_3:'https://mimg.127.net/hz/uploader/20161207/14811076569660710.png',
            category_link_3:'http://you.163.com/item/list?categoryId=1010000&from=web_mailo_old_old_2',
            category_img_4:'https://mimg.127.net/hz/uploader/20161207/14811076569720711.png',
            category_link_4:'http://you.163.com/item/list?categoryId=1008000&from=web_mailo_old_old_2',
            category_img_5:'https://mimg.127.net/hz/uploader/20161207/14811076569780712.png',
            category_link_5:'http://you.163.com/item/list?categoryId=1013001&from=web_mailo_old_old_2',
            category_img_6:'https://mimg.127.net/hz/uploader/20161207/14811076569850713.png',
            category_link_6:'http://you.163.com/item/list?categoryId=1012000&from=web_mailo_old_old_2',
        }
    };

    var YX_N_M_9E53 = Vue.extend({
        name: 'YX_N_M_9E53',
        components: {},
        template: new Tpl2Vue(tpl, _default).render(),
        mixins: [pageMixins],
        data: function() {
            return new Data2Vue({
                data: _default
            }).getResult();
        },
        watch: {
            'contentInfo.logoUrl.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'logoUrl': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.logo.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'logo': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_img_1.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_img_1': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_link_1.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_link_1': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_img_2.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_img_2': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_link_2.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_link_2': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_img_3.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_img_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_link_3.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_link_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_img_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_img_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_link_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_img_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_img_5.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_img_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_link_5.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_img_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_img_6.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_img_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'contentInfo.category_link_6.value': {
                'handler': function(value, old) {
                    var data = {
                        'contentInfo': {
                            'category_img_3': {
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
    return YX_N_M_9E53;
});