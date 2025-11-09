$(document).ready(function() {
  // Handle scroll event for navbar styling
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
      $('.custom-navbar').addClass('scrolled');
    } else {
      $('.custom-navbar').removeClass('scrolled');
    }
  });

  // Handle navigation clicks for all nav links
  $('.custom-nav-link, .logo-button').on('click', function(e) {
    e.preventDefault();
    
    // Get the target page from data attribute or default to home
    const targetPage = $(this).data('page') || 'home';
    
    // Add visual feedback
    $(this).addClass('clicked');
    setTimeout(() => {
      $(this).removeClass('clicked');
    }, 300);
    
    // Navigate to the target page
    navigateToPage(targetPage);
  });

  // Function to navigate to a page using AJAX
  function navigateToPage(page) {
    // Add loading state
    const originalContent = $('#content-area').html();
    $('#content-area').html('<div class="container mx-auto px-4 py-8 text-center"><div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007F5F]"></div></div>');
    
    $.ajax({
      url: '/navigate/',
      method: 'POST',
      data: {
        'page': page,
        'csrfmiddlewaretoken': $('[name=csrfmiddlewaretoken]').val()
      },
      success: function(response) {
        if (response.success) {
          // Update the content area with new content
          $('#content-area').html(response.content);
          
          // Update active nav link
          $('.custom-nav-link').removeClass('active');
          $(`.custom-nav-link[data-page="${page}"]`).addClass('active');
          
          // Scroll to top
          $('html, body').animate({ scrollTop: 0 }, 300);
        } else {
          console.error('Navigation failed:', response.error);
          $('#content-area').html(originalContent);
        }
      },
      error: function(xhr, status, error) {
        console.error('AJAX Error:', error);
        $('#content-area').html(originalContent);
        // Fallback to traditional navigation
        window.location.href = '/' + (page === 'home' ? '' : page);
      }
    });
  }

  // Initialize navbar state
  if ($(window).scrollTop() > 50) {
    $('.custom-navbar').addClass('scrolled');
  }
  
  // Set initial active state based on current page
  const currentPage = $('body').data('current-page') || 'home';
  $(`.custom-nav-link[data-page="${currentPage}"]`).addClass('active');
});