const postsContainer = document.getElementById('blogDetailsID');

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
    tags.textContent = `Category: ${post.tags.join(', ')}`;

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
    }
}

// Call the fetchData function to retrieve and display the post
fetchData();