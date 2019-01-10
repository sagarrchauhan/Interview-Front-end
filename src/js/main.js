(function global() {
  // console.log('JS');

  /**
   * Menu animations
   */

  // menu elements
  const hamburgerBtn = document.getElementsByClassName('hamburger-menu__ham')[0];
  const crossBtn = document.getElementsByClassName('hamburger-menu__cross')[0];
  const menuHeaders = document.getElementsByClassName('menu-headers__link');

  // Menu button event listeners

  hamburgerBtn.addEventListener('click', function (e) {
    e.preventDefault();    
    const menuHeader = document.getElementsByClassName('menu-headers')[0];      
    menuHeader.classList.add('menu-headers--open');
    hamburgerBtn.style.display = 'none';      
    crossBtn.style.display = 'block';      
    
        
  });

  crossBtn.addEventListener('click', function (e) {
    e.preventDefault();    
    closeOpenLink();
    const menuHeader = document.getElementsByClassName('menu-headers')[0];      
    menuHeader.classList.remove('menu-headers--open');
    setTimeout(function () {
      crossBtn.style.display = 'none';     
      hamburgerBtn.style.display = 'block';
    }, 1000);
    
  });

  for (var i = 0; i < menuHeaders.length; i++) {    
    menuHeaders[i].addEventListener('click', function (e) {
      e.preventDefault();
      if (checkopenLink() !== this){
        closeOpenLink();
      }
      toggleMenuItem(this);
    });
  }
  
  /**
   * Scrolling effect
   */

  // scrolling elements
  const contactUsBtn = document.getElementById('contact-us');
  const contactUsImg = document.getElementById('img-contact-us');
  const scrollDownBtn = document.getElementsByClassName('scroll_down__element');

  // Scrolling button event listeners

  contactUsBtn.addEventListener('click', function () {
    smoothScroll('.l-workwithus', 2000);
  });

  contactUsImg.addEventListener('click', function () {
    smoothScroll('.l-workwithus', 2000);
  });

  scrollDownBtn[0].addEventListener('click', function (e) {
    e.preventDefault();
    smoothScroll('.l-success', 500);
  });

  /**
   * Carousel effect
   */
  
  // carousel elements
  const carouselSlide = document.querySelector('.testimonial-container__slider');  

  // Clone the carousel nodes
  cloneCarouselNodes();
  
  var carouselImages = document.querySelectorAll('.testimonial');   
  const size = carouselImages[0].clientWidth;
  var counter = 1;

  // buttons 
  const prevBtn = document.querySelector('#prev-btn');
  const nextBtn = document.querySelector('#next-btn');

  

  // Carousel event listeners
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
  });  
  // initialize carousel
  initializeCarousel(counter, carouselSlide, size);

})();

// Carousel

function initializeCarousel(counter, carouselSlide, size) {    
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

function cloneCarouselNodes() {
  var count = document.getElementsByClassName('testimonial').length;
  const firstElement = document.getElementsByClassName('testimonial')[0];
  const lastElement = document.getElementsByClassName('testimonial')[count - 1];

  var parentEl = document.getElementsByClassName('testimonial-container__slider')[0];
  var firstClone = firstElement.cloneNode(true);
  firstClone.id = 'first-clone';
  var lastClone = lastElement.cloneNode(true);
  lastClone.id = 'last-clone';
  parentEl.append(firstClone);
  parentEl.prepend(lastClone);
  
}

// Smooth scroll

function smoothScroll(target, duration) {
   var target = document.querySelector(target);
   var targetPos = target.getBoundingClientRect().top;
   var startPos = window.pageYOffset;
   var distance = targetPos - startPos + window.scrollY;
   var startTime = null;


  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeLapsed = currentTime - startTime;
    var run = ease(timeLapsed, startPos, distance, duration);
    window.scrollTo(0, run);
    if (timeLapsed < duration) requestAnimationFrame(animation);

  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if(t < 1) return c /  2 * t * t + b;
    t--;
    return -c / 2*(t * (t -2) - 1) + b;
    
  }
  requestAnimationFrame(animation);
}


// Menu actions

function toggleMenuItem(menuLink) {
  if (menuLink.classList.contains('menu-headers__link--rotated-open')){
    closeMenuItem(menuLink);
  }else{
    openMenuItem(menuLink);
  }
}

function openMenuItem(menuLink) {
  menuLink.classList.add('menu-headers__link--rotated-open');
  menuLink.nextElementSibling.classList.add('menu-headers__menu-items--open');
}

function closeMenuItem(menuLink) {
  menuLink.nextElementSibling.classList.remove('menu-headers__menu-items--open');
  menuLink.classList.remove('menu-headers__link--rotated-open');  
}

function checkopenLink(){
    var openLink = document.getElementsByClassName('menu-headers__link--rotated-open');
    if (openLink){
      return openLink[0]
    }    
}

function closeOpenLink() {
  var openLink = checkopenLink();
  if (openLink){
    toggleMenuItem(openLink);
  }
}