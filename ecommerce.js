// Données des produits (simulées)
const products = [
    {
        id: 1,
        name: "Pack Démarrage Site Web PRO",
        description: "Un site web vitrine professionnel, 5 pages, responsive design et optimisation SEO avancée.",
        price: 250000, // Prix en FCFA
        image: "images/prod-website-pro.jpg"
    },
    {
        id: 2,
        name: "Audit & Optimisation CyberSécurité",
        description: "Analyse approfondie de vos systèmes et recommandations pour renforcer votre sécurité digitale.",
        price: 180000,
        image: "images/prod-cybersecurity-audit.jpg"
    },
    {
        id: 3,
        name: "Forfait Maintenance Site Annuelle",
        description: "Support technique prioritaire, mises à jour régulières, et sauvegardes automatiques pour 1 an.",
        price: 95000,
        image: "images/prod-maintenance-annuelle.jpg"
    },
    {
        id: 4,
        name: "Consultation Stratégie Digitale (2h)",
        description: "Session personnalisée avec nos experts pour définir une feuille de route digitale pour votre entreprise.",
        price: 45000,
        image: "images/prod-digital-strategy.jpg"
    },
    {
        id: 5,
        name: "Formation Avancée WordPress",
        description: "Maîtrisez WordPress de A à Z : création de thèmes, plugins, et optimisation de performance.",
        price: 150000,
        image: "images/prod-wordpress-training.jpg"
    },
    {
        id: 6,
        name: "Développement Application Mobile (MVP)",
        description: "Conception et développement d'un Produit Minimum Viable pour votre application iOS/Android.",
        price: 600000,
        image: "images/prod-mobile-app-mvp.jpg"
    },
    {
        id: 7,
        name: "Service de Référencement SEO Premium",
        description: "Améliorez drastiquement votre visibilité sur Google avec nos techniques SEO de pointe.",
        price: 120000,
        image: "images/prod-seo-premium.jpg"
    },
    {
        id: 8,
        name: "Solution de Sauvegarde Cloud Sécurisée",
        description: "Mise en place d'une solution automatisée et cryptée pour toutes vos données importantes dans le cloud.",
        price: 70000,
        image: "images/prod-cloud-backup.jpg"
    },
    // NOUVEAUX PRODUITS INFORMATIQUES
    {
        id: 9,
        name: "Ordinateur Portable HP Pavilion 15",
        description: "Processeur Intel Core i5, 8 Go RAM, 256 Go SSD. Idéal pour le travail et le divertissement.",
        price: 450000,
        image: "images/prod-laptop-hp.jpg"
    },
    {
        id: 10,
        name: "Disque Dur Externe Seagate 1 To",
        description: "Stockage fiable et rapide pour toutes vos données importantes. USB 3.0.",
        price: 55000,
        image: "images/prod-hdd-seagate.jpg"
    },
    {
        id: 11,
        name: "Clavier Mécanique Gaming RGB",
        description: "Expérience de frappe réactive et rétroéclairage personnalisable pour les gamers.",
        price: 75000,
        image: "images/prod-keyboard-gaming.jpg"
    },
    {
        id: 12,
        name: "Souris Sans Fil Logitech MX Master 3",
        description: "Précision et confort ultimes pour les professionnels. Batterie longue durée.",
        price: 60000,
        image: "images/prod-mouse-logitech.jpg"
    },
    {
        id: 13,
        name: "Écran PC Dell UltraSharp 24 pouces",
        description: "Résolution Full HD, couleurs éclatantes et design ergonomique pour la productivité.",
        price: 180000,
        image: "images/prod-monitor-dell.jpg"
    },
    {
        id: 14,
        name: "Routeur Wi-Fi TP-Link Archer C6",
        description: "Dual-band Gigabit, AC1200. Améliorez la vitesse et la portée de votre réseau domestique.",
        price: 40000,
        image: "images/prod-router-tplink.jpg"
    },
    {
        id: 15,
        name: "Webcam Logitech C920 HD Pro",
        description: "Qualité vidéo Full HD 1080p pour vos appels vidéo et streaming. Micro intégré.",
        price: 35000,
        image: "images/prod-webcam-logitech.jpg"
    },
    {
        id: 16,
        name: "Imprimante Multifonction Epson EcoTank",
        description: "Impression, copie, scan. Système de réservoirs d'encre pour des coûts ultra-faibles.",
        price: 120000,
        image: "images/prod-printer-epson.jpg"
    }
];

let cart = JSON.parse(localStorage.getItem('ipa_ecommerce_cart_v2')) || [];

const productListDiv = document.getElementById('product-list');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const cartItemCountSpan = document.getElementById('cart-item-count');

const paymentMethodCards = document.querySelectorAll('.payment-method-card');
const paymentSelectionMessage = document.getElementById('payment-selection-message');

let selectedPaymentMethod = null;

function displayProducts() {
    productListDiv.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">${product.price.toLocaleString('fr-FR')} FCFA</p>
            <button data-id="${product.id}"><i class="fas fa-cart-plus"></i> Ajouter au panier</button>
        `;
        productListDiv.appendChild(productCard);
    });

    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            addProductToCart(productId);
        });
    });
}

function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
        saveCart();
    }
}

function removeProductFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCart();
}

function updateCartDisplay() {
    cartItemsDiv.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Votre panier est vide.</p>';
        checkoutButton.disabled = true;
        paymentSelectionMessage.classList.remove('show');
        paymentMethodCards.forEach(card => card.classList.remove('selected'));
        selectedPaymentMethod = null;
    } else {
        checkoutButton.disabled = false;
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <span>${item.name} (x${item.quantity}) - ${ (item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i> Supprimer</button>
            `;
            cartItemsDiv.appendChild(cartItemDiv);
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });
    }

    cartTotalSpan.textContent = total.toLocaleString('fr-FR');
    if (cartItemCountSpan) {
        cartItemCountSpan.textContent = itemCount;
    }

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            removeProductFromCart(productId);
        });
    });
}

function saveCart() {
    localStorage.setItem('ipa_ecommerce_cart_v2', JSON.stringify(cart));
}

paymentMethodCards.forEach(card => {
    card.addEventListener('click', () => {
        paymentMethodCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedPaymentMethod = card.dataset.method;

        let message = "";
        switch (selectedPaymentMethod) {
            case 'orange':
                message = "Vous avez choisi Orange Money. Un représentant IPA Services vous contactera pour les instructions de paiement.";
                break;
            case 'mtn':
                message = "Vous avez choisi MTN MoMo. Nous vous enverrons les détails pour finaliser la transaction rapidement.";
                break;
            case 'moov':
                message = "Vous avez choisi MOOV Money. Les informations pour le paiement vous seront transmises après confirmation de commande.";
                break;
            case 'wave':
                message = "Vous avez choisi Wave. Payez via l'application Wave sur le numéro indiqué par notre service client.";
                break;
            default:
                message = "Veuillez sélectionner un mode de paiement.";
        }
        paymentSelectionMessage.textContent = message;
        paymentSelectionMessage.classList.add('show');
    });
});

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Votre panier est vide. Veuillez ajouter des articles avant de confirmer la commande.");
        return;
    }

    if (!selectedPaymentMethod) {
        alert("Veuillez sélectionner un mode de paiement avant de confirmer votre commande.");
        return;
    }

    const confirmOrder = confirm(`Confirmer votre commande pour un total de ${cartTotalSpan.textContent} FCFA via ${selectedPaymentMethod.toUpperCase()}?\n\nUn représentant IPA Services vous contactera pour les détails de paiement.`);

    if (confirmOrder) {
        alert(`Commande enregistrée ! Merci pour votre achat.\nUn représentant vous contactera très bientôt.`);

        cart = [];
        updateCartDisplay();
        saveCart();
        paymentSelectionMessage.classList.remove('show');
        paymentSelectionMessage.textContent = "Veuillez sélectionner un mode de paiement.";
        paymentMethodCards.forEach(card => card.classList.remove('selected'));
        selectedPaymentMethod = null;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartDisplay();
});