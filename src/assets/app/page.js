require(['components/page', 'collapse','notify'], function(Model) {
	$('.J_collapse').collapse({
		accordion: true,
		query: '.u-h .u-t',
		open: function() {
	        this.slideDown(150);
	        this.find('.u-flex-img:not(.J_fixImg)').each(function(i,n){
	        	var $n = $(n),
	        		src = $n.find('img').data('src');
	        	$n.addClass('J_fixImg');	
	        	$n.find('img').attr('src',src);	
	        });
	        this.siblings('.u-t').find('i').removeClass('fa-chevron-down');
	        this.siblings('.u-t').find('i').addClass('fa-chevron-up');
	    },
	    close: function() {
	        this.slideUp(150);
	        this.siblings('.u-t').find('i').addClass('fa-chevron-down');
	        this.siblings('.u-t').find('i').removeClass('fa-chevron-up');
	    }
	});
	$(document).on('scroll',function(e){
		var _top = $(document).scrollTop();
		if(_top > 5){
			$('.u-showMenu').addClass('u-scroll');
		}else{
			$('.u-showMenu').removeClass('u-scroll');
		}
	});
	window.tplData = [];
	window.pageData = [];
	var img = new Image();
		img.src = 'assets/imgs/needUpload.png';
	var cvs = document.getElementById('imgPreView'),
		ctx = '';
		cvs && (ctx = cvs.getContext('2d'));
		img.onload = function(){
			ctx && (ctx.drawImage(img,0,0,120,120));
		};
	// window.saveData = [];
	// console.log(m2v.write.render('{{#logo}}<a class="u-logo" href="{{href}}" data-order="{{order}}" target="_blank" style="background:{{background}};font-size:{{fontSize}}"><img src="{{src}}" data-order="{{order}}"/>{{img}}</a>{{/logo}}',{logo:[{href:'aaa',order:1,src:'bbb',img:'1',background:'#fff',fontSize:'12px'}]}));
	// var tpl = new tpl2vue('{{#logo}}<a class="u-logo" href="{{href}}" data-order="{{order}}" target="_blank" style="background:{{background}};font-size:{{fontSize}}"><img src="{{src}}" data-order="{{order}}"/>{{img}}</a>{{/logo}}<div class="u-part">{{>part}}</div><div >{{>part2}}</div>{{#oLogo}}<div>{{oItem}}</div>{{/oLogo}}<div class="">{{kkk}}</div>',
	// 		{logo:[{href:'aaa',order:1,src:'bbb',img:'1',background:'#fff',fontSize:'12px'}],oLogo:{oItem:'item'}},
	// 		{part:"<span>part</span>",part2:"<span>part</span>"});
	// console.log(tpl.result());
});