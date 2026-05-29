/**
 * Agropower Premium - Showroom Interactivo
 * Lógica de datos de tractores y transiciones dinámicas (Especificaciones Expandidas)
 */

const productsData = [
    {
        title: "Agropower TE-1304C",
        tag: "Cabina Climatizada Premium",
        badge: "130 HP",
        price: "$56.068",
        image: "Img/Tractor 1304C Difuminado.png",
        glow: "rgba(46, 125, 50, 0.20)", // Verde tecnológico atenuado
        whatsapp: "https://wa.me/584228331171?text=Info%20TE-1304C",
        specs: [
            { icon: "gauge", label: "Motor", val: "Quanchai 6 cil" },
            { icon: "settings", label: "Transmisión", val: "16+8 Sincrónica" },
            { icon: "droplet", label: "Hidráulico", val: "75 L/min" },
            { icon: "shield", label: "Tracción", val: "4x4 / Cabina 360°" } // Nueva especificación
        ]
    },
    {
        title: "Agropower TE-1304F",
        tag: "Máxima Potencia Cielo Abierto",
        badge: "130 HP",
        price: "$52.716",
        image: "Img/IMG_7632-Photoroom (1).png",
        glow: "rgba(241, 185, 0, 0.15)", // Amarillo corporativo sutil
        whatsapp: "https://wa.me/584228331171?text=Info%20TE-1304F",
        specs: [
            { icon: "gauge", label: "Motor", val: "Quanchai 6 cil" },
            { icon: "settings", label: "Transmisión", val: "16+8 Mecánica" },
            { icon: "wrench", label: "Toma Fuerza", val: "540/1000 rpm" },
            { icon: "anvil", label: "Chasis", val: "Reforzado ROP" } // Nueva especificación
        ]
    },
    {
        title: "Agropower TE-904F",
        tag: "Rendimiento Inteligente",
        badge: "90 HP",
        price: "$31.081",
        image: "Img/IMG_7592-Photoroom.png",
        glow: "rgba(27, 94, 32, 0.18)", // Verde oliva agroindustrial
        whatsapp: "https://wa.me/584228331171?text=Info%20TE-904F",
        specs: [
            { icon: "gauge", label: "Motor", val: "4 cil Turbo Diesel" },
            { icon: "settings", label: "Transmisión", val: "12+12 Sincrónica" },
            { icon: "droplet", label: "Hidráulico", val: "Doble Acción" },
            { icon: "activity", label: "Tracción", val: "4x4 Dual" } // Nueva especificación
        ]
    },
    {
        title: "Agropower TE-504F",
        tag: "Agilidad en Campo Compacto",
        badge: "50 HP",
        price: "$21.689",
        image: "Img/Tractor 90 hp Image-Photoroom.png",
        glow: "rgba(211, 47, 47, 0.12)", // Destello rojizo de precisión
        whatsapp: "https://wa.me/584228331171?text=Info%20TE-504F",
        specs: [
            { icon: "gauge", label: "Motor", val: "Quanchai 4 cil" },
            { icon: "settings", label: "Transmisión", val: "Mecánica 8+8" },
            { icon: "sprout", label: "Uso Ideal", val: "Hortícola/Ganadero" },
            { icon: "scale", label: "Peso Neto", val: "2.350 kg" } // Nueva especificación
        ]
    }
];

/**
 * Controla la transición de desvanecimiento, deslizamiento y actualización de datos
 * @param {number} index - Índice del tractor seleccionado
 */
function switchProduct(index) {
    const data = productsData[index];
    const img = document.getElementById("product-img");
    const glow = document.getElementById("showcase-bg");
    
    if (!img || !glow) return;

    // Animación cinética de salida
    img.style.opacity = "0";
    img.style.transform = "translateX(-25px) scale(0.98)";

    setTimeout(() => {
        // Actualización de la imagen y del aura ambiental adaptativa
        img.src = data.image;
        glow.style.background = `radial-gradient(circle at center, ${data.glow} 0%, transparent 70%)`;
        
        // Inyección de textos básicos de información comercial
        document.getElementById("product-title").innerText = data.title;
        document.getElementById("product-tag").innerText = data.tag;
        document.getElementById("product-badge").innerText = data.badge;
        document.getElementById("product-price").innerText = data.price;
        document.getElementById("quote-button").href = data.whatsapp;

        // Construcción e inyección del nuevo set extendido de especificaciones técnicas
        const specsContainer = document.getElementById("specs-container");
        if (specsContainer) {
            specsContainer.innerHTML = data.specs.map(s => `
                <div class="spec-item">
                    <i data-lucide="${s.icon}"></i>
                    <div class="spec-texts">
                        <span class="spec-label">${s.label}</span>
                        <span class="spec-val">${s.val}</span>
                    </div>
                </div>
            `).join('');
        }

        // Re-renderizado estricto de los iconos vectoriales de Lucide
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Animación cinética de entrada
        img.style.opacity = "1";
        img.style.transform = "translateX(0) scale(1)";

        // Actualización de la clase activa en los botones selectores inferiores
        document.querySelectorAll(".nav-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }, 300); // Sincronizado con la transición CSS (0.3s)
}

function handleUserSelect(index) {
    switchProduct(index);
}

document.addEventListener("DOMContentLoaded", () => {
    switchProduct(0);

    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.transition = 'opacity 0.5s ease-out';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }
});