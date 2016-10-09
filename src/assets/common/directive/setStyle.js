/* 用于自定义style
 * el: 指令绑定的元素
 * vm: 拥有该指令的上下文 ViewModel
 * expression: 指令的表达式，不包括参数和过滤器
 * arg: 指令的参数
 * raw: 未被解析的原始表达式
 * name: 不带前缀的指令名
 * 单个指令实例处理多个参数，可以利用字面量对象作为表达式
 */
define(['Vue', 'underscore'], function(Vue, _) {
    Vue.directive('set-style', {
        bind: function(data) {
            // 做绑定的准备工作
            // 比如添加事件监听器，或是其他只需要执行一次的复杂操作

        },
        update: function(data) {
            // 根据获得的新值执行对应的更新
            // 对于初始值也会被调用一次
            var _that = this;
            _.each(data, function(value, key) {
                switch (key) {
                    case 'fontSize':
                    case 'borderRadius':
                    case 'borderLeftWidth':
                    case 'borderRightWidth':
                    case 'borderTopWidth':
                    case 'borderBottomWidth':
                    case 'paddingTop':
                    case 'paddingRight':
                    case 'paddingBottom':
                    case 'paddingLeft':
                    case 'marginTop':
                    case 'marginRight':
                    case 'marginBottom':
                    case 'marginLeft':
                    case 'lineHeight':
                        _that.el.style[key] = value + 'px';
                        break;
                    case 'width':
                    case 'height':
                    case 'maxWidth':
                    case 'minHeight':
                        var number = /^[0-9]+$/;
                        if (number.test(value)) {
                            _that.el.style[key] = value + 'px';
                        } else {
                            _that.el.style[key] = value;
                        }
                        break;
                    case 'backgroundImage':
                        var url = /^[http|https]/ig;
                        if (url.test(value)) {
                            _that.el.style[key] = 'url(' + key + ')';
                        } else {
                            _that.el.style[key] = value;
                        }
                        break;
                    default:
                        _that.el.style[key] = value;
                        break;
                }
            });
        },
        unbind: function() {

        }
    });
});