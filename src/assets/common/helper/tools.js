define(['jquery'], function($) {
    var tools = {
        getAjaxData: function(url, data, callback) {
            var self = this;
            $.ajax({
                type: 'GET',
                url: url,
                cache: false,
                dataType: 'jsonp',
                data: data || '',
                success: function(res) {
                    res && callback && callback(res);
                }
            });
        },
        handleData: function(data) {
            return new HandleData(data).init();
        }
    };

    var HandleData = function(data) {
        this.result = data;
    };

    HandleData.prototype.init = function() {
        var _that = this;

        return _that.handleExpand(_that.result);
    };

    HandleData.prototype.handleExpand = function(result) {
        var _that = this;

        var expand = {},
            _expandStr = _that.splitExpand(result);
        if(_expandStr){    
            $.each(_expandStr, function(i, item) {
                expand['' + _that.getQuery(item, 'name') + ''] = _that.getQuery(item, 'value');
            });
        }
        return expand;
    };

    HandleData.prototype.splitExpand = function(expand) {
        if(expand)
            return expand.split('|');
        else return '';
    };

    HandleData.prototype.getQuery = function(str, name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = str.match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    return tools;
});