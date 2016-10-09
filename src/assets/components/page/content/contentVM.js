define([
    'Vue',
    'text!components/page/content/content.mustache',
    'model/model',
    'components/page/layout/layoutVM',
    'components/page/popLayout/popLayoutVM',
    'common/helper/load',
    'common/helper/localStorage',
    'notify',
    'uuid'
], function(Vue, tpl, Model,
    LayoutVM, PopLayoutVM,
    Load, localStorage) {
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
                this.id = item.id;
                this.layout = item.item[0];
                this.$broadcast('changeLayout', item.item[0]);
                var dataTpl = item.item[1];
                $('.g-doc').find('.J_wrap').remove();
                this.content = {};
                var _that = this;
                if (dataTpl) {
                    $.each(dataTpl, function(i, data) {
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
                                require(['components/page/modules/yxhd/yxhdVM'], function(YxhdVM) {
                                    vm = new YxhdVM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxhd/yxhd.css';
                                    loadCss = 'assets/components/page/modules/yxhd/yxhd.css';
                                    load.loadStyle(loadCss);
                                    _that.loadStyle.push({
                                        id: vm.id,
                                        key: data.type,
                                        value: _loadStyle
                                    });
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;
                            case 'yxft':
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
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;    
                            case 'yxBackModule':
                                require(['components/page/modules/yxBackModule/yxBackModuleVM'],function(YxBackModuleVM){
                                    vm = new YxBackModuleVM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxBackModule/yxBackModule.css';
                                    loadCss = 'assets/components/page/modules/yxBackModule/yxBackModule.css';
                                    load.loadStyle(loadCss);
                                    _that.loadStyle.push({
                                        id: vm.id,
                                        key: data.type,
                                        value: _loadStyle
                                    });
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;
                            case 'yxBackModule2':
                                require(['components/page/modules/yxBackModule2/yxBackModule2VM'],function(YxBackModule2VM){
                                    vm = new YxBackModule2VM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                                    loadCss = 'assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                                    load.loadStyle(loadCss);
                                    _that.loadStyle.push({
                                        id: vm.id,
                                        key: data.type,
                                        value: _loadStyle
                                    });
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;
                            case 'yxRule':
                                require(['components/page/modules/yxRule/yxRuleVM'], function(yxRuleVM) {
                                    // 保存数据的情况下，重写data
                                    vm = new yxRuleVM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxRule/yxRule.css';
                                    loadCss = 'assets/components/page/modules/yxRule/yxRule.css';
                                    load.loadStyle(loadCss);
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
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;     
                            case 'yxTemp':
                                require(['components/page/modules/yxTemp/yxTempVM'], function(yxTempVM) {
                                    // 保存数据的情况下，重写data
                                    vm = new yxTempVM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxTemp/yxTemp.css';
                                    _loadScript = _loadScript + '/assets/components/page/modules/yxTemp/yxTemp.js';
                                    loadCss = 'assets/components/page/modules/yxTemp/yxTemp.css';
                                    loadJs = 'assets/components/page/modules/yxTemp/yxTemp.js';
                                    load.loadStyle(loadCss);
                                    load.loadScript(loadJs);
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
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;
                        }
                    });
                } else {
                    this.$dispatch('notifyRootChangeEdit', {
                        changeEditId: this.layout.id,
                        oparate: 1
                    });
                }
            },
            /*
                撤销功能的实现，就是将数据依次pop出来
                在new component 的时候把data 替换成已经存在的数据  
            */
            prevStep: function() {
                var dataTpl = window.pageData.shift();
                window.tplData = [];
                $('.g-doc').find('.J_wrap').remove();
                this.content = {};
                var _that = this;
                if (dataTpl) {
                    $.each(dataTpl, function(i, data) {
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
                                require(['components/page/modules/yxhd/yxhdVM'], function(YxhdVM) {
                                    vm = new YxhdVM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxhd/yxhd.css';
                                    loadCss = 'assets/components/page/modules/yxhd/yxhd.css';
                                    load.loadStyle(loadCss);
                                    _that.loadStyle.push({
                                        id: vm.id,
                                        key: data.type,
                                        value: _loadStyle
                                    });
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;
                            case 'yxft':
                                require(['components/page/modules/yxft/yxftVM'], function(yxftVM) {
                                    vm = new yxftVM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _that.loadStyle.push({
                                        id: vm.id,
                                        key: data.type,
                                        value: _loadStyle
                                    });
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;    
                            case 'yxBackModule':
                                require(['components/page/modules/yxBackModule/yxBackModuleVM'],function(YxBackModuleVM){
                                    vm = new YxBackModuleVM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxBackModule/yxBackModule.css';
                                    loadCss = 'assets/components/page/modules/yxBackModule/yxBackModule.css';
                                    load.loadStyle(loadCss);
                                    _that.loadStyle.push({
                                        id: vm.id,
                                        key: data.type,
                                        value: _loadStyle
                                    });
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;
                            case 'yxBackModule2':
                                require(['components/page/modules/yxBackModule2/yxBackModule2VM'],function(YxBackModule2VM){
                                    vm = new YxBackModule2VM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                                    loadCss = 'assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                                    load.loadStyle(loadCss);
                                    _that.loadStyle.push({
                                        id: vm.id,
                                        key: data.type,
                                        value: _loadStyle
                                    });
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;
                            case 'yxRule':
                                require(['components/page/modules/yxRule/yxRuleVM'], function(yxRuleVM) {
                                    // 保存数据的情况下，重写data
                                    vm = new yxRuleVM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxRule/yxRule.css';
                                    loadCss = 'assets/components/page/modules/yxRule/yxRule.css';
                                    load.loadStyle(loadCss);
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
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
                                });
                                break;            
                            case 'yxTemp':
                                require(['components/page/modules/yxTemp/yxTempVM'], function(yxTempVM) {
                                    // 保存数据的情况下，重写data
                                    vm = new yxTempVM({
                                        data: function() {
                                            return data;
                                        }
                                    });
                                    /*_loadStyle = _loadStyle + '/assets/components/page/modules/yxTemp/yxTemp.css';
                                    loadCss = 'assets/components/page/modules/yxTemp/yxTemp.css';
                                    load.loadStyle(loadCss);*/
                                    _loadStyle = _loadStyle + '/assets/components/page/modules/yxTemp/yxTemp.css';
                                    _loadScript = _loadScript + '/assets/components/page/modules/yxTemp/yxTemp.js';
                                    loadCss = 'assets/components/page/modules/yxTemp/yxTemp.css';
                                    loadJs = 'assets/components/page/modules/yxTemp/yxTemp.js';
                                    load.loadStyle(loadCss);
                                    load.loadScript(loadJs);
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
                                    _id = vm._data.id;
                                    _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                                    vm.$parent = _that;
                                    if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                                    } else {
                                        vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                                    }
                                    _that.$dispatch('saveLink', {
                                        loadStyle: _that.loadStyle,
                                        loadScript: _that.loadScript
                                    });
                                    _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                                    window.tplData.push($.extend({}, vm._data, _options));
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
                    this.$dispatch('notifyRootChangeEdit', {
                        changeEditId: this.layout.id,
                        oparate: 1
                    });
                    $.notify({
                        title: '没有更多的修改记录',
                        type: 'error'
                    });
                }

            },
            /*
                清空功能
            */
            removeAll: function() {
                $('.g-doc').find('.J_wrap').remove();
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
                /*$.ajax({
                    url: 'ajax/postData.json',
                    type: 'POST',
                    data: JSON.stringify(data),
                    success: function() {

                    }
                });*/
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
                /*$.ajax({
                    url: 'ajax/postData.json',
                    type: 'POST',
                    data: JSON.stringify(data),
                    success: function() {

                    }
                });*/
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

                function isEmpty(obj) {
                    for (var i in obj) {
                        return false;
                    }
                    return true;
                }
                switch (data.type) {
                    case 'yxBackModule':
                        require(['components/page/modules/yxBackModule/yxBackModuleVM'],function(YxBackModuleVM){
                            vm = new YxBackModuleVM();
                            _loadStyle = _loadStyle + '/assets/components/page/modules/yxBackModule/yxBackModule.css';
                            loadCss = 'assets/components/page/modules/yxBackModule/yxBackModule.css';
                            load.loadStyle(loadCss);
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = $.extend({}, window.tplData);
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break; 
                    case 'yxBackModule2':
                        require(['components/page/modules/yxBackModule2/yxBackModule2VM'],function(YxBackModule2VM){
                            vm = new YxBackModule2VM();
                            _loadStyle = _loadStyle + '/assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                            loadCss = 'assets/components/page/modules/yxBackModule2/yxBackModule2.css';
                            load.loadStyle(loadCss);
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = $.extend({}, window.tplData);
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;        
                    case 'yxhd':
                        require(['components/page/modules/yxhd/yxhdVM'], function(YxhdVM) {
                            vm = new YxhdVM();
                            _loadStyle = _loadStyle + '/assets/components/page/modules/yxhd/yxhd.css';
                            loadCss = 'assets/components/page/modules/yxhd/yxhd.css';
                            load.loadStyle(loadCss);
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = $.extend({}, window.tplData);
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
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = $.extend({}, window.tplData);
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;    
                    case 'yxBanner':
                        require(['components/page/modules/yxBanner/yxBannerVM'], function(yxBannerVM) {
                            vm = new yxBannerVM();
                            _loadStyle = _loadStyle + '/assets/components/page/modules/yxBanner/yxBanner.css';
                            loadCss = 'assets/components/page/modules/yxBanner/yxBanner.css';
                            load.loadStyle(loadCss);
                            _that.loadStyle.push({
                                id: vm.id,
                                key: data.type,
                                value: _loadStyle
                            });
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = $.extend({}, window.tplData);
                            if (tplData && !isEmpty(tplData)) {
                                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
                            }
                            window.tplData.push($.extend({}, vm._data, _options));
                        });
                        break;
                    case 'yxBanner2':
                        require(['components/page/modules/yxBanner2/yxBanner2VM'], function(yxBanner2VM) {
                            vm = new yxBanner2VM();
                            _loadStyle = _loadStyle + '/assets/components/page/modules/yxBanner2/yxBanner2.css';
                            loadCss = 'assets/components/page/modules/yxBanner2/yxBanner2.css';
                            _loadScript = _loadScript + '/assets/components/page/modules/yxBanner2/yxBanner2.js';
                            loadJs = 'assets/components/page/modules/yxBanner2/yxBanner2.js';
                            load.loadStyle(loadCss);
                            load.loadScript(loadJs);
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
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = $.extend({}, window.tplData);
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
                            _loadStyle = 'assets/components/page/modules/yxRule/yxRule.css';
                            loadCss = 'assets/components/page/modules/yxRule/yxRule.css';
                            load.loadStyle(loadCss);
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
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = $.extend({}, window.tplData);
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
                            _loadStyle = 'assets/components/page/modules/yxTemp/yxTemp.css';
                            _loadScript = 'assets/components/page/modules/yxTemp/yxTemp.js';
                            loadCss = 'assets/components/page/modules/yxTemp/yxTemp.css';
                            loadJs = 'assets/components/page/modules/yxTemp/yxTemp.js';
                            load.loadStyle(loadCss);
                            load.loadScript(loadJs);
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
                            _id = vm._data.id;
                            _that.content['d_' + _id] = $.extend({}, vm._data, _options);
                            vm.$parent = _that;
                            if (_that.insertId && $('.g-doc .J_insert[data-id="' + _that.insertId + '"]').size()) {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc .J_insert[data-id="' + _that.insertId + '"]')[0]);
                            } else {
                                vm.$mount().$appendTo($(_that.$parent.$el).find('.g-doc')[0]);
                            }
                            _that.$dispatch('saveLink', {
                                loadStyle: _that.loadStyle,
                                loadScript: _that.loadScript
                            });
                            _that.$dispatch('notifyRoot', $.extend({}, vm._data, _options));
                            var tplData = $.extend({}, window.tplData);
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
                $.each(this.loadStyle, function(i, n) {
                    if (data.removeId == n.id) {
                        _that.loadStyle.splice(i, 1);
                    }
                });
                $.each(this.loadScript, function(i, n) {
                    if (data.removeId == n.id) {
                        _that.loadScript.splice(i, 1);
                    }
                });
                $.each(window.tplData,function(i,item){
                    if(item.id == data.removeId){
                        window.tplData.splice(i, 1);
                    }
                });
                this.$dispatch('notifyRootChangeEdit', data); // 分发给Root 修改编辑区的数据
                this.$dispatch('removeRootData', data); // 分发给Root 删除数据事件
            },
            // 修改参数后并将其保存下来
            changeDataDefault: function(id, data) {
                var tplData = JSON.parse(JSON.stringify(window.tplData));
                $.each(tplData, function(i, item) {
                    if (item.id == id) {
                        tplData[i] = $.extend(true, item, data);
                    }
                });
                window.pageData.unshift(JSON.parse(JSON.stringify(tplData)));
            },
            // 用于定位到具体的Dom位置
            notifyContentFocusSection: function(sectionInfo) {
                $('[data-id="'+sectionInfo.id+'"]').find('[data-h55970f92="'+sectionInfo.key+'"]').addClass('u-psc-mask-scaffold');
            },
            // 用于定位到具体的Dom位置
            notifyContentBlurSection: function(sectionInfo) {
                $('[data-id="'+sectionInfo.id+'"]').find('[data-h55970f92="'+sectionInfo.key+'"]').removeClass('u-psc-mask-scaffold');
            }
        }
    });
    return Content;
});