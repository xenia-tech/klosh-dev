// navigation.js - Handles cross-page navigation
(function($) {
    "use strict";
    
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    // Handle scrolling to sections with consistent offset
    function scrollToSection(sectionId) {
        var $section = $('#' + sectionId);
        if ($section.length) {
            // Get header height
            var headerHeight = $('.grax_tm_topbar').outerHeight();
            
            // Use consistent offset for all sections
            var scrollOffset = headerHeight - 40;
            
            console.log('Scrolling to section:', sectionId);
            console.log('Section offset top:', $section.offset().top);
            console.log('Header height:', headerHeight);
            console.log('Scroll offset:', scrollOffset);
            
            // Remove animations if they exist
            $section.find('.wow').removeClass('wow fadeInLeft fadeInRight').addClass('animated');
            
            // Scroll to section with proper offset
            $('html, body').animate({
                scrollTop: $section.offset().top - scrollOffset
            }, 800);
            
            // Update active state in navigation
            $('.anchor_nav a').removeClass('current');
            $('.anchor_nav a[href="#' + sectionId + '"]').addClass('current');
            $('.anchor_nav a[href="index.html?section=' + sectionId + '"]').addClass('current');
        } else {
            console.log('Section not found:', sectionId);
        }
    }
    
    // Initialize navigation
    $(document).ready(function() {
        console.log('Navigation.js initialized');
        
        // Check for section parameter in URL
        var targetSection = getUrlParameter('section');
        if (targetSection) {
            console.log('Target section from URL:', targetSection);
            
            // Remove any hash from the URL to prevent browser's default scrolling
            if (window.history && window.history.replaceState) {
                window.history.replaceState('', document.title, window.location.pathname + window.location.search);
            }
            
            // Wait for page to fully load
            $(window).on('load', function() {
                console.log('Window loaded, preparing to scroll');
                // Small delay to ensure all elements are rendered
                setTimeout(function() {
                    scrollToSection(targetSection);
                }, 300);
            });
        }
        
        // Add click handler for cross-page navigation links
        $('.cross_page_nav a').each(function() {
            var href = $(this).attr('href');
            
            // Only process links that don't already have query parameters
            if (href && href.indexOf('index.html') !== -1 && href.indexOf('?') === -1) {
                var hash = $(this).attr('href').split('#')[1];
                if (hash) {
                    $(this).attr('href', 'index.html?section=' + hash);
                }
            }
        });
    });
})(jQuery);
