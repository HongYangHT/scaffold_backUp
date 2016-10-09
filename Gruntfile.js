/**
 *  @version : 1.0.0
 *  @description : manager less and ugligy js with node 
 *                 build project with requirejs
 *  @author : hongyang
 */
module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            //编译less文件
            compileLess: {
                options: {},
                files: [{
                    expand: true,
                    cwd: 'src/assets/less',
                    src: '*.less',
                    dest: 'assets/css',
                    ext: '.css'
                }]
            },
            compileLess2: {
                options: {},
                files: [{
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxhd',
                    src: '*.less',
                    dest: 'assets/components/page/modules/yxhd',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBanner',
                    src: '*.less',
                    dest: 'assets/components/page/modules/yxBanner',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBanner2',
                    src: '*.less',
                    dest: 'assets/components/page/modules/yxBanner2',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBackModule',
                    src: '*.less',
                    dest: 'assets/components/page/modules/yxBackModule',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBackModule2',
                    src: '*.less',
                    dest: 'assets/components/page/modules/yxBackModule2',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxRule',
                    src: '*.less',
                    dest: 'assets/components/page/modules/yxRule',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxTemp',
                    src: '*.less',
                    dest: 'assets/components/page/modules/yxTemp',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxft',
                    src: '*.less',
                    dest: 'assets/components/page/modules/yxft',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            combine: {
                options: {
                    'report': 'min'
                },
                files: {
                    'assets/css/main.<%= grunt.template.today("yyyymmddHHMM") %>.min.css': ['src/assets/css/colorpicker.css', 'src/assets/css/page.css', 'src/assets/css/reset.css', 'src/assets/css/font-awesome.css', 'src/assets/css/pnotify.css']
                }
            },
            combineDev: {
                options: {
                    'report': 'min'
                },
                files: {
                    'assets/css/main.css': ['src/assets/css/colorpicker.css', 'src/assets/css/page.css', 'src/assets/css/reset.css', 'src/assets/css/font-awesome.css']
                }
            },
            minify: {
                options: {
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxhd',
                    src: '*.css',
                    dest: 'assets/components/page/modules/yxhd',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBanner',
                    src: '*.css',
                    dest: 'assets/components/page/modules/yxBanner',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBanner2',
                    src: '*.css',
                    dest: 'assets/components/page/modules/yxBanner2',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxTemp',
                    src: '*.css',
                    dest: 'assets/components/page/modules/yxTemp',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBackModule',
                    src: '*.css',
                    dest: 'assets/components/page/modules/yxBackModule',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBackModule2',
                    src: '*.css',
                    dest: 'assets/components/page/modules/yxBackModule2',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxRule',
                    src: '*.css',
                    dest: 'assets/components/page/modules/yxRule',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxft',
                    src: '*.css',
                    dest: 'assets/components/page/modules/yxft',
                    ext: '.css'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    'sourcemap': 'none',
                    'style': 'compressed'
                },
                files: [{
                    /*expand: true,
                    cwd: 'assets/components/page/modules/yxTemp17',
                    src: '*.scss',
                    dest: 'assets/components/page/modules/yxTemp17',
                    ext: '.css'*/
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    useShortDoctype: true
                },
                files: {
                    'page.html': 'src/page.html',
                    'assets/components/page/root/root.mustache': 'src/assets/components/page/root/root.mustache',
                    'assets/components/page/head/head.mustache': 'src/assets/components/page/head/head.mustache',
                    'assets/components/page/body/body.mustache': 'src/assets/components/page/body/body.mustache',
                    'assets/components/page/foot/foot.mustache': 'src/assets/components/page/foot/foot.mustache',
                    'assets/components/page/content/content.mustache': 'src/assets/components/page/content/content.mustache',
                    'assets/components/page/layout/layout.mustache': 'src/assets/components/page/layout/layout.mustache',
                    'assets/components/page/popLayout/popLayout.mustache': 'src/assets/components/page/popLayout/popLayout.mustache',
                    'assets/components/page/menu/menu.mustache': 'src/assets/components/page/menu/menu.mustache',
                    'assets/components/page/modal/modal.mustache': 'src/assets/components/page/modal/modal.mustache',
                    'assets/components/page/editMenu/editMenu.mustache': 'src/assets/components/page/editMenu/editMenu.mustache',
                    'assets/components/page/modules/yxhd/yxhd.mustache': 'src/assets/components/page/modules/yxhd/yxhd.mustache',
                    'assets/components/page/modules/yxBanner/yxBanner.mustache': 'src/assets/components/page/modules/yxBanner/yxBanner.mustache',
                    'assets/components/page/modules/yxBanner2/yxBanner2.mustache': 'src/assets/components/page/modules/yxBanner2/yxBanner2.mustache',
                    'assets/components/page/modules/yxTemp/yxTemp.mustache': 'src/assets/components/page/modules/yxTemp/yxTemp.mustache',
                    'assets/components/page/modules/yxBackModule/yxBackModule.mustache': 'src/assets/components/page/modules/yxBackModule/yxBackModule.mustache',
                    'assets/components/page/modules/yxBackModule2/yxBackModule2.mustache': 'src/assets/components/page/modules/yxBackModule2/yxBackModule2.mustache',
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/assets/css/fonts',
                src: '**',
                dest: 'assets/css/fonts/',
            }
        },
        requirejs: {
            compilePage: {
                options: {
                    'baseUrl': 'src/assets/',
                    'mainConfigFile': 'src/assets/app/config.js',
                    'paths': {
                        'requirejs': 'libs/require',
                        'underscore': 'libs/underscore',
                        'jquery': 'libs/jquery',
                        'text': 'libs/text',
                        'Vue': 'libs/vue',
                        'mustache': 'libs/mustache',
                        'collapse': 'libs/jquery.collapse',
                        'uuid': 'libs/uuid',
                        'FileSaver': 'libs/FileSaver',
                        'Blob': 'libs/Blob',
                        'colorpicker': 'libs/bootstrap-colorpicker',
                        'pnotify': 'libs/pnotify',
                        'notify': 'libs/notify'
                    },
                    'optimize': 'uglify',
                    'include': ['requirejs', 'underscore', 'jquery', 'text', 'Vue', 'mustache', 'collapse', 'uuid', 'FileSaver',
                        'Blob', 'colorpicker', 'pnotify', 'notify',
                        'components/page',
                        'components/page/root/rootVM',
                        'components/page/head/headVM',
                        'components/page/body/bodyVM',
                        'components/page/foot/footVM',
                        'components/page/content/contentVM',
                        'components/page/layout/layoutVM',
                        'components/page/popLayout/popLayoutVM',
                        'components/page/modal/modalVM',
                        'components/page/menu/menuVM',
                        'components/page/editMenu/editMenuVM',
                        'model/base',
                        'model/model',
                        'common/helper/load',
                        'common/filter/checkType',
                        'common/mixins/pageMixins',
                        'common/directive/setStyle',
                        'common/helper/data2vue',
                        'common/helper/tpl2vue',
                        'common/helper/localStorage',
                        'text!components/page/root/root.mustache',
                        'text!components/page/head/head.mustache',
                        'text!components/page/body/body.mustache',
                        'text!components/page/foot/foot.mustache',
                        'text!components/page/content/content.mustache',
                        'text!components/page/menu/menu.mustache',
                        'text!components/page/editMenu/editMenu.mustache',
                        'text!components/page/layout/layout.mustache',
                        'text!components/page/popLayout/popLayout.mustache',
                        'text!components/page/modal/modal.mustache',
                        'text!components/page/modules/yxhd/yxhd.mustache',
                        'components/page/modules/yxhd/yxhdVM',
                        'text!components/page/modules/yxft/yxft.mustache',
                        'components/page/modules/yxft/yxftVM',
                        'text!components/page/modules/yxBanner/yxBanner.mustache',
                        'components/page/modules/yxBanner/yxBannerVM',
                        'text!components/page/modules/yxBanner2/yxBanner2.mustache',
                        'components/page/modules/yxBanner2/yxBanner2VM',
                        'text!components/page/modules/yxTemp/yxTemp.mustache',
                        'components/page/modules/yxTemp/yxTempVM',
                        'text!components/page/modules/yxBackModule/yxBackModule.mustache',
                        'components/page/modules/yxBackModule/yxBackModuleVM',
                        'text!components/page/modules/yxBackModule2/yxBackModule2.mustache',
                        'components/page/modules/yxBackModule2/yxBackModule2VM',
                        'text!components/page/modules/yxRule/yxRule.mustache',
                        'components/page/modules/yxRule/yxRuleVM'
                    ],
                    'out': 'assets/js/build.<%= grunt.template.today("yyyymmddHHMM") %>.min.js'
                }
            }
        },
        uglify: {
            options: {
                sourcemap: true,
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            uglifyLib: {
                files: {
                    'assets/libs/libs.min.js': [
                        'src/assets/libs/jquery.js',
                        'src/assets/libs/underscore.js',
                        'src/assets/libs/mustache.js',
                        'src/assets/libs/vue.js',
                        'src/assets/libs/text.js',
                        'src/assets/libs/uuid.js',
                        'src/assets/libs/FileSaver.js',
                        'src/assets/libs/Bold.js',
                        'src/assets/libs/bootstrap-colorpicker.js',
                        'src/assets/libs/jquery.collapse.js',
                        'src/assets/libs/pnotify.js',
                        'src/assets/libs/notify.js'
                    ],
                    'assets/libs/require.min.js': ['src/assets/libs/require.js'],
                    'assets/app/page.<%= grunt.template.today("yyyymmddHHMM") %>.min.js': ['src/assets/app/page.js'],
                    'assets/app/config.min.js': ['src/assets/app/config.js']
                }
            },
            uglifyVM: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxhd',
                    src: '*.js',
                    dest: 'assets/components/page/modules/yxhd',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBanner',
                    src: '*.js',
                    dest: 'assets/components/page/modules/yxBanner',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBanner2',
                    src: '*.js',
                    dest: 'assets/components/page/modules/yxBanner2',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxTemp',
                    src: '*.js',
                    dest: 'assets/components/page/modules/yxTemp',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBackModule',
                    src: '*.js',
                    dest: 'assets/components/page/modules/yxBackModule',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxBackModule2',
                    src: '*.js',
                    dest: 'assets/components/page/modules/yxBackModule2',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxft',
                    src: '*.js',
                    dest: 'assets/components/page/modules/yxft',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: 'src/assets/components/page/modules/yxRule',
                    src: '*.js',
                    dest: 'assets/components/page/modules/yxRule',
                    ext: '.js'
                }]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/imgs/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/imgs/'
                }]
            }
        },
        replace: {
            replaceSource: {
                src: ['./page.html'],
                dest: ['./'],
                replacements: [{
                    from: /\<link rel\=\"stylesheet\" type\=\"text\/css\" href\=\"assets\/css\/page.css\"\>/g,
                    to: '<link rel="stylesheet" type="text/css" href="assets/css/main.<%= grunt.template.today("yyyymmddHHMM") %>.min.css">'
                }, {
                    from: /\<link rel\=\"stylesheet\" type\=\"text\/css\" href\=\"assets\/css\/reset.css\"\>/g,
                    to: ''
                }, {
                    from: /\<link rel\=\"stylesheet\" type\=\"text\/css\" href\=\"assets\/css\/colorpicker.css\"\>/g,
                    to: ''
                }, {
                    from: /\<link rel\=\"stylesheet\" type\=\"text\/css\" href\=\"assets\/css\/font-awesome.css\"\>/g,
                    to: ''
                }, {
                    from: /\<link rel\=\"stylesheet\" type\=\"text\/css\" href\=\"assets\/css\/pnotify.css\"\>/g,
                    to: ''
                }, {
                    from: /\<script type\=\"text\/javascript\" src\=\"assets\/libs\/require.js"\>\<\/script\>/g,
                    to: ''
                }, {
                    from: /\<script type\=\"text\/javascript\" src\=\"assets\/libs\/jquery.js"\>\<\/script\>/g,
                    to: ''
                }, {
                    from: /\<script type\=\"text\/javascript\" src\=\"assets\/app\/config.js"\>\<\/script\>/g,
                    to: '<script type="text/javascript" src="assets/js/build.<%= grunt.template.today("yyyymmddHHMM") %>.min.js"></script>'
                }, {
                    from: /\<script type=\"text\/javascript\"\>require\(\[\'assets\/app\/page.js\'\]\)\<\/script\>/g,
                    to: '<script type="text/javascript">require(["assets/app/page.<%= grunt.template.today("yyyymmddHHMM") %>.min.js"])</script>'
                }]
            }
        },
        //监控任务
        watch: {
            less: {
                files: ['src/assets/less/*.less'],
                tasks: ['less']
            },
            sass: {
                files: ['src/assets/components/page/modules/*/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('build', ['htmlmin', 'cssmin', 'copy', 'uglify', 'imagemin', 'replace', 'requirejs']);
    grunt.registerTask('default', ['less', 'cssmin:combineDev', 'sass', 'watch']);
};
