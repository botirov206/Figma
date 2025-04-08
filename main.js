// Create a reusable class for quantity selectors
class QuantitySelector {
  constructor(element) {
    this.element = element;
    this.input = element.querySelector('.quantity-input');
    this.minusBtn = element.querySelector('.minus');
    this.plusBtn = element.querySelector('.plus');
    this.init();
  }

  init() {
    this.minusBtn.addEventListener('click', () => this.decrease());
    this.plusBtn.addEventListener('click', () => this.increase());
    this.input.addEventListener('input', () => this.validate());
  }

  decrease() {
    let value = parseInt(this.input.value);
    if (value > 1) {
      this.input.value = value - 1;
    }
  }

  increase() {
    let value = parseInt(this.input.value);
    this.input.value = value + 1;
  }

  validate() {
    this.input.value = this.input.value.replace(/[^0-9]/g, '');
    if (this.input.value === '' || parseInt(this.input.value) < 1) {
      this.input.value = 1;
    }
  }
}

// Create a reusable class for notifications
class Notification {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.add('show');
    setTimeout(() => {
      this.element.classList.remove('show');
    }, 3000);
  }
}

// Initialize components
document.addEventListener('DOMContentLoaded', function() {
  // Initialize quantity selectors
  const quantitySelectors = document.querySelectorAll('.quantity-selector');
  quantitySelectors.forEach(selector => new QuantitySelector(selector));

  // Initialize notifications
  const cartNotification = new Notification(document.getElementById('cart-notification'));
  const wishlistNotification = new Notification(document.getElementById('wishlist-notification'));

  // Initialize cart functionality
  const addToCartBtns = document.querySelectorAll('[id^="add-to-cart"]');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cartNotification.show();
      updateCartCount();
    });
  });
});

/**
 * Product Image Gallery
 * Allows users to switch the main product image by clicking on thumbnails
 */
function initProductGallery() {
  const mainImage = document.getElementById('main-product-image');
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Update main image
      const imageUrl = this.getAttribute('data-image');
      mainImage.src = imageUrl;

      // Update active thumbnail
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

/**
 * Tab Navigation
 * Handles switching between description and reviews tabs
 */
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Add active class to clicked button and corresponding pane
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

/**
 * Wishlist Functionality
 * Handles adding products to the wishlist with notification
 */
function initWishlist() {
  const wishlistBtn = document.getElementById('add-to-wishlist');
  const wishlistNotification = document.getElementById('wishlist-notification');

  if (wishlistBtn && wishlistNotification) {
    wishlistBtn.addEventListener('click', function() {
      // Toggle wishlist state
      this.classList.toggle('active');

      // Toggle icon between regular and solid heart
      const icon = this.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        wishlistNotification.show();
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    });
  }
}

/**
 * Newsletter Form
 * Handles newsletter subscription form submission
 */
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterMessage = document.getElementById('newsletter-message');

  if (newsletterForm && newsletterEmail && newsletterMessage) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Simple email validation
      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newsletterMessage.textContent = 'Пожалуйста, введите корректный email адрес';
        newsletterMessage.className = 'form-message error';
        return;
      }

      // In a real implementation, this would submit the form to a server
      // For this demo, we just show a success message
      newsletterMessage.textContent = 'Спасибо за подписку!';
      newsletterMessage.className = 'form-message success';
      newsletterEmail.value = '';

      // Reset message after 3 seconds
      setTimeout(() => {
        newsletterMessage.textContent = '';
        newsletterMessage.className = 'form-message';
      }, 3000);
    });
  }
}

/**
 * Mobile Menu
 * Handles mobile menu toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const menuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && menuClose && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    menuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('show');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  }
}

/**
 * Helper Functions
 */

// Update cart count (simulated)
function updateCartCount() {
  // In a real implementation, this would update the cart count from the server
  // For this demo, we just increment a counter
  const cartBtn = document.querySelector('.cart-btn span');
  if (cartBtn) {
    // Extract current count and total
    const cartText = cartBtn.textContent;
    const match = cartText.match(/Товаров (\d+) $$([\d.]+)€$$/);

    if (match) {
      let count = parseInt(match[1]);
      let total = parseFloat(match[2]);

      // Get quantity and price
      const quantityInput = document.getElementById('quantity-input');
      const priceElement = document.querySelector('.current-price');

      if (quantityInput && priceElement) {
        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(priceElement.textContent);

        // Update count and total
        count += 1;
        total += price * quantity;

        // Update cart text
        cartBtn.textContent = `Товаров ${count} (${total.toFixed(2)}€)`;
      }
    }
  }
}