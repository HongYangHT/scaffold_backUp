define(['jquery', 'notify'], function($) {
    /*
        由于localStorage 不支持过期时间设置，所以需要自己来设置
    */
    var Storage = function() {
        // 代理
        this.storageProxy = window.localStorage;
        // 设置缓存
        this.defaultLiftTime = 30 * 24 * 60 * 60 * 1000;
        // 设置keyCache
        this.keyCache = 'PSC_KEY_TIMEOUT_MAP';
        this.initialize();
    };

    Storage.prototype.initialize = function() {
        if (!this.storageProxy)
            throw 'not override storageProxy property';
    };

    /*
        新增localstorage
        数据格式需要转化成string,所以先要判断数据的类型，所以需要转化成JSON.stringify、JSON.parse
        每一条存储的信息需要  
    */
    Storage.prototype.set = function(key, value, expire) {
        var _that = this;
        key = typeof key !== 'string' ? String(key) : key;
        value = this.serializer(value, expire);
        if (!_that.isSupport()) {
            console.log("your brower doesn't support localStorage");
            $.notify({
                title: "your brower doesn't support localStorage",
                type: "notice"
            });
            return false;
        }
        try {
            _that.unEffectiveItem(); // 删除失效的localStorage
            this.storageProxy.setItem(key, value);
            var cache = this.get(this.keyCache),
                keys = cache;
            if (cache) var cacheArr = cache.split(',');
            if (_that.distinct(cacheArr, key)) {
                keys = (cache ? (cache + ',') : '') + key;
            }
            this.storageProxy.setItem(this.keyCache, keys);
            $.notify({
                title: '保存成功',
                type: 'success'
            });
        } catch (e) {
            if (_that.isQuotaExceeded(e)) {
                console.log('Not enough storage is available to complete this operation.');
                $.notify({
                    title: "Not enough storage is available to complete this operation.",
                    type: "notice"
                });
            }
        }

    };

    Storage.prototype.get = function(key) {
        key = typeof key !== 'string' ? String(key) : key;
        var cacheItem = null;
        try {
            key == this.keyCache ? (cacheItem = this.storageProxy.getItem(key)) : cacheItem = this.unSerializer(this.storageProxy.getItem(key));
        } catch (e) {
            return null;
        }
        var _now = new Date().getTime();
        if (key == this.keyCache) return cacheItem;
        if (cacheItem && _now < new Date(cacheItem.t).getTime()) return cacheItem.v;
        else this.delete(key);
        return null;
    };

    Storage.prototype.getAll = function() {
        var localStorages = [],
            _that = this;
        if (!this.storageProxy && !this.storageProxy.length) return '';
        var keys = this.get(this.keyCache);
        if (keys) {
            var keys = keys.split(',');
            $.each(this.storageProxy, function(i, item) {
                $.each(keys, function(j, n) {
                    if (i == n) {
                        var n = {};
                        var cacheItem = _that.unSerializer(item);
                        n.id = i;
                        n.st = cacheItem.st;
                        n.v = cacheItem.v;
                        localStorages.push(n);
                    }
                });
            });
        }
        return localStorages;
    };

    Storage.prototype.delete = function(key) {
        key = typeof key !== 'string' ? String(key) : key;
        this.storageProxy.removeItem(key);
    };

    Storage.prototype.unEffectiveItem = function() {
        var _now = new Date().getTime(),
            _that = this;
        if (!_that.storageProxy && !_that.storageProxy.length) return;
        $.each(_that.storageProxy, function(i, item) {
            // var cacheItem = _that.unSerializer(item);
            var cacheItem = '';
            i == _that.keyCache ? (cacheItem = item) : (_that.unSerializer(item));
            if (cacheItem && cacheItem.t && _now > new Date(cacheItem.t).getTime()) _that.delete(i);
        });
    };

    // 检测兼容性
    Storage.prototype.isSupport = function() {
        var _supported = false,
            _that = this;
        if (this.storageProxy && this.storageProxy.setItem) {
            _supported = true;
            var _key = '__' + Math.round(Math.random() * 1e7);
            try {
                _that.storageProxy.setItem(_key, _that.keyCache);
                _that.storageProxy.removeItem(_key);
            } catch (e) {
                _supported = false;
            }
        }

        return _supported;
    };

    // 检测是否已存满
    Storage.prototype.isQuotaExceeded = function(e) {
        var _isQuotaExceeded = false;
        if (e) {
            if (e.code) {
                // storage full
                switch (e.code) {
                    case 22:
                        _isQuotaExceeded = true;
                        break;
                    case 1014:
                        /*
                            for Firefox 
                            {
                              code: 1014,
                              name: 'NS_ERROR_DOM_QUOTA_REACHED',
                              message: 'Persistent storage maximum size reached',
                              // …
                            }           
                        */
                        if (e.name == 'NS_ERROR_DOM_QUOTA_REACHED')
                            _isQuotaExceeded = true;
                        break;
                }
            } else if (e.number == -2147024882) {
                /*
                lt IE8, there is no code in return message
                {
                    number: -2147024882,
                    message: 'Not enough storage is available to complete this operation.',
                    // …
                }

            */
                _isQuotaExceeded = true;
            } else {
                throw e;
            }
        }

        return _isQuotaExceeded;
    };

    // 序列化数据
    Storage.prototype.serializer = function(value, expire) {
        var _now = new Date().getTime();
        expire = expire || this.defaultLiftTime;
        var _expires = typeof expire === 'number' ? new Date(_now + expire) : (typeof expire === 'string' ? new Date(expire) : new Date());
        var _val = {};
        _val.v = value;
        _val.t = _expires;
        _val.st = new Date().getTime();
        return this.handleJSON(_val);
    };

    Storage.prototype.unSerializer = function(obj) {
        try {
            return obj ? JSON.parse(obj) : '';
        } catch (e) {
            return obj;
        }
    };

    Storage.prototype.handleJSON = function(obj) {
        var _type = this.getType(obj),
            _result = '';
        switch (_type) {
            case 'boolean':
            case 'function':
            case 'undefined':
            case 'null':
                throw 'obj type(boolean | function | undefined | null) is illegal';
                break;
            default:
                _result = JSON.stringify(obj);
                break;
        }
        return _result;
    };

    // 判断数据类型
    Storage.prototype.getType = function(obj) {
        var map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Data]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };

        if (obj instanceof Element) {
            return 'element';
        }

        return map[Object.prototype.toString.call(obj)];
    };

    Storage.prototype.distinct = function(arr, val) {
        if (!arr || !arr.length) return true;
        var _json = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            var _val = arr[i];
            if (!_json[_val]) {
                _json[_val] = 1;
            }
        }

        return _json[val] ? false : true;
    };

    return new Storage();
});