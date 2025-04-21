// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const header = document.getElementById('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');
  const skillLevels = document.querySelectorAll('.skill-level');
  
  // Variables
  let lastScrollTop = 0;
  
  // Add scroll event listener
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header scroll effect
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    lastScrollTop = scrollTop;
  });
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Toggle between hamburger and close icon
    if (menuToggle.classList.contains('active')) {
      menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
  
  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Animate skill levels on scroll
  function animateSkills() {
    skillLevels.forEach(skill => {
      const skillPosition = skill.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (skillPosition < screenPosition) {
        skill.style.width = skill.getAttribute('style').split(':')[1];
      } else {
        skill.style.width = '0';
      }
    });
  }
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe all animated elements
  document.querySelectorAll('.skill-level, .project-card, .timeline-item, .certification-card').forEach(element => {
    observer.observe(element);
  });
  
  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For now, we'll just log it to the console
      console.log({
        name,
        email,
        subject,
        message
      });
      
      // Reset the form
      contactForm.reset();
      
      // Show success message (you can replace this with a more elegant solution)
      alert('Thank you for your message! I will get back to you soon.');
    });
  }
  
  // Initial call to set active nav link on page load
  updateActiveNavLink();
  
  // Call animateSkills when scrolling
  window.addEventListener('scroll', animateSkills);
  // Initial call to animate visible skills
  animateSkills();
});