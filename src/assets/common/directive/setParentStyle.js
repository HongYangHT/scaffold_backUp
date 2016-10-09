define(['Vue', 'underscore'], function(Vue, _) {
    Vue.directive('set-parent-style', {
        bind: function(data) {
            // 做绑定的准备工作
            // 比如添加事件监听器，或是其他只需要执行一次的复杂操作

        },
        update: function(data) {
            // 根据获得的新值执行对应的更新
            // 对于初始值也会被调用一次
            var _that = this;
            if ($(_that.el).closest('td').size()) {
                _.each(data, function(value, key) {
                    if (data.maxWidth) {
                        switch (key) {
                            case 'maxWidth':
                                var number = /^[0-9]+$/;
                                if (number.test(value)) {
                                    $(_that.el).closest('td')[0].style['width'] = value + 'px';
                                }
                                break;
                            case 'minHeight':
                                var number = /^[0-9]+$/;
                                if (number.test(value)) {
                                    $(_that.el).closest('td')[0].style['height'] = value + 'px';
                                }
                                break;
                        }
                    } else {
                        switch (key) {
                            case 'height':
                                var number = /^[0-9]+$/;
                                if (number.test(value)) {
                                    $(_that.el).closest('td')[0].style['height'] = value + 'px';
                                }
                                break;
                        }
                    }
                });
            }
        },
        unbind: function() {

        }
    });
});