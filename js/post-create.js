document.getElementById('create-post-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const mediaUrl = document.getElementById('media-url').value;
    const mediaAlt = document.getElementById('media-alt').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value;

    // Check if user is logged in and has access token in local storage
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        alert('You need to log in to post a blog.');
        return;
    }

    // Prepare data object
    const postData = {
        title: title,
        body: body,
        media: {
            url: mediaUrl,
            alt: mediaAlt
        },
        tags: tags.split(',').map(tag => tag.trim()) // Tags split by comma and trim whitespace
    };

    try {
        // Send POST request to the API
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/poppy', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error Response:', errorData);
            throw new Error('Failed to create post: ' + (errorData.message || response.statusText));
        }

        const data = await response.json();

        // Handle response data
        alert('Post created successfully!');
        window.location.href = 'https://norofffeu.github.io/FED1-PE1-renayoo/';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the post: ' + error.message);
    }
});