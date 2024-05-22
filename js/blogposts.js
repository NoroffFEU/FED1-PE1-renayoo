const postsContainer = document.getElementById('posts-container');

// Function to display blog posts
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const title = document.createElement('h2');
    title.textContent = post.title;

    const bodySnippet = document.createElement('p');
    bodySnippet.textContent = post.body.substring(0, 200) + '...';

    const readMoreButton = document.createElement('button');
    readMoreButton.textContent = 'Read More';
    readMoreButton.classList.add('read-more');
    readMoreButton.addEventListener('click', () => {
        window.location.href = `post/index.html?id=${post.id}`;
    });

    const image = document.createElement('img');
    image.src = post.media.url;
    image.alt = post.media.alt;

    const imageLink = document.createElement('a');
    imageLink.href = `post/index.html?id=${post.id}`;
    imageLink.appendChild(image);

    postDiv.appendChild(imageLink);
    postDiv.appendChild(title);
    postDiv.appendChild(bodySnippet);
    postDiv.appendChild(readMoreButton);

    // Check if user is logged in
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-post');
        deleteButton.addEventListener('click', async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error('User is not logged in');
                }

                const response = await fetch(`https://v2.api.noroff.dev/blog/posts/poppy/${post.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.ok) {
                    postDiv.remove();
                    console.log('Post deleted successfully');
                } else {
                    const errorMessage = await response.text();
                    console.error('Failed to delete post:', errorMessage);
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-post');
        editButton.addEventListener('click', () => {
            window.location.href = `/post/edit.html?id=${post.id}`;
        });

        postDiv.appendChild(editButton);
        postDiv.appendChild(deleteButton);
    }

    return postDiv;
}

// Fetching data from API
async function fetchData() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/poppy');
        const data = await response.json();

        // Display posts
        data.data.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        displayError('Cannot fetch blog posts.');
    }
}

// Call the fetchData function to retrieve and display posts
fetchData();

