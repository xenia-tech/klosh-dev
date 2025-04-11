/**
 * Mobile News Slider
 * This script creates a touch-enabled slider for the Latest News section on mobile devices only (max-width: 768px)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize the slider on mobile devices (max-width: 768px)
    function initMobileNewsSlider() {
        if (window.innerWidth <= 768) {
            const newsListContainer = document.querySelector('.news_list');
            if (!newsListContainer) return;
            
            // Get the list of news items
            const newsList = newsListContainer.querySelector('ul');
            if (!newsList) return;
            
            // Get all news items
            const newsItems = newsList.querySelectorAll('li');
            if (newsItems.length === 0) return;
            
            // Create slider dots if they don't exist
            const sliderControls = newsListContainer.querySelector('.slider-controls');
            if (sliderControls && sliderControls.children.length === 0) {
                for (let i = 0; i < newsItems.length; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('slider-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.setAttribute('data-index', i);
                    sliderControls.appendChild(dot);
                    
                    // Add click event to each dot
                    dot.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        scrollToItem(index);
                    });
                }
            }
            
            // Function to scroll to a specific item
            function scrollToItem(index) {
                if (index >= 0 && index < newsItems.length) {
                    // Calculate the item width including margins
                    const itemWidth = newsItems[0].offsetWidth;
                    const containerWidth = newsListContainer.offsetWidth;
                    const scrollPosition = index * itemWidth - (containerWidth - itemWidth) / 2;
                    
                    newsListContainer.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active dot
                    const dots = sliderControls.querySelectorAll('.slider-dot');
                    dots.forEach(dot => dot.classList.remove('active'));
                    dots[index].classList.add('active');
                }
            }
            
            // Update active dot on scroll
            newsListContainer.addEventListener('scroll', function() {
                const scrollPosition = newsListContainer.scrollLeft;
                const itemWidth = newsItems[0].offsetWidth;
                const containerWidth = newsListContainer.offsetWidth;
                
                // Calculate which item is most visible in the viewport
                const currentIndex = Math.round((scrollPosition + (containerWidth - itemWidth) / 2) / itemWidth);
                
                // Update active dot
                const dots = sliderControls.querySelectorAll('.slider-dot');
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[currentIndex]) {
                    dots[currentIndex].classList.add('active');
                }
            });
            
            // Add touch swipe detection for better mobile experience
            let touchStartX = 0;
            let touchEndX = 0;
            
            newsListContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            newsListContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
            
            function handleSwipe() {
                const dots = sliderControls.querySelectorAll('.slider-dot');
                const activeIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
                
                if (touchEndX < touchStartX - 50) {
                    // Swipe left - go to next
                    if (activeIndex < newsItems.length - 1) {
                        scrollToItem(activeIndex + 1);
                    }
                }
                
                if (touchEndX > touchStartX + 50) {
                    // Swipe right - go to previous
                    if (activeIndex > 0) {
                        scrollToItem(activeIndex - 1);
                    }
                }
            }
        }
    }
    
    // Initialize on page load
    initMobileNewsSlider();
    
    // Re-initialize on window resize
    window.addEventListener('resize', initMobileNewsSlider);
});
