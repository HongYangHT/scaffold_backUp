define([
    'Vue',
    'mustache',
    'text!components/page/modules/yxTemp/yxTemp.mustache',
    'common/mixins/pageMixins',
    'common/helper/tpl2vue',
    'common/helper/data2vue',
    'common/directive/setAttr',
    'uuid'
], function(Vue, mustache, tpl, pageMixins, Tpl2Vue, Data2Vue) {
    var _default = {
        title: '天然马兰草编织',
        desc: '马兰草，在清朝乾隆年间由台湾引进种植。<br>生长在海边1000米以内，长约1.2-1.3米，日光充足，海风劲吹。<br>特殊的生长环境使马兰草又软又韧，具有无污染、品质好的特点。<br>加上以纯手工制作，因而编成的织品气味清幽、柔软吸汗、<br>滑爽适宜，保健养生。<br>特别适用于老人、小孩使用。',
        price: {
            order: '1.0',
            rest: '24.0',
            origin: '39.0'
        },
        imgUrl: 'assets/imgs/1.jpg'
    };
    var YxTemp = Vue.extend({
        name: 'yxTemp',
        components: {},
        template: new Tpl2Vue(tpl, _default).render(),
        data: function(options) {
            // 这里必须每次进来算一遍
            return new Data2Vue({
                data: _default
            }).getResult();
        },
        mixins: [pageMixins],
        watch: {
            /*'$data': {
                'handler': function(val, old) {
                    this.$dispatch('changeDataDefault');
                },
                'deep': true
            },*/
            'title.value': {
                'handler': function(value, old) {
                    var data = {
                        'title': {
                            'key': this.title.key,
                            'name': this.title.name,
                            'type': this.title.type,
                            'value': old,
                            'input': this.title.input
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'desc.value': {
                'handler': function(value, old) {
                    var data = {
                        'desc': {
                            'key': this.desc.key,
                            'name': this.desc.name,
                            'type': this.desc.type,
                            'value': old,
                            'input': this.desc.input
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'price.order.value': {
                'handler': function(value, old) {
                    var data = {
                        'price': {
                            'order': {
                                'key': this.price.order.key,
                                'name': this.price.order.name,
                                'type': this.price.order.type,
                                'value': old,
                                'input': this.price.order.input
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'price.rest.value': {
                'handler': function(value, old) {
                    var data = {
                        'price': {
                            'rest': {
                                'key': this.price.rest.key,
                                'name': this.price.rest.name,
                                'type': this.price.rest.type,
                                'value': old,
                                'input': this.price.rest.input
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'price.origin.value': {
                'handler': function(value, old) {
                    var data = {
                        'price': {
                            'origin': {
                                'key': this.price.origin.key,
                                'name': this.price.origin.name,
                                'type': this.price.origin.type,
                                'value': old,
                                'input': this.price.origin.input
                            }
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            },
            'imgUrl.value': {
                'handler': function(value, old) {
                    var data = {
                        'imgUrl': {
                            'key': this.imgUrl.key,
                            'name': this.imgUrl.name,
                            'type': this.imgUrl.type,
                            'value': old,
                            'input': this.imgUrl.input
                        }
                    };
                    this.$dispatch('changeDataDefault', this.id, data);
                }
            }
        },
        computed: {
            price: function() {
                return this.$data.price;
            },
            oparate: function() {
                var _oparate = '';
                _oparate = this.id;
                return _oparate;
            }
        },
        methods: {

        },
        events: {

        }
    });
    return YxTemp;
});