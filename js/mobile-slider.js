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
            
            // Check if this is a high-resolution device (like iPhone 16 Pro Max)
            const isHighResDevice = window.devicePixelRatio >= 3;
            
            // For high-resolution devices, disable the CSS scroll snap behavior
            if (isHighResDevice) {
                // Apply inline style to override the CSS scroll-snap-type
                newsListContainer.style.scrollSnapType = "none";
                
                // Also remove scroll-snap-align from all items
                newsItems.forEach(item => {
                    item.style.scrollSnapAlign = "none";
                });
            }
            
            // Add touch swipe detection for better mobile experience
            let touchStartX = 0;
            let touchEndX = 0;
            let touchMoved = false;

            newsListContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                
                // For high-resolution devices, prevent default scrolling behavior
                if (isHighResDevice) {
                    // Store the current scroll position
                    newsListContainer.dataset.scrollLeft = newsListContainer.scrollLeft;
                }
                touchMoved = false;
            }, { passive: true });

            // For high-resolution devices, handle touchmove
            if (isHighResDevice) {
                newsListContainer.addEventListener('touchmove', function(e) {
                    const currentX = e.changedTouches[0].screenX;
                    const initialScrollLeft = parseFloat(newsListContainer.dataset.scrollLeft || 0);
                    const diff = touchStartX - currentX;
                    
                    // Manually control scrolling
                    newsListContainer.scrollLeft = initialScrollLeft + diff;
                    touchMoved = true;
                }, { passive: true });
            }

            newsListContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                
                // For high-resolution devices, prevent snap-back behavior
                if (isHighResDevice && touchMoved) {
                    // Calculate swipe distance
                    const swipeDistance = touchStartX - touchEndX;
                    
                    // Get current visible item
                    const scrollPosition = newsListContainer.scrollLeft;
                    const itemWidth = newsItems[0].offsetWidth;
                    const containerWidth = newsListContainer.offsetWidth;
                    let currentIndex = Math.round((scrollPosition + (containerWidth - itemWidth) / 2) / itemWidth);
                    
                    // Determine target index based on swipe direction
                    let targetIndex = currentIndex;
                    if (Math.abs(swipeDistance) > 50) {
                        if (swipeDistance > 0 && currentIndex < newsItems.length - 1) {
                            // Swipe left - go to next
                            targetIndex = currentIndex + 1;
                        } else if (swipeDistance < 0 && currentIndex > 0) {
                            // Swipe right - go to previous
                            targetIndex = currentIndex - 1;
                        }
                    }
                    
                    // Force scroll to the target item to prevent snap-back
                    setTimeout(() => {
                        scrollToItem(targetIndex);
                    }, 10);
                } else {
                    // Normal behavior for non-high-res devices
                    handleSwipe();
                }
            }, { passive: true });

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
