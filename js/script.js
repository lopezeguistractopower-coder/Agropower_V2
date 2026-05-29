// Inicializar todas las funcionalidades cuando el HTML esté listo
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // CONTROL DE PANTALLA DE CARGA (PRELOADER)
    // ==========================================================================
    const preloader = document.getElementById('loading-screen');
    if (preloader) {
        // Forzamos que se oculte tras un breve instante para que nunca se quede trabado
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 600);
    }

    // Inicializar iconos de Lucide si la librería está cargada
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // NAVBAR / MENÚ MÓVIL
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    const navbar = document.getElementById('main-nav');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.height = "65px";
                navbar.style.backgroundColor = "rgba(10, 10, 10, 0.98)";
                navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
            } else {
                navbar.style.height = "70px";
                navbar.style.backgroundColor = "rgba(16, 16, 16, 0.95)";
                navbar.style.boxShadow = "none";
            }
        });
    }

    // ==========================================================================
    // SIMULADOR INTERACTIVO (ASISTENTE POR PASOS)
    // ==========================================================================
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const resultBox = document.getElementById('quiz-result-box');
    const btnBack = document.getElementById('btn-back-step');
    const btnReset = document.getElementById('btn-reset-quiz');
    
    const resultTitle = document.getElementById('result-tractor-title');
    const resultDesc = document.getElementById('result-tractor-desc');
    const whatsappBtn = document.getElementById('whatsapp-result-btn');

    let userAnswers = {
        extension: '',
        labor: ''
    };

    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const currentBtn = e.target.closest('.option-btn');
            if (!currentBtn) return;

            const key = currentBtn.getAttribute('data-key');
            const value = currentBtn.getAttribute('data-value');

            userAnswers[key] = value;

            if (key === 'extension') {
                if (step1) step1.style.display = 'none';
                if (step2) step2.style.display = 'block';
            } 
            else if (key === 'labor') {
                if (step2) step2.style.display = 'none';
                calculateWizardResult();
            }
        });
    });

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            if (step2) step2.style.display = 'none';
            if (step1) step1.style.display = 'block';
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (resultBox) resultBox.style.display = 'none';
            userAnswers = { extension: '', labor: '' };
            if (step1) step1.style.display = 'block';
        });
    }

    function calculateWizardResult() {
        let recommendedTractor = "";
        let tractorDescription = "";
        let whatsappMessage = "";

        if (userAnswers.extension === 'pequena' && userAnswers.labor === 'ligera') {
            recommendedTractor = "Tractor Agropower de 50 HP";
            tractorDescription = "Agilidad y eficiencia en formato compacto. Ideal para medianas fincas y mantenimiento liviano.";
            whatsappMessage = "¡Hola Agropower! Realicé el test interactivo en su web y me recomendó el Tractor de 50 HP para mi terreno de menos de 20 Hectáreas. Solicito cotización.";
        } 
        else if (userAnswers.extension === 'grande' || userAnswers.labor === 'pesada') {
            recommendedTractor = "Tractor Agropower con Cabina 130 HP (Edición Lujo)";
            tractorDescription = "Fuerza bruta y motor turbo-diésel de última generación. Diseñado para preparación pesada, fangueo y grandes extensiones.";
            whatsappMessage = "¡Hola Agropower! El asesor inteligente web me recomendó el Tractor con Cabina de 130 HP para operaciones pesadas a gran escala. Solicito una proforma.";
        } 
        else {
            recommendedTractor = "Tractor Agropower de 90 HP";
            tractorDescription = "La definición de polivalencia. Perfecta maniobrabilidad, ideal para cereales, ganadería y arrastre medio.";
            whatsappMessage = "¡Hola Agropower! Según el simulador web, el modelo ideal para mi finca es el Tractor de 90 HP. Me gustaría recibir los planes de financiamiento y costos.";
        }

        if (resultTitle) resultTitle.textContent = recommendedTractor;
        if (resultDesc) resultDesc.textContent = tractorDescription;

        if (whatsappBtn) {
            const encodedText = encodeURIComponent(whatsappMessage);
            whatsappBtn.setAttribute('href', `https://wa.me/+584228331171?text=${encodedText}`);
        }

        if (resultBox) {
            resultBox.style.display = 'block';
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // ==========================================================================
    // ANIMACIÓN DE APARICIÓN DINÁMICA (SCROLL REVEAL)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements && revealElements.length > 0) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
});
/**
 * AGROPOWER PREMIUM - SHOWROOM INTERACTIVO AUTOMATIZADO
 * Datos y fichas de ingeniería extraídos del catálogo oficial 2026.
 */

const productsData = [
    {
        title: "Agropower TE-1304C",
        tag: "Cabina Climatizada Premium",
        badge: "130 HP",
        price: "$56.068",
        image: "Img/Tractor 1304C Difuminado.png",
        ambientBg: "radial-gradient(circle at center, rgba(46, 125, 50, 0.28) 0%, transparent 68%)",
        whatsapp: "https://wa.me/584228331171?text=Hola,%20solicito%20cotizacion%20del%20Tractor%20TE-1304C%20130%20HP%20con%20Cabina",
        specs: [
            { icon: "cpu", label: "Motor", value: "Quanchai 6 cil (7.7L)" },
            { icon: "settings", label: "Transmisión", value: "Mecánica 16 + 8 Sincrónica" },
            { icon: "dumbbell", label: "Hidráulico", value: "75 L/min • Cat II (2.350 kg)" },
            { icon: "snowflake", label: "Confort", value: "Aislamiento Térmico 360°" }
        ]
    },
    {
        title: "Agropower TE-1304F",
        tag: "Máximo Rendimiento Cielo Abierto",
        badge: "130 HP",
        price: "$52.716",
        image: "Img/IMG_7632-Photoroom (1).png",
        ambientBg: "radial-gradient(circle at center, rgba(241, 185, 0, 0.22) 0%, transparent 68%)",
        whatsapp: "https://wa.me/584228331171?text=Hola,%20solicito%20cotizacion%20del%20Tractor%20TE-1304F%20130%20HP%20Abierto",
        specs: [
            { icon: "cpu", label: "Motor", value: "Quanchai 6 cil • Inyección Directa" },
            { icon: "settings", label: "Transmisión", value: "Toma de Fuerza 540/1000 rpm" },
            { icon: "dumbbell", label: "Flujo Hidráulico", value: "75 L/min Independiente" },
            { icon: "shield", label: "Seguridad", value: "Chasis Anti-vuelco con Techo" }
        ]
    },
    {
        title: "Agropower TE-904F",
        tag: "Eficiencia Integral Multicultivo",
        badge: "90 HP",
        price: "$31.081",
        image: "Img/IMG_7592-Photoroom.png",
        ambientBg: "radial-gradient(circle at center, rgba(27, 94, 32, 0.25) 0%, transparent 68%)",
        whatsapp: "https://wa.me/584228331171?text=Hola,%20solicito%20cotizacion%20del%20Tractor%20TE-904F%2090%20HP",
        specs: [
            { icon: "droplet", label: "Motor", value: "Quanchai 4 cil • Turbo Diésel (4.1L)" },
            { icon: "settings", label: "Transmisión", value: "Mecánica 12 + 12 Sincrónica" },
            { icon: "dumbbell", label: "Hidráulico", value: "50 L/min • Cat I (1.800 kg)" },
            { icon: "compass", label: "Autonomía", value: "Tanque 90L • Tracción 4x4" }
        ]
    },
    {
        title: "Agropower TE-504F",
        tag: "Agilidad Superior Ganadera",
        badge: "50 HP",
        price: "$21.689",
        image: "Img/Tractor 90 hp Image-Photoroom.png",
        ambientBg: "radial-gradient(circle at center, rgba(211, 47, 47, 0.18) 0%, transparent 68%)",
        whatsapp: "https://wa.me/584228331171?text=Hola,%20solicito%20cotizacion%20del%20Tractor%20TE-504F%2050%20HP",
        specs: [
            { icon: "cpu", label: "Motor", value: "Quanchai 4 cil (2.8L)" },
            { icon: "settings", label: "Transmisión", value: "Mecánica 8 + 8 Alta Durabilidad" },
            { icon: "dumbbell", label: "Elevador", value: "Doble Acción • Levante 1.200 kg" },
            { icon: "crop", label: "Aplicación", value: "Hortícola y Fincas Medianas" }
        ]
    }
];

let currentActiveIndex = 0;
let autoPlayTimer = null;
const AUTOPLAY_INTERVAL = 6000; // Rotación automática cada 6 segundos

function switchProduct(index) {
    currentActiveIndex = index;
    const data = productsData[index];
    
    const imgElement = document.getElementById("product-img");
    const bgElement = document.getElementById("showcase-bg");
    
    if (!imgElement || !bgElement) return;

    // 1. Desencadenar la transición visual (Fade Out suave)
    imgElement.classList.add("changing");

    // Recalibrar los estados de los dots de selección
    const dots = document.querySelectorAll(".nav-dot");
    dots.forEach((dot, idx) => {
        if (idx === index) dot.classList.add("active");
        else dot.classList.remove("active");
    });

    // 2. Intercambio de metadatos a mitad de la animación (Opacidad 0)
    setTimeout(() => {
        imgElement.src = data.image;
        bgElement.style.background = data.ambientBg;
        
        document.getElementById("product-title").innerText = data.title;
        document.getElementById("product-tag").innerText = data.tag;
        document.getElementById("product-badge").innerText = data.badge;
        document.getElementById("product-price").innerText = data.price;
        document.getElementById("quote-button").href = data.whatsapp;

        // Inyección limpia de la ficha técnica
        const specsContainer = document.getElementById("specs-container");
        specsContainer.innerHTML = data.specs.map(spec => `
            <div class="showcase-spec-item">
                <i data-lucide="${spec.icon}"></i>
                <div><strong>${spec.label}</strong>${spec.value}</div>
            </div>
        `).join('');

        // Forzar a la librería Lucide a refrescar los iconos inyectados
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // 3. Finalizar la animación mostrando los componentes (Fade In)
        imgElement.classList.remove("changing");
    }, 350);
}

function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
        let nextIndex = (currentActiveIndex + 1) % productsData.length;
        switchProduct(nextIndex);
    }, AUTOPLAY_INTERVAL);
}

function handleUserSelect(index) {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer); // Pausa inteligente: si el usuario hace clic, se detiene el carrusel
    }
    switchProduct(index);
}

// Inicialización del DOM y Menú Responsive Integrado
document.addEventListener("DOMContentLoaded", () => {
    // Controlar pantalla de carga corporativa de forma segura
    const loader = document.getElementById("loading-screen");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 500);
        }, 1200);
    }

    // Inicializar el showroom si los componentes existen en la página
    if (document.getElementById("product-img")) {
        switchProduct(0);
        startAutoPlay();
    }

    // Lógica del Menú Hamburguesa Móvil (Previene errores de ejecución)
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");
    if (menuToggle && navList) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = navList.classList.toggle("show");
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
                if (typeof lucide !== "undefined") lucide.createIcons();
            }
        });

        navList.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navList.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.setAttribute("data-lucide", "menu");
                    if (typeof lucide !== "undefined") lucide.createIcons();
                }
            });
        });

        document.addEventListener("click", (e) => {
            if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
                navList.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.setAttribute("data-lucide", "menu");
                    if (typeof lucide !== "undefined") lucide.createIcons();
                }
            }
        });
    }
});