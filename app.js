const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const search = document.getElementById('search');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.largeImageURL}") src="${image.largeImageURL}" alt="${image.largeImageURL}">
      <h5 class="img-heading">${image.tags}</h5>
    `;
    gallery.appendChild(div)
  })
  snipperHandler();
}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    sliders.pop(img);
  }
}
let timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeSlider(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeSlider(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main-content').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  if (duration < 0) {
    alert('Time can not be negative!')
    // return;
  }
  else if (duration > 0) {
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  }
}


// change slider index 
const changeSlider = index => {
  changeSlide(slideIndex += index);
}


// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

sliderBtn.addEventListener('click', function () {
  createSlider()
})


// keyboard and mouse event handler
searchBtn.addEventListener('click', function () {
  if (search.value == '') {
    alert("Please fill out this field.")
  }
  if (search.value != '') {
    imagesHandler();
    snipperHandler();
  }
})
search.addEventListener("keydown", function (event) {
  if (search.value != '') {
    if (event.keyCode === 13) {
        imagesHandler();
      event.preventDefault();
      snipperHandler();
    }
  }
});
const imagesHandler = () => {
  document.querySelector('.main-content').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
}


// Snipper
const snipperHandler = () => {
  const sni = document.querySelector(".spinner");
  sni.classList.toggle('d-none')
}


// Contact 
const contact = document.getElementById('contactMenu');
  contact.addEventListener("click", function(){
  const newVariable = document.getElementById('smple');
  newVariable.style.display = 'none';

  const showToCssHidden = document.getElementById('contactSection');
  showToCssHidden.style.display = 'block';
})
