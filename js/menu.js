jQuery(document).ready(function(){
    "use strict";
    
    // Initialize WOW.js
    new WOW().init();
    
    // Mobile Menu Toggle
    jQuery('.grax_tm_mobile_menu .trigger').on('click', function() {
        var dropdown = jQuery('.grax_tm_mobile_menu .dropdown');
        var trigger = jQuery('.grax_tm_mobile_menu .hamburger');
        
        if(dropdown.is(':visible')) {
            dropdown.slideUp();
            trigger.removeClass('is-active');
        } else {
            dropdown.slideDown();
            trigger.addClass('is-active');
        }
    });
    
    // Close mobile menu when clicking a link
    jQuery('.grax_tm_mobile_menu .dropdown_inner ul li a').on('click', function() {
        jQuery('.grax_tm_mobile_menu .dropdown').slideUp();
        jQuery('.grax_tm_mobile_menu .hamburger').removeClass('is-active');
    });
    
    // Handle all navigation links with consistent behavior
    jQuery('.anchor_nav a').on('click', function(e) {
        var href = this.getAttribute('href');
        
        // Check if the link contains a hash and is not just a hash
        if(href.indexOf('#') !== -1 && href !== '#') {
            // Split the href into the page and the hash parts
            var parts = href.split('#');
            var page = parts[0];
            var hash = '#' + parts[1];
            
            // If the page part is empty or equals the current page, handle as in-page navigation
            if(page === '' || page === window.location.pathname || page === window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)) {
                e.preventDefault();
                
                var $target = jQuery(hash);
                
                if($target.length) {
                    // Remove animations if they exist
                    $target.find('.wow').removeClass('wow fadeInLeft fadeInRight').addClass('animated');
                    
                    // Get header height
                    var headerHeight = jQuery('.grax_tm_topbar').outerHeight();
                    
                    // Apply same offset for all sections to ensure consistent heading positions
                    var scrollOffset = headerHeight - 40; // Use the same offset for all sections
                    
                    // Scroll to target with appropriate offset
                    jQuery('html, body').animate({
                        scrollTop: $target.offset().top - scrollOffset
                    }, 800, 'swing');
                }
            } else {
                // For cross-page navigation with hash, store the target in sessionStorage
                if(hash === '#contact') {
                    // Special handling for contact section
                    e.preventDefault();
                    sessionStorage.setItem('scrollToContact', 'true');
                    window.location.href = page;
                } else {
                    // For other sections
                    e.preventDefault();
                    sessionStorage.setItem('scrollToSection', hash.substring(1));
                    window.location.href = href;
                }
            }
        }
    });
    
    // Handle cross-page navigation to contact section specifically
    if(sessionStorage.getItem('scrollToContact')) {
        sessionStorage.removeItem('scrollToContact');
        var $contact = jQuery('#contact');
        
        if($contact.length) {
            // Remove animations
            $contact.find('.wow').removeClass('wow fadeInLeft fadeInRight').addClass('animated');
            
            // Wait for page load
            jQuery(window).on('load', function() {
                setTimeout(function() {
                    // Get header height
                    var headerHeight = jQuery('.grax_tm_topbar').outerHeight();
                    
                    // Apply the same custom offset for contact section
                    var scrollOffset = headerHeight - 40; // Match the offset used above
                    
                    // Scroll to contact section with custom offset
                    jQuery('html, body').animate({
                        scrollTop: $contact.offset().top - scrollOffset
                    }, 800);
                }, 100);
            });
        }
    }
    
    // Handle cross-page navigation to other sections
    if(sessionStorage.getItem('scrollToSection')) {
        var sectionId = sessionStorage.getItem('scrollToSection');
        sessionStorage.removeItem('scrollToSection');
        var $section = jQuery('#' + sectionId);
        
        if($section.length) {
            // Remove animations
            $section.find('.wow').removeClass('wow fadeInLeft fadeInRight').addClass('animated');
            
            // Wait for page load
            jQuery(window).on('load', function() {
                setTimeout(function() {
                    // Get header height
                    var headerHeight = jQuery('.grax_tm_topbar').outerHeight();
                    
                    // Apply the same custom offset for the section
                    var scrollOffset = headerHeight - 40; // Match the offset used above
                    
                    // Scroll to the section with custom offset
                    jQuery('html, body').animate({
                        scrollTop: $section.offset().top - scrollOffset
                    }, 800);
                }, 100);
            });
        }
    }
    
    // Remove all current classes from menu items on page load
    jQuery('.anchor_nav a').removeClass('current');
});
