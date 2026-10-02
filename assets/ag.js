document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Highlight active link on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Hamburger menu toggle (Perfume/About/New Arrivals/Reviews)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  if (hamburgerBtn && hamburgerMenu) {
    // Toggle menu on click (useful for touch)
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = hamburgerMenu.classList.contains('show');
      
      if (isOpen) {
        hamburgerMenu.classList.remove('show');
        hamburgerMenu.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      } else {
        hamburgerMenu.classList.add('show');
        hamburgerMenu.setAttribute('aria-hidden', 'false');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Prevent menu from closing when clicking inside it
    hamburgerMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburgerMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerMenu.classList.remove('show');
        hamburgerMenu.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hamburgerMenu.classList.remove('show');
        hamburgerMenu.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Newsletter form
  const form = document.querySelector(".newsletter form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to Scentinels!");
    form.reset();
  });

  // Fade-in on scroll
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // Scroll-to-Top Button
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Add to Cart functionality - Fixed version
  console.log('Adding cart functionality...'); // Debug log
  
  // Get all buttons that contain "Add to Cart" or "Add to cart"
  const allLinks = document.querySelectorAll('a');
  const cartButtons = [];
  
  allLinks.forEach(link => {
    const text = link.textContent.trim().toLowerCase();
    if (text.includes('add to cart')) {
      cartButtons.push(link);
      console.log('Found cart button:', text); // Debug log
    }
  });
  
  console.log('Total cart buttons found:', cartButtons.length); // Debug log
  
  cartButtons.forEach((button, index) => {
    console.log('Setting up button', index + 1); // Debug log
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Cart button clicked!'); // Debug log
      
      // Get the product name from the card
      const productCard = button.closest('.card');
      if (productCard) {
        const productNameElement = productCard.querySelector('.card-title');
        const productName = productNameElement ? productNameElement.textContent.trim() : 'Product';
        
        console.log('Product name:', productName); // Debug log
        
        // Update the modal with the product name
        const productNameSpan = document.getElementById('productName');
        if (productNameSpan) {
          productNameSpan.textContent = productName;
        }
        
        // Show the modal
        const modalElement = document.getElementById('addToCartModal');
        if (modalElement) {
          console.log('Showing modal...'); // Debug log
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
          
          // Change button appearance temporarily
          const originalText = button.innerHTML;
          button.style.backgroundColor = '#28a745';
          button.style.color = 'white';
          button.style.borderColor = '#28a745';
          button.innerHTML = '✓ Added!';
          
          // Reset button after 3 seconds
          setTimeout(() => {
            button.style.backgroundColor = '';
            button.style.color = '';
            button.style.borderColor = '';
            button.innerHTML = originalText;
          }, 3000);
          
          // Ensure "Continue Shopping" button reliably closes the modal and cleans up any backdrop
          const continueBtn = modalElement.querySelector('.modal-footer .btn-outline-secondary');
          if (continueBtn) {
            continueBtn.addEventListener('click', (ev) => {
              ev.preventDefault();
              try {
                modal.hide();
              } catch (err) {
                // fallback: manually remove backdrop and restore body styles
                console.warn('bootstrap.modal.hide() failed, performing manual cleanup', err);
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
                modalElement.classList.remove('show');
                modalElement.style.display = 'none';
              }
            });
          }

          // When the modal is fully hidden, ensure no leftover backdrop or classes remain
          modalElement.addEventListener('hidden.bs.modal', () => {
            // remove any stray backdrops
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(b => b.parentNode && b.parentNode.removeChild(b));
            // ensure body scroll is restored
            document.body.classList.remove('modal-open');
            document.body.style.paddingRight = '';
          });
        } else {
          console.error('Modal element not found!');
        }
      } else {
        console.error('Product card not found!');
      }
    });
  });
});
