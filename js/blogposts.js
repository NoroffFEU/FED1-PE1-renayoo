const postsContainer = document.getElementById('posts-container');
const sortDropdown = document.getElementById('sort-dropdown');
const tagFilter = document.getElementById('category-filter'); // Use tagFilter for clarity

let allPosts = [];

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
    imageLink.href = `/FED1-PE1-renayoo/post/index.html?id=${post.id}`;
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

// Function to display posts based on sorting and filtering
function displayPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

// Function to sort posts
function sortPosts(posts, sortBy) {
    return posts.slice().sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
}

// Function to filter posts by tag
function filterPostsByTag(posts, tag) {
    return tag === 'all' ? posts : posts.filter(post => post.tags.includes(tag));
}

// Fetching API
async function fetchData() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/poppy');
        const data = await response.json();
        allPosts = data.data;

        // Populate tag filter options
        const tags = Array.from(new Set(allPosts.flatMap(post => post.tags)));
        tagFilter.innerHTML = '<option value="all">All</option>';
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });

        // Display posts initially
        const sortedPosts = sortPosts(allPosts, sortDropdown.value);
        displayPosts(sortedPosts);
    } catch (error) {
        console.error('Error fetching data:', error);
        displayError('Cannot fetch blog posts.');
    }
}

// Event listeners for sorting and filtering
sortDropdown.addEventListener('change', () => {
    const sortedPosts = sortPosts(allPosts, sortDropdown.value);
    const filteredPosts = filterPostsByTag(sortedPosts, tagFilter.value);
    displayPosts(filteredPosts);
});

tagFilter.addEventListener('change', () => {
    const sortedPosts = sortPosts(allPosts, sortDropdown.value);
    const filteredPosts = filterPostsByTag(sortedPosts, tagFilter.value);
    displayPosts(filteredPosts);
});

// Call the fetchData function for posts
fetchData();

function displayError(message) {
    postsContainer.innerHTML = `<p>${message}</p>`;
}