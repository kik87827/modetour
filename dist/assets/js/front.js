window.addEventListener("load", () => {
})
$(window).on("load",function(){
	commonResize();
});

document.addEventListener("DOMContentLoaded", function () {
	commonInit();
	tapeFunc();
	rankFunc();
	mbTotal();
});




function commonResize(){
	var $window_width = 0;
	$(window).on("resize",function(){
		if($window_width == $(window).width()){
			return;
		}
	}).resize();
}

function commonInit() {
	let touchstart = "ontouchstart" in window;
	let userAgent = navigator.userAgent.toLowerCase();

	if (touchstart) {
		browserAdd("touchmode");
	}
	if (userAgent.indexOf('samsung') > -1) {
		browserAdd("samsung");
	}

	if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
		browserAdd("window");
	}

	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
		// iPad or iPhone
		browserAdd("ios");
	}


	function browserAdd(opt) {
		document.querySelector("html").classList.add(opt);
	}
}

function tapeFunc(){
	let tape_container_slide = document.querySelectorAll(".tape_banner_container .swiper-slide");
	let tape_swiper_obj = null;
	const btn_tape_close = document.querySelector(".btn_tape_close");
	const header_tape_wrap = document.querySelector(".header_tape_wrap");
	if(!!btn_tape_close){
		btn_tape_close.addEventListener("click",(e)=>{
			e.preventDefault();
			header_tape_wrap.classList.remove("active");
		});
	}
	if(tape_swiper_obj !== null){
		tape_swiper_obj.update();
	}else{
		if(tape_container_slide.length>1){
			tape_swiper_obj = new Swiper(".tape_banner_container", {
				loop: true,
				//effect : 'fade',
				pagination: {
					el: '.tape_fraction_wrap',
					type: 'fraction',
					formatFractionCurrent: function (number) {
						return '0' + number;
					},
					formatFractionTotal: function (number) {
						return ('0' + number).slice(-2);
					},
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' +
							   '<span class="fraction_part">/</span>' +
							   '<span class="' + totalClass + '"></span>';
					}
				},
				navigation: {
					nextEl: '.btn_tape_navi.next',
					prevEl: '.btn_tape_navi.prev'
				},
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				},
			});
		}
	}
}


function rankFunc(){
	let rank_container_slide = document.querySelectorAll(".rank-container .swiper-slide");
	let rank_swiper_obj = null;
	if(rank_swiper_obj !== null){
		rank_swiper_obj.update();
	}else{
		if(rank_container_slide.length>1){
			rank_swiper_obj = new Swiper(".rank-container", {
				loop: true,
				direction: "vertical",
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				},
			});
		}
	}
}


// mobile total
function mbTotal(){
	let touchstart = "ontouchstart" in window;
	var btn_htotal = document.querySelector(".btn_mb_util.ico_total"),
		mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
		mainmenu_dim = document.querySelector(".mainmenu_dim"),
		mbmenu_toggle_one = document.querySelectorAll(".mbmenu_toggle_one"),
		mbmenu_two = document.querySelectorAll(".mbmenu_two"),
		btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
		domHtml = document.querySelector("html"),
		domBody = document.querySelector("body");
	
	const mbmenu_one = document.querySelectorAll(".mbmenu_one");


	// init 
	if(mobile_mainmenu_zone === null){return;}
	btn_htotal.addEventListener("click",function(e){
		e.preventDefault();
		totalOpen();
	},false);
	btn_mbmenuclose.addEventListener("click",function(e){
		e.preventDefault();
		totalClose();
	},false);
	mbmenu_toggle_one.forEach((element)=>{
		element.addEventListener("click",function(e){
			e.preventDefault();
			let thisEventObj = e.currentTarget;
			let thisNextObj = thisEventObj.nextElementSibling;
			thisEventObj.classList.toggle("active");
			thisNextObj.classList.toggle("active");
		},false);
	});
	mbmenu_two.forEach((element)=>{
		element.addEventListener("click",function(e){
			e.preventDefault();
			let thisEventObj = e.currentTarget;
			let thisNextObj = thisEventObj.nextElementSibling;
			thisEventObj.classList.toggle("active");
			thisNextObj.classList.toggle("active");
		},false);
	});
	mainmenu_dim.addEventListener("click",function(e){
		e.preventDefault();
		totalClose();
	},false);
	function totalOpen(){
		mobile_mainmenu_zone.classList.add("active")
		setTimeout(function(){
			mobile_mainmenu_zone.classList.add("motion");
			if(touchstart){
				// domBody.setAttribute("data-scr", window.pageYOffset);
				// domBody.style.marginTop = -window.pageYOffset + "px";
				domHtml.classList.add("touch_disabled");
			}
		},30);
	}
	function totalClose(){
		mobile_mainmenu_zone.classList.remove("motion");
		setTimeout(function(){
			mobile_mainmenu_zone.classList.remove("active");
			domHtml.classList.remove("touch_disabled");
		},500);
	}

	mbmenu_one.forEach((item)=>{
		const thisItem = item;
		const thisItemTwoWrap = thisItem.nextElementSibling;
		if(!!thisItemTwoWrap){
			thisItem.classList.add("has_two");
			thisItem.addEventListener("click",(e)=>{
				e.preventDefault();
				thisItem.classList.toggle("active");
				thisItemTwoWrap.classList.toggle("active");
			});
		}
	})
}
