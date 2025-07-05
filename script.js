document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------------------
    // Effet "Sticky Navbar" au défilement
    // ------------------------------------------
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ------------------------------------------
    // Menu Hamburger pour mobile
    // ------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.getElementById('main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });

        document.querySelectorAll('#main-nav ul li a:not(.dropbtn)').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // ------------------------------------------
    // Bouton "Découvrir nos services" (section Hero)
    // ------------------------------------------
    const ctaDiscoverButton = document.getElementById('ctaDiscover');
    if (ctaDiscoverButton) {
        ctaDiscoverButton.addEventListener('click', function() {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ------------------------------------------
    // Bouton "Demander un devis" (section Hero)
    // ------------------------------------------
    const ctaQuoteButton = document.getElementById('ctaQuote');
    if (ctaQuoteButton) {
        ctaQuoteButton.addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            alert('Veuillez remplir le formulaire ci-dessous pour votre demande de devis.');
        });
    }

    // ------------------------------------------
    // Gestion du formulaire de contact (Simulation)
    // ------------------------------------------
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            console.log('Tentative d\'envoi du formulaire :');
            console.log('Nom:', nom);
            console.log('Email:', email);
            console.log('Message:', message);
            alert('Votre message a été envoyé avec succès ! IPA Services vous recontactera bientôt.');
            contactForm.reset();
        });
    }

    // ------------------------------------------
    // Effet de défilement doux pour la navigation interne
    // ------------------------------------------
    document.querySelectorAll('header nav a, .btn-ghost').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault(); 
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------------
    // Animations à l'apparition des sections (Intersection Observer API)
    // ------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section:not(.hero)').forEach(section => {
        sectionObserver.observe(section);
    });

    // ------------------------------------------
    // Lecture de la vidéo en arrière-plan des cartes de service au survol
    // ------------------------------------------
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const video = card.querySelector('.card-video-bg');
        if (video) {
            video.pause(); 

            card.addEventListener('mouseenter', () => {
                video.play();
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Remet la vidéo au début pour la prochaine fois
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Active/désactive une classe 'active' sur la navigation
        });

        // Ferme le menu si un lien est cliqué (utile pour les liens ancre)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }

    // Gestion du menu burger pour le header de la page e-commerce (qui a une nav différente)
    const ecommerceMenuToggle = document.querySelector('.ecommerce-header .menu-toggle');
    const ecommerceMainNav = document.querySelector('.ecommerce-header .main-nav'); // Peut être la même si vous voulez garder la nav cachée

    // Si la navigation de l'e-commerce est une duplication, assurez-vous de la cibler correctement
    // Pour cet exemple, j'ai supposé que .main-nav serait toujours cachée sur l'ecommerce.html
    // Si vous voulez qu'un menu burger spécifique s'ouvre pour l'ecommerce, vous devrez ajuster.
    // Pour l'instant, on se base sur la navigation principale du header.
});

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.ecommerce-header .search-bar form');
    const searchInput = document.getElementById('search-input');

    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            // Empêche l'envoi par défaut du formulaire (si vous voulez le gérer entièrement en JS)
            // event.preventDefault();

            const searchTerm = searchInput.value.trim(); // Récupère le terme de recherche et supprime les espaces
            
            if (searchTerm === "") {
                alert("Veuillez entrer un terme de recherche.");
                event.preventDefault(); // Empêche l'envoi si la recherche est vide
                return;
            }

            // Si vous n'avez pas empêché le comportement par défaut, le formulaire sera envoyé
            // au 'action' spécifié dans le HTML.
            
            // Si vous voulez gérer la redirection ou l'API côté client :
            // window.location.href = `/recherche?q=${encodeURIComponent(searchTerm)}`;
        });
    }
});