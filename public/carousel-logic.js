
// --- DOM-BASED Refactoring for Carousel ---
function createCard(speaker) {
    const card = document.createElement('div');
    card.className = "w-[280px] md:w-[320px] shrink-0 group relative bg-boss-gray border border-white/5 rounded-sm overflow-hidden hover:border-boss-gold/50 transition-colors duration-300";

    // Image Container
    const imgContainer = document.createElement('div');
    imgContainer.className = "aspect-[4/5] overflow-hidden relative";

    // Image Logic
    let img;
    // Handle Local vs Remote Images
    if (speaker.img && speaker.img.startsWith('/carrossel/')) {
        const basePath = speaker.img.replace('.webp', '');
        img = document.createElement('img');
        img.src = `${basePath}-320.webp`;
        img.srcset = `${basePath}-320.webp 320w, ${basePath}-480.webp 480w, ${basePath}-640.webp 640w`;
        img.sizes = "(max-width: 768px) 280px, 320px";
        img.width = 320;
        img.height = 400;
        img.loading = "lazy";
    } else {
        img = document.createElement('img');
        img.src = speaker.img || ""; // Prevent null src
    }
    img.alt = speaker.name;
    img.className = "w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110";
    imgContainer.appendChild(img);

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = "absolute inset-0 bg-gradient-to-t from-boss-black via-transparent to-transparent opacity-80 pointer-events-none";
    imgContainer.appendChild(overlay);

    // Instagram
    if (speaker.instagram) {
        const link = document.createElement('a');
        link.href = `https://instagram.com/${speaker.instagram.replace('@', '')}`;
        link.target = "_blank";
        link.className = "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 z-20 hover:scale-110 transform transition-transform";
        link.innerHTML = `
                <div class="w-8 h-8 bg-boss-gold text-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>`;
        imgContainer.appendChild(link);
    }

    card.appendChild(imgContainer);

    // Info Area
    const info = document.createElement('div');
    info.className = "p-6 relative";

    const h3 = document.createElement('h3');
    h3.className = "text-xl font-serif font-bold text-white mb-1 group-hover:text-boss-gold transition-colors";
    h3.textContent = speaker.name;
    info.appendChild(h3);

    const p = document.createElement('p');
    p.className = "text-gray-400 text-xs uppercase tracking-widest mb-4";
    p.textContent = speaker.role;
    info.appendChild(p);

    card.appendChild(info);

    return card;
}

function initCarousel() {
    const track = document.getElementById("marqueeTrack");
    if (!track) {
        console.error("marqueeTrack não encontrado");
        return;
    }

    // Using baseList which is already shuffled
    // baseList is defined in index.html global scope
    if (typeof baseList === 'undefined' || !Array.isArray(baseList) || baseList.length === 0) {
        console.error("baseList vazio ou inválido", typeof baseList !== 'undefined' ? baseList : "undefined");
        return;
    }

    track.innerHTML = ""; // Clean slate

    // Helper to populate
    const populate = () => {
        baseList.forEach((speaker, i) => {
            const card = createCard(speaker);
            if (card instanceof HTMLElement) {
                track.appendChild(card);
            } else {
                console.error("createCard não retornou HTMLElement", card);
            }
        });
    };

    // Populate twice for infinite scroll
    populate();
    populate();

    console.log("Carousel initialized successfully with " + (baseList.length * 2) + " items.");
}

// Initialize
// Wait for everything to be ready if needed, or run immediately if at end of body
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const isClosed = menu.classList.contains('translate-x-full');

    if (isClosed) {
        menu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        menu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }
}

// Smooth scroll to section without updating URL hash
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
