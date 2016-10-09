define([
	'Vue',
	'mustache',
	'text!components/page/modules/yxRule/yxRule.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/directive/setAttr',
	'uuid'
], function(Vue, mustache, tpl, pageMixins, Tpl2Vue, Data2Vue) {
	var _default = {
		tips: '*该价格为质量相仿的同类产品的市场参考价',
		titleBg: 'http://mimg.127.net/hz/uploader/20160930/14752001057580217.png',
		rule_1: '1、活动时间：2016年10月16日-10月18日',
		rule_2: '2、活动期间每天10点/16点/22点，会放出5000张按压式真空储物罐白盖0.5L免单券。每个用户可领取一张免单券，购买按压式真空储物白盖0.5L只需0元（邮费需您自理），网易严选全场88元免邮，您可凑满88元就免邮。每个用户指每个帐号、每个手机号、每个收件人及地址都默认为同一帐号。',
		rule_3: '3、优惠券使用规则为：（1）单笔订单只能使用1张优惠券，不能同时使用多张优惠券；免单券不可与其他优惠券共用（2）请在有效期内使用优惠券，未使用的优惠券过期后，将自动作废；（3）优惠券严禁出售或转让，如经发现并证实的，该券将予以作废处理；（5）使用优惠券支付的订单，若产生退货，优惠券均不退回，退款金额按优惠后的小计金额退款；（6）网易严选邮费是10元，全场满88元包邮。',
		rule_4: '4、本次活动的所有数据统计均以网易严选活动组织方的统计为准，如被发现有违规行为（如恶意刷订单再退单等违反活动公平性的问题），严选活动组织方将取消您本次活动资格，并取消您的奖励资格。'
	};

	var YxRule = Vue.extend({
		name: 'yxRule',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		data: function(options) {
			// 这里必须每次进来算一遍
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		mixins: [pageMixins],
		watch: {
			'tips.value': {
				'handler': function(value, old) {
					var data = {
						'tips': {
							'key': this.tips.key,
							'name': this.tips.name,
							'type': this.tips.type,
							'value': old,
							'input': this.tips.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'titleBg.value': function(value, old) {
				var data = {
					'titleBg': {
						'key': this.titleBg.key,
						'name': this.titleBg.name,
						'type': this.titleBg.type,
						'value': old,
						'input': this.titleBg.input
					}
				};
				this.$dispatch('changeDataDefault', this.id, data);
			},
			'rule_1.value': function(value, old) {
				var data = {
					'rule_1': {
						'key': this.rule_1.key,
						'name': this.rule_1.name,
						'type': this.rule_1.type,
						'value': old,
						'input': this.rule_1.input
					}
				};
				this.$dispatch('changeDataDefault', this.id, data);
			},
			'rule_2.value': function(value, old) {
				var data = {
					'rule_2': {
						'key': this.rule_2.key,
						'name': this.rule_2.name,
						'type': this.rule_2.type,
						'value': old,
						'input': this.rule_2.input
					}
				};
				this.$dispatch('changeDataDefault', this.id, data);
			},
			'rule_3.value': function(value, old) {
				var data = {
					'rule_3': {
						'key': this.rule_3.key,
						'name': this.rule_3.name,
						'type': this.rule_3.type,
						'value': old,
						'input': this.rule_3.input
					}
				};
				this.$dispatch('changeDataDefault', this.id, data);
			},
			'rule_4.value': function(value, old) {
				var data = {
					'rule_4': {
						'key': this.rule_4.key,
						'name': this.rule_4.name,
						'type': this.rule_4.type,
						'value': old,
						'input': this.rule_4.input
					}
				};
				this.$dispatch('changeDataDefault', this.id, data);
			}
		},
		computed: {
			oparate: function() {
				var _oparate = '';
				_oparate = this.id;
				return _oparate;
			}
		},
		methods: {

		},
		events: {

		}
	});

	return YxRule;
});