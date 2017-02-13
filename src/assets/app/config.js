require.config({
    baseUrl: 'assets/',
    urlArgs: "v=20160528",
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'mustache': 'libs/mustache',
        'text': 'libs/text',
        'Vue': 'libs/vue',
        'collapse': 'libs/jquery.collapse',
        'uuid': 'libs/uuid',
        'FileSaver': 'libs/FileSaver',
        'Blob': 'libs/Blob',
        'colorpicker': 'libs/bootstrap-colorpicker',
        'pnotify': 'libs/pnotify',
        'notify': 'libs/notify',
        'sortable':'libs/sortable',
        'laydate':'libs/laydate',
        'autocomplete':'libs/jquery.autocomplete',
        'clipboard':'libs/clipboard'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'collapse': {
            deps: ['jquery'],
            exports: 'collapse'
        },
        'uuid': {
            deps: ['jquery'],
            exports: 'uuid'
        },
        'Blob': {
            deps: ['jquery'],
            exports: 'Blob'
        },
        'FileSaver': {
            deps: ['jquery', 'Blob'],
            exports: 'FileSaver'
        },
        'colorpicker': {
            deps: ['jquery'],
            exports: 'colorpicker'
        },
        'pnotify': {
            deps: ['jquery'],
            exports: 'pnotify'
        },
        'notify': {
            deps: ['jquery', 'pnotify'],
            exports: 'notify'
        },
        'sortable':{
            exports:'sortable'
        },
        'laydate':{
            deps:['jquery'],
            exports:'laydate'
        },
        'autocomplete':{
            deps:['jquery'],
            exports:'autocomplete'
        },
        'clipboard':{
            deps:['jquery'],
            exports:'clipboard'
        }
    }
});