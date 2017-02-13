define([
	'Vue',
	'text!components/page/getShareTemplate/getShareTemplate.mustache',
	'common/mixins/pageMixins',
	'model/model',
	'common/directive/zeroClipboard',
	'notify'
], function(Vue, tpl, pageMixins, Model) {
	var model = new Model();
	var getShareTemplateVM = Vue.extend({
		name: 'getShareTemplateVM',
		components: {},
		template: tpl,
		mixins: [pageMixins],
		data: function() {
			return {
				showFlag: false,
				hdLinkOrId: '',
				setShareLinkFlag: false,
				shareLink: ''
			};
		},
		computed: {},
		watch: {

		},
		methods: {
			hideModal: function() {
				this.showFlag = false;
			},
			changeShareLink: function() {
				this.setShareLinkFlag = false;
			},
			setShareLink: function() {
				var that = this;
				if (this.hdLinkOrId) {
					var reg = /^\d+$/g,
						regLink = /^(http|https)/g;
					if (reg.test(this.hdLinkOrId)) {
						that.shareLink = 'http://' + window.location.host + window.location.pathname + '?share=' + that.hdLinkOrId;
						that.setShareLinkFlag = true;
					} else if (regLink.test(that.hdLinkOrId)) {
						var activityAlias = that.hdLinkOrId.split('/').pop().split('.').shift();
						model.getHdItemId({
							data: {
								activityAlias: activityAlias
							},
							error: function() {
								cookie.setCookie('backUrl', location.href, 60 * 60);
								location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
							}
						}).done(function(result) {
							if (result.code == 200) {
								if(result.content.activityId){
									that.shareLink = 'http://' + window.location.host + window.location.pathname + '?share=' + result.content.activityId;
									that.setShareLinkFlag = true;
								}else{
									$.notify({
										title: '请输入正确的活动Id或活动的上线链接',
										type: 'error'
									});
								}
							} else {
								$.notify({
									title: result.msg,
									type: 'error'
								});
							}
						});
					} else {
						model.getHdItemId({
							data: {
								activityAlias: that.hdLinkOrId
							},
							error: function() {
								cookie.setCookie('backUrl', location.href, 60 * 60);
								location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
							}
						}).done(function(result) {
							if (result.code == 200) {
								if(result.content.activityId){
									that.shareLink = 'http://' + window.location.host + window.location.pathname + '?share=' + result.content.activityId;
									that.setShareLinkFlag = true;
								}else{
									$.notify({
										title: '请输入正确的活动Id或活动的上线链接',
										type: 'error'
									});
								}
							} else {
								$.notify({
									title: result.msg,
									type: 'error'
								});
							}
						});
					}
				}
			},
			rePaintTemplate: function() {
				var that = this;
				if (this.hdLinkOrId) {
					var reg = /^\d+$/g,
						regLink = /^(http|https)/g;
					if (reg.test(this.hdLinkOrId)) {
						that.shareLink = 'http://' + window.location.host + window.location.pathname + '?share=' + that.hdLinkOrId;
						that.$dispatch('notifyRootToRepaint',that.hdLinkOrId);
						that.showFlag = false;
					} else if (regLink.test(that.hdLinkOrId)) {
						var activityAlias = that.hdLinkOrId.split('/').pop().split('.').shift();
						model.getHdItemId({
							data: {
								activityAlias: activityAlias
							},
							error: function() {
								cookie.setCookie('backUrl', location.href, 60 * 60);
								location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
							}
						}).done(function(result) {
							if (result.code == 200) {
								if(result.content.activityId){
									that.shareLink = 'http://' + window.location.host + window.location.pathname + '?share=' + result.content.activityId;
									that.$dispatch('notifyRootToRepaint',result.content.activityId);
									that.showFlag = false;
								}else{
									$.notify({
										title: '请输入正确的活动Id或活动的上线链接',
										type: 'error'
									});
								}
							} else {
								$.notify({
									title: result.msg,
									type: 'error'
								});
							}
						});
					} else {
						model.getHdItemId({
							data: {
								activityAlias: that.hdLinkOrId
							},
							error: function() {
								cookie.setCookie('backUrl', location.href, 60 * 60);
								location.href = "http://pub.mail.163.com/pscpub/admin/login.do";
							}
						}).done(function(result) {
							if (result.code == 200) {
								if(result.content.activityId){
									that.shareLink = 'http://' + window.location.host + window.location.pathname + '?share=' + result.content.activityId;
									that.$dispatch('notifyRootToRepaint',result.content.activityId);
									that.showFlag = false;
								}else{
									$.notify({
										title: '请输入正确的活动Id或活动的上线链接',
										type: 'error'
									});
								}
							} else {
								$.notify({
									title: result.msg,
									type: 'error'
								});
							}
						});
					}
				}
			}
		},
		events: {
			notifyGetShareTemplate: function() {
				this.showFlag = true;
			}
		}
	});
	return getShareTemplateVM;
});