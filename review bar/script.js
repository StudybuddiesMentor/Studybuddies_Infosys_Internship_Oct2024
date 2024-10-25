let slideIndex = 0;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n - 1);
}

function showSlides(n) {
    let slides = document.querySelectorAll(".review-card");
    let dots = document.querySelectorAll(".dot");

    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    slides.forEach((slide, index) => {
        slide.style.display = "none";
        dots[index].classList.remove("active");
    });

    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
});
