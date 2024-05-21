const postsContainer = document.getElementById('posts-container');

// Function to create post elements
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
        window.location.href = `/post/index.html?id=${post.id}`;
    });

    const image = document.createElement('img');
    image.src = post.media.url;
    image.alt = post.media.alt;

    postDiv.appendChild(image);
    postDiv.appendChild(title);
    postDiv.appendChild(bodySnippet);
    postDiv.appendChild(readMoreButton);

    return postDiv;
}



// Fetch data from API
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
    }
}

// Call the fetchData function to retrieve and display posts
fetchData();