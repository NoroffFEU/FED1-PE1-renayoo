const postsContainer = document.getElementById('blogDetailsID');

// Function to create post elements
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const title = document.createElement('h2');
    title.textContent = post.title;

    const author = document.createElement('p');
    author.textContent = `By: ${post.author.name}`;

    const createdDate = document.createElement('p');
    createdDate.textContent = `Date: ${new Date(post.created).toLocaleDateString()}`;

    const updatedDate = document.createElement('p');
    updatedDate.textContent = `Updated: ${new Date(post.updated).toLocaleDateString()}`;

    const body = document.createElement('p');
    body.textContent = post.body;

    const tags = document.createElement('p');
    tags.textContent = `Category: ${post.tags.join(', ')}`;

    const shareableURL = document.createElement('p');
    const postURL = `/post/index.html?id=${post.id}`;
    shareableURL.innerHTML = `Share the blog: <a href="${postURL}" target="_blank">${postURL}</a>`;

    const image = document.createElement('img');
    image.src = post.media.url;
    image.alt = post.media.alt;

    postDiv.appendChild(title);
    postDiv.appendChild(author);
    postDiv.appendChild(createdDate);
    postDiv.appendChild(updatedDate);
    postDiv.appendChild(image);
    postDiv.appendChild(body);
    postDiv.appendChild(tags);
    postDiv.appendChild(shareableURL);

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

            // Append only one post to the container
            postsContainer.innerHTML = ''; // Clear previous content
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetchData function to retrieve and display posts
fetchData();