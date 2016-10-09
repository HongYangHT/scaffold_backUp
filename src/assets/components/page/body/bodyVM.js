define([
    'Vue',
    'text!components/page/body/body.mustache',
    'components/page/content/contentVM',
    'components/page/editMenu/editMenuVM',
    'components/page/menu/menuVM',
    'components/page/modal/modalVM',
    'common/helper/localStorage',
    'Blob',
    'FileSaver',
    'uuid'
], function(Vue, tpl, ContentVM,  EditMenuVM, MenuVM, ModalVM, localStorage) {
    var Body = Vue.extend({
        name: 'body',
        components: {
            'content-view': ContentVM,
            'edit-menu-view': EditMenuVM,
            'menu-view': MenuVM,
            'modal-view': ModalVM
        },
        template: tpl,
        data: function() {
            return {
                body: {},
                layout: {}
            }
        },
        computed: {

        },
        methods: {

        },
        events: {
            notifyBody: function(picked) {
                this.$broadcast('editShowOrHide', picked);
                if (picked == 0) {
                    $(this.$el).find('.m-psc-oparate').show();
                    $(this.$el).find('.m-container').removeClass('prev');
                } else {
                    $(this.$el).find('.m-psc-oparate').hide();
                    $(this.$el).find('.m-container').addClass('prev');
                }
            },
            notifyBodyToDownload: function() {
                $(this.$el).find('.m-psc-oparate').hide();
                var html = $(this.$el).find('.m-psc-container').html(),
                    title = $(this.$el).find('.g-doc').data('title'),
                    description = $(this.$el).find('.g-doc').data('description'),
                    keywords = $(this.$el).find('.g-doc').data('keywords');
                var style = '',
                    script = '';
                var imgRoot = window.location.protocol + '//' + window.location.host + ((/\.html$/).test(window.location.pathname.split('/')[1]) ? '' : '/' + window.location.pathname.split('/')[1]) + '/';

                function unique(arr) {
                    return arr.filter(function(item, index, self) {
                        return ((index + 1 < self.length) && (item.key == self[index + 1].key)) ? false : true;
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
                if (this._data.body.load.loadStyle) {
                    var _loadStyle = unique2(this._data.body.load.loadStyle);
                    $.each(_loadStyle, function(i, n) {
                        ajaxDeferredArr.push($.ajax({
                            url: n.value,
                            type: 'GET',
                            success: function(data) {
                                style += '<style>' + data + '</style>';
                            }
                        }));
                    });
                }
                if (this._data.body.load.loadScript) {
                    var _loadScript = unique2(this._data.body.load.loadScript);
                    $.each(_loadScript, function(i, n) {
                        ajaxDeferredArr.push($.ajax({
                            url: n.value,
                            type: 'GET',
                            success: function(data) {
                                script += '<script>' + data + '</script>';
                            }
                        }));
                    });
                }
                $.when.apply($, ajaxDeferredArr).done(function() {
                    html = '<!DOCTYPE html>' +
                        '<head>' +
                        '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                        '<meta charset="utf-8">' +
                        '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">' +
                        '<meta content="yes" name="apple-mobile-web-app-capable">' +
                        '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
                        '<meta name="format-detection" content="telephone=no,email=no,adress=no">' +
                        '<meta content="black" name="apple-mobile-web-app-status-bar-style" />' +
                        '<title>' + title + '</title>' +
                        '<meta name="keywords" content="' + keywords + '" />' +
                        '<meta name="description" content="' + description + '" />' +
                        '<meta name="Author" content="netease | PSC">' +
                        '<meta name="Version" content="1.0.0">' +
                        '<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>' +
                        '<link rel="apple-touch-icon" href="touchicon.png" type="image/x-icon"/>' +
                        style +
                        '</head>' +
                        '<body>' + html + script + '</body>' +
                        '</html>';
                    // 匹配图片的相对路径，过滤绝对路径
                    var reg = /src=(?=\"(?!http|https[\w\d_\/-]+\.(gif|jpg|jpeg|png|bmp)))\"/g;
                    html = html.replace(reg, 'src="' + imgRoot + '$1');
                    var blob = new Blob([html], {
                        type: "text/html;charset=utf-8"
                    });
                    saveAs(blob, 'page_' + Math.uuid(32, 16).toLowerCase() + '.html');
                });
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
                $.each(this.body.load.loadStyle, function(i, n) {
                    if (data.removeId == n.id) {
                        _that.loadStyle.splice(i, 1);
                    }
                });
                $.each(this.body.load.loadScript, function(i, n) {
                    if (data.removeId == n.id) {
                        _that.loadScript.splice(i, 1);
                    }
                });
            },
            notifyBackHtml: function() {
                this.body = {};
                this.$broadcast('prevStep');
            },
            notifyClearHtml: function() {
                this.body = {};
                this.$broadcast('removeAll');
            },
            notifySaveHtml: function() {
                this.$broadcast('savePage');
            },
            // 预览数据
            notifyPrevViewHtml: function() {
                this.$broadcast('preView');
                $(this.$el).find('.m-psc-oparate').hide();
                var html = $(this.$el).find('.m-psc-container').html(),
                    title = $(this.$el).find('.g-doc').data('title'),
                    description = $(this.$el).find('.g-doc').data('description'),
                    keywords = $(this.$el).find('.g-doc').data('keywords');
                var style = '',
                    script = '';

                function unique(arr) {
                    return arr.filter(function(item, index, self) {
                        return ((index + 1 < self.length) && (item.key == self[index + 1].key)) ? false : true;
                    });
                }

                function unique2(arr) {
                    var r = [];
                    for (var i = 0, l = arr.length; i < l; i++) {
                        for (var j = i + 1; j < l; j++)
                            if (arr[i].key === arr[j].key) j = ++i;
                        r.push(arr[i]);
                    }
                    return r;
                }
                if (this._data.body.load.loadStyle) {
                    var _loadStyle = unique2(this._data.body.load.loadStyle);
                    style = $.map(this._data.body.load.loadStyle, function(n, i) {
                        return '<link rel="stylesheet" type="text/css" href="' + n.value + '"/>';
                    }).join('');
                }
                if (this._data.body.load.loadScript) {
                    var _loadScript = unique2(this._data.body.load.loadScript);
                    script = $.map(this._data.body.load.loadScript, function(n, i) {
                        return '<script type="text/javascript" src="' + n.value + '"></script>';
                    }).join('');
                }
                html = '<!DOCTYPE html>' +
                    '<head>' +
                    '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                    '<meta charset="utf-8">' +
                    '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">' +
                    '<meta content="yes" name="apple-mobile-web-app-capable">' +
                    '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
                    '<meta name="format-detection" content="telephone=no,email=no,adress=no">' +
                    '<meta content="black" name="apple-mobile-web-app-status-bar-style" />' +
                    '<title>' + title + '</title>' +
                    '<meta name="keywords" content="' + keywords + '" />' +
                    '<meta name="description" content="' + description + '" />' +
                    '<meta name="Author" content="netease | PSC">' +
                    '<meta name="Version" content="1.0.0">' +
                    '<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>' +
                    '<link rel="apple-touch-icon" href="touchicon.png" type="image/x-icon"/>' +
                    style +
                    '</head>' +
                    '<body>' + html + script + '</body>' +
                    '</html>';
            },
            // 上线数据
            notifyPublishHtml: function() {
                this.$broadcast('publish');
                $(this.$el).find('.m-psc-oparate').hide();
                var html = $(this.$el).find('.m-psc-container').html(),
                    title = $(this.$el).find('.g-doc').data('title'),
                    description = $(this.$el).find('.g-doc').data('description'),
                    keywords = $(this.$el).find('.g-doc').data('keywords');
                var style = '',
                    script = '';

                function unique(arr) {
                    return arr.filter(function(item, index, self) {
                        return ((index + 1 < self.length) && (item.key == self[index + 1].key)) ? false : true;
                    });
                }

                function unique2(arr) {
                    var r = [];
                    for (var i = 0, l = arr.length; i < l; i++) {
                        for (var j = i + 1; j < l; j++)
                            if (arr[i].key === arr[j].key) j = ++i;
                        r.push(arr[i]);
                    }
                    return r;
                }
                if (this._data.body.load.loadStyle) {
                    var _loadStyle = unique2(this._data.body.load.loadStyle);
                    style = $.map(this._data.body.load.loadStyle, function(n, i) {
                        return '<link rel="stylesheet" type="text/css" href="' + n.value + '"/>';
                    }).join('');
                }
                if (this._data.body.load.loadScript) {
                    var _loadScript = unique2(this._data.body.load.loadScript);
                    script = $.map(this._data.body.load.loadScript, function(n, i) {
                        return '<script type="text/javascript" src="' + n.value + '"></script>';
                    }).join('');
                }
                html = '<!DOCTYPE html>' +
                    '<head>' +
                    '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                    '<meta charset="utf-8">' +
                    '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">' +
                    '<meta content="yes" name="apple-mobile-web-app-capable">' +
                    '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
                    '<meta name="format-detection" content="telephone=no,email=no,adress=no">' +
                    '<meta content="black" name="apple-mobile-web-app-status-bar-style" />' +
                    '<title>' + title + '</title>' +
                    '<meta name="keywords" content="' + keywords + '" />' +
                    '<meta name="description" content="' + description + '" />' +
                    '<meta name="Author" content="netease | PSC">' +
                    '<meta name="Version" content="1.0.0">' +
                    '<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>' +
                    '<link rel="apple-touch-icon" href="touchicon.png" type="image/x-icon"/>' +
                    style +
                    '</head>' +
                    '<body>' + html + script + '</body>' +
                    '</html>';
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
            //focus section
            notifyRootFocusSection: function(sectionInfo) {
                this.$broadcast('notifyContentFocusSection', sectionInfo);
            },
            //blur section
            notifyRootBlurSection: function(sectionInfo) {
                this.$broadcast('notifyContentBlurSection', sectionInfo);
            }
        }
    });
    return Body;
});