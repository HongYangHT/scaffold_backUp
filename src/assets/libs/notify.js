define(['jquery', 'pnotify', 'pnotify.buttons'], function($, PNotify) {
    var notify_stack = {
        dir1: "down",
        dir2: "right",
        push: "bottom",
        spacing1: 20,
        spacing2: 20,
        firstpos1: 100,
        context: $("body")
    };
    // "notice", "info", "success", or "error"
    var styling = $.extend({}, PNotify.styling['fontawesome'], {
        notice_icon: "fa fa-exclamation-circle",
        info_icon: "fa fa-info-circle",
        success_icon: "fa fa-check",
        error_icon: "fa fa-exclamation-triangle"
    });
    var buttons = {
        closer: true,
        sticker: false,
        closer_hover: true,
        sticker_hover: false,
        labels: {}
    };
    var notices = {};
    $.extend({
        notify: function(options) {
            // Type of the notice. "notice", "info", "success", or "error".
            var opts = $.extend({
                type: "info",
                delay: 1000,
                styling: styling,
                stack: notify_stack,
                width: '300px',
                min_height: '60px',
                buttons: buttons
            }, options);
            // notify_stack.firstpos2 = $(window).width() / 2 - 150;
            return new PNotify(opts);
        }
    });
});