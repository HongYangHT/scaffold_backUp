define([
    'Vue',
    'text!components/page/content/content.mustache',
    'model/model',
    'components/page/layout/layoutVM',
    'components/page/popLayout/popLayoutVM',
    'common/helper/load',
    'common/helper/localStorage',
    'jquery',
    'notify',
    'uuid'
], function(Vue, tpl, Model,
    LayoutVM, PopLayoutVM,
    Load, localStorage, $) {
    var model = new Model();
    var load = new Load();
    var Content = Vue.extend({
        name: 'content',
        components: {
            'layout-view': LayoutVM,
            'pop-layout': PopLayoutVM
        },
        data: function() {
            return {
                content: {},
                insertId: '',
                showEdit: false,
                picked: 0,
                loadStyle: [],
                loadScript: [],
                scriptLib: [],
                styleLib: [],
                needStyle: [],
                needScript: [],
                layout: {},
                id: Math.uuid(32, 16).toLowerCase()
            };
        },
        template: tpl,
        methods: {
            showModal: function() {
                this.$broadcast('showModal', true);
            },
            operateEdit: function() {

            },
            operateDelete: function() {

            }
        },
        events: {
            addShowModal: function(data) {
                this.insertId = data.insertId ? data.insertId : '';
                if (this.picked == 0) {
                    this.$broadcast('showModal', data.flag);
                    this.$dispatch('showMenu', data.flag);
                }
            },
            // 是预览还是编辑过程
            editShowOrHide: function(picked) {
                this.picked = picked;
                this.$broadcast('notifyComponentEditShowOrHide', picked);
            },
            // 设置layout的数据
            saveLayoutData: function(data) {
                this.layout = data;
                this.$dispatch('saveLayoutDataInRoot', data);
            },
            // 编辑组件
            editComponent: function(data) {
                this.$dispatch('notifyRootChangeEdit', data);
            },
            // 继续上次编辑组件
            notifyContinueEdit: function(item) {
                // item id item(layout | pageData)
                /* 判断object 是不是空的 */
                function isEmpty(obj) {
                    for (var i in obj) {
                        return false;
                    }
                    return true;
                }
                /**
                 * @desc 判断元素是不是在数组中
                 * @param arr 只能是数组而不能是数组对象
                 * @param val 需要判断的元素
                 */
                function distinct(arr, val) {
                    if (!arr || !arr.length) return true;
                    var _json = {};
                    for (var i = 0, len = arr.length; i < len; i++) {
                        var _val = arr[i];
                        if (!_json[_val]) {
                            _json[_val] = 1;
                        }
                    }

                    return _json[val] ? false : true;
                }
                this.id = item.id;
                this.layout = item.item[0];
                this.$broadcast('changeLayout', item.item[0]);
                var dataTpl = item.item[1];
                $('.g-doc').find('.J_psc_wrap').remove();
                this.content = {};
                var _that = this,
                    _throttle = '',
                    _tplThrottle = '';
                function setThrottle(){
                    _tplThrottle = setTimeout(function(){
                        continueEdit();
                    },100);
                }    
                function continueEdit(){
                    if (dataTpl && dataTpl.length) {
                        $.each(dataTpl, function(i, data) {
                            if(_throttle) return;
                            var vm = '',
                                _id = '',
                                _loadStyle = '',
                                _loadScript = '',
                                loadCss = '',
                                loadJs = '',
                                _options = {
                                    pid: _that.insertId,
                                    type: data.type
                                };
                            switch (data.type) {
                                case 'yxhd':
                                    _throttle = true;
                                    require(['components/page/modules/yxhd/yxhdVM'], function(YxhdVM) {
                                        vm = new YxhdVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* 所需要的库js 或者css 模块*/
                                        /********************************************************************************************************************************/
                                        /* 所需要的css库 */

                                        /*********************************************************************************************************************************/
                                        var libJ = [
                                            'https://qiyukf.com/script/96ee78c0d9633761581e89d5019c5595.js',
                                            'https://webzj.reg.163.com/webapp/javascript/page/json3.js',
                                            'https://webzj.reg.163.com/webapp/javascript/message.js',
                                            'http://mimg.127.net/pub/common/js/yx.1.0.1.js',
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /************************************************************************************************/
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxhd/yxhd.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxhd/yxhd.css';
                                        /********************/
                                        /**
                                         * 加载模块自身的逻辑js css
                                         */
                                        /*******************/
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _loadScript = _loadScript + 'assets/components/page/modules/yxhd/yxhd.js';
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxft':
                                    _throttle = true;
                                    require(['components/page/modules/yxft/yxftVM'], function(yxftVM) {
                                        vm = new yxftVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxft/yxft.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _loadScript = _loadScript + 'assets/components/page/modules/yxft/yxft.js';
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxBackModule':
                                    _throttle = true;
                                    require(['components/page/modules/yxBackModule/yxBackModuleVM'], function(YxBackModuleVM) {
                                        vm = new YxBackModuleVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxBackModule/yxBackModule.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxBackModule/yxBackModule.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxBackModule2':
                                    _throttle = true;
                                    require(['components/page/modules/yxBackModule2/yxBackModule2VM'], function(YxBackModule2VM) {
                                        vm = new YxBackModule2VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });
                                        loadCss = 'assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxRule':
                                    _throttle = true;
                                    require(['components/page/modules/yxRule/yxRuleVM'], function(yxRuleVM) {
                                        // 保存数据的情况下，重写data
                                        vm = new yxRuleVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });
                                        loadCss = 'assets/components/page/modules/yxRule/yxRule.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxRule/yxRule.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxTemp':
                                    _throttle = true;
                                    require(['components/page/modules/yxTemp/yxTempVM'], function(yxTempVM) {
                                        // 保存数据的情况下，重写data
                                        vm = new yxTempVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxTemp/yxTemp.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }
                                        loadJs = 'assets/components/page/modules/yxTemp/yxTemp.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            load.loadScript(loadJs);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxTemp/yxTemp.css';
                                        _loadScript = _loadScript + 'assets/components/page/modules/yxTemp/yxTemp.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxBanner':
                                    _throttle = true;
                                    require(['components/page/modules/yxBanner/yxBannerVM'], function(yxBannerVM) {
                                        vm = new yxBannerVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxBanner/yxBanner.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxBanner/yxBanner.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxBanner2':
                                    _throttle = true;
                                    require(['components/page/modules/yxBanner2/yxBanner2VM'], function(yxBanner2VM) {
                                        vm = new yxBanner2VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxBanner2/yxBanner2.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }
                                        loadJs = 'assets/components/page/modules/yxBanner2/yxBanner2.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            load.loadScript(loadJs);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxBanner2/yxBanner2.css';
                                        _loadScript = _loadScript + 'assets/components/page/modules/yxBanner2/yxBanner2.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_9BBD':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_9BBD/YX_N_M_9BBDVM'], function(YX_N_M_9BBDVM) {
                                        vm = new YX_N_M_9BBDVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/hxm/dashi/promote/plugIn/swiper.min.js',
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // load.loadScript(loadJs); 
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_2BE2':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2VM'], function(YX_N_M_2BE2VM) {
                                        vm = new YX_N_M_2BE2VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_7A5D':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_7A5D/YX_N_M_7A5DVM'], function(YX_N_M_7A5DVM) {
                                        vm = new YX_N_M_7A5DVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_A1C6':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6VM'], function(YX_N_M_A1C6VM) {
                                        vm = new YX_N_M_A1C6VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_881B':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_881B/YX_N_M_881BVM'], function(YX_N_M_881BVM) {
                                        vm = new YX_N_M_881BVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_S_M_73D7':
                                    _throttle = true;
                                    require(['components/page/modules/YX_S_M_73D7/YX_S_M_73D7VM'], function(YX_S_M_73D7VM) {
                                        vm = new YX_S_M_73D7VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_S_M_73D7/YX_S_M_73D7.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_S_M_73D7/YX_S_M_73D7.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_S_M_0CE9':
                                    _throttle = true;
                                    require(['components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9VM'], function(YX_S_M_0CE9VM) {
                                        vm = new YX_S_M_0CE9VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.css';
                                        _loadScript = 'assets/components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                         _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break; 
                                case 'YX_S_M_19AB':
                                    _throttle = true;
                                    require(['components/page/modules/YX_S_M_19AB/YX_S_M_19ABVM'], function(YX_S_M_19ABVM) {
                                        vm = new YX_S_M_19ABVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_S_M_19AB/YX_S_M_19AB.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_S_M_19AB/YX_S_M_19AB.css';
                                        _loadScript = 'assets/components/page/modules/YX_S_M_19AB/YX_S_M_19AB.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                         _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_S_M_AFA4':
                                    _throttle = true;
                                    require(['components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4VM'], function(YX_S_M_AFA4VM) {
                                        vm = new YX_S_M_AFA4VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_46EB':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_46EB/YX_N_M_46EBVM'], function(YX_N_M_46EBVM) {
                                        vm = new YX_N_M_46EBVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_N_M_46EB/YX_N_M_46EB.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_46EB/YX_N_M_46EB.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_46EB/YX_N_M_46EB.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                         _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;                               
                            }
                        });
                    } else {
                        !!_tplThrottle && clearTimeout(_tplThrottle);
                        _that.$dispatch('notifyRootChangeEdit', {
                            changeEditId: _that.layout.id,
                            oparate: 1
                        });
                    }
                } 
                setThrottle();   
            },
            /*
                撤销功能的实现，就是将数据依次pop出来
                在new component 的时候把data 替换成已经存在的数据  
            */
            prevStep: function() {
                /* 判断object 是不是空的 */
                function isEmpty(obj) {
                    for (var i in obj) {
                        return false;
                    }
                    return true;
                }
                /**
                 * @desc 判断元素是不是在数组中
                 * @param arr 只能是数组而不能是数组对象
                 * @param val 需要判断的元素
                 */
                function distinct(arr, val) {
                    if (!arr || !arr.length) return true;
                    var _json = {};
                    for (var i = 0, len = arr.length; i < len; i++) {
                        var _val = arr[i];
                        if (!_json[_val]) {
                            _json[_val] = 1;
                        }
                    }

                    return _json[val] ? false : true;
                }
                this.id = item.id;
                this.layout = item.item[0];
                this.$broadcast('changeLayout', item.item[0]);
                var dataTpl = item.item[1];
                $('.g-doc').find('.J_psc_wrap').remove();
                this.content = {};
                var _that = this,
                    _throttle = '',
                    _tplThrottle = '';
                function setThrottle(){
                    _tplThrottle = setTimeout(function(){
                        continueEdit();
                    },100);
                }    
                function continueEdit(){
                    if (dataTpl && dataTpl.length) {
                        $.each(dataTpl, function(i, data) {
                            if(_throttle) return;
                            var vm = '',
                                _id = '',
                                _loadStyle = '',
                                _loadScript = '',
                                loadCss = '',
                                loadJs = '',
                                _options = {
                                    pid: _that.insertId,
                                    type: data.type
                                };
                            switch (data.type) {
                                case 'yxhd':
                                    _throttle = true;
                                    require(['components/page/modules/yxhd/yxhdVM'], function(YxhdVM) {
                                        vm = new YxhdVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* 所需要的库js 或者css 模块*/
                                        /********************************************************************************************************************************/
                                        /* 所需要的css库 */

                                        /*********************************************************************************************************************************/
                                        var libJ = [
                                            'https://qiyukf.com/script/96ee78c0d9633761581e89d5019c5595.js',
                                            'https://webzj.reg.163.com/webapp/javascript/page/json3.js',
                                            'https://webzj.reg.163.com/webapp/javascript/message.js',
                                            'http://mimg.127.net/pub/common/js/yx.1.0.1.js',
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /************************************************************************************************/
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxhd/yxhd.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxhd/yxhd.css';
                                        /********************/
                                        /**
                                         * 加载模块自身的逻辑js css
                                         */
                                        /*******************/
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _loadScript = _loadScript + 'assets/components/page/modules/yxhd/yxhd.js';
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxft':
                                    _throttle = true;
                                    require(['components/page/modules/yxft/yxftVM'], function(yxftVM) {
                                        vm = new yxftVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxft/yxft.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _loadScript = _loadScript + 'assets/components/page/modules/yxft/yxft.js';
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxBackModule':
                                    _throttle = true;
                                    require(['components/page/modules/yxBackModule/yxBackModuleVM'], function(YxBackModuleVM) {
                                        vm = new YxBackModuleVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxBackModule/yxBackModule.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxBackModule/yxBackModule.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxBackModule2':
                                    _throttle = true;
                                    require(['components/page/modules/yxBackModule2/yxBackModule2VM'], function(YxBackModule2VM) {
                                        vm = new YxBackModule2VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });
                                        loadCss = 'assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxRule':
                                    _throttle = true;
                                    require(['components/page/modules/yxRule/yxRuleVM'], function(yxRuleVM) {
                                        // 保存数据的情况下，重写data
                                        vm = new yxRuleVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });
                                        loadCss = 'assets/components/page/modules/yxRule/yxRule.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxRule/yxRule.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxTemp':
                                    _throttle = true;
                                    require(['components/page/modules/yxTemp/yxTempVM'], function(yxTempVM) {
                                        // 保存数据的情况下，重写data
                                        vm = new yxTempVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxTemp/yxTemp.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }
                                        loadJs = 'assets/components/page/modules/yxTemp/yxTemp.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            load.loadScript(loadJs);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxTemp/yxTemp.css';
                                        _loadScript = _loadScript + 'assets/components/page/modules/yxTemp/yxTemp.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxBanner':
                                    _throttle = true;
                                    require(['components/page/modules/yxBanner/yxBannerVM'], function(yxBannerVM) {
                                        vm = new yxBannerVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxBanner/yxBanner.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxBanner/yxBanner.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'yxBanner2':
                                    _throttle = true;
                                    require(['components/page/modules/yxBanner2/yxBanner2VM'], function(yxBanner2VM) {
                                        vm = new yxBanner2VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/yxBanner2/yxBanner2.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }
                                        loadJs = 'assets/components/page/modules/yxBanner2/yxBanner2.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            load.loadScript(loadJs);
                                        }

                                        _loadStyle = _loadStyle + 'assets/components/page/modules/yxBanner2/yxBanner2.css';
                                        _loadScript = _loadScript + 'assets/components/page/modules/yxBanner2/yxBanner2.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_9BBD':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_9BBD/YX_N_M_9BBDVM'], function(YX_N_M_9BBDVM) {
                                        vm = new YX_N_M_9BBDVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/hxm/dashi/promote/plugIn/swiper.min.js',
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // load.loadScript(loadJs); 
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_2BE2':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2VM'], function(YX_N_M_2BE2VM) {
                                        vm = new YX_N_M_2BE2VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_7A5D':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_7A5D/YX_N_M_7A5DVM'], function(YX_N_M_7A5DVM) {
                                        vm = new YX_N_M_7A5DVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_A1C6':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6VM'], function(YX_N_M_A1C6VM) {
                                        vm = new YX_N_M_A1C6VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_881B':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_881B/YX_N_M_881BVM'], function(YX_N_M_881BVM) {
                                        vm = new YX_N_M_881BVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }
                                        /* js lib */
                                        var libJ = [
                                            'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                            'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                        ];
                                        $.each(libJ, function(i, n) {
                                            if (distinct(_that.scriptLib, n)) {
                                                _that.scriptLib.push(n);
                                                /*load.loadScript(n);*/
                                            }
                                        });
                                        // 这一份是逻辑js
                                        loadJs = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.js';
                                        if (distinct(_that.needScript, loadJs)) {
                                            _that.needScript.push(loadJs);
                                            // 这一份是保存的基本js
                                        }

                                        /* css lib */
                                        var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                        $.each(libC, function(i, n) {
                                            if (distinct(_that.styleLib, n)) {
                                                _that.styleLib.push(n);
                                                load.loadStyle(n);
                                            }
                                        });

                                        _that.$dispatch('saveLibLink', {
                                            scriptLib: _that.scriptLib,
                                            styleLib: _that.styleLib
                                        });

                                        loadCss = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });

                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_S_M_73D7':
                                    _throttle = true;
                                    require(['components/page/modules/YX_S_M_73D7/YX_S_M_73D7VM'], function(YX_S_M_73D7VM) {
                                        vm = new YX_S_M_73D7VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_S_M_73D7/YX_S_M_73D7.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_S_M_73D7/YX_S_M_73D7.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_S_M_0CE9':
                                    _throttle = true;
                                    require(['components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9VM'], function(YX_S_M_0CE9VM) {
                                        vm = new YX_S_M_0CE9VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.css';
                                        _loadScript = 'assets/components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                         _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break; 
                                case 'YX_S_M_19AB':
                                    _throttle = true;
                                    require(['components/page/modules/YX_S_M_19AB/YX_S_M_19ABVM'], function(YX_S_M_19ABVM) {
                                        vm = new YX_S_M_19ABVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_S_M_19AB/YX_S_M_19AB.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_S_M_19AB/YX_S_M_19AB.css';
                                        _loadScript = 'assets/components/page/modules/YX_S_M_19AB/YX_S_M_19AB.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                         _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });

                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_S_M_AFA4':
                                    _throttle = true;
                                    require(['components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4VM'], function(YX_S_M_AFA4VM) {
                                        vm = new YX_S_M_AFA4VM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4.css';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;
                                case 'YX_N_M_46EB':
                                    _throttle = true;
                                    require(['components/page/modules/YX_N_M_46EB/YX_N_M_46EBVM'], function(YX_N_M_46EBVM) {
                                        vm = new YX_N_M_46EBVM({
                                            data: function() {
                                                return data;
                                            }
                                        });
                                        _id = vm._data.id;
                                        _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                        vm.$parent = _that;
                                        if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                        } else {
                                            vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                        }

                                        loadCss = 'assets/components/page/modules/YX_N_M_46EB/YX_N_M_46EB.css';
                                        if (distinct(_that.needStyle, loadCss)) {
                                            _that.needStyle.push(loadCss);
                                            load.loadStyle(loadCss);
                                        }

                                        _loadStyle = 'assets/components/page/modules/YX_N_M_46EB/YX_N_M_46EB.css';
                                        _loadScript = 'assets/components/page/modules/YX_N_M_46EB/YX_N_M_46EB.js';
                                        _that.loadStyle.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadStyle
                                        });
                                         _that.loadScript.push({
                                            id: vm.id,
                                            key: data.type,
                                            value: _loadScript
                                        });
                                        _that.$dispatch('saveLink', {
                                            loadStyle: _that.loadStyle,
                                            loadScript: _that.loadScript
                                        });
                                        _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                        var tplData = window.tplData;
                                        window.tplData.push($.extend({}, vm._data, _options));
                                        !!_tplThrottle && clearTimeout(_tplThrottle);
                                        _throttle = false;
                                        dataTpl.splice(i,1);
                                        setThrottle();
                                    });
                                    break;                               
                            }
                        });
                        // 将数据切换到layout
                        $.notify({
                            title: '撤销成功',
                            type: 'success'
                        });
                    } else {
                        !!_tplThrottle && clearTimeout(_tplThrottle);
                        $.notify({
                            title: '没有更多的修改记录',
                            type: 'error'
                        });
                        _that.$dispatch('notifyRootChangeEdit', {
                            changeEditId: _that.layout.id,
                            oparate: 1
                        });
                    }
                } 
                setThrottle();
            },
            /*
                清空功能
            */
            removeAll: function() {
                $('.g-doc').find('.J_psc_wrap').remove();
                this.content = {};
                window.tplData = [];
                window.pageData = [];
                this.$dispatch('notifyRootChangeEdit', {
                    changeEditId: this.layout.id,
                    oparate: 1
                });
            },
            /*
                保存功能，就是将数据push进一个数组然后存储起来
            */
            savePage: function() {
                (window.saveData = []) && (window.saveData.push(JSON.parse(JSON.stringify(this.layout))));
                window.saveData.push(JSON.parse(JSON.stringify(window.tplData)));
                var data = window.saveData;
                localStorage.set(this.id, data);
            },
            /*
                预览功能
            */
            preView: function() {
                // 先保存数据
                (window.saveData = []) && (window.saveData.push(JSON.parse(JSON.stringify(this.layout))));
                window.saveData.push(JSON.parse(JSON.stringify(window.tplData)));
                var data = window.saveData;
                localStorage.set(this.id, data);
            },
            /*
                发布功能
            */
            publish: function() {
                // 先保存数据
                (window.saveData = []) && (window.saveData.push(JSON.parse(JSON.stringify(this.layout))));
                window.saveData.push(JSON.parse(JSON.stringify(window.tplData)));
                var data = window.saveData;
                localStorage.set(this.id, data);
            },
            // 插入组件
            insertComponent: function(data) {
                var vm = '',
                    _that = this,
                    _id = '',
                    _loadStyle = '',
                    _loadScript = '',
                    loadCss = '',
                    loadJs = '',
                    _options = {
                        pid: _that.insertId,
                        type: data.type
                    };
                /* 判断object 是不是空的 */
                function isEmpty(obj) {
                    for (var i in obj) {
                        return false;
                    }
                    return true;
                }
                /**
                 * @desc 判断元素是不是在数组中
                 * @param arr 只能是数组而不能是数组对象
                 * @param val 需要判断的元素
                 */
                function distinct(arr, val) {
                    if (!arr || !arr.length) return true;
                    var _json = {};
                    for (var i = 0, len = arr.length; i < len; i++) {
                        var _val = arr[i];
                        if (!_json[_val]) {
                            _json[_val] = 1;
                        }
                    }

                    return _json[val] ? false : true;
                }

                switch (data.type) {
                    case 'yxhd':
                        require(['components/page/modules/yxhd/yxhdVM'], function(YxhdVM) {
                            vm = new YxhdVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            /* 所需要的库js 或者css 模块依赖于*/
                            /**
                             * 去除重复的lib库，并加载到页面中
                             */

                            var libJ = [
                                'https://qiyukf.com/script/96ee78c0d9633761581e89d5019c5595.js',
                                'https://webzj.reg.163.com/webapp/javascript/page/json3.js',
                                'https://webzj.reg.163.com/webapp/javascript/message.js',
                                'http://mimg.127.net/pub/common/js/yx.1.0.1.js',
                                'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });

                            /************************************************************************************************/
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });
                            /************************************************************************************************/
                            /* 加载自身的Js和css */
                            loadCss = 'assets/components/page/modules/yxhd/yxhd.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }
                            _loadStyle = _loadStyle + 'assets/components/page/modules/yxhd/yxhd.css';

                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _loadScript = _loadScript + 'assets/components/page/modules/yxhd/yxhd.js';
                            _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });

                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'yxft':
                        require(['components/page/modules/yxft/yxftVM'], function(yxftVM) {
                            vm = new yxftVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            _loadStyle = _loadStyle + 'assets/components/page/modules/yxft/yxft.css';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _loadScript = _loadScript + 'assets/components/page/modules/yxft/yxft.js';
                            _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'yxBackModule':
                        require(['components/page/modules/yxBackModule/yxBackModuleVM'], function(YxBackModuleVM) {
                            vm = new YxBackModuleVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });
                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/yxBackModule/yxBackModule.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = _loadStyle + 'assets/components/page/modules/yxBackModule/yxBackModule.css';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });

                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });

                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'yxBackModule2':
                        require(['components/page/modules/yxBackModule2/yxBackModule2VM'], function(YxBackModule2VM) {
                            vm = new YxBackModule2VM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });

                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = _loadStyle + 'assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });

                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'yxBanner':
                        require(['components/page/modules/yxBanner/yxBannerVM'], function(yxBannerVM) {
                            vm = new yxBannerVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });

                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/yxBanner/yxBanner.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = _loadStyle + 'assets/components/page/modules/yxBanner/yxBanner.css';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });

                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'yxBanner2':
                        require(['components/page/modules/yxBanner2/yxBanner2VM'], function(yxBanner2VM) {
                            vm = new yxBanner2VM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });

                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/yxBanner2/yxBanner2.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            loadJs = 'assets/components/page/modules/yxBanner2/yxBanner2.js';
                            if (distinct(_that.needScript, loadJs)) {
                                _that.needScript.push(loadJs);
                                load.loadScript(loadJs);
                            }

                            _loadStyle = _loadStyle + 'assets/components/page/modules/yxBanner2/yxBanner2.css';
                            _loadScript = _loadScript + 'assets/components/page/modules/yxBanner2/yxBanner2.js';

                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });

                            _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });

                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'yxRule':
                        require(['components/page/modules/yxRule/yxRuleVM'], function(yxRuleVM) {
                            // 保存数据的情况下，重写data
                            vm = new yxRuleVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });

                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/yxRule/yxRule.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/yxRule/yxRule.css';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });

                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });

                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'yxTemp':
                        require(['components/page/modules/yxTemp/yxTempVM'], function(yxTempVM) {
                            // 保存数据的情况下，重写data
                            vm = new yxTempVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });

                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/yxTemp/yxTemp.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            loadJs = 'assets/components/page/modules/yxTemp/yxTemp.js';
                            if (distinct(_that.needScript, loadJs)) {
                                _that.needScript.push(loadJs);
                                load.loadStyle(loadJs);
                            }

                            _loadStyle = 'assets/components/page/modules/yxTemp/yxTemp.css';
                            _loadScript = 'assets/components/page/modules/yxTemp/yxTemp.js';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });

                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'YX_N_M_9BBD':
                        require(['components/page/modules/YX_N_M_9BBD/YX_N_M_9BBDVM'], function(YX_N_M_9BBDVM) {
                            vm = new YX_N_M_9BBDVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js',
                                'http://mimg.127.net/hxm/dashi/promote/plugIn/swiper.min.js',
                                'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });
                            // 这一份是逻辑js
                            loadJs = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.js';
                            if (distinct(_that.needScript, loadJs)) {
                                _that.needScript.push(loadJs);
                                // load.loadScript(loadJs); 
                                // 这一份是保存的基本js
                            }

                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.css';
                            _loadScript = 'assets/components/page/modules/YX_N_M_9BBD/YX_N_M_9BBD.js';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });

                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });

                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'YX_N_M_2BE2':
                        require(['components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2VM'], function(YX_N_M_2BE2VM) {
                                vm = new YX_N_M_2BE2VM();
                                _id = vm._data.id;
                                _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                vm.$parent = _that;
                                if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                    vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                } else {
                                    vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                }
                                /* js lib */
                                var libJ = [
                                    'http://mimg.127.net/pub/common/js/jquery.lazyload.js',
                                    'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                    'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                                ];
                                $.each(libJ, function(i, n) {
                                    if (distinct(_that.scriptLib, n)) {
                                        _that.scriptLib.push(n);
                                        /*load.loadScript(n);*/
                                    }
                                });
                                // 这一份是逻辑js
                                loadJs = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.js';
                                if (distinct(_that.needScript, loadJs)) {
                                    _that.needScript.push(loadJs);
                                    // 这一份是保存的基本js
                                }

                                /* css lib */
                                var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                                $.each(libC, function(i, n) {
                                    if (distinct(_that.styleLib, n)) {
                                        _that.styleLib.push(n);
                                        load.loadStyle(n);
                                    }
                                });

                                _that.$dispatch('saveLibLink', {
                                    scriptLib: _that.scriptLib,
                                    styleLib: _that.styleLib
                                });

                                loadCss = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.css';
                                if (distinct(_that.needStyle, loadCss)) {
                                    _that.needStyle.push(loadCss);
                                    load.loadStyle(loadCss);
                                }

                                _loadStyle = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.css';
                                _loadScript = 'assets/components/page/modules/YX_N_M_2BE2/YX_N_M_2BE2.js';
                                _that.loadStyle.push({
                                    id: vm.id,
                                    key: data.type,
                                    value: _loadStyle
                                });
                                _that.loadScript.push({
                                    id: vm.id,
                                    key: data.type,
                                    value: _loadScript
                                });

                                _that.$dispatch('saveLink', {
                                    loadStyle: _that.loadStyle,
                                    loadScript: _that.loadScript
                                });

                                _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                var tplData = window.tplData;
                                if (tplData && !isEmpty(tplData)) {
                                    window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                                }
                                window.tplData.push($.extend({}, vm._data, _options));
                            });
                        break;
                    case 'YX_N_M_7A5D':
                        require(['components/page/modules/YX_N_M_7A5D/YX_N_M_7A5DVM'], function(YX_N_M_7A5DVM) {
                            vm = new YX_N_M_7A5DVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js',
                                'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });
                            // 这一份是逻辑js
                            loadJs = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.js';
                            if (distinct(_that.needScript, loadJs)) {
                                _that.needScript.push(loadJs);
                                // 这一份是保存的基本js
                            }

                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.css';
                            _loadScript = 'assets/components/page/modules/YX_N_M_7A5D/YX_N_M_7A5D.js';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });

                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });

                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                            });
                        break;
                    case 'YX_N_M_A1C6':
                        require(['components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6VM'], function(YX_N_M_A1C6VM) {
                            vm = new YX_N_M_A1C6VM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js',
                                'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });
                            // 这一份是逻辑js
                            loadJs = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.js';
                            if (distinct(_that.needScript, loadJs)) {
                                _that.needScript.push(loadJs);
                                // 这一份是保存的基本js
                            }

                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.css';
                            _loadScript = 'assets/components/page/modules/YX_N_M_A1C6/YX_N_M_A1C6.js';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });

                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });

                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'YX_N_M_881B':
                        require(['components/page/modules/YX_N_M_881B/YX_N_M_881BVM'], function(YX_N_M_881BVM) {
                            vm = new YX_N_M_881BVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            /* js lib */
                            var libJ = [
                                'http://mimg.127.net/pub/common/js/jquery.lazyload.js',
                                'http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js',
                                'http://mimg.127.net/pub/common/js/PSC_C_statistics.js'
                            ];
                            $.each(libJ, function(i, n) {
                                if (distinct(_that.scriptLib, n)) {
                                    _that.scriptLib.push(n);
                                    /*load.loadScript(n);*/
                                }
                            });
                            // 这一份是逻辑js
                            loadJs = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.js';
                            if (distinct(_that.needScript, loadJs)) {
                                _that.needScript.push(loadJs);
                                // 这一份是保存的基本js
                            }
                            /* css lib */
                            var libC = ['http://mimg.127.net/pub/common/css/PSC_YX_PC_reset.css'];
                            $.each(libC, function(i, n) {
                                if (distinct(_that.styleLib, n)) {
                                    _that.styleLib.push(n);
                                    load.loadStyle(n);
                                }
                            });

                            _that.$dispatch('saveLibLink', {
                                scriptLib: _that.scriptLib,
                                styleLib: _that.styleLib
                            });

                            loadCss = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.css';
                            _loadScript = 'assets/components/page/modules/YX_N_M_881B/YX_N_M_881B.js';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });

                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });

                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'YX_S_M_73D7':
                        require(['components/page/modules/YX_S_M_73D7/YX_S_M_73D7VM'], function(YX_S_M_73D7VM) {
                            vm = new YX_S_M_73D7VM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            loadCss = 'assets/components/page/modules/YX_S_M_73D7/YX_S_M_73D7.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/YX_S_M_73D7/YX_S_M_73D7.css';
                            _loadScript = 'assets/components/page/modules/YX_S_M_73D7/YX_S_M_73D7.js';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                             _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });

                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'YX_S_M_0CE9':
                        require(['components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9VM'], function(YX_S_M_0CE9VM) {
                            vm = new YX_S_M_0CE9VM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            loadCss = 'assets/components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.css';
                            _loadScript = 'assets/components/page/modules/YX_S_M_0CE9/YX_S_M_0CE9.js';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'YX_S_M_19AB':
                        require(['components/page/modules/YX_S_M_19AB/YX_S_M_19ABVM'], function(YX_S_M_19ABVM) {
                            vm = new YX_S_M_19ABVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            loadCss = 'assets/components/page/modules/YX_S_M_19AB/YX_S_M_19AB.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/YX_S_M_19AB/YX_S_M_19AB.css';
                            _loadScript = 'assets/components/page/modules/YX_S_M_19AB/YX_S_M_19AB.js';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                             _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'YX_S_M_AFA4':
                        require(['components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4VM'], function(YX_S_M_AFA4VM) {
                            vm = new YX_S_M_AFA4VM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            loadCss = 'assets/components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4.css';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'YX_N_M_46EB':
                        require(['components/page/modules/YX_N_M_46EB/YX_N_M_46EBVM'], function(YX_N_M_46EBVM) {
                            vm = new YX_N_M_46EBVM();
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }

                            loadCss = 'assets/components/page/modules/YX_N_M_46EB/YX_N_M_46EB.css';
                            if (distinct(_that.needStyle, loadCss)) {
                                _that.needStyle.push(loadCss);
                                load.loadStyle(loadCss);
                            }

                            _loadStyle = 'assets/components/page/modules/YX_N_M_46EB/YX_N_M_46EB.css';
                            _loadScript = 'assets/components/page/modules/YX_N_M_46EB/YX_N_M_46EB.js';
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                             _that.loadScript.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadScript
                            });
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = window.tplData;
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;    
                }
            },
            // 删除组件
            removeComponent: function(data) {
                var _that = this;
                delete this.content['d_' + data.removeId];
                $('.g-doc [data-id="' + data.removeId + '"]').remove();

                if(this.loadStyle && this.loadStyle.length){
                    $.each(this.loadStyle, function(i, n) {
                        if (n && n.id && data.removeId == n.id) {
                            _that.loadStyle.splice(i, 1);
                        }
                    });
                }
                if(this.loadScript && this.loadScript.length){
                    $.each(this.loadScript, function(i, n) {
                        if (n && n.id && data.removeId == n.id) {
                            _that.loadScript.splice(i, 1);
                        }
                    });
                }
                if(window.tplData && window.tplData.length){
                    $.each(window.tplData, function(i, item) {
                        if (item && item.id && item.id == data.removeId) {
                            window.tplData.splice(i, 1);
                        }
                    });
                }
                this.$dispatch('notifyRootChangeEdit', data); // 分发给Root 修改编辑区的数据
                this.$dispatch('removeRootData', data); // 分发给Root 删除数据事件
            },
            // 修改参数后并将其保存下来
            changeDataDefault: function(id, data, newFlag) {
                var tplData = JSON.parse(JSON.stringify(window.tplData));
                $.each(tplData, function(i, item) {
                    if (item.id == id) {
                        tplData[i] = $.extend(true, item, JSON.parse(JSON.stringify(data)));
                    }
                });
                // 在某些需要手动更新的情况下，更新window.tplData
                $.each(JSON.parse(JSON.stringify(window.tplData)),function(i,item){
                    if (item.id == id && newFlag) {
                        window.tplData[i] = $.extend(true, item, JSON.parse(JSON.stringify(data)));
                    }
                });
                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
            },
            // 用于定位到具体的Dom位置
            notifyContentFocusSection: function(sectionInfo) {
                var $target = $('[data-id="' + sectionInfo.id + '"]').find('[data-h55970f92="' + sectionInfo.key + '"]'),
                    reg = /.+\.(gif|jpg|jpeg|png|bmp)$/,
                    _width = $target.width(),
                    _height = $target.height();

                    // _w = $('.g-doc').width();
                    function getImgOriginalSize(){
                        _width = this.width;
                        _height = this.height;
                    }
                if (reg.test(sectionInfo.val)) {
                    var src = $target.attr('src') || $target.css('background-image');
                    var img = new Image();
                    img.src = document.images[0].src;
                    if(img.complete){
                        getImgOriginalSize.call(img);
                        img = null;
                    }else{
                        img.onload=function(){
                            getImgOriginalSize.call(img);
                            img = null;
                        };
                    }
                    /*if (_width >= _w) {
                        $target.attr('aria-label', '图片大小：' + '100%(Web|1920)' + ' x ' + _height);
                    } else {
                        $target.attr('aria-label', '图片大小：' + _width + ' x ' + _height);
                    }*/
                    $target.attr('aria-label', '图片大小：' + _width + ' x ' + _height);
                }
                $target.addClass('u-psc-mask-scaffold');
            },
            // 用于定位到具体的Dom位置
            notifyContentBlurSection: function(sectionInfo) {
                $('[data-id="' + sectionInfo.id + '"]').find('[data-h55970f92="' + sectionInfo.key + '"]').removeClass('u-psc-mask-scaffold');
            },
            notifyContentPreviewSection: function(sectionInfo) {
                $('[data-id="' + sectionInfo.id + '"]').find('[data-h55970f92="' + sectionInfo.key + '"]').css('background-image', "url(" + sectionInfo.src + ")");
            },
            // 修改数据和保存数据
            notifyDragLocation: function(info) {
                /*
                 * 需要考虑两种情况
                 * 一种是在g-doc 下面的模块
                 * 一种是不在根目录下的模块
                 */
                // 先存储上一次的结果
                window.pageData.unshift(JSON.parse(JSON.stringify(window.tplData)));
                var len = window.tplData.length;
                $.each(window.tplData, function(i, n) {
                    /* 
                     *  判断条件 newIndex < oldIndex  
                     *  如果newIndex == 1  这种情况直接splice(i,1) unshift(item);
                     *  如果newIndex != 1  这种先删除splice(i,1) 再插入相对应的位置splice(newIndex-1,0,item)
                     *  判断条件 newIndex > oldIndex
                     *  如果newIndex == len 这种情况splice(i,1) push(item)
                     *  如果newIndex != len 先插入splice(newIndex-1,0,item) splice(i,1)
                     */
                    if (info.targetId == n.id && $(info.from).hasClass('g-doc')) {
                        var item = window.tplData[i];
                        if (info.newIndex < info.oldIndex) {
                            if (info.newIndex == 1) {
                                window.tplData.splice(i, 1);
                                window.tplData.unshift(item);
                            } else {
                                window.tplData.splice(i, 1);
                                window.tplData.splice(info.newIndex - 1, 0, item);
                            }
                        } else {
                            if (info.newIndex == len) {
                                window.tplData.splice(i, 1);
                                window.tplData.push(item);
                            } else {
                                window.tplData.splice(info.newIndex - 1, 0, item);
                                window.tplData.splice(i, 1);
                            }
                        }
                    }
                });
            },
            // 显示某个区域
            notifyShowGroup: function(info) {
                $(this.$el).find('[data-id="' + info.id + '"]').find('[data-h55970f92group="' + info.location + '"]').addClass('J-location-active').end()
                    .find('[data-h55970f92group="' + info.oldLocation + '"]').removeClass('J-location-active');
            }
        }
    });
    return Content;
});