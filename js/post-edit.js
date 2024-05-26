document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');
    const accessToken = localStorage.getItem('accessToken');

    localStorage.setItem('currentlyEditingPostId', postId);

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

        // Check if the required fields are present
        if (post && post.id && post.title && post.body && post.media && post.media.url) {
            console.log('All required fields are present!');
            document.getElementById('post-id').value = post.id;
            document.getElementById('title').value = post.title;
            document.getElementById('body').value = post.body;
            document.getElementById('media-url').value = post.media.url;
            document.getElementById('media-alt').value = post.media.alt || '';

            // Prepopulate category tag field if available
            if (post.tags && post.tags.length > 0) {
                document.getElementById('tags').value = post.tags.join(', ');
            }
        } else {
            console.error('Missing required fields in the API response');
        }

    } catch (error) {
        console.error('Error fetching post data:', error);
    }

    async function handleEditPost() {
        let tags = [];
        const tagsInput = document.getElementById('tags').value;
        if (tagsInput && tagsInput.length > 0) {
            tags = tagsInput.split(',');
        }

        const body = {
            "title": document.getElementById('title').value,
            "body": document.getElementById('body').value,
            "tags": tags,
            "media": {
                "url": document.getElementById('media-url').value,
                "alt": document.getElementById('media-alt').value
            }
        }

        const postId = localStorage.getItem('currentlyEditingPostId');
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            window.location.href = 'login.html';
            return;
        }

        try {
            const response = await fetch(`https://v2.api.noroff.dev/blog/posts/poppy/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            const post = responseData.data;

            // Alert on successful editing
            window.alert('Editing saved successfully!');

        } catch (error) {
            console.error("Error saving post: ", error);
        }
    }

    const saveChangesButton = document.getElementById("save-changes-button");
    saveChangesButton.addEventListener("click", handleEditPost);

    // Buttons - Delete 
    const deleteButton = document.getElementById("delete-button");;
    deleteButton.addEventListener('click', async () => {
        // Confirm deleting post
        const confirmation = window.confirm('Are you sure you want to delete this post?');
        if (!confirmation) return;

        try {
            const response = await fetch(`https://v2.api.noroff.dev/blog/posts/poppy/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                console.log('Post deleted successfully');
                window.alert('Post deleted successfully!');
                window.location.href = 'https://norofffeu.github.io/FED1-PE1-renayoo/';
            } else {
                const errorMessage = await response.text();
                console.error('Failed to delete post:', errorMessage);
                // Display deletion error message
                window.alert('Failed to delete post: ' + errorMessage);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    });
});
