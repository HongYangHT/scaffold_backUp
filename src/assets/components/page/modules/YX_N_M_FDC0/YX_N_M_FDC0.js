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
    var scrollTimer = '';

    var myModule = {
        lazyload: function() {
            setTimeout(function() {
                if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                    UA.versions.iPhone || UA.versions.iPad) { // 移动端
                    PSC_lazyload({
                        inViewTreshhold: 100,
                        opacity: true
                    });
                } else {
                    $('.YX-N-M-FDC0 .J_lazyload').lazyload({
                        threshold: 50,
                        effect: 'fadeIn'
                    });
                }
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
        getGoodsRender: function(element, tab, id, subject) {
            var self = this,
                _html = '';
            self.getAjaxData('http://activity.mail.163.com/hdapi/api2/goods/ajax/getGroup.do', {
                id: id
            }, function(res) {
                var _goods = res.content.goodsList,
                    _html = '',
                    _subject = subject || $(element).find('.stat_subject').val();
                $.each(_goods, function(k, v) {
                    var _detail = v.detail;
                    if((_detail.status == 2) && !_detail.underShelf){
                        _html += [
                            '<li class="u-FDC0-goods">',
                                '<div class="u-FDC0-product">',
                                    '<div class="u-FDC0-product-hd">',
                                        '<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-FDC0-link PSC_J_normal_statistics_Goods">',
                                            '<img class="u-FDC0-img J_lazyload" data-original="'+_detail.primaryPicUrl+'?imageView&quality=95&thumbnail=260x260" alt="'+_detail.title+'"><i></i>',
                                        '</a>',
                                        (_detail.newItemFlag ?'<span class="u-FDC0-flag">新品</span>':''),
                                    '</div>',
                                    '<div class="u-FDC0-product-bd">',
                                        '<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="PSC_J_normal_statistics_Goods">'+_detail.title+'</a>',
                                        '<p><span class="u-FDC0-unitPrice">'+_detail.offPrice+'</span></p>',
                                    '</div>',
                                '</div>',
                            '</li>'
                        ].join('');
                    }
                });
                $(element).find('.m-FDC0-ul[data-target="'+tab+'"]').empty().append(_html);
                self.lazyload();
            });

        }
    };
    $('.YX-N-M-FDC0 .goodsId').each(function(i, n) {
        var _id = $(n).data('goodsid'),
            _tab = $(n).data('tab');
        myModule.getGoodsRender($(n).closest('.YX-N-M-FDC0'), _tab, _id, window.psc_act_id);
    });
    $('.J_tab').on('click',function(e){
        var $target = $(e.target),
            tab = $target.data('tab');
        if (UA.versions.mobile || UA.versions.ios || UA.versions.android || UA.versions.iPhone || UA.versions.iPad){
            var top1 = $('.m-FDC0-ul[data-target="1"]').offset().top - 80,
                top2 = $('.m-FDC0-ul[data-target="2"]').offset().top - 80,
                top3 = $('.m-FDC0-ul[data-target="3"]').offset().top - 80;
            $target.closest('.u-FDC0-tab').addClass('active').siblings('.u-FDC0-tab').removeClass('active');    
            if(tab == 1){
                window.scroll(0,top1);
            }else if(tab == 2){
                window.scroll(0,top2);
            }else if(tab == 3){
                window.scroll(0,top3);
            }    
        }else{
            $target.closest('.u-FDC0-tab').addClass('active').siblings('.u-FDC0-tab').removeClass('active');
            $target.closest('.m-FDC0-tabs').siblings('.m-FDC0-ul[data-target="'+tab+'"]').fadeIn().siblings('.m-FDC0-ul').fadeOut();
            $target.closest('.m-FDC0-tabs').siblings('.m-FDC0-ul[data-target="'+tab+'"]').find('.J_lazyload').each(function(i,n){
                var $n = $(n),
                    src = $n.data('original');
                    $n.attr('src',src);
            });   
        }    
    });
    if (UA.versions.mobile || UA.versions.ios || UA.versions.android || UA.versions.iPhone || UA.versions.iPad) { // 移动端
            $('.m-FDC0-ul').show();
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            var top = $('.m-FDC0-goods').offset().top - 80,
                top1 = $('.m-FDC0-ul[data-target="1"]').offset().top - 80,
                top2 = $('.m-FDC0-ul[data-target="2"]').offset().top - 80,
                top3 = $('.m-FDC0-ul[data-target="3"]').offset().top - 80;
                if(t >= top3){
                    $('.m-FDC0-tabs').addClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(2).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }else if(t >=top2 && t<top3){
                    $('.m-FDC0-tabs').addClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(1).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }else if(t >=top1 && t<top2){
                    $('.m-FDC0-tabs').addClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(0).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }else if(t < top1){
                    $('.m-FDC0-tabs').removeClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(0).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }else{
                    $('.m-FDC0-tabs').removeClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(0).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }  
        window.addEventListener('scroll',function(){
            scrollTimer && clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function(){
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                var top = $('.m-FDC0-goods').offset().top - 80,
                    top1 = $('.m-FDC0-ul[data-target="1"]').offset().top - 55,
                    top2 = $('.m-FDC0-ul[data-target="2"]').offset().top - 120,
                    top3 = $('.m-FDC0-ul[data-target="3"]').offset().top - 140;
                if(t >= top3){
                    $('.m-FDC0-tabs').addClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(2).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }else if(t >=top2 && t<top3){
                    $('.m-FDC0-tabs').addClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(1).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }else if(t >=top1 && t<top2){
                    $('.m-FDC0-tabs').addClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(0).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }else if(t < top1){
                    $('.m-FDC0-tabs').removeClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(0).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }else{
                    $('.m-FDC0-tabs').removeClass('f-FDC0-fixed');
                    $('.u-FDC0-tab').eq(0).addClass('active').siblings('.u-FDC0-tab').removeClass('active');
                }   
            },50);
        });
    }

    $('body').on('click', '.YX-N-M-FDC0 .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });
})();