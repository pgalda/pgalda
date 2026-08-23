/* -------------------------------------------------------------
 * GOLDASOFT.COM Premium JavaScript Logic
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Dynamic Footer Year Updater
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Drawer Toggle
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const bodyElement = document.body;

  if (menuToggleBtn && mobileDrawer) {
    const toggleMenu = () => {
      const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
      
      // Update attributes
      menuToggleBtn.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.setAttribute('aria-hidden', isExpanded);
      
      // Toggle CSS classes
      menuToggleBtn.classList.toggle('hamburger-active');
      mobileDrawer.classList.toggle('drawer-open');
      
      // Prevent scrolling when drawer is open
      if (!isExpanded) {
        bodyElement.style.overflow = 'hidden';
      } else {
        bodyElement.style.overflow = '';
      }
    };

    menuToggleBtn.addEventListener('click', toggleMenu);

    // Close drawer when clicking nav links
    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (menuToggleBtn.classList.contains('hamburger-active')) {
          toggleMenu();
        }
      });
    });
  }

  // 3. Scroll Reveal Animation using Intersection Observer
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once animated, no need to keep observing
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12, // Element must be 12% visible to trigger
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters full view
    });

    revealElements.forEach(elem => {
      revealObserver.observe(elem);
    });
  } else {
    // Fallback: immediately reveal all if browser doesn't support IntersectionObserver
    revealElements.forEach(elem => {
      elem.classList.add('revealed');
    });
  }

  // 4. Smooth Anchor Link Scrolling (Safari & Legacy browser support)
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        
        // Compute offset for the sticky nav bar (60px height)
        const navHeight = 60;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Contact Info Secure Obfuscation (Prevents bot scraping & spam)
  // We store strings as Base64. Static parser bots cannot decode them.
  const secureEmail = 'cGdhbGRhQG91dGxvb2suY29t'; // pgalda@outlook.com
  const secureMailto = 'bWFpbHRvOnBnYWxkYUBvdXRsb29rLmNvbQ=='; // mailto:pgalda@outlook.com
  const securePhone = 'KzEgKDkxNykgNzI3LTUxMjA='; // +1 (917) 727-5120
  const secureTel = 'dGVsOisxOTE3NzI3NTEyMA=='; // tel:+19177275120

  const emailCard = document.getElementById('secure-email-card');
  const emailPlaceholder = document.getElementById('email-placeholder');
  const emailActionBtn = document.getElementById('email-action-btn');
  
  const phoneCard = document.getElementById('secure-phone-card');
  const phonePlaceholder = document.getElementById('phone-placeholder');
  const phoneActionBtn = document.getElementById('phone-action-btn');

  let emailRevealed = false;
  let phoneRevealed = false;

  const revealEmail = () => {
    if (emailRevealed) return;
    emailRevealed = true;
    const emailAddr = atob(secureEmail);
    const emailLink = atob(secureMailto);
    
    if (emailPlaceholder && emailActionBtn) {
      emailPlaceholder.textContent = emailAddr;
      emailActionBtn.textContent = "Send Email";
      emailActionBtn.setAttribute('href', emailLink);
    }
  };

  const revealPhone = () => {
    if (phoneRevealed) return;
    phoneRevealed = true;
    const phoneNum = atob(securePhone);
    const phoneLink = atob(secureTel);
    
    if (phonePlaceholder && phoneActionBtn) {
      phonePlaceholder.textContent = phoneNum;
      phoneActionBtn.textContent = "Call Directly";
      phoneActionBtn.setAttribute('href', phoneLink);
    }
  };

  // Reveal on mouse hover (mouseenter) for seamless desktop experience
  if (emailCard) {
    emailCard.addEventListener('mouseenter', revealEmail);
  }
  if (phoneCard) {
    phoneCard.addEventListener('mouseenter', revealPhone);
  }

  // Reveal on direct button click / tap (crucial for mobile touch screens)
  if (emailActionBtn) {
    emailActionBtn.addEventListener('click', (e) => {
      if (!emailRevealed) {
        e.preventDefault(); // Stop initial navigation
        revealEmail();
      }
    });
  }

  if (phoneActionBtn) {
    phoneActionBtn.addEventListener('click', (e) => {
      if (!phoneRevealed) {
        e.preventDefault(); // Stop initial navigation
        revealPhone();
      }
    });
  }

});
