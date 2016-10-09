;(function($) {
    var $btnCollect = $('.J_collect'),
        $btnShare = $('.J_share'),
        $popShare = $('.J_pop_share'),
        $modal = $('.J_modal'),
        $popDialog = $('.m-pop'),
        $popRemind = $('.J_pop_remind'),
        $close = $('.J_close');

    $btnCollect.on('click', function() {
        fAddFavorite();
    });

    $btnShare.on('click', function() {
        if ($(this).hasClass('pop')) {
            fOpenPop($popShare, true);
            return;
        }
        fOpenPop($popShare);
    });

    $close.on('click', function() {
		fCloseAll();
	});

    function fAddFavorite() {
        var self = this;
        var _url = window.location.href,
            _title = document.title;
        if (window.external && 'addFavorite' in window.external) {
            window.external.addFavorite(_url, _title);
        } else if (window.sidebar && window.sidebar.addPanel) {
            window.sidebar.addPanel(_url, _title);
        } else {
            var _txt = '收藏失败，请按 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D 手动收藏活动。';
            fOpenPop($popRemind, false, _txt);
        }
    }

    function fOpenPop(_obj, _bgKeepFlag, _txt) {
        fCloseAll(_bgKeepFlag);
        var _wH = $(window).height(),
            _oH = $(_obj).height(),
            _top = '';
        if (_wH >= _oH) {
            _top = (_wH - _oH) * 0.4 + $(window).scrollTop();
        } else {
            _top = $(window).scrollTop();
        }
        // !!_txt && ($txtRemind.html(_txt));
        $modal.fadeIn(200);
        $(_obj).css('top', _top).fadeIn(300);
    }

    function fCloseAll(_bgKeepFlag) {
        var self = this;
        var _bgKeepFlag = _bgKeepFlag || false;
        !_bgKeepFlag && ($modal.fadeOut(200));
        $popDialog.fadeOut(200);
    }
})(jQuery);
