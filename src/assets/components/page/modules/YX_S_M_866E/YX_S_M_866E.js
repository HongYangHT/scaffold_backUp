(function(){
     var myModule = {
        lazyload: function() {
            setTimeout(function() {
                $('.YX-S-M-866E .J_lazyload').lazyload({
                    threshold: 50,
                    effect: 'fadeIn'
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
                var data = res.content.goodsList,
                    _titleList = '',
                    _html='',
                    _subject = subject || $(element).find('.stat_subject').val();
               
                    for(var i=0;i<data.length;i++){
                        var key=i+1;
                        _titleList += [
                              '<div class="u-866E-goodsTitle">',
                                '<span class="u-866E-sprite u-866E-num'+key+'"></span>',
                                '<span class="u-866E-goodsName">'+data[i].title+'</span>',
                                '<a href="http://you.163.com/item/detail?id=' + data[i].id + '&&_stat_subject=' + _subject + '" title="' + data[i].title + '" target="_blank" class="u-866E-goodsImglink PSC_J_normal_statistics_Goods">',
                                    (needScenePicUrl ? '<img data-original="' + data[i].scenePicUrl + '?imageView&thumbnail=240x240&quality=95" class="u-866E-goodsImg J_lazyload">' :'<img data-original="' + data[i].primaryPicUrl + '?imageView&thumbnail=240x240&quality=95" class="u-866E-goodsImg J_lazyload">'),
                                '</a>',
                             '</div>'
                        ].join('');
                    }
                    
              
                $(element).find('.m-866E-goodsTitle').empty().append(_titleList);
                $.each(data, function(k, v) {
                    var sellVolumeId = '';
                    var extend = v.extend;
                    sellVolumeId = v.notSoldOutGoods.skuId;
                        _html += [
                              '<div class="swiper-slide">',
                                    '<div class="u-866E-goods">',
                                        '<a href="http://you.163.com/item/detail?id='+v.id+'&_stat_subject=' + _subject + '" target="_blank" class="u-866E-link PSC_J_normal_statistics_Goods">',
                                        (needScenePicUrl ?  '<img src="' + v.scenePicUrl + '?imageView&thumbnail=524x524&quality=90">' : '<img src="' + v.primaryPicUrl + '?imageView&thumbnail=524x524&quality=90">'),
                                        '</a>',
                                        '<div class="m-866E-goods-info">',
                                            '<p class="u-866E-goods-t"><a href="http://you.163.com/item/detail?id='+v.id+'&_stat_subject=' + _subject +'" target="_blank">'+v.title+'</a></p>',
                                            (extend.maker ? '<p class="u-866E-goods-maker">' + extend.maker + '</p>' : '<p class="u-866E-goods-maker">' + v.simpleDesc + '</p>'),
                                            '<p class="u-866E-goods-price">',
                                                '<span class="u-866E-offPrice">'+v.notSoldOutGoods.price +'</span>',
                                                (parseFloat(v.notSoldOutGoods.price) == parseFloat(v.unitPrice) ? '' : '<span class="u-866E-unitPrice">' + v.unitPrice + '</span>'),
                                            '</p>',
                                            '<div class="m-866E-btn">',
                                                '<a href="javascript:;" target="_self" class="u-866E-cart J_417A_cart PSC_J_normal_statistics_Goods psc_static_'+ sellVolumeId +'" data-skuId="' + sellVolumeId + '" data-img="' + v.primaryPicUrl + '"></a>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                               '</div>'
                        ].join('');
                });
                $(element).find('.swiper-wrapper').empty().append(_html);
                self.lazyload();
               
                $('.u-866E-goodsTitle').eq(0).addClass('active');
                $('.slick-866E-prev').on("click",function(){
                        var _index=swiper.activeIndex;
                        $('.u-866E-goodsTitle').eq(_index).siblings().removeClass('active');
                        $('.u-866E-goodsTitle').eq(_index).addClass('active');
                });
                $('.slick-866E-next').on("click",function(){
                        var _index=swiper.activeIndex;
                        $('.u-866E-goodsTitle').eq(_index).siblings().removeClass('active');
                        $('.u-866E-goodsTitle').eq(_index).addClass('active');
                });
                $('.u-866E-goodsTitle').on("click",function(){
                    var _index=$(this).index();
                    swiper.slideTo(_index);
                    $('.u-866E-goodsTitle').eq(_index).siblings().removeClass('active');
                    $('.u-866E-goodsTitle').eq(_index).addClass('active');
                });
            });

        }
    };

    $('.YX-S-M-866E .J_module_info ').each(function(i, n) {
        var _id = $(n).find('.goodsId').data('goodsid'),
            needScenePicUrl = $(n).find('.needScenePicUrl').data('needscenepicurl');
        myModule.getGoodsRender($(n).closest('.YX-S-M-866E'), _id, window.psc_act_id,needScenePicUrl);
        $('.u-866E-goodsTitle').eq(0).addClass('active');
    });

    $('.YX-S-M-866E').on('click', '.J_866E_cart', function(e) {
        var $target = $(e.target),
            skuId = $target.data('skuid'),
            img = $target.data('img');
        if (window.PSC_YX_API_UID) {
            window.PSC_YX_API.addCart(skuId, img, 1, function(_res) {
                var _code = _res.code;
                if (_code == 200) {
                    window.PSC_YX_API.cartPcAnimate(img, 2000);
                } else {
                    alert('商品已下架！');
                }
            });
        } else {
            $.ajax({
                url: '//you.163.com/act/api1/yxcoupon/ajax/getYXAccount.do',
                type: 'GET',
                dataType: 'jsonp',
                async: false,
                cache: false,
                jsonp: "callback",
                success: function(data) {
                    if (data && data.code && data.code == 200) {
                        if (data.content) {
                            window.PSC_YX_API_UID = data.content.uid;
                            window.PSC_YX_API.addCart(skuId, img, 1, function(_res) {
                                var _code = _res.code;
                                if (_code == 200) {
                                    window.PSC_YX_API.cartPcAnimate(img, 2000);
                                } else {
                                    alert('商品已下架！');
                                }
                            });
                        } else {
                            window.PSC_YX_API.login();
                        }
                    } else {
                        alert('服务器繁忙，请重新再试');
                    }
                },
                error: function(xhr, textStatus) {
                    if (textStatus === 'timeout') {
                        alert('请求超时，请重新再试');
                    }
                }
            });
        }
    });
    
    $('body').on('click', '.YX-S-M-866E .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });
})();


var swiper=new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                nextButton: '.slick-866E-next',
                prevButton: '.slick-866E-prev',
                slidesPerView: 1,
                spaceBetween: 0,
                paginationClickable: true,
                preloadImages: false,
                lazyloading:true,
                
});
