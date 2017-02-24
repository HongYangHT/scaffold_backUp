define([
    'Vue',
    'text!components/page/body/body.mustache',
    'components/page/content/contentVM',
    'components/page/editMenu/editMenuVM',
    'components/page/menu/menuVM',
    'components/page/modal/modalVM',
    'components/page/preModal/preModalVM',
    'components/page/tip/tipVM',
    'common/helper/localStorage',
    'model/model',
    'common/helper/cookie',
    'common/helper/url',
    'Blob',
    'FileSaver',
    'uuid',
    'notify'
], function(Vue, tpl, ContentVM, EditMenuVM, MenuVM, ModalVM, PreModalVM, TipVM, localStorage, Model, cookie, Url) {
    var _model = new Model();
    var nodiv = false;
    var Body = Vue.extend({
        name: 'body',
        components: {
            'content-view': ContentVM,
            'edit-menu-view': EditMenuVM,
            'pre-modal': PreModalVM,
            'modal-view': ModalVM,
            'tip-view': TipVM
        },
        template: tpl,
        data: function() {
            return {
                body: {},
                layout: {},
                showLoading: false,
                showLoadingText: '正在预览发布中...'
            }
        },
        computed: {

        },
        methods: {

        },
        events: {
            notifyBody: function(picked) {
                this.$broadcast('editShowOrHide', picked);
            },
            notifyBodyToDownload: function() {
                $(this.$el).find('.m-psc-oparate').hide();
                var innerHtml = $(this.$el).find('.m-psc-container').html(),
                    title = $(this.$el).find('.g-doc').attr('data-title'),
                    description = $(this.$el).find('.g-doc').attr('data-description'),
                    keywords = $(this.$el).find('.g-doc').attr('data-keywords'),
                    startTime = $(this.$el).find('.g-doc').attr('data-starttime'),
                    endTime = $(this.$el).find('.g-doc').attr('data-endtime'),
                    category = $(this.$el).find('.g-doc').attr('data-category'),
                    admin = $(this.$el).find('.g-doc').attr('data-admin'),
                    _that = this;
                if(title == 'yxmail'){
                    nodiv = true
                }
                if (!title) {
                    $.notify({
                        title: '请先填入页面标题',
                        type: 'error'
                    });
                    return;
                }
                if (!description) {
                    $.notify({
                        title: '请先填入页面描述',
                        type: 'error'
                    });
                    return;
                }
                if (!keywords) {
                    $.notify({
                        title: '请先填入页面关键字',
                        type: 'error'
                    });
                    return;
                }
                if (!startTime) {
                    $.notify({
                        title: '请先填入活动开始时间',
                        type: 'error'
                    });
                    return;
                }
                if (!endTime) {
                    $.notify({
                        title: '请先填入活动结束时间',
                        type: 'error'
                    });
                    return;
                }
                /* if(!category){
                     $.notify({
                         title: '请先选择分类',
                         type: 'error'
                     });
                     return;
                 }  */
                if (!admin) {
                    $.notify({
                        title: '请先填入负责人',
                        type: 'error'
                    });
                    return;
                }
                var favicon = '',
                    faviconType = parseInt(category);
                if (faviconType == 0) {
                    favicon = 'https://mail.163.com/dashi/favicon.ico';
                } else if (faviconType == 1) {
                    favicon = 'https://qian.163.com/favicon.ico';
                } else if (faviconType == 2) {
                    favicon = 'https://you.163.com/favicon.ico';
                } else if (faviconType == 3) {
                    favicon = 'https://1.163.com/favicon.ico';
                } else if (faviconType == 4) {
                    favicon = 'http://vip.163.com/favicon.ico';
                } else if (faviconType == 5) {
                    favicon = 'https://you.163.com/act/static/favicon.ico';
                } else if (faviconType == 6) {
                    favicon = 'https://you.163.com/act/static/favicon.ico';
                }

                var style = '',
                    script = '',
                    scriptLib = '',
                    styleLib = '';
                var imgRoot = window.location.protocol + '//' + window.location.host + ((/\.html$/).test(window.location.pathname.split('/')[1]) ? '' : '/' + window.location.pathname.split('/')[1]) + '/';

                function unique(arr) {
                    var ret = [],
                        json = {},
                        length = arr.length;

                    for (var i = 0; i < length; i++) {
                        var val = arr[i];
                        if (!json[val]) {
                            json[val] = 1;
                            ret.push(val);
                        }
                    }
                    return ret;
                }
                scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/jquery-1.11.1.js"></script>';
                scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/jquery.lazyload.js"></script>';
                scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/PSC_lazyload_0.0.1.js"></script>';
                if (faviconType == 2) {
                    if (this._data.body.loadLib && this._data.body.loadLib.scriptLib) {
                        this._data.body.loadLib.scriptLib.push('https://qiyukf.com/script/96ee78c0d9633761581e89d5019c5595.js');
                        this._data.body.loadLib.scriptLib.push('https://webzj.reg.163.com/webapp/javascript/page/json3.js');
                        this._data.body.loadLib.scriptLib.push('https://webzj.reg.163.com/webapp/javascript/message.js');
                        this._data.body.loadLib.scriptLib.push('http://mimg.127.net/pub/common/js/yx.1.0.1.js');
                        this._data.body.loadLib.scriptLib.push('http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js');
                        this._data.body.loadLib.scriptLib.push('http://mimg.127.net/pub/common/js/PSC_C_statistics.js');
                    } else {
                        scriptLib += '<script type="text/javascript" src="https://qiyukf.com/script/96ee78c0d9633761581e89d5019c5595.js"></script>';
                        scriptLib += '<script type="text/javascript" src="https://webzj.reg.163.com/webapp/javascript/page/json3.js"></script>';
                        scriptLib += '<script type="text/javascript" src="https://webzj.reg.163.com/webapp/javascript/message.js"></script>';
                        scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/yx.1.0.1.js"></script>';
                        scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js"></script>';
                        scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/PSC_C_statistics.js"></script>';
                    }
                }
                if (this._data.body.loadLib && this._data.body.loadLib.scriptLib) {
                    var _scriptLib = unique(this._data.body.loadLib.scriptLib);
                    $.each(_scriptLib, function(i, item) {
                        scriptLib += '<script type="text/javascript" src="' + item + '"></script>';
                    });
                }

                if (this._data.body.loadLib && this._data.body.loadLib.styleLib) {
                    var _styleLib = unique(this._data.body.loadLib.styleLib);
                    $.each(_styleLib, function(i, item) {
                        styleLib += '<link rel="stylesheet" type="text/css" href="' + item + '"/>';
                    });
                }
                // 把数据中最后出现的加入新的数组
                function unique2(arr) {
                    var r = [];
                    for (var i = 0, l = arr.length; i < l; i++) {
                        for (var j = i + 1; j < l; j++)
                            if (arr[i].key === arr[j].key) j = ++i;
                        r.push(arr[i]);
                    }
                    return r;
                }
                var ajaxDeferredArr = [];
                // 增加rebase.css
                ajaxDeferredArr.push($.ajax({
                    url: 'assets/css/reset.css',
                    type: 'GET',
                    dataType: 'text',
                    success: function(data) {
                        style += '<style>' + data + '</style>';
                    }
                }));
                if (this._data.body.load && this._data.body.load.loadStyle) {
                    var _loadStyle = unique2(this._data.body.load.loadStyle);
                    $.each(_loadStyle, function(i, n) {
                        n.value && ajaxDeferredArr.push($.ajax({
                            url: n.value,
                            type: 'GET',
                            dataType: 'text',
                            success: function(data) {
                                style += '<style>' + data + '</style>';
                            }
                        }));
                    });
                }
                if (this._data.body.load && this._data.body.load.loadScript) {
                    var _loadScript = unique2(this._data.body.load.loadScript);
                    $.each(_loadScript, function(i, n) {
                        n.value && ajaxDeferredArr.push($.ajax({
                            url: n.value,
                            type: 'GET',
                            dataType: 'text',
                            success: function(data) {
                                script += '<script>' + data + '</script>';
                            }
                        }));
                    });
                }
                if(nodiv){
                    $.when.apply($, ajaxDeferredArr).then(function() {
                        var html = innerHtml;
                        // 匹配图片的相对路径，过滤绝对路径
                        // var reg = /src=(?=\"(?!http|https[\w\d_\/-]+\.(gif|jpg|jpeg|png|bmp)))\"/g;
                        // 去除预览图片的base64 图片
                        var reg2 = /background-image:\s?url\(\S+base64\S+\)/g;
                        // 正则去除操作栏
                        var reg3 = /<div\s+\S*class=\"m-psc-oparate\"\s*(.|\n)+?<\/div>/g;
                        // 正则去除添加模块的dom
                        var reg4 = /<div\s+\S*class=\"m-psc-add-wrap\"\s*(.|\n)+?<\/div>/g;
                        // 正则去除J_psc_wrap 模块
                        var reg5 = /<div\s+\S*class=\"J_psc_wrap\"\s*(.|\n)+?>{1}/g;
                        // 过滤掉lazyload的src属性
                        // var reg6 = /(\<img\s*.+)(src=["'].+?['"])(.+)/g;
                        // var reg6 = /(\<img\s*[^\>]*(class=["'].+J_lazyload.+['"])*[^\>]+)(src=["'].+?['"])([^\>]*(class=["'].+J_lazyload.+['"])*[^\>]*?\>)/g;
                        var reg6 = /(\<img\s*[^\>]*(J_lazyload){1,}[^\>]*)(src=["'].+?['"])([^\>]*?\>)/g;
                        // 过滤掉iframe的src 值
                        var reg7 = /(\<iframe\s*.+)(src=["'].+?['"])(.+)/g;
                        // html = html.replace(reg, 'src="' + imgRoot + '$1');
                        // 过滤掉分享配置的modal

                        // 过滤掉layout的信息
                        var reg8 = /<div\s+\S*class=\"g-doc.*\".+?>{1}/g;

                        html = html.replace(reg2, '');
                        html = html.replace(reg3, '');
                        html = html.replace(reg4, '');
                        html = html.replace(reg5, '<div>');
                        html = html.replace(reg6, '$1' + '$4');
                        html = html.replace(reg7, '$1' + '$3');
                        html = html.replace(reg8, '<div class="g-doc">');
                        var blob = new Blob([html], {
                            type: "text/html;charset=utf-8"
                        });
                        saveAs(blob, 'page_' + Math.uuid(32, 16).toLowerCase() + '.html');
                    });
                }else if (ajaxDeferredArr && ajaxDeferredArr.length) {
                    $.when.apply($, ajaxDeferredArr).then(function() {
                        var html = '<!DOCTYPE html>' +
                            '<head>' +
                            '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                            '<meta charset="utf-8">' +
                            '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">' +
                            '<meta content="yes" name="apple-mobile-web-app-capable">' +
                            '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
                            '<meta name="format-detection" content="telephone=no,email=no,adress=no">' +
                            '<meta content="black" name="apple-mobile-web-app-status-bar-style" />' +
                            '<title>' + title + '</title>' +
                            '<meta name="keywords" content="' + keywords + '" />' +
                            '<meta name="description" content="' + description + '" />' +
                            '<meta name="Author" content="netease | PSC">' +
                            '<meta name="Version" content="1.0.0">' +
                            '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
                            '<link rel="shortcut icon" href="' + favicon + '" type="image/x-icon"/>' +
                            '<link rel="apple-touch-icon" href="touchicon.png" type="image/x-icon"/>' + styleLib +
                            style +
                            '</head>' +
                            '<body>' + innerHtml + scriptLib + script +
                            '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/share.1.0.2.js"></script>' +
                            '</body>' +
                            '</html>';
                        // 匹配图片的相对路径，过滤绝对路径
                        // var reg = /src=(?=\"(?!http|https[\w\d_\/-]+\.(gif|jpg|jpeg|png|bmp)))\"/g;
                        // 去除预览图片的base64 图片
                        var reg2 = /background-image:\s?url\(\S+base64\S+\)/g;
                        // 正则去除操作栏
                        var reg3 = /<div\s+\S*class=\"m-psc-oparate\"\s*(.|\n)+?<\/div>/g;
                        // 正则去除添加模块的dom
                        var reg4 = /<div\s+\S*class=\"m-psc-add-wrap\"\s*(.|\n)+?<\/div>/g;
                        // 正则去除J_psc_wrap 模块
                        var reg5 = /<div\s+\S*class=\"J_psc_wrap\"\s*(.|\n)+?>{1}/g;
                        // 过滤掉lazyload的src属性
                        // var reg6 = /(\<img\s*.+)(src=["'].+?['"])(.+)/g;
                        // var reg6 = /(\<img\s*[^\>]*(class=["'].+J_lazyload.+['"])*[^\>]+)(src=["'].+?['"])([^\>]*(class=["'].+J_lazyload.+['"])*[^\>]*?\>)/g;
                        var reg6 = /(\<img\s*[^\>]*(J_lazyload){1,}[^\>]*)(src=["'].+?['"])([^\>]*?\>)/g;
                        // 过滤掉iframe的src 值
                        var reg7 = /(\<iframe\s*.+)(src=["'].+?['"])(.+)/g;
                        // html = html.replace(reg, 'src="' + imgRoot + '$1');
                        // 过滤掉分享配置的modal

                        // 过滤掉layout的信息
                        var reg8 = /<div\s+\S*class=\"g-doc.*\".+?>{1}/g;

                        html = html.replace(reg2, '');
                        html = html.replace(reg3, '');
                        html = html.replace(reg4, '');
                        html = html.replace(reg5, '<div>');
                        html = html.replace(reg6, '$1' + '$4');
                        html = html.replace(reg7, '$1' + '$3');
                        html = html.replace(reg8, '<div class="g-doc">');
                        var blob = new Blob([html], {
                            type: "text/html;charset=utf-8"
                        });
                        saveAs(blob, 'page_' + Math.uuid(32, 16).toLowerCase() + '.html');
                    });
                } else {
                    var html = '<!DOCTYPE html>' +
                        '<head>' +
                        '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                        '<meta charset="utf-8">' +
                        '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">' +
                        '<meta content="yes" name="apple-mobile-web-app-capable">' +
                        '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
                        '<meta name="format-detection" content="telephone=no,email=no,adress=no">' +
                        '<meta content="black" name="apple-mobile-web-app-status-bar-style" />' +
                        '<title>' + title + '</title>' +
                        '<meta name="keywords" content="' + keywords + '" />' +
                        '<meta name="description" content="' + description + '" />' +
                        '<meta name="Author" content="netease | PSC">' +
                        '<meta name="Version" content="1.0.0">' +
                        '<link rel="shortcut icon" href="' + favicon + '" type="image/x-icon"/>' +
                        '<link rel="apple-touch-icon" href="touchicon.png" type="image/x-icon"/>' + styleLib +
                        style +
                        '</head>' +
                        '<body>' + innerHtml + scriptLib + script +
                        '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/share.1.0.2.js"></script>' +
                        '</body>' +
                        '</html>';
                    // 匹配图片的相对路径，过滤绝对路径
                    // var reg = /src=(?=\"(?!http|https[\w\d_\/-]+\.(gif|jpg|jpeg|png|bmp)))\"/g;
                    // 去除预览图片的base64 图片
                    var reg2 = /background-image:\s?url\(\S+base64\S+\)/g;
                    // 正则去除操作栏
                    var reg3 = /<div\s+\S*class=\"m-psc-oparate\"\s*(.|\n)+?<\/div>/g;
                    // 正则去除添加模块的dom
                    var reg4 = /<div\s+\S*class=\"m-psc-add-wrap\"\s*(.|\n)+?<\/div>/g;
                    // 正则去除J_psc_wrap 模块
                    var reg5 = /<div\s+\S*class=\"J_psc_wrap\"\s*(.|\n)+?>{1}/g;
                    // 过滤掉lazyload的src属性
                    // var reg6 = /(\<img\s*.+)(src=["'].+?['"])(.+)/g;
                    // var reg6 = /(\<img\s*[^\>]*(class=["'].+J_lazyload.+['"])*[^\>]+)(src=["'].+?['"])([^\>]*(class=["'].+J_lazyload.+['"])*[^\>]*?\>)/g;
                    var reg6 = /(\<img\s*[^\>]*(J_lazyload){1,}[^\>]*)(src=["'].+?['"])([^\>]*?\>)/g;
                    // 过滤掉iframe的src 值
                    var reg7 = /(\<iframe\s*.+)(src=["'].+?['"])(.+)/g;
                    // html = html.replace(reg, 'src="' + imgRoot + '$1');
                    // 过滤掉分享配置的modal

                    // 过滤掉layout的信息
                    var reg8 = /<div\s+\S*class=\"g-doc.*\".+?>{1}/g;
                    html = html.replace(reg2, '');
                    html = html.replace(reg3, '');
                    html = html.replace(reg4, '');
                    html = html.replace(reg5, '<div>');
                    html = html.replace(reg6, '$1' + '$4');
                    html = html.replace(reg7, '$1' + '$3');
                    html = html.replace(reg8, '<div class="g-doc">');
                    var blob = new Blob([html], {
                        type: "text/html;charset=utf-8"
                    });
                    saveAs(blob, 'page_' + Math.uuid(32, 16).toLowerCase() + '.html');
                }
                this.$broadcast('savePage');
            },
            notifyRoot: function(data) {
                this._data.body['d_' + data.id] = data;
                //生成数据
                this.$broadcast('createData', data);
            },
            // 保存外链的css 和 js
            saveLink: function(load) {
                this._data.body['load'] = load;
            },
            saveLibLink: function(loadLib) {
                this._data.body['loadLib'] = loadLib;
            },
            // 设置layout的数据在root 
            saveLayoutDataInRoot: function(data) {
                this.layout = data;
                this.$broadcast('setLayoutEdit', data);
            },
            notifyRootChangeEdit: function(data) {
                var _data = {};
                if (data.changeEditId == this.layout.id) {
                    _data = this.layout;
                } else {
                    _data = this.body['d_' + data.changeEditId];
                }
                this.$broadcast('changeComponentEdit', _data);
                if (data.oparate == 1) {
                    this.$broadcast('showEditMenu', true);
                }
            },
            // 删除根部数据
            removeRootData: function(data) {
                var _that = this;
                delete this.body['d_' + data.removeId];
                if (this.body.load && this.body.load.loadStyle) {
                    $.each(this.body.load.loadStyle, function(i, n) {
                        if (data.removeId == n.id) {
                            _that.loadStyle.splice(i, 1);
                        }
                    });
                }
                if (this.body.load && this.body.load.loadScript) {
                    $.each(this.body.load.loadScript, function(i, n) {
                        if (data.removeId == n.id) {
                            _that.loadScript.splice(i, 1);
                        }
                    });
                }
            },
            notifyBackHtml: function() {
                this.body = {};
                this.$broadcast('prevStep');
            },
            notifyClearHtml: function() {
                this.body = {};
                // this.$broadcast('removeAll');
                this.$broadcast('removeAllConfirm', {
                    tip: '确定清空编辑区吗？',
                    type: 'removeAll'
                });
            },
            // 确认操作
            confirmOperation: function(info) {
                if (info.operation == 'confirmPublishPage') {
                    $(this.$el).find('.m-psc-oparate').hide();
                    var innerHtml = $(this.$el).find('.m-psc-container').html(),
                        title = $(this.$el).find('.g-doc').attr('data-title'),
                        description = $(this.$el).find('.g-doc').attr('data-description'),
                        keywords = $(this.$el).find('.g-doc').attr('data-keywords'),
                        startTime = $(this.$el).find('.g-doc').attr('data-starttime'),
                        endTime = $(this.$el).find('.g-doc').attr('data-endtime'),
                        category = $(this.$el).find('.g-doc').attr('data-category'),
                        admin = $(this.$el).find('.g-doc').attr('data-admin'),
                        _that = this;
                    if (!title) {
                        $.notify({
                            title: '请先填入页面标题',
                            type: 'error'
                        });
                        return;
                    }
                    if (!description) {
                        $.notify({
                            title: '请先填入页面描述',
                            type: 'error'
                        });
                        return;
                    }
                    if (!keywords) {
                        $.notify({
                            title: '请先填入页面关键字',
                            type: 'error'
                        });
                        return;
                    }
                    if (!startTime) {
                        $.notify({
                            title: '请先填入活动开始时间',
                            type: 'error'
                        });
                        return;
                    }
                    if (!endTime) {
                        $.notify({
                            title: '请先填入活动结束时间',
                            type: 'error'
                        });
                        return;
                    }
                    /*if(!category){
                        $.notify({
                            title: '请先选择分类',
                            type: 'error'
                        });
                        return;
                    }  */
                    if (!admin) {
                        $.notify({
                            title: '请先填入负责人',
                            type: 'error'
                        });
                        return;
                    }
                    var favicon = '',
                        faviconType = parseInt(category);
                    if (faviconType == 0) {
                        favicon = 'https://mail.163.com/dashi/favicon.ico';
                    } else if (faviconType == 1) {
                        favicon = 'https://qian.163.com/favicon.ico';
                    } else if (faviconType == 2) {
                        favicon = 'https://you.163.com/favicon.ico';
                    } else if (faviconType == 3) {
                        favicon = 'https://1.163.com/favicon.ico';
                    } else if (faviconType == 4) {
                        favicon = 'http://vip.163.com/favicon.ico';
                    } else if (faviconType == 5) {
                        favicon = 'https://you.163.com/act/static/favicon.ico';
                    } else if (faviconType == 6) {
                        favicon = 'https://you.163.com/act/static/favicon.ico';
                    }

                    // 将页面数据保存下来
                    (window.saveData = []) && (window.saveData.push(JSON.parse(JSON.stringify(this.layout))));
                    window.saveData.push(JSON.parse(JSON.stringify(window.tplData)));
                    var data = window.saveData;

                    var style = '',
                        script = '',
                        scriptLib = '',
                        styleLib = '';
                    var imgRoot = window.location.protocol + '//' + window.location.host + ((/\.html$/).test(window.location.pathname.split('/')[1]) ? '' : '/' + window.location.pathname.split('/')[1]) + '/';

                    function unique(arr) {
                        var ret = [],
                            json = {},
                            length = arr.length;

                        for (var i = 0; i < length; i++) {
                            var val = arr[i];
                            if (!json[val]) {
                                json[val] = 1;
                                ret.push(val);
                            }
                        }
                        return ret;
                    }
                    _that._data.showLoading = true;
                    _that._data.showLoadingText = "正在上线发布中...";
                    scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/jquery-1.11.1.js"></script>';
                    scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/jquery.lazyload.js"></script>';
                    scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/PSC_lazyload_0.0.1.js"></script>';
                    if (faviconType == 2) {
                        if (this._data.body.loadLib && this._data.body.loadLib.scriptLib) {
                            this._data.body.loadLib.scriptLib.push('https://qiyukf.com/script/96ee78c0d9633761581e89d5019c5595.js');
                            this._data.body.loadLib.scriptLib.push('https://webzj.reg.163.com/webapp/javascript/page/json3.js');
                            this._data.body.loadLib.scriptLib.push('https://webzj.reg.163.com/webapp/javascript/message.js');
                            this._data.body.loadLib.scriptLib.push('http://mimg.127.net/pub/common/js/yx.1.0.1.js');
                            this._data.body.loadLib.scriptLib.push('http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js');
                            this._data.body.loadLib.scriptLib.push('http://mimg.127.net/pub/common/js/PSC_C_statistics.js');
                        } else {
                            scriptLib += '<script type="text/javascript" src="https://qiyukf.com/script/96ee78c0d9633761581e89d5019c5595.js"></script>';
                            scriptLib += '<script type="text/javascript" src="https://webzj.reg.163.com/webapp/javascript/page/json3.js"></script>';
                            scriptLib += '<script type="text/javascript" src="https://webzj.reg.163.com/webapp/javascript/message.js"></script>';
                            scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/yx.1.0.1.js"></script>';
                            scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js"></script>';
                            scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/PSC_C_statistics.js"></script>';
                        }
                    }
                    if (this._data.body.loadLib && this._data.body.loadLib.scriptLib) {
                        var _scriptLib = unique(this._data.body.loadLib.scriptLib);
                        $.each(_scriptLib, function(i, item) {
                            scriptLib += '<script type="text/javascript" src="' + item + '"></script>';
                        });
                    }

                    if (this._data.body.loadLib && this._data.body.loadLib.styleLib) {
                        var _styleLib = unique(this._data.body.loadLib.styleLib);
                        $.each(_styleLib, function(i, item) {
                            styleLib += '<link rel="stylesheet" type="text/css" href="' + item + '"/>';
                        });
                    }
                    // 把数据中最后出现的加入新的数组
                    function unique2(arr) {
                        var r = [];
                        for (var i = 0, l = arr.length; i < l; i++) {
                            for (var j = i + 1; j < l; j++)
                                if (arr[i].key === arr[j].key) j = ++i;
                            r.push(arr[i]);
                        }
                        return r;
                    }
                    var ajaxDeferredArr = [];
                    // 增加rebase.css
                    ajaxDeferredArr.push($.ajax({
                        url: 'assets/css/reset.css',
                        type: 'GET',
                        dataType: 'text',
                        success: function(data) {
                            style += '<style>' + data + '</style>';
                        }
                    }));
                    if (this._data.body.load && this._data.body.load.loadStyle) {
                        var _loadStyle = unique2(this._data.body.load.loadStyle);
                        $.each(_loadStyle, function(i, n) {
                            n.value && ajaxDeferredArr.push($.ajax({
                                url: n.value,
                                type: 'GET',
                                dataType: 'text',
                                success: function(data) {
                                    style += '<style>' + data + '</style>';
                                }
                            }));
                        });
                    }
                    if (this._data.body.load && this._data.body.load.loadScript) {
                        var _loadScript = unique2(this._data.body.load.loadScript);
                        $.each(_loadScript, function(i, n) {
                            n.value && ajaxDeferredArr.push($.ajax({
                                url: n.value,
                                type: 'GET',
                                dataType: 'text',
                                success: function(data) {
                                    script += '<script>' + data + '</script>';
                                }
                            }));
                        });
                    }
                    // 用于新开窗口
                    var wo = window.open('http://you.163.com/act/static/zDjwod0IiO.html');
                    if (ajaxDeferredArr && ajaxDeferredArr.length) {
                        $.when.apply($, ajaxDeferredArr).then(function() {
                            var html = '<!DOCTYPE html>' +
                                '<head>' +
                                '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                                '<meta charset="utf-8">' +
                                '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">' +
                                '<meta content="yes" name="apple-mobile-web-app-capable">' +
                                '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
                                '<meta name="format-detection" content="telephone=no,email=no,adress=no">' +
                                '<meta content="black" name="apple-mobile-web-app-status-bar-style" />' +
                                '<title>' + title + '</title>' +
                                '<meta name="keywords" content="' + keywords + '" />' +
                                '<meta name="description" content="' + description + '" />' +
                                '<meta name="Author" content="netease | PSC">' +
                                '<meta name="Version" content="1.0.0">' +
                                '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
                                '<link rel="shortcut icon" href="' + favicon + '" type="image/x-icon"/>' +
                                '<link rel="apple-touch-icon" href="touchicon.png" type="image/x-icon"/>' + styleLib +
                                style +
                                '</head>' +
                                '<body>' + innerHtml + scriptLib + script +
                                '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/share.1.0.2.js"></script>' +
                                '</body>' +
                                '</html>';
                            // 匹配图片的相对路径，过滤绝对路径
                            // var reg = /src=(?=\"(?!http|https[\w\d_\/-]+\.(gif|jpg|jpeg|png|bmp)))\"/g;
                            // 去除预览图片的base64 图片
                            var reg2 = /background-image:\s?url\(\S+base64\S+\)/g;
                            // 正则去除操作栏
                            var reg3 = /<div\s+\S*class=\"m-psc-oparate\"\s*(.|\n)+?<\/div>/g;
                            // 正则去除添加模块的dom
                            var reg4 = /<div\s+\S*class=\"m-psc-add-wrap\"\s*(.|\n)+?<\/div>/g;
                            // 正则去除J_psc_wrap 模块
                            var reg5 = /<div\s+\S*class=\"J_psc_wrap\"\s*(.|\n)+?>{1}/g;
                            // 过滤掉lazyload的src属性
                            // var reg6 = /(\<img\s*.+)(src=["'].+?['"])(.+)/g;
                            // var reg6 = /(\<img\s*[^\>]*(class=["'].+J_lazyload.+['"])*[^\>]+)(src=["'].+?['"])([^\>]*(class=["'].+J_lazyload.+['"])*[^\>]*?\>)/g;
                            var reg6 = /(\<img\s*[^\>]*(J_lazyload){1,}[^\>]*)(src=["'].+?['"])([^\>]*?\>)/g;
                            // 过滤掉iframe的src 值
                            var reg7 = /(\<iframe\s*.+)(src=["'].+?['"])(.+)/g;
                            // html = html.replace(reg, 'src="' + imgRoot + '$1');
                            // 过滤掉分享配置的modal

                            // 过滤掉layout的信息
                            var reg8 = /<div\s+\S*class=\"g-doc.*\".+?>{1}/g;
                            html = html.replace(reg2, '');
                            html = html.replace(reg3, '');
                            html = html.replace(reg4, '');
                            html = html.replace(reg5, '<div>');
                            html = html.replace(reg6, '$1' + '$4');
                            html = html.replace(reg7, '$1' + '$3');
                            html = html.replace(reg8, '<div class="g-doc">');
                            /* 将数据传给后台 */
                            _model.saveAndAddAct({
                                data: {
                                    id: window.id || '',
                                    title: title,
                                    source: 2,
                                    startTime: new Date(startTime).getTime(),
                                    endTime: new Date(endTime).getTime(),
                                    category: category,
                                    admin: admin,
                                    html: html,
                                    extend: JSON.stringify(data)
                                },
                                error: function() {
                                    /* 由于没有体图片上传不成功的情况下，需要先保存现在的数据 */
                                    _that._data.showLoading = false;
                                    _that.$dispatch('savePageUpload');
                                    cookie.setCookie('backUrl', location.href, 60 * 60);
                                    location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
                                }
                            }).done(function(result) {
                                if (result.code == 200) {
                                    var pageId = result.result;
                                    window.id = result.result;

                                    _model.previewOrPublishPub({
                                        data: {
                                            id: pageId,
                                            pubType: 2
                                        },
                                        error: function() {
                                            /* 由于没有体图片上传不成功的情况下，需要先保存现在的数据 */
                                            _that._data.showLoading = false;
                                            _that.$dispatch('savePageUpload');
                                            cookie.setCookie('backUrl', location.href, 60 * 60);
                                            location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
                                        }
                                    }).done(function(result) {
                                        _that._data.showLoading = false;
                                        if (result.code == 200) {
                                            if (!Url.getQuery(window.location.href, 'id')) {
                                                window.location.hash = 'id=' + pageId;
                                            }
                                            setTimeout(function() {
                                                wo.location.href = result.result;
                                            }, 0);
                                        } else {
                                            $.notify({
                                                title: result.msg,
                                                type: 'error'
                                            });
                                        }
                                    });
                                } else {
                                    _that._data.showLoading = false;
                                    wo.close();
                                    $.notify({
                                        title: result.msg,
                                        type: 'error'
                                    });
                                }
                            });
                        });
                    } else {
                        var html = '<!DOCTYPE html>' +
                            '<head>' +
                            '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                            '<meta charset="utf-8">' +
                            '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">' +
                            '<meta content="yes" name="apple-mobile-web-app-capable">' +
                            '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
                            '<meta name="format-detection" content="telephone=no,email=no,adress=no">' +
                            '<meta content="black" name="apple-mobile-web-app-status-bar-style" />' +
                            '<title>' + title + '</title>' +
                            '<meta name="keywords" content="' + keywords + '" />' +
                            '<meta name="description" content="' + description + '" />' +
                            '<meta name="Author" content="netease | PSC">' +
                            '<meta name="Version" content="1.0.0">' +
                            '<link rel="shortcut icon" href="' + favicon + '" type="image/x-icon"/>' +
                            '<link rel="apple-touch-icon" href="touchicon.png" type="image/x-icon"/>' + styleLib +
                            style +
                            '</head>' +
                            '<body>' + innerHtml + scriptLib + script +
                            '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/share.1.0.2.js"></script>' +
                            '</body>' +
                            '</html>';
                        // 匹配图片的相对路径，过滤绝对路径
                        // var reg = /src=(?=\"(?!http|https[\w\d_\/-]+\.(gif|jpg|jpeg|png|bmp)))\"/g;
                        // 去除预览图片的base64 图片
                        var reg2 = /background-image:\s?url\(\S+base64\S+\)/g;
                        // 正则去除操作栏
                        var reg3 = /<div\s+\S*class=\"m-psc-oparate\"\s*(.|\n)+?<\/div>/g;
                        // 正则去除添加模块的dom
                        var reg4 = /<div\s+\S*class=\"m-psc-add-wrap\"\s*(.|\n)+?<\/div>/g;
                        // 正则去除J_psc_wrap 模块
                        var reg5 = /<div\s+\S*class=\"J_psc_wrap\"\s*(.|\n)+?>{1}/g;
                        // 过滤掉lazyload的src属性
                        // var reg6 = /(\<img\s*.+)(src=["'].+?['"])(.+)/g;
                        // var reg6 = /(\<img\s*[^\>]*(class=["'].+J_lazyload.+['"])*[^\>]+)(src=["'].+?['"])([^\>]*(class=["'].+J_lazyload.+['"])*[^\>]*?\>)/g;
                        var reg6 = /(\<img\s*[^\>]*(J_lazyload){1,}[^\>]*)(src=["'].+?['"])([^\>]*?\>)/g;
                        // 过滤掉iframe的src 值
                        var reg7 = /(\<iframe\s*.+)(src=["'].+?['"])(.+)/g;
                        // html = html.replace(reg, 'src="' + imgRoot + '$1');
                        // 过滤掉分享配置的modal
                        // 过滤掉layout的信息
                        var reg8 = /<div\s+\S*class=\"g-doc.*\".+?>{1}/g;
                        html = html.replace(reg2, '');
                        html = html.replace(reg3, '');
                        html = html.replace(reg4, '');
                        html = html.replace(reg5, '<div>');
                        html = html.replace(reg6, '$1' + '$4');
                        html = html.replace(reg7, '$1' + '$3');
                        html = html.replace(reg8, '<div class="g-doc">');
                        /* 将数据传给后台 */
                        _model.saveAndAddAct({
                            data: {
                                id: window.id || '',
                                source: 2,
                                title: title,
                                startTime: new Date(startTime).getTime(),
                                endTime: new Date(endTime).getTime(),
                                category: category,
                                admin: admin,
                                html: html,
                                extend: JSON.stringify(data)
                            },
                            error: function() {
                                /* 由于没有体图片上传不成功的情况下，需要先保存现在的数据 */
                                _that._data.showLoading = false;
                                _that.$dispatch('savePageUpload');
                                cookie.setCookie('backUrl', location.href, 60 * 60);
                                location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
                            }
                        }).done(function(result) {
                            if (result.code == 200) {
                                var pageId = result.result;
                                window.id = result.result;

                                _model.previewOrPublishPub({
                                    data: {
                                        id: pageId,
                                        pubType: 2
                                    },
                                    error: function() {
                                        /* 由于没有体图片上传不成功的情况下，需要先保存现在的数据 */
                                        _that._data.showLoading = false;
                                        _that.$dispatch('savePageUpload');
                                        cookie.setCookie('backUrl', location.href, 60 * 60);
                                        location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
                                    }
                                }).done(function(result) {
                                    _that._data.showLoading = false;
                                    if (result.code == 200) {
                                        if (!Url.getQuery(window.location.href, 'id')) {
                                            window.location.hash = 'id=' + pageId;
                                        }
                                        setTimeout(function() {
                                            wo.location.href = result.result;
                                        }, 0);
                                    } else {
                                        _that._data.showLoading = false;
                                        $.notify({
                                            title: result.msg,
                                            type: 'error'
                                        });
                                    }
                                });
                            } else {
                                _that._data.showLoading = false;
                                wo.close();
                                $.notify({
                                    title: result.msg,
                                    type: 'error'
                                });
                            }
                        });
                    }
                    this.$broadcast('publish');
                } else {
                    this.$broadcast(info.operation, info.info);
                }
            },
            notifySaveHtml: function() {
                this.$broadcast('savePage');
            },
            // 预览页面
            notifyPrevViewHtml: function() {
                $(this.$el).find('.m-psc-oparate').hide();
                var innerHtml = $(this.$el).find('.m-psc-container').html(),
                    title = $(this.$el).find('.g-doc').attr('data-title'),
                    description = $(this.$el).find('.g-doc').attr('data-description'),
                    keywords = $(this.$el).find('.g-doc').attr('data-keywords'),
                    startTime = $(this.$el).find('.g-doc').attr('data-starttime'),
                    endTime = $(this.$el).find('.g-doc').attr('data-endtime'),
                    category = $(this.$el).find('.g-doc').attr('data-category'),
                    admin = $(this.$el).find('.g-doc').attr('data-admin'),
                    _that = this;
                if (!title) {
                    $.notify({
                        title: '请先填入页面标题',
                        type: 'error'
                    });
                    return;
                }
                if (!description) {
                    $.notify({
                        title: '请先填入页面描述',
                        type: 'error'
                    });
                    return;
                }
                if (!keywords) {
                    $.notify({
                        title: '请先填入页面关键字',
                        type: 'error'
                    });
                    return;
                }
                if (!startTime) {
                    $.notify({
                        title: '请先填入活动开始时间',
                        type: 'error'
                    });
                    return;
                }
                if (!endTime) {
                    $.notify({
                        title: '请先填入活动结束时间',
                        type: 'error'
                    });
                    return;
                }
                /*if(!category){
                    $.notify({
                        title: '请先选择分类',
                        type: 'error'
                    });
                    return;
                }  */
                if (!admin) {
                    $.notify({
                        title: '请先填入负责人',
                        type: 'error'
                    });
                    return;
                }
                var favicon = '',
                    faviconType = parseInt(category);
                if (faviconType == 0) {
                    favicon = 'https://mail.163.com/dashi/favicon.ico';
                } else if (faviconType == 1) {
                    favicon = 'https://qian.163.com/favicon.ico';
                } else if (faviconType == 2) {
                    favicon = 'https://you.163.com/favicon.ico';
                } else if (faviconType == 3) {
                    favicon = 'https://1.163.com/favicon.ico';
                } else if (faviconType == 4) {
                    favicon = 'http://vip.163.com/favicon.ico';
                } else if (faviconType == 5) {
                    favicon = 'https://you.163.com/act/static/favicon.ico';
                } else if (faviconType == 6) {
                    favicon = 'https://you.163.com/act/static/favicon.ico';
                }
                // 将页面数据保存下来
                (window.saveData = []) && (window.saveData.push(JSON.parse(JSON.stringify(this.layout))));
                window.saveData.push(JSON.parse(JSON.stringify(window.tplData)));
                var data = window.saveData;

                var style = '',
                    script = '',
                    scriptLib = '',
                    styleLib = '';
                var imgRoot = window.location.protocol + '//' + window.location.host + ((/\.html$/).test(window.location.pathname.split('/')[1]) ? '' : '/' + window.location.pathname.split('/')[1]) + '/';

                function unique(arr) {
                    var ret = [],
                        json = {},
                        length = arr.length;

                    for (var i = 0; i < length; i++) {
                        var val = arr[i];
                        if (!json[val]) {
                            json[val] = 1;
                            ret.push(val);
                        }
                    }
                    return ret;
                }
                _that._data.showLoading = true;
                _that._data.showLoadingText = "正在预览发布中...";
                scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/jquery-1.11.1.js"></script>';
                scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/jquery.lazyload.js"></script>';
                scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/PSC_lazyload_0.0.1.js"></script>';
                // 对应严选需要加入的一些代码库
                if (faviconType == 2) {
                    if (this._data.body.loadLib && this._data.body.loadLib.scriptLib) {
                        this._data.body.loadLib.scriptLib.push('https://qiyukf.com/script/96ee78c0d9633761581e89d5019c5595.js');
                        this._data.body.loadLib.scriptLib.push('https://webzj.reg.163.com/webapp/javascript/page/json3.js');
                        this._data.body.loadLib.scriptLib.push('https://webzj.reg.163.com/webapp/javascript/message.js');
                        this._data.body.loadLib.scriptLib.push('http://mimg.127.net/pub/common/js/yx.1.0.1.js');
                        this._data.body.loadLib.scriptLib.push('http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js');
                        this._data.body.loadLib.scriptLib.push('http://mimg.127.net/pub/common/js/PSC_C_statistics.js');
                    } else {
                        scriptLib += '<script type="text/javascript" src="https://qiyukf.com/script/96ee78c0d9633761581e89d5019c5595.js"></script>';
                        scriptLib += '<script type="text/javascript" src="https://webzj.reg.163.com/webapp/javascript/page/json3.js"></script>';
                        scriptLib += '<script type="text/javascript" src="https://webzj.reg.163.com/webapp/javascript/message.js"></script>';
                        scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/yx.1.0.1.js"></script>';
                        scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/PSC_YX_C_normal.js"></script>';
                        scriptLib += '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/PSC_C_statistics.js"></script>';
                    }
                }
                if (this._data.body.loadLib && this._data.body.loadLib.scriptLib) {
                    var _scriptLib = unique(this._data.body.loadLib.scriptLib);
                    $.each(_scriptLib, function(i, item) {
                        scriptLib += '<script type="text/javascript" src="' + item + '"></script>';
                    });
                }

                if (this._data.body.loadLib && this._data.body.loadLib.styleLib) {
                    var _styleLib = unique(this._data.body.loadLib.styleLib);
                    $.each(_styleLib, function(i, item) {
                        styleLib += '<link rel="stylesheet" type="text/css" href="' + item + '"/>';
                    });
                }
                // 把数据中最后出现的加入新的数组
                function unique2(arr) {
                    var r = [];
                    for (var i = 0, l = arr.length; i < l; i++) {
                        for (var j = i + 1; j < l; j++)
                            if (arr[i].key === arr[j].key) j = ++i;
                        r.push(arr[i]);
                    }
                    return r;
                }
                var ajaxDeferredArr = [];
                // 增加rebase.css
                ajaxDeferredArr.push($.ajax({
                    url: 'assets/css/reset.css',
                    type: 'GET',
                    dataType: 'text',
                    success: function(data) {
                        style += '<style>' + data + '</style>';
                    }
                }));
                if (this._data.body.load && this._data.body.load.loadStyle) {
                    var _loadStyle = unique2(this._data.body.load.loadStyle);
                    $.each(_loadStyle, function(i, n) {
                        n.value && ajaxDeferredArr.push($.ajax({
                            url: n.value,
                            type: 'GET',
                            dataType: 'text',
                            success: function(data) {
                                style += '<style>' + data + '</style>';
                            }
                        }));
                    });
                }
                if (this._data.body.load && this._data.body.load.loadScript) {
                    var _loadScript = unique2(this._data.body.load.loadScript);
                    $.each(_loadScript, function(i, n) {
                        n.value && ajaxDeferredArr.push($.ajax({
                            url: n.value,
                            type: 'GET',
                            dataType: 'text',
                            success: function(data) {
                                script += '<script>' + data + '</script>';
                            }
                        }));
                    });
                }
                var wo = window.open('http://you.163.com/act/static/zDjwod0IiO.html');
                if (ajaxDeferredArr && ajaxDeferredArr.length) {
                    $.when.apply($, ajaxDeferredArr).then(function() {
                        var html = '<!DOCTYPE html>' +
                            '<head>' +
                            '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                            '<meta charset="utf-8">' +
                            '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">' +
                            '<meta content="yes" name="apple-mobile-web-app-capable">' +
                            '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
                            '<meta name="format-detection" content="telephone=no,email=no,adress=no">' +
                            '<meta content="black" name="apple-mobile-web-app-status-bar-style" />' +
                            '<title>' + title + '</title>' +
                            '<meta name="keywords" content="' + keywords + '" />' +
                            '<meta name="description" content="' + description + '" />' +
                            '<meta name="Author" content="netease | PSC">' +
                            '<meta name="Version" content="1.0.0">' +
                            '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
                            '<link rel="shortcut icon" href="' + favicon + '" type="image/x-icon"/>' +
                            '<link rel="apple-touch-icon" href="touchicon.png" type="image/x-icon"/>' + styleLib +
                            style +
                            '</head>' +
                            '<body>' + innerHtml + scriptLib + script +
                            '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/share.1.0.2.js"></script>' +
                            '</body>' +
                            '</html>';
                        // 匹配图片的相对路径，过滤绝对路径
                        // var reg = /src=(?=\"(?!http|https[\w\d_\/-]+\.(gif|jpg|jpeg|png|bmp)))\"/g;
                        // 去除预览图片的base64 图片
                        var reg2 = /background-image:\s?url\(\S+base64\S+\)/g;
                        // 正则去除操作栏
                        var reg3 = /<div\s+\S*class=\"m-psc-oparate\"\s*(.|\n)+?<\/div>/g;
                        // 正则去除添加模块的dom
                        var reg4 = /<div\s+\S*class=\"m-psc-add-wrap\"\s*(.|\n)+?<\/div>/g;
                        // 正则去除J_psc_wrap 模块
                        var reg5 = /<div\s+\S*class=\"J_psc_wrap\"\s*(.|\n)+?>{1}/g;
                        // 过滤掉lazyload的src属性
                        // var reg6 = /(\<img\s*.+)(src=["'].+?['"])(.+)/g;
                        // var reg6 = /(\<img\s*[^\>]*(class=["'].+J_lazyload.+['"])*[^\>]+)(src=["'].+?['"])([^\>]*(class=["'].+J_lazyload.+['"])*[^\>]*?\>)/g;
                        var reg6 = /(\<img\s*[^\>]*(J_lazyload){1,}[^\>]*)(src=["'].+?['"])([^\>]*?\>)/g;
                        // 过滤掉iframe的src 值
                        var reg7 = /(\<iframe\s*.+)(src=["'].+?['"])(.+)/g;
                        // html = html.replace(reg, 'src="' + imgRoot + '$1');
                        // 过滤掉分享配置的modal
                        // 过滤掉layout的信息
                        var reg8 = /<div\s+\S*class=\"g-doc.*\".+?>{1}/g;
                        html = html.replace(reg2, '');
                        html = html.replace(reg3, '');
                        html = html.replace(reg4, '');
                        html = html.replace(reg5, '<div>');
                        html = html.replace(reg6, '$1' + '$4');
                        html = html.replace(reg7, '$1' + '$3');
                        html = html.replace(reg8, '<div class="g-doc">');
                        /* 将数据传给后台 */
                        _model.saveAndAddAct({
                            data: {
                                id: window.id || '',
                                source: 2,
                                title: title,
                                startTime: new Date(startTime).getTime(),
                                endTime: new Date(endTime).getTime(),
                                category: category,
                                admin: admin,
                                html: html,
                                extend: JSON.stringify(data)
                            },
                            error: function() {
                                /* 由于没有体图片上传不成功的情况下，需要先保存现在的数据 */
                                _that._data.showLoading = false;
                                _that.$dispatch('savePageUpload');
                                cookie.setCookie('backUrl', location.href, 60 * 60);
                                location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
                            }
                        }).done(function(result) {
                            if (result.code == 200) {
                                var pageId = result.result;
                                window.id = result.result;

                                _model.previewOrPublishPub({
                                    data: {
                                        id: pageId,
                                        pubType: 1
                                    },
                                    error: function() {
                                        /* 由于没有体图片上传不成功的情况下，需要先保存现在的数据 */
                                        _that._data.showLoading = false;
                                        _that.$dispatch('savePageUpload');
                                        cookie.setCookie('backUrl', location.href, 60 * 60);
                                        location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
                                    }
                                }).done(function(result) {
                                    _that._data.showLoading = false;
                                    if (result.code == 200) {
                                        if (!Url.getQuery(window.location.href, 'id')) {
                                            window.location.hash = 'id=' + pageId;
                                        }
                                        setTimeout(function() {
                                            wo.location.href = result.result;
                                        }, 0);
                                    } else {
                                        _that._data.showLoading = false;
                                        $.notify({
                                            title: result.msg,
                                            type: 'error'
                                        });
                                    }
                                });
                            } else {
                                _that._data.showLoading = false;
                                wo.close();
                                $.notify({
                                    title: result.msg,
                                    type: 'error'
                                });
                            }
                        });
                    });
                } else {
                    var html = '<!DOCTYPE html>' +
                        '<head>' +
                        '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                        '<meta charset="utf-8">' +
                        '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">' +
                        '<meta content="yes" name="apple-mobile-web-app-capable">' +
                        '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
                        '<meta name="format-detection" content="telephone=no,email=no,adress=no">' +
                        '<meta content="black" name="apple-mobile-web-app-status-bar-style" />' +
                        '<title>' + title + '</title>' +
                        '<meta name="keywords" content="' + keywords + '" />' +
                        '<meta name="description" content="' + description + '" />' +
                        '<meta name="Author" content="netease | PSC">' +
                        '<meta name="Version" content="1.0.0">' +
                        '<link rel="shortcut icon" href="' + favicon + '" type="image/x-icon"/>' +
                        '<link rel="apple-touch-icon" href="touchicon.png" type="image/x-icon"/>' + styleLib +
                        style +
                        '</head>' +
                        '<body>' + innerHtml + scriptLib + script +
                        '<script type="text/javascript" src="http://mimg.127.net/pub/common/js/share.1.0.2.js"></script>' +
                        '</body>' +
                        '</html>';
                    // 匹配图片的相对路径，过滤绝对路径
                    var reg2 = /background-image:\s?url\(\S+base64\S+\)/g;
                    // 正则去除操作栏
                    var reg3 = /<div\s+\S*class=\"m-psc-oparate\"\s*(.|\n)+?<\/div>/g;
                    // 正则去除添加模块的dom
                    var reg4 = /<div\s+\S*class=\"m-psc-add-wrap\"\s*(.|\n)+?<\/div>/g;
                    // 正则去除J_psc_wrap 模块
                    var reg5 = /<div\s+\S*class=\"J_psc_wrap\"\s*(.|\n)+?>{1}/g;
                    // 过滤掉lazyload的src属性
                    // var reg6 = /(\<img\s*.+)(src=["'].+?['"])(.+)/g;
                    // var reg6 = /(\<img\s*[^\>]*(class=["'].+J_lazyload.+['"])*[^\>]+)(src=["'].+?['"])([^\>]*(class=["'].+J_lazyload.+['"])*[^\>]*?\>)/g;
                    var reg6 = /(\<img\s*[^\>]*(J_lazyload){1,}[^\>]*)(src=["'].+?['"])([^\>]*?\>)/g;
                    // 过滤掉iframe的src 值
                    var reg7 = /(\<iframe\s*.+)(src=["'].+?['"])(.+)/g;
                    // html = html.replace(reg, 'src="' + imgRoot + '$1');
                    // 过滤掉分享配置的modal
                    // 过滤掉layout的信息
                    var reg8 = /<div\s+\S*class=\"g-doc.*\".+?>{1}/g;
                    html = html.replace(reg2, '');
                    html = html.replace(reg3, '');
                    html = html.replace(reg4, '');
                    html = html.replace(reg5, '<div>');
                    html = html.replace(reg6, '$1' + '$4');
                    html = html.replace(reg7, '$1' + '$3');
                    html = html.replace(reg8, '<div class="g-doc">');
                    /* 将数据传给后台 */
                    _model.saveAndAddAct({
                        data: {
                            id: window.id || '',
                            title: title,
                            source: 2,
                            startTime: new Date(startTime).getTime(),
                            endTime: new Date(endTime).getTime(),
                            category: category,
                            admin: admin,
                            html: html,
                            extend: JSON.stringify(data)
                        },
                        error: function() {
                            /* 由于没有体图片上传不成功的情况下，需要先保存现在的数据 */
                            _that._data.showLoading = false;
                            _that.$dispatch('savePageUpload');
                            cookie.setCookie('backUrl', location.href, 60 * 60);
                            location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
                        }
                    }).done(function(result) {
                        if (result.code == 200) {
                            var pageId = result.result;
                            window.id = result.result;

                            _model.previewOrPublishPub({
                                data: {
                                    id: pageId,
                                    pubType: 1
                                },
                                error: function() {
                                    /* 由于没有体图片上传不成功的情况下，需要先保存现在的数据 */
                                    _that._data.showLoading = false;
                                    _that.$dispatch('savePageUpload');
                                    cookie.setCookie('backUrl', location.href, 60 * 60);
                                    location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
                                }
                            }).done(function(result) {
                                _that._data.showLoading = false;
                                if (result.code == 200) {
                                    if (!Url.getQuery(window.location.href, 'id')) {
                                        window.location.hash = 'id=' + pageId;
                                    }
                                    setTimeout(function() {
                                        wo.location.href = result.result;
                                    }, 0);
                                } else {
                                    _that._data.showLoading = false;
                                    $.notify({
                                        title: result.msg,
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            _that._data.showLoading = false;
                            wo.close();
                            $.notify({
                                title: result.msg,
                                type: 'error'
                            });
                        }
                    });
                }
                this.$broadcast('preView');
            },
            // 上线页面
            notifyPublishHtml: function() {
                this.$broadcast('confirmPublish', {
                    type: 'confirmPublishPage',
                    tip: '确定发布吗？'
                });
            },
            // 显示menu
            showMenu: function(flag) {
                this.$broadcast('navToShowMenu', flag);
            },
            NavToinsertComponent: function(data) {
                this.$broadcast('insertComponent', data);
            },
            // 从弹窗上开始继续编辑
            notifyRootContinueEdit: function(item) {
                this.$broadcast('notifyContinueEdit', item);
            },
            notifyBodyContinueEdit: function(item) {
                this.$broadcast('notifyContinueEdit', item);
            },
            //focus section
            notifyRootFocusSection: function(sectionInfo) {
                this.$broadcast('notifyContentFocusSection', sectionInfo);
            },
            //blur section
            notifyRootBlurSection: function(sectionInfo) {
                this.$broadcast('notifyContentBlurSection', sectionInfo);
            },
            /* 
             * 实现上传图片的预览
             * 预览是采用html5 的fileReader
             * 在下载或者部署之前先把预览的base64的图片删除
             */
            notifyRootPreviewSection: function(sectionInfo) {
                this.$broadcast('notifyContentPreviewSection', sectionInfo);
            },
            // 通过点击编辑区域可编辑，显示具体的组件信息到具体编辑区
            notifyRootFocusKeyEdit: function(keyInfo) {
                var _data = this._data.body['d_' + keyInfo.id];
                this.$broadcast('notifyEditMenuChangeComponent', {
                    keyInfo: keyInfo,
                    data: _data
                });
            },
            // 通知显示预览弹窗
            showPrevList: function() {
                this.$broadcast('notifyShowPrevList');
            },
            // 通知到body需要删除component
            notifyRootForRemoveComponent: function(info) {
                this.$broadcast('removeComponentConfirm', {
                    tip: '确认删除该模块吗？',
                    type: 'removeComponent',
                    info: info
                })
            },
            // showGroup 通知显示某个区域
            showGroup: function(info) {
                this.$broadcast('notifyShowGroup', info);
            },
            savePageUpload: function() {
                this.$broadcast('notifySavePageUpload');
            },
            // 重新渲染给出提示
            notifyRootReview: function(flag) {
                this._data.showLoading = flag;
                this._data.showLoadingText = "正在重新渲染中...";
            }
        }
    });
    return Body;
});