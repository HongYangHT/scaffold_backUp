(function(){
     var myModule = {
        lazyload: function() {
            setTimeout(function() {
                $('.YX-N-M-4A12 .J_lazyload').lazyload({
                    threshold: 50,
                    effect: 'fadeIn',
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
                            '<div class="u-4A12-goods">',
                                '<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-4A12-link PSC_J_normal_statistics_Goods">',
                                    (needScenePicUrl ? '<img data-original="'+_detail.scenePicUrl+'?imageView&thumbnail=280x280&quality=95" class="J_lazyload">':'<img data-original="'+_detail.primaryPicUrl+'?imageView&thumbnail=280x280&quality=95" class="J_lazyload">'),
                                    '<i></i>',
                                '</a>',
                                (_detail.extend.maker ? '<span class="u-4A12-maker">'+_detail.extend.maker+'</span>':''),
                                '<div class="m-4A12-info">',
                                    '<p class="u-4A12-item-title"><a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="PSC_J_normal_statistics_Goods">'+_detail.title+'</a></p>',
                                    '<p class="u-4A12-item-desc">'+_detail.simpleDesc+'</p>',
                                    '<div class="u-4A12-btn">',
                                        '<span class="u-4A12-item-offPrice">'+_detail.retailPrice+'</span>',
                                         '<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-4A12-buy PSC_J_normal_statistics_Goods">立即购买&nbsp;&gt;</a>',
                                    '</div>',
                                '</div>',
                            '</div>'
                        ].join('').trim();
                    }
                });
                $(element).find('.m-4A12-goods').empty().append(_html);
                self.lazyload();
            });

        }
    };

    $('.YX-N-M-4A12 .J_module_info ').each(function(i, n) {
        var _id = $(n).find('.goodsId').data('goodsid'),
            needScenePicUrl = $(n).find('.needScenePicUrl').data('needscenepicurl');
        myModule.getGoodsRender($(n).closest('.YX-N-M-4A12'), _id, window.psc_act_id, needScenePicUrl);
    });
    $('body').on('click', '.YX-N-M-4A12 .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });
})();