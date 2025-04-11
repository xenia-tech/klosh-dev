const SUPABASE_URL = 'https://kdsxrpspfnuodkafzwcb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkc3hycHNwZm51b2RrYWZ6d2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NzE3NzYsImV4cCI6MjA1NDE0Nzc3Nn0.1-E3eDwdtxWnvJsUv7PgtQ9hnBHJQQpnTfm6o6H44Tw';

class BlogPost {
    constructor() {
        this.dateElement = document.querySelector('.post-date');
        this.titleElement = document.querySelector('.post-title');
        this.contentElement = document.querySelector('.post-content');
        this.loadPost();
    }

    async loadPost() {
        try {
            // Get the slug from the URL query parameter
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('slug');
            console.log('Loading post with slug:', slug);

            if (!slug) {
                throw new Error('No post slug provided');
            }

            const response = await fetch(`${SUPABASE_URL}/rest/v1/posts?slug=eq.${slug}&published=eq.true`, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }

            const posts = await response.json();
            console.log('Post data:', posts);
            
            if (!posts.length) {
                throw new Error('Post not found');
            }

            const post = posts[0];
            this.renderPost(post);
            
            document.title = `${post.title} - Klosh`;
        } catch (error) {
            console.error('Error loading post:', error);
            this.titleElement.textContent = 'Post Not Found';
            this.contentElement.innerHTML = `
                <p>Sorry, the requested blog post could not be found.</p>
                <p><a href="../index.html#news">Return to Blog</a></p>
            `;
        }
    }

    renderPost(post) {
        const date = new Date(post.created_at).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        this.titleElement.textContent = post.title;
        this.dateElement.textContent = `Published on ${date}`;
        this.contentElement.innerHTML = post.content;

        // Set specific image for Google My Business post
        let imageUrl = post.image_url;
        if (post.title && post.title.includes('Google My Business')) {
            imageUrl = 'https://cdn.pixabay.com/photo/2020/12/08/16/57/eye-5814967_1280.jpg';
        }

        // If there's a featured image
        if (imageUrl) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'post-image';
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="${post.title}" />`;
            this.contentElement.insertBefore(imageContainer, this.contentElement.firstChild);
        }

        // Reinitialize any necessary scripts
        if (window.grax_tm_imgtosvg) {
            window.grax_tm_imgtosvg();
        }

        // Update share links
        const shareLinks = document.querySelectorAll('.share-link');
        const shareUrl = encodeURIComponent(window.location.href);
        const shareTitle = encodeURIComponent(post.title);

        shareLinks.forEach(link => {
            const platform = link.querySelector('img').alt.toLowerCase().includes('facebook') ? 'facebook' : 'twitter';
            if (platform === 'facebook') {
                link.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
            } else if (platform === 'twitter') {
                link.href = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
            }
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        });
    }
}

// Initialize blog post when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing BlogPost');
    new BlogPost();
});
