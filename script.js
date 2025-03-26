document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Mettre à jour l'icône
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
    
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Changement de langue (simulé)
    const langButtons = document.querySelectorAll('.language-switcher button');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Ici, vous ajouteriez la logique pour changer la langue
        });
    });
    
    // Onglets des ressources
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Formulaire de contact
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Ici, vous enverriez les données à un serveur
        console.log('Formulaire soumis:', data);
        
        // Message de succès
        alert('Merci pour votre message ! Nous vous répondrons dès que possible.');
        this.reset();
    });
    
    // Simulation de chargement des métiers
    function loadMetiers() {
        const metiersGrid = document.querySelector('.metiers-grid');
        
        // En réalité, vous feriez une requête AJAX ici
        const metiers = [
            { title: "Médecin", sector: "sante", level: "bac+3", desc: "Soigner les patients et diagnostiquer des maladies." },
            { title: "Ingénieur Informatique", sector: "technologie", level: "bac+3", desc: "Concevoir et développer des solutions logicielles." },
            { title: "Enseignant", sector: "education", level: "bac+3", desc: "Transmettre des connaissances aux élèves." },
            { title: "Agriculteur", sector: "agriculture", level: "bac", desc: "Cultiver la terre et élever du bétail." },
            { title: "Infirmier", sector: "sante", level: "bac+2", desc: "Prendre soin des patients sous supervision médicale." },
            { title: "Développeur Web", sector: "technologie", level: "bac+2", desc: "Créer des sites et applications web." }
        ];
        
        metiersGrid.innerHTML = '';
        
        metiers.forEach(metier => {
            const card = document.createElement('div');
            card.className = 'metier-card fade-in';
            card.innerHTML = `
                <h3>${metier.title}</h3>
                <div class="metier-meta">
                    <span class="sector">${metier.sector}</span>
                    <span class="level">${metier.level}</span>
                </div>
                <p>${metier.desc}</p>
                <a href="#" class="btn small">Voir la fiche</a>
            `;
            metiersGrid.appendChild(card);
        });
    }
    
    // Filtrage des métiers
    const secteurFilter = document.getElementById('secteur-filter');
    const niveauFilter = document.getElementById('niveau-filter');
    
    secteurFilter.addEventListener('change', loadMetiers);
    niveauFilter.addEventListener('change', loadMetiers);
    
    // Chargement initial
    loadMetiers();
    
    // Simulation de chargement des ressources
    function loadRessources(tabId) {
        const tabContent = document.getElementById(tabId);
        const ressourcesList = tabContent.querySelector('.ressources-list');
        
        // En réalité, vous feriez une requête AJAX ici
        let ressources = [];
        
        if (tabId === 'etablissements') {
            ressources = [
                { title: "Lycées publics", desc: "Liste complète des lycées publics à Madagascar" },
                { title: "Universités", desc: "Toutes les universités publiques et privées" },
                { title: "Écoles techniques", desc: "Établissements de formation technique" }
            ];
        } else if (tabId === 'programmes') {
            ressources = [
                { title: "Programme du bac", desc: "Détails des matières et coefficients" },
                { title: "Filières universitaires", desc: "Descriptif des différentes filières" },
                { title: "Formations professionnelles", desc: "Catalogue des formations disponibles" }
            ];
        } else if (tabId === 'bourses') {
            ressources = [
                { title: "Bourses d'état", desc: "Comment postuler aux bourses gouvernementales" },
                { title: "Bourses internationales", desc: "Opportunités à l'étranger" },
                { title: "Aides financières", desc: "Autres formes de soutien financier" }
            ];
        } else if (tabId === 'conseils') {
            ressources = [
                { title: "Réussir ses examens", desc: "Conseils pour bien se préparer" },
                { title: "Choisir sa filière", desc: "Guide d'orientation pas à pas" },
                { title: "CV et entretiens", desc: "Préparer son entrée dans le monde professionnel" }
            ];
        }
        
        ressourcesList.innerHTML = '';
        
        ressources.forEach(res => {
            const item = document.createElement('div');
            item.className = 'ressource-item fade-in';
            item.innerHTML = `
                <h4>${res.title}</h4>
                <p>${res.desc}</p>
                <a href="#" class="btn small">Voir plus</a>
            `;
            ressourcesList.appendChild(item);
        });
    }
    
    // Charger les ressources pour l'onglet actif au démarrage
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        loadRessources(activeTab.getAttribute('data-tab'));
    }
    
    // Écouteurs pour les onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            loadRessources(tabId);
        });
    });
    
    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
});
