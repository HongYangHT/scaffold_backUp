define([
	'Vue',
	'text!components/page/shareInfo/shareInfo.mustache',
	'common/mixins/pageMixins'
], function(Vue, tpl, pageMixins){
	var ShareInfoVM = Vue.extend({
		name:'ShareInfo',
		components: {},
		props:['info'],
		template: tpl,
		mixins: [pageMixins],
		data:function(){
			return {

			};
		},
		computed:{
 			shareInfo:function(){
 				return this.info;
 			}	
        },
		methods:{

		},
		events:{
			setShareInfo:function(shareInfo){
				this.shareInfo = shareInfo;
			}
		}
	});
	return ShareInfoVM;
});