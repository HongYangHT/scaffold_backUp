/* 用于format Date yyyy/MM/dd hh:mm:ss*/
define(['Vue'], function(Vue) {
    Date.prototype.toString = function() {
        var args = {
                "d": 'getDate',
                "h": 'getHours',
                "m": 'getMinutes',
                "s": 'getSeconds'
            },
            rDate = /(yy|M|d|h|m|s)\1?/g,
            toString = Date.prototype.toString;

        return function(format) {
            var me = this;

            if (!format)
                return toString.call(me);

            return format.replace(rDate, function replace(key, reg) {
                var l = key != reg,
                    t;
                switch (reg) {
                    case 'yy':
                        t = me.getFullYear();
                        return l && t || (t % 100);
                    case 'M':
                        t = me.getMonth() + 1;
                        break;
                    default:
                        t = me[args[reg]]();
                }
                return l && t <= 9 && ("0" + t) || t;
            });
        };
    }();
    Vue.filter('format', function(param, item, type) {
        return new Date(parseInt(new Date(param).getTime(), 10)).toString('yyyy/MM/dd hh:mm:ss');
    });
});