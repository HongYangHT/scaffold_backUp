(function(){
    var UA = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
            };
        }()
    };
     var myModule = {
        lazyload: function() {
            setTimeout(function() {
                PSC_lazyload({
                    inViewTreshhold:100,
                    opacity:true
                });
            }, 300);
        },
        getAjaxData: function(url, data, callback) {
            var self = this;
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                cache: false,
                dataType: 'jsonp',
                data: data || '',
                success: function(res) {
                    callback(res);
                }
            });
        },
        getGoodsRender: function(element, id, subject, needScenePicUrl) {
            var self = this,
                _html = '';
            self.getAjaxData('https://spread.mail.163.com/mail/goods/getGroup', {
                id: id
            }, function(res) {
                var _goods = res.content.goodsList,
                    _html = '',
                    _subject = subject || $(element).find('.stat_subject').val();
                $.each(_goods, function(k, v) {
                    var _detail = v,
                        sellVolumeId = '';
                    var extend = v.extend;
                    for(var i=0, len = _detail.skuList.length;i<len;i++){
                        if(_detail.skuList[i].sellVolume & _detail.skuList[i].id == _detail.primarySkuId){
                            sellVolumeId = _detail.primarySkuId;
                            break;
                        }
                    }
                    if(!sellVolumeId){
                       for(var i=0, len = _detail.skuList.length;i<len;i++){
                            if(_detail.skuList[i].sellVolume && _detail.skuList[i].id == _detail.primarySkuId){
                                sellVolumeId = _detail.primarySkuId;
                                break;
                            }else if(_detail.skuList[i].sellVolume){
                                sellVolumeId = _detail.skuList[i].id;
                                break;
                            }
                        } 
                    }
                    sellVolumeId = sellVolumeId ? sellVolumeId : _detail.primarySkuId;
                    if((_detail.status == 2) && !_detail.underShelf){
                        _html += [
                            '<div class="u-BCD0-goods">',
                                '<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-BCD0-link PSC_J_normal_statistics_Goods">',
                                    (needScenePicUrl ? '<img data-original="'+_detail.scenePicUrl+'?imageView&thumbnail=280x280&quality=95" class="J_lazyload">':'<img data-original="'+_detail.primaryPicUrl+'?imageView&thumbnail=280x280&quality=95" class="J_lazyload">'),
                                    '<i></i>',
                                '</a>',
                                (_detail.extend.maker ? '<span class="u-BCD0-maker">'+_detail.extend.maker+'</span>':''),
                                '<div class="m-BCD0-info">',
                                    '<p class="u-BCD0-item-title"><a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="PSC_J_normal_statistics_Goods">'+_detail.title+'</a></p>',
                                    '<p class="u-BCD0-item-desc">'+_detail.simpleDesc+'</p>',
                                    '<div class="u-BCD0-btn">',
                                        '<span class="u-BCD0-item-offPrice">'+_detail.retailPrice+'</span>',
                                         '<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-BCD0-buy PSC_J_normal_statistics_Goods">立即购买&nbsp;&gt;</a>',
                                    '</div>',
                                '</div>',
                            '</div>'
                        ].join('').trim();
                    }
                });
                $(element).find('.m-BCD0-goods').empty().append(_html);
                self.lazyload();
            });

        }
    };

    $('.YX-N-M-BCD0 .J_module_info ').each(function(i, n) {
        var _id = $(n).find('.goodsId').data('goodsid'),
            needScenePicUrl = $(n).find('.needScenePicUrl').data('needscenepicurl');
        myModule.getGoodsRender($(n).closest('.YX-N-M-BCD0'), _id, window.psc_act_id, needScenePicUrl);
    });
    if(UA.versions.mobile || UA.versions.ios || UA.versions.android || UA.versions.iPhone || UA.versions.iPad){
        $('.YX-N-M-BCD0').addClass('YX-N-M-BCD0-m');
    }else{
        $('.YX-N-M-BCD0').removeClass('YX-N-M-BCD0-m');
    }

    $('body').on('click', '.YX-N-M-BCD0 .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });
})();