// Variables
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let imgs = document.querySelectorAll('.carousel-img');
let links = document.querySelectorAll('.carousel-link');
let dots = document.querySelectorAll('.dot');
let captions = document.querySelectorAll('.carousel-caption');
let totalImgs = imgs.length;
let imgPosition = 0;

// Event Listeners
next.addEventListener('click', nextImg);
prev.addEventListener('click', prevImg);

fetch('https://v2.api.noroff.dev/blog/posts/poppy')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const posts = data.slice(0, 3);
        posts.forEach((post, index) => {
            imgs[index].src = post.media.url;
            links[index].href = `post/index.html?id=${post.id}`;
            captions[index].textContent = post.title;
        });
    })
    .catch(error => {
        console.error('Error fetching data: Blog posts not fetched', error);
    });

// Update Position
function updatePosition() {
    //   Images
    for (let img of imgs) {
        img.classList.remove('visible');
        img.classList.add('hidden');
    }
    imgs[imgPosition].classList.remove('hidden');
    imgs[imgPosition].classList.add('visible');
    //   Dots
    for (let dot of dots) {
        dot.className = dot.className.replace(" active", "");
    }
    dots[imgPosition].classList.add('active');
    //   Captions
    for (let caption of captions) {
        caption.classList.remove('visible');
        caption.classList.add('hidden');
    }
    captions[imgPosition].classList.remove('hidden');
    captions[imgPosition].classList.add('visible');
}

// Next Img
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
        updatePosition(dotPosition);
    });
});