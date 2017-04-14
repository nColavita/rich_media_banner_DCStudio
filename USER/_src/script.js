/* global console, TweenLite, Enabler, studio, Power1, Power4, CSSPlugin */

//++++++++++++++++++++++++++++++++++++++++++
// VARIABLES
//++++++++++++++++++++++++++++++++++++++++++
// var width = 970;
// var height = 418;

var panel_collapsed = document.getElementById("panel_collapsed"),
	panel_expanded = document.getElementById("panel_expanded"),
	closeBtn = document.getElementById("closeBtn"),
	bg_exit = document.getElementById("bg_exit"),
	col_bg1 = document.getElementById("col_bg1"),
	col_swipe1 = document.getElementById("col_swipe1"),
	play_btn = document.getElementById("play_btn"),
	video_container = document.getElementById("video_container");

var container = document.getElementById("container"),
	col_text1_1 = document.getElementById("col_text1_1"),
	terms = document.getElementById("terms"),
	logo_cta = document.getElementById("logo_cta");

var rollover_white = document.getElementById("rollover"),
	brandbar = document.getElementById("brandbar_image"),
	brandbar_hotspot = document.getElementById("brandbar_hotspot"),
	cta_over = document.getElementById("cta_over"),
	cta_shimmer = document.getElementById("cta_shimmer"),
	shimmer_img= document.getElementById("shimmer_img");

var chromeCover = document.getElementById("chromeCover");

var exp_bg1 = document.getElementById("exp_bg1"),
	exp_bg2 = document.getElementById("exp_bg2"),
	exp_bg3 = document.getElementById("exp_bg3"),
	exp_text1_1 = document.getElementById("exp_text1_1"),
	exp_swipe1 = document.getElementById("exp_swipe1"),
	exp_text2_1 = document.getElementById("exp_text2_1"),
	exp_swipe2 = document.getElementById("exp_swipe2"),
	exp_text3_1 = document.getElementById("exp_text3_1"),
	exp_text3_2 = document.getElementById("exp_text3_2"),
	exp_swipe3 = document.getElementById("exp_swipe3"),
	exp_rollover = document.getElementById("exp_rollover"),
	exp_logo_cta = document.getElementById("exp_logo_cta");

//++++++++++++++++++++++++++++++++++++++++++
// IMAGE PRELOAD SET
//++++++++++++++++++++++++++++++++++++++++++

var exp_assets = [
	// COLLAPSE 
	{ id: "col_bg1_img", url: "images/col_bg1.jpg"},
	{ id: "col_text1_1_img", url: "copy/col_text1_1.png"},
	{ id: "col_script1_img", url: "copy/col_script1.png"},
	{ id: "col_btn_img", url: "images/col_logo_cta.png"},

	// EXPANDED
	{ id: "exp_bg1_img", url : "images/exp_bg1.jpg" },
	{ id: "exp_bg2_img", url : "images/exp_bg2.jpg" },
	{ id: "exp_bg3_img", url : "images/exp_bg3.jpg" },
	{ id: "exp_text1_1_img", url : "copy/exp_text1_1.png" },
	{ id: "script1_img", url : "copy/exp_script1.png" },
	{ id: "exp_text2_1_img", url : "copy/exp_text2_1.png" },
	{ id: "script2_img", url : "copy/exp_script2.png" },
	{ id: "exp_text3_1_img", url : "copy/exp_text3_1.png" },
	{ id: "exp_text3_2_img", url : "copy/exp_text3_2.png" },
	{ id: "script3_img", url : "copy/exp_script3.png" },
	{ id: "exp_logo_cta_img", url: "images/exp_logo_cta.png" },

	{ id: "exp_rollover_img", url: "images/rollover.png" },
	{ id: "terms_img", url: "images/terms.png" },
	{ id: "shimmer_img", url: "images/cta_shimmer.png" },
	{ id: "brandbar_img", url: "images/brandbar.png" },
	{ id: "play_btn_img", url: "images/play_btn.png" },
	{ id: "close_btn_img", url: "images/close_btn.png" }

];

// GS 
var tt = TweenLite.to,
	ts = TweenLite.set,
	tf = TweenLite.from,
	td = TweenLite.delayedCall;

var tweenDelay = 0;

var backgroundTweenTime = 10,
	fadeTime = 0.4,
	swipeTime = 1.4,
	copyReadTime = 1.4;

// VIDEO 
var play_btn = document.getElementById("play_btn"),
	videoComp;

var isExpanded = false;
CSSPlugin.defaultTransformPerspective = 200;

//++++++++++++++++++++++++++++++++++++++++++
// VIDEO
//++++++++++++++++++++++++++++++++++++++++++

function playbtn_show(){
	TweenLite.to(play_btn, 0.3, { autoAlpha : 1 });
}

function playbtn_hide(){
	TweenLite.to(play_btn, 0.3, { autoAlpha : 0 });
}

function stopVideo(){
	videoComp.getVideoElement().pause();
	videoComp.getVideoElement().currentTime = 0;
}

function create_video(){
	var video_container = document.getElementById("video_container");
	videoComp = new studio.sdk.rad.Video({
		id: 'Video Player',
		controls: true,
		muted: true,
		sources: ['video/video.mp4']
	});
	videoComp.setElement(video_container);
	videoComp.addEventListener("ended", playbtn_show);
	videoComp.addEventListener("play", playbtn_hide);
	play_btn.addEventListener("click", function(){
		videoComp.getVideoElement().play();
		playbtn_hide();
	});
}

//++++++++++++++++++++++++++++++++++++++++++
// SEQUENCE
//++++++++++++++++++++++++++++++++++++++++++

function fadeInText(elem){
	for (var i = 0; i < elem.length; i++ ){
		ts(elem[i], { autoAlpha: 1 });
		tf(elem[i], 0.4, { autoAlpha: 0, ease: Power1.easeInOut});
		tf(elem[i], 1.0, { rotationX: 90, ease: Power4.easeOut});
	}
}

function resetExpandAnimation(){
	console.log("Resetting");
	ts([brandbar, logo_cta, rollover_white, terms, video_container, play_btn ], { x:0, y:0, autoAlpha: 0, overwrite: "all" });	
	ts(cta_shimmer, { x: - shimmer_img.clientWidth, overwrite: "all" });
	console.log("Reset DONE");
}

var exp_animation = function(){
	tweenDelay = 0;
	
	// FRAME 1
	td(tweenDelay, fadeInText, [[exp_text1_1]]);
	tt(exp_bg1, backgroundTweenTime, { scale: 1.1, x: -10, delay: tweenDelay });

	tweenDelay += 0.3;
	tt(exp_swipe1, swipeTime, { width: "100%", delay: tweenDelay });
	
	tweenDelay += copyReadTime;
	tt([exp_text1_1, exp_swipe1], fadeTime, { autoAlpha: 0, delay: tweenDelay });
	
	tweenDelay += 0.5;
	tt([exp_bg1], fadeTime, { autoAlpha: 0, delay: tweenDelay });

	// FRAME 2
	tweenDelay +=fadeTime;
	td(tweenDelay, fadeInText, [[exp_text2_1]]);
	tt(exp_bg2, backgroundTweenTime, { scale: 1.1, x: -10, delay: tweenDelay });

	tweenDelay += 0.3;
	tt(exp_swipe2, swipeTime, { width: "100%", delay: tweenDelay });
	tweenDelay += copyReadTime;

	tt([exp_text2_1, exp_swipe2], fadeTime, { autoAlpha: 0, delay: tweenDelay });
	tweenDelay += fadeTime;
	tt([exp_bg2], fadeTime, { autoAlpha: 0, delay: tweenDelay });

	// FRAME 2
	tweenDelay +=fadeTime;
	td(tweenDelay, fadeInText, [[exp_text3_1]]);
	tt(exp_bg3, backgroundTweenTime, { scale: 1.1, x: -10, delay: tweenDelay });

	tweenDelay += 0.3;
	tt(exp_swipe3, swipeTime, { width: "100%", delay: tweenDelay });
	
	tweenDelay += 0.3;
	td(tweenDelay, fadeInText, [[ exp_text3_2]]);
	tt(terms, 0.5, { autoAlpha: 1, delay: tweenDelay });
	tt(cta_shimmer, 0.7, { x: cta_shimmer.clientWidth + shimmer_img.clientWidth, delay:tweenDelay } );

	tweenDelay += 0.5;
	tt([exp_text3_1, exp_text3_2, exp_swipe3, exp_logo_cta, cta_over, exp_rollover, brandbar_hotspot], 0.5, { x: 202, delay: tweenDelay });

	tweenDelay += 0.5;
	tt([video_container, play_btn], 1, { autoAlpha : 1, delay: tweenDelay, onComplete:function(){
		videoComp.getVideoElement().currentTime = 0;
		videoComp.getVideoElement().play(); 
		playbtn_hide(); 
	} }); 
};


//++++++++++++++++++++++++++++++++++++++++++
// EVENTS & LISTENERS
//++++++++++++++++++++++++++++++++++++++++++

function expandStartHandler() { 
	resetExpandAnimation();
	ts(panel_expanded, {autoAlpha: 1});
	td(0.4, exp_animation);
	Enabler.finishExpand();
}

function expandFinishHandler() { 
	isExpanded = true; 
}

function collapseStartHandler() {
	ts(panel_expanded, {autoAlpha: 0});
	Enabler.finishCollapse();
}

function collapseFinishHandler() { 
	isExpanded = false; 

	TweenLite.killTweensOf([
		// copy elements
		exp_text1_1, exp_text2_1, exp_text3_1, exp_text3_2, exp_swipe1, exp_swipe2, exp_swipe3,
		// endframe elements
		exp_logo_cta, cta_over, exp_rollover, brandbar_hotspot,
		// video  
		video_container, play_btn
	]);
	TweenLite.killDelayedCallsTo(fadeInText);

	// SET COPY ELEMENTS SCALE, POSITION, WIDTH AND OPACITY
	ts([exp_swipe1, exp_swipe2, exp_swipe3], { width: 0, autoAlpha: 1, overwrite : true });
	ts([exp_text1_1, exp_text2_1, exp_text3_1, exp_text3_2], { autoAlpha: 0, overwrite : true });
	ts([exp_bg1, exp_bg2, exp_bg3], { scale: 1, x: 0, autoAlpha: 1, overwrite : true });
	ts([exp_logo_cta, cta_over, exp_rollover, brandbar_hotspot], { x: 0, overwrite : true });

	// SET MASKING
	ts([exp_swipe1, exp_swipe2, exp_swipe3], { width: 0, overwrite: true });

	stopVideo();
} 

function actionClickHandler() {
	if ( isExpanded ) {
		Enabler.requestCollapse();
	} else {
		Enabler.requestExpand();
	}
}

function bgExitHandler() {
	console.log("Background Exit");
	stopVideo();
	resetExpandAnimation();
	Enabler.exit('Background Exit');
	Enabler.requestCollapse();
}

function close_handler(){
	console.log("close");
	stopVideo();
	resetExpandAnimation();
	Enabler.reportManualClose();
	Enabler.requestCollapse();
}

function show_brandbar() {
	tt(brandbar, 0.5, { autoAlpha: 1 });
}

function hide_brandbar() {
	tt(brandbar, 0.5, { autoAlpha: 0 });
}

function cta_shine() {
	console.log("SHIMMY");
	ts(cta_shimmer, { x: -shimmer_img.clientWidth });
	tt(cta_shimmer, 0.7, { x: cta_shimmer.clientWidth + shimmer_img.clientWidth });
}

function add_listeners() {
	Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandStartHandler);
	Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, expandFinishHandler);
	Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseStartHandler);
	Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, collapseFinishHandler);

	panel_collapsed.addEventListener( 'click', actionClickHandler );
	closeBtn.addEventListener("click", close_handler);
	bg_exit.addEventListener("click", bgExitHandler);
	brandbar_hotspot.addEventListener("mouseover", show_brandbar);
	brandbar_hotspot.addEventListener("mouseout", hide_brandbar);
	container.addEventListener("mouseenter", cta_shine);
}



//++++++++++++++++++++++++++++++++++++++++++
// INITIALIZE
//++++++++++++++++++++++++++++++++++++++++++
function init(){
	console.log("Init");
	tweenDelay = 0;
	ts(panel_expanded, {display: "block",autoAlpha: 0});
	ts(brandbar, { autoAlpha: 0 });

	//ADJUST CENTER POINTS FOR BACKGROUND SCALE ANIMATION AND COPY
	ts([col_text1_1, exp_text1_1, exp_text2_1, exp_text3_1, exp_text3_2], { transformOrigin: "50% 50% 50%" });

	// SET EXPANDED COPY TO ALPHA 0
	ts([exp_text1_1, exp_text2_1, exp_text3_1, exp_text3_2], { autoAlpha: 0 });

	// SET MASKING
	ts([col_swipe1, exp_swipe1, exp_swipe2, exp_swipe3], { width: 0 });

	// FRAME 1
	fadeInText([col_text1_1]);
	tt(col_bg1, backgroundTweenTime, { scale: 1.1, x: -10, delay: tweenDelay });

	tweenDelay += 0.3;
	tt(col_swipe1, swipeTime, { width: "100%", delay: tweenDelay });
	
	tweenDelay += copyReadTime;

	tt(chromeCover, 0.3, { autoAlpha: 0 });
	Enabler.loadModule(studio.module.ModuleId.RAD_VIDEO, function(){ create_video(); } ); // ADD THIS TO INIT
	add_listeners();
	
}

//++++++++++++++++++++++++++++++++++++++++++
// ASSET PRELOADING SCRIPT
//++++++++++++++++++++++++++++++++++++++++++
var images_count = 0;
function imageLoadCheck(){
	images_count += 1;
	if ( images_count === exp_assets.length ){
		console.log('>>>> Preload image done');
		init();
	}
}

(function(){
	console.log('>>>> Preload image start');
	for(var i = 0; i < exp_assets.length; i++ ){
		var define_variable = document.getElementById(exp_assets[i].id);
		define_variable.src = exp_assets[i].url;
		define_variable.onload = imageLoadCheck();
	}
})();

