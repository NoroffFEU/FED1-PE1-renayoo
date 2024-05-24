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

// Fetch data API
fetch('https://v2.api.noroff.dev/blog/posts/poppy')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        const posts = responseData.data.slice(0, 3);
        posts.forEach((post, index) => {
            imgs[index].src = post.media.url;
            links[index].href = `https://norofffeu.github.io/FED1-PE1-renayoo/post/index.html?id=${post.id}`;
            let title = post.title.length > 20 ? post.title.substring(0, 30) + '...' : post.title;
            let text = post.body.length > 200 ? post.body.substring(0, 500) + '...' : post.body;
            captions[index].innerHTML = `<strong>${title}</strong><br>${text}`;
            links[index].textContent = "Read More";
        });
    })
    .catch(error => {
        console.error('Error fetching data: Blog posts not fetched', error);
    });

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