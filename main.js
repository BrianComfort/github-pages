const images = [
    "image-1.jpg",
    "image-2.jpg",
    "image-3.jpg",
    "image-4.jpg",
    "image-5.jpg",
    "image-6.jpg",
    "image-7.jpg",
    "image-8.jpg",
    "image-9.jpg",
    "image-10.jpg",
    "image-11.jpg",
    "image-12.jpg",
    "image-13.jpg",
    "image-14.jpg",
    "image-15.jpg",
    "image-16.jpg"
  ];
  
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    return randomImage;
  }
  
  window.addEventListener("DOMContentLoaded", function() {
    const randomBg = document.querySelector("body");
    const randomImage = getRandomImage();
    randomBg.style.backgroundImage = `url('images/${randomImage}')`;
  });
  
  
  