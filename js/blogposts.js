const postsContainer = document.getElementById('posts-container');

// Function to display blog posts
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const title = document.createElement('h2');
    title.textContent = post.title;

    const bodySnippet = document.createElement('p');
    bodySnippet.textContent = post.body.substring(0, 300) + '...';

    const readMoreButton = document.createElement('button');
    readMoreButton.textContent = 'Read More';
    readMoreButton.classList.add('read-more');
    readMoreButton.addEventListener('click', () => {
        window.location.href = `/FED1-PE1-renayoo/post/index.html?id=${post.id}`;
    });

    const image = document.createElement('img');
    image.src = post.media.url;
    image.alt = post.media.alt;

    const imageLink = document.createElement('a');
    imageLink.href = `/post/index.html?id=${post.id}`;
    imageLink.appendChild(image);

    postDiv.appendChild(imageLink);
    postDiv.appendChild(title);
    postDiv.appendChild(bodySnippet);
    postDiv.appendChild(readMoreButton);

    // Check if accesstoken (User)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-post');
        editButton.addEventListener('click', () => {
            window.location.href = `/FED1-PE1-renayoo/post/edit.html?id=${post.id}`;
        });

        postDiv.appendChild(editButton);
    }

    return postDiv;
}

// Fetching API
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

// Call the fetchData function for posts
fetchData();