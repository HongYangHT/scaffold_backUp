define(['jquery', 'model/base'], function($, BaseModel) {
	var Model = function() {

	};
	var _baseURL = 'http://' + 'pub.mail.163.com' + '/pscpub/';

	Model.prototype = new BaseModel();
	Model.prototype.constructor = Model;

	$.extend(Model.prototype, {
		getComponentData: function(options) {
			return this.get(options);
		},
		// 上传图片
		uploadFiles: function(options) {
			options = options || {};
			options.contentType = false;
			options.processData = false;
			if (options.compress == 'nos') {
				options.url = 'http://pub.mail.163.com/uploader/ajax/uploadBinary2Nos.m';
			} else {
				// options.url = !!options.compress ? _baseURL + 'nodejs/uploadImg.do' : 'http://pub.mail.163.com/uploader/ajax/uploadBinary.m';
				options.url = !!options.compress ? 'http://pub.mail.163.com/uploader/ajax/uploadBinary.m':  _baseURL + 'nodejs/uploadImg.do';
			}
			return this.post(options);
		},
		// 获取活动信息
		getActInfo:function(options){
			options = options || {};
			options.url = _baseURL + 'act/info.m';
			return this.fetch(options);
		},
		// 保存活动，进行持久化处理
		saveAndAddAct:function(options){
			options = options || {};
			// options.url = _baseURL + 'act/add.m';
			options.url = 'http://pub.mail.163.com/pscpub/nodejs/add.do';
			return this.post(options);
		},
		// 发布到测试机进行预览
		previewOrPublishPub:function(options){
			options = options || {};
			// options.url = _baseURL + 'act/pub.m';
			options.url = 'http://pub.mail.163.com/pscpub/nodejs/pub.do';
			return this.post(options);
		},
		getHdItemId : function(options){
			options = options || {};
			options.url = 'http://activity.mail.163.com/hdapi/commonapi/ajax/getActivityId.do';
			return this.fetch(options);
		}
	});

	return Model;
});