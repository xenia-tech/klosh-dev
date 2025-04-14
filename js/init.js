/*
 * Copyright (c) 2022 Marketify
 * Author: Marketify
 * This file is made for CURRENT TEMPLATE
*/


jQuery(document).ready(function(){
    
    "use strict";
    
    // Ensure dark mode is disabled by default
    jQuery('body').removeClass('dark');
    
    // Initialize all required functions
    grax_tm_imgtosvg();
    grax_tm_contact_form();
    grax_tm_hamburger();
    grax_tm_down();
    grax_tm_data_images();
    
    // Initialize WOW.js for animations
    new WOW().init();
    
    // Initialize home navbar active link tracking
    if(jQuery('.home_navbar').length) {
        initHomeNavbarActiveLinks();
        initHomeNavbarScroll();
        console.log("Home navbar detected and initialized");
    }
});

jQuery(window).on('load', function() {
    // Remove preloader immediately
    jQuery('#preloader').remove();
    
    // Handle cross-page navigation
    handleCrossPageScroll();
});

// -----------------------------------------------------
// ---------------   FUNCTIONS    ----------------------
// -----------------------------------------------------

// -------------------------------------------------
// -------------  RIPPLE  --------------------------
// -------------------------------------------------

function grax_tm_ripple(){
	
	"use strict";
	
	jQuery('#ripple').ripples({
		resolution: 500,
		dropRadius: 20,
		perturbance: 0.04
	});
}

// -----------------------------------------------------
// ---------------------   SWITCHERS    ----------------
// -----------------------------------------------------

function grax_tm_color_switcher(){
	
	"use strict";

	var list	= jQuery('.grax_tm_settings .colors li a');

	list.on('click',function(){
		var element = jQuery(this);
		var elval	= element.attr('class');
		element.closest('.grax_tm_all_wrap').attr('data-color',''+elval+'');
		return false;
	});	
}

function grax_tm_switcher_opener(){
	
	"use strict";
	
	var settings	= jQuery('.grax_tm_settings');
	var button		= settings.find('.link');
	var direction	= settings.find('.direction li a');
	var light		= settings.find('.direction li a.light');
	var dark		= settings.find('.direction li a.dark');

	button.on('click',function(){
		var element = jQuery(this);
		
		if(element.hasClass('opened')){
			element.removeClass('opened');
			element.closest('.grax_tm_settings').removeClass('opened');
		}else{
			element.addClass('opened');
			element.closest('.grax_tm_settings').addClass('opened');
		}
		return false;
	});

	direction.on('click',function(){
		var element = jQuery(this);
		if(!element.hasClass('active')){
			direction.removeClass('active');
			element.addClass('active');
		}
	});

	dark.on('click',function(){
		var el = jQuery(this);
		jQuery('body').addClass('dark');
		jQuery('.grax_tm_partners').addClass('opened');
		el.closest('.grax_tm_settings').addClass('changed');
		return false;
	});

	light.on('click',function(){
		var ele = jQuery(this);
		jQuery('body').removeClass('dark');
		jQuery('.grax_tm_partners').removeClass('opened');
		ele.closest('.grax_tm_settings').removeClass('changed');
		return false;
	});
}

function grax_tm_cursor_switcher(){

	"use strict";
	
	var wrapper		= jQuery('.grax_tm_all_wrap');
	var button		= jQuery('.grax_tm_settings .cursor li a');
	var show		= jQuery('.grax_tm_settings .cursor li a.show');
	var hide		= jQuery('.grax_tm_settings .cursor li a.hide');

	button.on('click',function(){
		var element = jQuery(this);
		if(!element.hasClass('showme')){
			button.removeClass('showme');
			element.addClass('showme');
		}
		return false;
	});
	show.on('click',function(){
		wrapper.attr('data-magic-cursor','');
	});
	hide.on('click',function(){
		wrapper.attr('data-magic-cursor','hide');
	});
}

// -------------------------------------------------
// -------------  VIDEO PLAYER ---------------------
// -------------------------------------------------

function grax_tm_videoplayer(){
	"use strict";
	$(".youtube-bg").mb_YTPlayer();
}

// -----------------------------------------------------
// ---------------   MY WAYPOINT    --------------------
// -----------------------------------------------------

function grax_tm_my_waypoint(){
	
	"use strict";
	
	var myWaypoint		= jQuery('.my_waypoint');
	
	myWaypoint.each(function(){
		
		var element	= jQuery(this);
		
		element.waypoint({
			handler:function(){
				element.addClass('load');
			},
			offset:"80%"
		});
	});
}

// -----------------------------------------------------
// -----------------   HERO TITLE    -------------------
// -----------------------------------------------------

function grax_tm_hero_title(){
	
	"use strict";
	
	var heroText 		= jQuery('.fn_animation');
	
	heroText.each(function(){
		var element 	= $(this);
		var	start	 	= '<span class="word">';
		var	char	 	= '<span class="character">';
		var end			= '</span>';
		var space 		= '&nbsp;';
		var allHTML 	= '';
		$.each(element.text().split(' '), function(i,e){
			if(i !== 0){
				allHTML += char + space + end;
			}
			allHTML += start;
			$.each(e.split(''), function (ii, ee) {
				allHTML += char + ee + end;
			});
			allHTML += end;
		});
		element.html(allHTML).addClass('ready');
	 });
}

function grax_tm_hero_title_fade(){
	"use strict";
	
	var mySpan	= jQuery('.fn_animation .character');
	var a 		= 0;
	var speed 	= 30;
	var wait	= 500;
	mySpan.each(function(i){
		var element = jQuery(this);
		setTimeout(function(){element.addClass('opened');},i*speed);
		a		= i*speed;
	});
	setTimeout(function(){
		jQuery('.grax_tm_topbar').addClass('opened');
		jQuery('.grax_tm_down').addClass('opened');
	},a+wait);
}

// -----------------------------------------------------
// -----------------   MY LOAD    ----------------------
// -----------------------------------------------------

// -----------------------------------------------------
// ------------------   WAVIFY   -----------------------
// -----------------------------------------------------

function grax_tm_wavefy(){
	"use strict";
		
	jQuery('#wave_img').wavify({
		height: 10,
		bones: 3,
		amplitude: 45,
		color: $('#wave_img').data('color'),
		speed: 0.25
	});
}

// -----------------------------------------------------
// ---------------   PRELOADER   -----------------------
// -----------------------------------------------------

function grax_tm_preloader(){
    "use strict";
    
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    var preloader = jQuery('#preloader');
    
    if (preloader.length > 0) {
        if (!isMobile) {
            setTimeout(function() {
                preloader.addClass('preloaded');
            }, 800);
            setTimeout(function() {
                preloader.fadeOut(500, function() {
                    jQuery(this).remove();
                });
            }, 2000);
        } else {
            preloader.remove();
        }
    }
}

// -----------------------------------------------------
// --------------   TOPBAR BACKGROUND    ---------------
// -----------------------------------------------------

function grax_tm_nav_bg(){
	
	"use strict";

	jQuery(window).on('scroll',function(){
		var progress	 	= jQuery('.progressbar');
		var topbar	 		= jQuery('.grax_tm_topbar');
		var homeNavbar      = jQuery('.home_navbar');
		var WinOffset		= jQuery(window).scrollTop();

		if(WinOffset >= 100){
			topbar.addClass('animate');
			progress.addClass('animate');
			
			// Regular handling for non-home navbars
			if(!homeNavbar.length) {
			    // Only apply animate class to non-home navbars
			    topbar.addClass('animate');
			}
		}else{
			topbar.removeClass('animate');
			progress.removeClass('animate');
		}
		
		// Special handling for home page navbar
		if(homeNavbar.length) {
		    // Get hero section
		    var heroSection = jQuery('#home');
		    
		    if(heroSection.length) {
		        // Calculate when hero section bottom reaches navbar bottom
		        var heroBottom = heroSection.offset().top + heroSection.outerHeight();
		        var navbarHeight = homeNavbar.outerHeight();
		        var scrollThreshold = heroBottom - navbarHeight - 100; // Start transition earlier
		        
		        // Apply scrolled class based on hero section position
		        if(WinOffset > 50) { // Start transition after scrolling 50px
		            homeNavbar.addClass('scrolled');
		        } else {
		            homeNavbar.removeClass('scrolled');
		        }
		    }
		}
	});
}

// -------------------------------------------------
// -----------  ANCHOR NAVIGATION ------------------
// -------------------------------------------------

// -----------------------------------------------------
// -----------------    DOWN    ------------------------
// -----------------------------------------------------

function grax_tm_down(){
	
	"use strict";
	
	jQuery('.grax_tm_talk .button a').on('click',function(){
		if($.attr(this, 'href') !== '#'){
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top-70
			}, 1000);
		}
		return false;
	});
}

// -----------------------------------------------------
// ---------------   MOBILE MENU    --------------------
// -----------------------------------------------------

function grax_tm_hamburger(){
		
	"use strict";
		
	var hamburger 		= jQuery('.hamburger');
	var mobileMenu		= jQuery('.grax_tm_mobile_menu .dropdown');
	
	hamburger.on('click',function(){
		var element = jQuery(this);
		
		if(element.hasClass('is-active')){
			element.removeClass('is-active');
			mobileMenu.slideUp();
		}else{
			element.addClass('is-active');
			mobileMenu.slideDown();
		}
		return false;
	});
	
	jQuery('.grax_tm_mobile_menu .dropdown .dropdown_inner ul li a').on('click',function(){
		jQuery('.hamburger').removeClass('is-active');
		jQuery('.grax_tm_mobile_menu .dropdown').slideUp();
		return false;
	});
	
	// Add scroll effect to mobile menu - ONLY for home page
	jQuery(window).on('scroll', function() {
		// Only apply this effect on the home page
		if(!jQuery('body').hasClass('home')) {
			return;
		}
		
		var mobileNavbar = jQuery('.grax_tm_mobile_menu');
		var WinOffset = jQuery(window).scrollTop();
		
		// Get the hero section
		var hero = jQuery('.grax_tm_hero');
		var heroHeight = hero.outerHeight();
		
		// Calculate a more gradual percentage
		// We want it to be fully dark by 2/3 through the hero section
		var transitionPoint = heroHeight * 0.67; // Transition completes at 2/3 of hero height
		var scrollPercentage = Math.max(0, Math.min(WinOffset / transitionPoint, 1));
		
		// Apply the background with calculated opacity and !important flag
		if(scrollPercentage > 0) {
			mobileNavbar.addClass('scrolled dynamic-bg');
			// Set the inline style directly with !important to override any CSS
			mobileNavbar[0].style.setProperty('background-color', 'rgba(0, 0, 0, ' + scrollPercentage * 0.9 + ')', 'important');
			// Ensure no box shadow
			mobileNavbar[0].style.setProperty('box-shadow', 'none', 'important');
		} else {
			mobileNavbar.removeClass('scrolled dynamic-bg');
			mobileNavbar[0].style.setProperty('background-color', 'transparent', 'important');
			mobileNavbar[0].style.setProperty('box-shadow', 'none', 'important');
		}
	});
}

// -----------------------------------------------------
// ------------------   CURSOR    ----------------------
// -----------------------------------------------------

function grax_tm_cursor(){
    "use strict";
	
	var myCursor	= jQuery('.mouse-cursor');
	
	if(myCursor.length){
		if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
        let n, i = 0,
            o = !1;
        window.onmousemove = function (s) {
            o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
        }, $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
        }), $("body").on("mouseleave", "a, .cursor-pointer", function () {
            $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
        }), e.style.visibility = "visible", t.style.visibility = "visible"
    }
	}
};

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function grax_tm_imgtosvg(){
	
	"use strict";
	
	jQuery('img.svg').each(function(){
		
		var jQueryimg 		= jQuery(this);
		var imgClass		= jQueryimg.attr('class');
		var imgURL			= jQueryimg.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var jQuerysvg = jQuery(data).find('svg');

			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

			// Replace image with new SVG
			jQueryimg.replaceWith(jQuerysvg);

		}, 'xml');

	});
}

// -----------------------------------------------------
// --------------------   POPUP    ---------------------
// -----------------------------------------------------

function grax_tm_popup(){
	
	"use strict";

	jQuery('.gallery_zoom').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a.zoom', // the selector for gallery item
			type: 'image',
			gallery: {
			  enabled:true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});

	});
	jQuery('.popup-youtube').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});
}

// -----------------------------------------------------
// --------------------    WOW JS    -------------------
// -----------------------------------------------------

if (typeof WOW !== 'undefined') {
    var wow = new WOW({
        animateClass: 'animated',
        offset: 10
    });
    wow.init();
}

// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function grax_tm_data_images(){
	
	"use strict";
	
	var data = jQuery('*[data-img-url]');
	
	data.each(function(){
		var element = jQuery(this);
		var url = element.data('img-url');
		element.css({
			backgroundImage: 'url('+url+')'
		});
	});
}

// -----------------------------------------------------
// ----------------    CONTACT FORM    -----------------
// -----------------------------------------------------

function grax_tm_contact_form(){
	
	"use strict";
	
	jQuery(".contact_form #send_message").on('click', function(){
		
		var name 		= jQuery(".contact_form #name").val();
		var email 		= jQuery(".contact_form #email").val();
		var message 	= jQuery(".contact_form #message").val();
		var subject 	= jQuery(".contact_form #subject").val();
		var success     = jQuery(".contact_form .returnmessage").data('success');
	
		jQuery(".contact_form .returnmessage").empty().removeClass('show'); //To empty previous error/success message.
		
		// Simple email validation
		function isValidEmail(email) {
			var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return pattern.test(email);
		}
		
		//checking for blank fields	
		if(name===''||email===''||message===''){
			jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
		}
		else if(!isValidEmail(email)) {
			jQuery(".contact_form .returnmessage").append("<span class='contact_error'>* Please enter a valid email address *</span>").addClass('show');
			jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
		}
		else{
			// Show loading indicator
			jQuery("#send_message").text("Sending...");
			jQuery("#send_message").css("opacity", "0.5");
			
			// Send data to the server
			jQuery.ajax({
				url: "https://5qaynwq3ga.execute-api.ap-southeast-2.amazonaws.com/",
				type: "POST",
				data: {
					ajax_name: name,
					ajax_email: email,
					ajax_message: message,
					ajax_subject: subject
				},
				dataType: "json",
				success: function(response) {
					// Reset button
					jQuery("#send_message").text("Send Message");
					jQuery("#send_message").css("opacity", "1");
					
					if (response.success) {
						// Success message
						jQuery(".contact_form .returnmessage").append("<span class='contact_success'>" + response.message + "</span>").addClass('show');
						jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
						
						// Reset form
						jQuery("#contact_form")[0].reset();
					} else {
						// Error message
						jQuery(".contact_form .returnmessage").append("<span class='contact_error'>" + response.message + "</span>").addClass('show');
						jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
					}
				},
				error: function(xhr, status, error) {
					// Handle AJAX failure
					jQuery("#send_message").text("Send Message");
					jQuery("#send_message").css("opacity", "1");
					jQuery(".contact_form .returnmessage").append("<span class='contact_error'>* Server error: Could not send message *</span>").addClass('show');
					jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
					console.error("AJAX Error:", status, error);
				}
			});
		}
		return false; 
	});
}

// -----------------------------------------------------
// -------------    PARALLAX ANIMATION    --------------
// -----------------------------------------------------

function grax_tm_parallax_effect(){

	"use strict";

	if ($('.parallax').length > 0) { 
	  var scene = $('.parallax').get(0);
	  var parallax = new Parallax(scene, { 
		relativeInput: true,
		onReady: function() { console.log('ready!');
	  } });
	}
}

// -------------------------------------------------
// -------------  PROGRESS BAR  --------------------
// -------------------------------------------------

function tdProgress(container){
	
	"use strict";
		
	container.find('.progress_inner').each(function() {
		var progress 		= jQuery(this);
		var pValue 			= parseInt(progress.data('value'), 10);
		var pColor			= progress.data('color');
		var pBarWrap 		= progress.find('.bar');
		var pBar 			= progress.find('.bar_in');
		pBar.css({width:pValue+'%', backgroundColor:pColor});
		setTimeout(function(){pBarWrap.addClass('open');});
	});
}

jQuery('.kioto_progress').each(function() {

	"use strict";

	var pWrap 			= jQuery(this);
	pWrap.waypoint({handler: function(){tdProgress(pWrap);},offset:'90%'});	
});

// -------------------------------------------------
// -------------  GLITCH  --------------------------
// -------------------------------------------------

$(".glitch").mgGlitch({
	destroy: false,
	glitch: true,
	scale: true,
	blend: true,
	blendModeType: "hue",
	glitch1TimeMin: 200,
	glitch1TimeMax: 400,
	glitch2TimeMin: 10,
	glitch2TimeMax: 100
});

function grax_tm_progress_line(){
	
	"use strict";
	
	var line			= jQuery('.progressbar .line');
	var documentHeight 	= jQuery(document).height();
	var windowHeight 	= jQuery(window).height();
	var winScroll 		= jQuery(window).scrollTop();
	var value 			= (winScroll/(documentHeight-windowHeight))*100;
	var position 		= value;

	line.css('height',position+"%");
}

/****************************/ 
/********** TOTOP ***********/ 
/****************************/ 

function grax_tm_totop(){
  
  "use strict";
  
	jQuery(".progressbar a").on('click', function(e) {
		e.preventDefault();    
		jQuery("html, body").animate({ scrollTop: 0 }, 'slow');
		return false;
	});
}

// Handle smooth scrolling for cross-page navigation
function handleCrossPageScroll() {
    // Check for scrollTarget in sessionStorage first (for cross-page navigation)
    if(sessionStorage.getItem('scrollTarget')) {
        var hash = sessionStorage.getItem('scrollTarget');
        sessionStorage.removeItem('scrollTarget'); // Clear after use
        var $target = jQuery(hash);
        if($target.length) {
            // Get header height for consistent offset
            var headerHeight = jQuery('.grax_tm_topbar').outerHeight();
            // Use the standardized offset (headerHeight - 40px)
            var scrollOffset = headerHeight - 40;
            
            // Small delay to ensure page is fully loaded
            setTimeout(function() {
                // Remove animations if they exist
                $target.find('.wow').removeClass('wow fadeInLeft fadeInRight').addClass('animated');
                
                // Scroll to target with proper offset
                jQuery('html, body').animate({
                    scrollTop: $target.offset().top - scrollOffset
                }, 800);
            }, 300);
        }
    }
    
    // Also check for direct hash in URL (for http://localhost:8000/index.html#section)
    var urlHash = window.location.hash;
    if(urlHash && urlHash !== '#') {
        var $hashTarget = jQuery(urlHash);
        if($hashTarget.length) {
            // Get header height for consistent offset
            var headerHeight = jQuery('.grax_tm_topbar').outerHeight();
            // Use the standardized offset (headerHeight - 40px)
            var scrollOffset = headerHeight - 40;
            
            // Small delay to ensure page is fully loaded
            setTimeout(function() {
                // Remove animations if they exist
                $hashTarget.find('.wow').removeClass('wow fadeInLeft fadeInRight').addClass('animated');
                
                // Scroll to target with proper offset
                jQuery('html, body').animate({
                    scrollTop: $hashTarget.offset().top - scrollOffset
                }, 800);
            }, 300);
        }
    }
}

// Initialize home navbar active link tracking
function initHomeNavbarActiveLinks() {
    // Only run on the home page
    if (!jQuery('.home_navbar').length) return;
    
    // Get all sections that correspond to navbar links
    var sections = [];
    jQuery('.home_navbar .anchor_nav a').each(function() {
        var target = jQuery(this).attr('href');
        // Only process hash links (not external links)
        if (target && target.indexOf('#') === 0) {
            var section = jQuery(target);
            if (section.length) {
                sections.push(section);
            }
        }
    });
    
    // Function to update active link based on scroll position
    function updateActiveLink() {
        var scrollPosition = jQuery(window).scrollTop();
        var headerHeight = jQuery('.grax_tm_topbar').outerHeight();
        var offset = headerHeight + 100; // Add some buffer
        
        // Find the current section
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionTop = section.offset().top - offset;
            var sectionBottom = sectionTop + section.outerHeight();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                var sectionId = '#' + section.attr('id');
                
                // Remove current class from all links
                jQuery('.home_navbar .anchor_nav a').removeClass('current');
                
                // Add current class to corresponding link
                jQuery('.home_navbar .anchor_nav a[href="' + sectionId + '"]').addClass('current');
                break;
            }
        }
    }
    
    // Update active link on scroll
    jQuery(window).on('scroll', updateActiveLink);
    
    // Initialize active link on page load
    updateActiveLink();
}

// Add a separate function for home navbar scroll effect
function initHomeNavbarScroll() {
    if (jQuery('.home_navbar').length) {
        console.log("Home navbar scroll effect initialized");
        
        // Apply scroll handler directly
        jQuery(window).scroll(function() {
            var scrollTop = jQuery(window).scrollTop();
            var homeNavbar = jQuery('.home_navbar');
            
            // Apply scrolled class after scrolling 50px
            if (scrollTop > 50) {
                homeNavbar.addClass('scrolled');
            } else {
                homeNavbar.removeClass('scrolled');
            }
        });
        
        // Trigger scroll event on page load to set initial state
        jQuery(window).trigger('scroll');
    }
}