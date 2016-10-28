(function(){
	setTimeout(function() {
		window.swiper = new Swiper($('.YX-N-M-9BBD').find('.swiper-container'), {
			paginationClickable: true,
			slidesPerView: 1.3,
			slidesPerView: 4,
			slidesPerGroup: 4,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		});
	},500);
})();