document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sideNav = document.querySelector('.side-nav');
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('.footer');
    
    mobileMenuBtn.addEventListener('click', function() {
        sideNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = sideNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu if open
            if (sideNav.classList.contains('active')) {
                sideNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Scroll to section
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Section observer for animations and active nav link
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Update active nav link
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
        
        // Animate child elements with slide-in class
        const slideInElements = section.querySelectorAll('.slide-in');
        slideInElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // Publication filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pubItems = document.querySelectorAll('.pub-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter publications
            pubItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Load more publications (simulated)
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, this would fetch more data from a server
            this.textContent = 'No more publications to load';
            this.style.backgroundColor = '#666';
            this.style.cursor = 'not-allowed';
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('messageForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Random profile image color if no image is provided
    const profileImg = document.getElementById('profile-img');
    if (profileImg && profileImg.getAttribute('src').includes('placeholder.com')) {
        const colors = ['#00adb5', '#ff5722', '#4caf50', '#ff9800', '#9c27b0'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        
        // Draw background
        ctx.fillStyle = randomColor;
        ctx.fillRect(0, 0, 150, 150);
        
        // Draw initials
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 50px Montserrat';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('KJ', 75, 75);
        
        // Set as image source
        profileImg.src = canvas.toDataURL();
    }
    
    // Add current year to footer
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    document.querySelector('footer p').innerHTML = `&copy; ${yearSpan.textContent} Dr. Karuppiah Jayakodi. All Rights Reserved.`;
});