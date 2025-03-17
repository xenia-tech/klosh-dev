const SUPABASE_URL = 'https://kdsxrpspfnuodkafzwcb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkc3hycHNwZm51b2RrYWZ6d2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NzE3NzYsImV4cCI6MjA1NDE0Nzc3Nn0.1-E3eDwdtxWnvJsUv7PgtQ9hnBHJQQpnTfm6o6H44Tw';

class BlogPosts {
    constructor() {
        console.log('BlogPosts initialized');
        this.postsContainer = document.querySelector('.news_list');
        if (!this.postsContainer) {
            console.error('Blog posts container not found');
            return;
        }
        this.fetchPosts();
    }

    async fetchPosts() {
        try {
            console.log('Fetching published posts...');
            const response = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=*&published=eq.true&order=created_at.desc`, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const posts = await response.json();
            console.log('Published posts fetched:', posts.length, 'posts');
            this.renderPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            this.postsContainer.innerHTML = '<p>Failed to load blog posts. Please try again later.</p>';
        }
    }

    renderPosts(posts) {
        if (!posts.length) {
            console.log('No published posts available');
            this.postsContainer.innerHTML = '<p>No posts available.</p>';
            return;
        }

        console.log(`Rendering ${posts.length} published posts`);
        const postsList = document.createElement('ul');
        
        posts.forEach((post, index) => {
            const li = document.createElement('li');
            li.className = 'wow fadeInUp';
            li.setAttribute('data-wow-duration', '1.5s');
            if (index > 0) {
                li.setAttribute('data-wow-delay', `${index * 0.2}s`);
            }

            const date = new Date(post.created_at).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });

            // Create the blog URL using query parameter
            const blogUrl = `blog/index.html?slug=${post.slug}`;
            const imageUrl = post.image_url || 'img/news/1.jpg';

            li.innerHTML = `
                <div class="list_inner">
                    <div class="image">
                        <a href="${blogUrl}">
                            <img src="${imageUrl}" alt="${post.title}" />
                            <div class="main" data-img-url="${imageUrl}"></div>
                        </a>
                    </div>
                    <div class="details">
                        <h3 class="title"><a href="${blogUrl}">${post.title}</a></h3>
                        <p class="date">By <a href="#">Admin</a> <span>${date}</span></p>
                    </div>
                </div>
            `;
            postsList.appendChild(li);
        });

        this.postsContainer.innerHTML = '';
        this.postsContainer.appendChild(postsList);

        // Initialize WOW animations if available
        if (window.WOW) {
            new WOW().init();
        }

        // Reinitialize image loading
        if (window.grax_tm_data_images) {
            window.grax_tm_data_images();
        }
        // Reinitialize SVG loading
        if (window.grax_tm_imgtosvg) {
            window.grax_tm_imgtosvg();
        }
    }
}

// Initialize blog posts when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing BlogPosts');
    new BlogPosts();
});
