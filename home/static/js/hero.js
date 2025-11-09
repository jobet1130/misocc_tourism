// Hero Component JavaScript
$(document).ready(function() {
  // Initialize hero component functionality
  initHeroComponent();
});

function initHeroComponent() {
  // Handle CTA button clicks
  $('.hero-cta-button').on('click', function(e) {
    e.preventDefault();
    const targetPage = $(this).data('page');
    if (targetPage) {
      // Use the existing navigation system
      loadPageContent(targetPage);
    }
  });
  
  // Add scroll effect to hero section
  $(window).on('scroll', function() {
    const scrollPosition = $(window).scrollTop();
    const heroSection = $('.hero-section');
    
    // Parallax effect for hero background
    heroSection.css('background-position-y', scrollPosition * 0.5 + 'px');
    
    // Fade effect as user scrolls
    const opacity = 0.25 - Math.min(scrollPosition / 1200, 0.25);
    $('.hero-overlay').css('opacity', opacity);
  });
  
  // Add animation to hero elements when they come into view
  animateHeroElements();
}

function animateHeroElements() {
  // Simple entrance animations for hero elements using Bootstrap classes
  $('.hero-title').addClass('animate__animated animate__fadeInUp');
  $('.hero-subtitle').addClass('animate__animated animate__fadeInUp animate__delay-1s');
  $('.hero-buttons').addClass('animate__animated animate__fadeInUp animate__delay-2s');
  $('.hero-features').addClass('animate__animated animate__fadeInUp animate__delay-3s');
}

function loadPageContent(page) {
  // This function should integrate with the existing navigation system
  // For now, we'll just trigger the global navigation function
  if (typeof window.loadPageContent === 'function') {
    window.loadPageContent(page);
  } else {
    // Fallback to direct navigation
    window.location.href = '/' + (page === 'home' ? '' : page);
  }
}