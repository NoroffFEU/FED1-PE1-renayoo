const postsContainer = document.getElementById('blogDetailsID');

//Function to display post 
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const title = document.createElement('h2');
    title.textContent = post.title;

    const metaDataDiv = document.createElement('div');
    metaDataDiv.classList.add('post-meta');

    const author = document.createElement('p');
    author.classList.add('post-author');
    author.textContent = `By: ${post.author.name}`;

    const createdDate = document.createElement('p');
    createdDate.classList.add('post-created-date');
    createdDate.textContent = `Published: ${new Date(post.created).toLocaleDateString()}`;

    const updatedDate = document.createElement('p');
    updatedDate.classList.add('post-updated-date');
    updatedDate.textContent = `Updated: ${new Date(post.updated).toLocaleDateString()}`;

    metaDataDiv.appendChild(author);
    metaDataDiv.appendChild(createdDate);
    metaDataDiv.appendChild(updatedDate);

    const body = document.createElement('p');
    body.textContent = post.body;
    body.classList.add('post-body');

    const tags = document.createElement('p');
    tags.textContent = `Categories: ${post.tags.join(', ')}`;

    const shareableURL = document.createElement('p');
    const baseURL = 'https://norofffeu.github.io/FED1-PE1-renayoo';
    const postURL = `${baseURL}/post/index.html?id=${post.id}`;
    shareableURL.innerHTML = `Share the blog: <a href="${postURL}" target="_blank">${postURL}</a>`;

    const image = document.createElement('img');
    image.src = post.media.url;
    image.alt = post.media.alt;

    postDiv.appendChild(image);
    postDiv.appendChild(title);
    postDiv.appendChild(metaDataDiv);
    postDiv.appendChild(body);
    postDiv.appendChild(tags);
    postDiv.appendChild(shareableURL);

    // Check if user is logged in
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-post');
        editButton.addEventListener('click', () => {
            window.location.href = `edit.html?id=${post.id}`;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-post');

        // Event listener confirm deleting post
        deleteButton.addEventListener('click', async () => {
            const isConfirmed = confirm('Are you sure you want to delete this post?');
            if (isConfirmed) {
                try {
                    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/poppy/${post.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (response.ok) {
                        window.location.href = 'https://norofffeu.github.io/FED1-PE1-renayoo/';
                    } else {
                        console.error('Failed to delete post:', await response.json());
                    }
                } catch (error) {
                    console.error('Error deleting post:', error);
                }
            }
        });

        postDiv.appendChild(editButton);
        postDiv.appendChild(deleteButton);
    }

    return postDiv;
}

function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function fetchData() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/poppy');
        const data = await response.json();
        const postId = getPostIdFromURL();

        if (postId) {
            const post = data.data.find(p => p.id === postId);
            if (post) {
                // Show page title
                document.title = `Pawfect: ${post.title}`;

                const postElement = createPostElement(post);
                postsContainer.innerHTML = '';
                postsContainer.appendChild(postElement);
            } else {
                postsContainer.innerHTML = '<p>Post not found</p>';
            }
        } else {
            postsContainer.innerHTML = '<p>No post ID specified in URL</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        postsContainer.innerHTML = '<p>There was an error fetching the post data.</p>';
    }
}

// Call the fetchData function to retrieve and display the post
fetchData();

// Go back button - navigates to the previous page
function goBack() {
    window.history.back();
}
