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
		}
	});

	return Model;
});