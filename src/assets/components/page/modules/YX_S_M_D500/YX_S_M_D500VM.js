define([
    'Vue',
    'mustache',
    'jquery',
    'text!components/page/modules/YX_S_M_D500/YX_S_M_D500.mustache',
    'common/mixins/pageMixins',
    'common/helper/tpl2vue',
    'common/helper/data2vue',
    'common/helper/tools',
    'common/directive/setAttr'
], function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools) {
    var _default = {
        H5597Groups: {
            content: '左图片',
            goods_1: '商品一',
            goods_2: '商品二',
            goods_3: '组合信息'
        },
        content: {
            show_1: 1,
            combineImg_1: 'http://mimg.127.net/hz/uploader/20160923/14745981531670939.jpg'
        },
        goods_1: {
            show_2: 1,
            combineTips_2: 'MUJI制造商',
            combineTitle_2: '日式多功能颈枕 针织款',
            combinePrizeReal_2: '69.00',
            combinePrizedel_2: '180.00',
            combineLink_2: 'http://you.163.com/item/detail?id=1006001&amp;_stat_subject=512',
            combineImg_2: 'http://mimg.127.net/hz/uploader/20160922/14745168605970528.jpg'
        },
        goods_2: {
            show_3: 1,
            combineTips_3: 'MUJI制造商',
            combineTitle_3: '日式和风便携眼罩',
            combinePrizeReal_3: '29.00',
            combinePrizedel_3:'180.00',
            combineLink_3: 'http://you.163.com/item/detail?id=1021014&amp;_stat_subject=512',
            combineImg_3: 'http://mimg.127.net/hz/uploader/20160922/14745168606040529.jpg'
        },
        goods_3: {
            show_4: 1,
            combineHead_4: '特惠组合装',
            combineTitle_4: '颈枕 + 眼罩罩',
            combinePrizeReal_4: '100.00',
            combinePrizedel_4: '150.00',
            combineOfftip_4: '50',
            combineLink_4: 'http://you.163.com/item/detail?id=1086009&amp;_stat_subject=512',
            combineImg_4: 'http://yanxuan.nosdn.127.net/1be1e906a1283c529cfcff725b24376d.jpg'
        }
    };

    var YX_S_M_D500 = Vue.extend({
        name: 'YX_S_M_D500',
        components: {},
        template: new Tpl2Vue(tpl, _default).render(),
        mixins: [pageMixins],
        data: function() {
            return new Data2Vue({
                data: _default
            }).getResult();
        },
        watch: {
            'content.show_1.value': {
                'handler': function(value, old) {
                    var data = {
                        'content': {
                            'show_1': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'content.combineImg_1.value': {
                'handler': function(value, old) {
                    var data = {
                        'content': {
                            'combineImg_1': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_1.show_2.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_1': {
                            'show_2': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_1.combineTips_2.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_1': {
                            'combineTips_2': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_1.combineTitle_2.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_1': {
                            'combineTitle_2': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_1.combinePrizeReal_2.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_1': {
                            'combinePrize_2': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_1.combinePrizedel_2.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_1': {
                            'combinePrizedel_2': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_1.combineLink_2.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_1': {
                            'combineLink_2': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_1.combineImg_2.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_1': {
                            'combineImg_2': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_2.show_3.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_2': {
                            'show_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_2.combineTips_3.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_2': {
                            'combineTips_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_2.combineTitle_3.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_2': {
                            'combineTitle_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_2.combinePrizeReal_3.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_2': {
                            'combinePrizeReal_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_2.combinePrizedel_3.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_2': {
                            'combinePrizedel_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_2.combineLink_3.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_2': {
                            'combineLink_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_2.combineImg_3.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_2': {
                            'combineImg_3': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_3.show_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_3': {
                            'show_4': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_3.combineHead_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_3': {
                            'combineHead_4': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_3.combineTitle_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_3': {
                            'combineTitle_4': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_3.combinePrizeReal_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_3': {
                            'combinePrizeReal_4': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_3.combinePrizedel_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_3': {
                            'combinePrizedel_4': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_3.combineOfftip_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_3': {
                            'combineOfftip_4': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_3.combineLink_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_3': {
                            'combineLink_4': {
                                'value': old
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'goods_3.combineImg_4.value': {
                'handler': function(value, old) {
                    var data = {
                        'goods_3': {
                            'combineImg_4': {
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
    return YX_S_M_D500;
});
