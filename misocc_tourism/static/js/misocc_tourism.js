// Global JavaScript for MisOcc Tourism Website
// Uses jQuery and AJAX for dynamic content loading

$(document).ready(function() {
  // Initialize the website functionality
  initWebsite();
});

function initWebsite() {
  // Set up AJAX navigation
  setupAjaxNavigation();
  
  // Set up navbar enhancements
  setupNavbarEnhancements();
  
  // Set up any other global functionality
  setupGlobalFeatures();
}

function setupAjaxNavigation() {
  // Handle navigation clicks for dynamic page loading
  $(document).on('click', '[data-page]', function(e) {
    e.preventDefault();
    const targetPage = $(this).data('page');
    if (targetPage) {
      loadPageContent(targetPage);
    }
  });
}

function loadPageContent(page) {
  // Show loading indicator
  showLoadingIndicator();
  
  // Update active nav link
  updateActiveNavLink(page);
  
  // Make AJAX request to load page content
  $.ajax({
    url: '/navigate/',
    method: 'POST',
    data: {
      'page': page,
      'csrfmiddlewaretoken': getCSRFToken()
    },
    success: function(response) {
      if (response.success) {
        // Update content area
        $('#content-area').html(response.content);
        
        // Update URL without page reload
        history.pushState({page: page}, '', '/' + (page === 'home' ? '' : page));
        
        // Scroll to top
        $('html, body').animate({ scrollTop: 0 }, 300);
        
        // Reinitialize any components that might be needed
        initPageComponents();
      } else {
        console.error('Failed to load page:', response.error);
        handleNavigationError();
      }
    },
    error: function(xhr, status, error) {
      console.error('AJAX Error:', error);
      handleNavigationError();
    },
    complete: function() {
      // Hide loading indicator
      hideLoadingIndicator();
    }
  });
}

function updateActiveNavLink(page) {
  // Remove active class from all nav links
  $('.custom-nav-link').removeClass('active');
  
  // Add active class to the current page link
  $(`.custom-nav-link[data-page="${page}"]`).addClass('active');
}

function showLoadingIndicator() {
  // Add a loading spinner or indicator to the content area
  $('#content-area').html(`
    <div class="container mx-auto px-4 py-8 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007F5F]"></div>
      <p class="mt-4 text-gray-600">Loading...</p>
    </div>
  `);
}

function hideLoadingIndicator() {
  // Remove loading indicator (handled by content replacement)
}

function handleNavigationError() {
  // Show error message
  $('#content-area').html(`
    <div class="container mx-auto px-4 py-8 text-center">
      <h2 class="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
      <p class="text-gray-600 mb-4">We couldn't load the requested page. Please try again.</p>
      <button class="bg-[#007F5F] text-white px-4 py-2 rounded-lg hover:bg-[#00A8E8] transition-colors" onclick="location.reload()">
        Reload Page
      </button>
    </div>
  `);
}

function getCSRFToken() {
  // Get CSRF token from meta tag or cookie
  return $('meta[name=csrf-token]').attr('content') || 
         $('input[name=csrfmiddlewaretoken]').val() ||
         $('[name=csrfmiddlewaretoken]').val();
}

function setupGlobalFeatures() {
  // Set up scroll to top button
  setupScrollToTop();
  
  // Set up any other global features
  $(window).on('scroll', function() {
    toggleScrollToTopButton();
  });
}

function setupScrollToTop() {
  // Add scroll to top button to the page if it doesn't exist
  if ($('#scroll-to-top').length === 0) {
    $('body').append(`
      <button id="scroll-to-top" 
              class="fixed bottom-6 right-6 bg-[#007F5F] text-white p-3 rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 hover:bg-[#00A8E8]"
              title="Scroll to top">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    `);
    
    // Handle click event
    $('#scroll-to-top').on('click', function() {
      $('html, body').animate({ scrollTop: 0 }, 300);
    });
  }
}

function toggleScrollToTopButton() {
  const scrollToTopButton = $('#scroll-to-top');
  if ($(window).scrollTop() > 300) {
    scrollToTopButton.removeClass('opacity-0 pointer-events-none').addClass('opacity-100');
  } else {
    scrollToTopButton.removeClass('opacity-100').addClass('opacity-0 pointer-events-none');
  }
}

function initPageComponents() {
  // Reinitialize any components that might need to be reinitialized after AJAX content load
  toggleScrollToTopButton();
  
  // Initialize any other page-specific components
  // This can be extended as needed
}

// Handle browser back/forward buttons
$(window).on('popstate', function(event) {
  if (event.originalEvent.state && event.originalEvent.state.page) {
    loadPageContent(event.originalEvent.state.page);
  } else {
    // Load home page if no state
    loadPageContent('home');
  }
});

function setupNavbarEnhancements() {
  // Add smooth hover effects to navbar items
  $('.custom-nav-link').on('mouseenter', function() {
    $(this).addClass('hover-effect');
  }).on('mouseleave', function() {
    $(this).removeClass('hover-effect');
  });
  
  // Add animation to navbar on scroll
  $(window).on('scroll', function() {
    const navbar = $('.custom-navbar');
    if ($(window).scrollTop() > 50) {
      navbar.addClass('scrolled');
    } else {
      navbar.removeClass('scrolled');
    }
  });
  
  // Initialize navbar scroll state
  if ($(window).scrollTop() > 50) {
    $('.custom-navbar').addClass('scrolled');
  }
}