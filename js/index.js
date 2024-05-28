// Variables
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let imgs = document.querySelectorAll('.carousel-img');
let links = document.querySelectorAll('.carousel-link');
let dots = document.querySelectorAll('.dot');
let captions = document.querySelectorAll('.carousel-caption-text');
let totalImgs = imgs.length;
let imgPosition = 0;

// Event Listeners
next.addEventListener('click', nextImg);
prev.addEventListener('click', prevImg);

// Fetch API carousel
async function fetchCarouselData() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/poppy');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        const posts = responseData.data.slice(0, 3);
        posts.forEach((post, index) => {
            imgs[index].src = post.media.url;
            links[index].href = `/FED1-PE1-renayoo/post/index.html?id=${post.id}`;
            let title = post.title.length > 20 ? post.title.substring(0, 30) + '...' : post.title;
            let text = post.body.length > 200 ? post.body.substring(0, 500) + '...' : post.body;
            captions[index].innerHTML = `<strong>${title}</strong><br>${text}`;
            links[index].textContent = "Read More";
        });
    } catch (error) {
        console.error('Error fetching data: Blog posts not fetched', error);
    }
}

// Position for images
function updatePosition() {
    // Images and Captions
    let items = document.querySelectorAll('.carousel-item');
    for (let item of items) {
        item.classList.remove('visible');
        item.classList.add('hidden');
    }
    items[imgPosition].classList.remove('hidden');
    items[imgPosition].classList.add('visible');
    // Dots
    for (let dot of dots) {
        dot.className = dot.className.replace(" active", "");
    }
    dots[imgPosition].classList.add('active');
}

// Next Image
function nextImg() {
    if (imgPosition === totalImgs - 1) {
        imgPosition = 0;
    } else {
        imgPosition++;
    }
    updatePosition();
}

// Previous Image
function prevImg() {
    if (imgPosition === 0) {
        imgPosition = totalImgs - 1;
    } else {
        imgPosition--;
    }
    updatePosition();
}

// Dot Position
dots.forEach((dot, dotPosition) => {
    dot.addEventListener("click", () => {
        imgPosition = dotPosition;
        updatePosition();
    });
});

// Fetch API blog feed
async function fetchBlogPosts() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/poppy');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        const postsContainer = document.getElementById('posts-container');
        const posts = responseData.data;

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';

            const titleElement = document.createElement('h4');
            titleElement.className = 'blog-post-title';
            titleElement.textContent = post.title;

            const authorElement = document.createElement('p');
            authorElement.className = 'blog-post-author';
            authorElement.textContent = `By: ${post.author.name}`;

            const dateElement = document.createElement('p');
            dateElement.className = 'blog-post-date';
            const date = new Date(post.created);
            dateElement.textContent = `Published on: ${date.toLocaleDateString()}`;

            const imgElement = document.createElement('img');
            imgElement.src = post.media.url;
            imgElement.alt = post.media.alt;
            imgElement.addEventListener('click', () => {
                window.location.href = `https://norofffeu.github.io/FED1-PE1-renayoo/post/index.html?id=${post.id}`;
            });

            const bodyElement = document.createElement('p');
            bodyElement.className = 'blog-post-body';
            bodyElement.textContent = post.body;

            const tagsElement = document.createElement('p');
            tagsElement.className = 'blog-post-tags';
            tagsElement.textContent = `Categories: ${post.tags.join(', ')}`;

            postElement.appendChild(titleElement);
            postElement.appendChild(imgElement);
            postElement.appendChild(authorElement);
            postElement.appendChild(dateElement);
            postElement.appendChild(bodyElement);
            postElement.appendChild(tagsElement);

            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching data: Blog posts not fetched', error);
    }
}

// Scrolling to top button
let mybutton = document.getElementById("scrollTopBtn");

// Button appears when scrolling down 20 
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// Click - Scrolling the page to top
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Call fetch functions
fetchCarouselData();
fetchBlogPosts();