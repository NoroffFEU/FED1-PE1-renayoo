document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/poppy/${postId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        const post = responseData.data;

        console.log('Fetched post:', post);  

        // Check if the required fields are present
        if (post && post.id && post.title && post.body && post.media && post.media.url) {
            console.log('All required fields are present:', post);
            document.getElementById('post-id').value = post.id;
            document.getElementById('title').value = post.title;
            document.getElementById('body').value = post.body;
            document.getElementById('media-url').value = post.media.url;
            document.getElementById('media-alt').value = post.media.alt || '';
        } else {
            console.error('Missing required fields in the API response', post);
        }

        document.getElementById('edit-post-form').addEventListener('submit', async (event) => {
            event.preventDefault();

            const updatedPost = {
                title: document.getElementById('title').value,
                body: document.getElementById('body').value,
                media: {
                    url: document.getElementById('media-url').value,
                    alt: document.getElementById('media-alt').value
                }
            };

            console.log('Updated post data:', updatedPost);  // Debugging statement

            try {
                const response = await fetch(`https://v2.api.noroff.dev/blog/posts/poppy/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(updatedPost)
                });

                if (response.ok) {
                    console.log('Post updated successfully');
                    window.location.href = `https://norofffeu.github.io/FED1-PE1-renayoo/post/index.html?id=${postId}`;
                } else {
                    console.error('Failed to update post', await response.json());
                }
            } catch (error) {
                console.error('Error updating post:', error);
            }
        });

        // Buttons - Delete 
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Post';
        deleteButton.classList.add('delete-post');
        deleteButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`/blog/posts/poppy/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.ok) {
                    console.log('Post deleted successfully');
                    window.location.href = 'https://norofffeu.github.io/FED1-PE1-renayoo/';
                } else {
                    const errorMessage = await response.text();
                    console.error('Failed to delete post:', errorMessage);
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        });

        // Append delete btn
        const form = document.getElementById('edit-post-form');
        form.appendChild(deleteButton);
    } catch (error) {
        console.error('Error fetching post data:', error);
    }
});

console.log('Fetched post:', post);  // Debugging statement

// Console log
if (post && post.id && post.title && post.body && post.media && post.media.url) {
    console.log('All required fields are present:', post);
    document.getElementById('post-id').value = post.id;
    document.getElementById('title').value = post.title;
    document.getElementById('body').value = post.body;
    document.getElementById('media-url').value = post.media.url;
    document.getElementById('media-alt').value = post.media.alt || ''; 
} else {
    console.error('Missing required fields in the API response', post);
}