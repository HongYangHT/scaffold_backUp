define([
    'Vue',
    'text!components/page/shareModal/shareModal.mustache',
    'common/mixins/pageMixins',
    'model/model',
    'common/helper/cookie'
], function(Vue, tpl, pageMixins, Model, cookie) {
	var _model = new Model();
    var shareModalVM = Vue.extend({
        name: 'shareModal',
        components: {},
        props:['info'],
        template: tpl,
        mixins: [pageMixins],
        data: function() {
        	return {
        		shareFlag : false
        	};
        },
        computed:{
        	shareInfo:function(){
 				return this.info;
 			}
        },
        watch:{
        },
        methods: {
        	hideModal: function() {
				this.shareFlag = false;
			},
			uploadImg:function($event){
				var $target = $($event.target),
					_that = this;
				if (!$target.val()) return;
				if (!$target.val().match(/\.(png|jpg|bmp|jpeg)$/i)) {
					// alert("目前只支持png,jpg,jpeg,bmp文件格式的图片文件，请重试");
					$.notify({
						title: '目前只支持png,jpg,jpeg,bmp文件格式的图片文件，请重试',
						type: 'error'
					});
					$target.parents('form').get(0).reset();
					return;
				}

				var _backUrl = cookie.getCookie('backUrl');

				var Filesdata = new FormData($target.parents('form')[0]),
					_isCompress = $target.data('type');

				var file = $target[0].files[0];
				var reader = new FileReader();
				reader.readAsDataURL(file);				
				_model.uploadFiles({
					data: Filesdata,
					compress: _isCompress,
					error:function(){
						/* 由于没有体图片上传不成功的情况下，需要先保存现在的数据 */
						// _that.$dispatch('savePageUpload');
						cookie.setCookie('backUrl',location.href, 60*60);
						location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
					}
				}).done(function(_data) {
					$target.parents('form').get(0).reset();
					if (_data && _data.cdnURL) {
						var upload = [];
						$.each(_data.cdnURL, function(i) {
							var _item = {};
							_item.src = _data.cdnURL[i].remote;
							_item.fileName = _data.cdnURL[i].filename;
							upload.push(_item);
						});
						var src = upload[0].src;
						_that.shareInfo.img.value = src.replace(/^http/g,'https');
						setTimeout(function(){
							$target.closest('.u-psc-input-group').find('.u-preview-upload').remove();
						},50);
						reader.onload = function(e){
							var img = new Image();
								img.src = this.result;
							var cvs = document.getElementById('imgPreView'),
								ctx = cvs.getContext('2d');
								ctx.clearRect(0,0,120,120);
								img.onload = function(){
									ctx.drawImage(img,0,0,120,120);
								}; 
						}
						cookie.setCookie('backUrl','', 60*60);
					}else{
						cookie.setCookie('backUrl',location.href, 60*60);
						window.location.href = decodeURIComponent(_backUrl);
					}
				});
			}
        },
        events: {
        	notifyShareConfigModal:function(){
        		this.shareFlag = true;
        	}
        }
    });
    return shareModalVM;
});
