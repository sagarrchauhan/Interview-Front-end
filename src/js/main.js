(function global() {
  // console.log('JS');
})();


const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.triangle-wrap');

//Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//Counter
let counter = 1;

const size = carouselImages[0].clientWidth;


carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

nextBtn.addEventListener('click',function (e) {
  e.preventDefault();
  if (counter >= carouselImages.length - 2) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click',function (e) {
  e.preventDefault();
  if (counter <= -1) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

carouselSlide.addEventListener('transitionend', function () {
  if (counter === -1){
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - 3;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  } 
  
  if (counter === carouselImages.length - 2){
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - counter - 2;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }  
})