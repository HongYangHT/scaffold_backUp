define(['Vue', 'jquery', 'underscore'], function(Vue, $, _) {
    Vue.filter('checkType', function(param, item, type) {
        switch (type) {
            case 'array':
                return _.isArray(param);
                break;
            case 'object':
                return _.isObject(param);
                break;
            case 'string':
                return _.isString(param);
                break;
            default:
                return false;
                break;
        }
    });
});