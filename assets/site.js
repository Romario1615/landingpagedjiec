// Shared product data, cart, and page wiring used by index.html, catalogo.html,
// carrito.html and buscar.html. Depends on assets/i18n.js being loaded first.
(function () {
    const CART_KEY = "dji-ec-cart";

    // Single source of truth for the catalog. Only three items ship with real,
    // distinct product photography today — Enterprise intentionally has none
    // yet, so the catalog page shows an honest "coming soon" state for that
    // category instead of reusing a mismatched photo under a different name.
    const PRODUCTS = [
        {
            id: "lito1",
            category: "drones",
            nameEs: "DJI Lito 1 Fly More Combo",
            nameEn: "DJI Lito 1 Fly More Combo",
            price: 834.00,
            badge: "new",
            image: "https://lh3.googleusercontent.com/aida/AP1WRLvnWSzrulMAT2GW-FACL5sUCobrZDPXx7YOh5QqyAJ6ZetRlo-08eB-4gDHyelheJCFhdTuy8mSTytoO4R9ooAhpMAzJGB-GRyiCdE7IAXBX_k_2RWRqJqvJyG2Xx6oqrsjoLZP2xp2JOk6XThJLWKNQzXL1RjZdKxfKXhRUgf-nLRQJ65j36KVFY5KQYwzUZN3dTEww-1e8ny6jv2QyRbABYE7yLiRxqDvqEbZ2CmG4wb_aC88XT8leBc"
        },
        {
            id: "pocket4",
            category: "camaras",
            nameEs: "DJI Pocket 4 Estándar",
            nameEn: "DJI Pocket 4 Standard",
            price: 889.00,
            originalPrice: 979.00,
            badge: "sale",
            image: "https://lh3.googleusercontent.com/aida/AP1WRLtbDeQmmk2STrLDtL1Un0SD8OJr3mq6bPw7LvbmZHBDNDp2RFUwilsF9nOZOjcCDEQ91kWia-YdTkmSrA5fL7D371Cuen0ztLkedwK8WqHSjoFqVaaloAM-cdKdRkH3xEEkUzcVLuvuzCI7Yn9DVPXe5sVWWzFg30ja-FiGLb37EBpq5R7UZhVIDs27nClYfD_F1fYLI5_I7vbZPN4UUMm2yK_A3RvUWZhop_cFzY2a290BPStec9HT1x9G"
        },
        {
            id: "micmini2",
            category: "accesorios",
            nameEs: "DJI Mic Mini 2 Doble Canal",
            nameEn: "DJI Mic Mini 2 Dual Channel",
            price: 395.00,
            badge: null,
            image: "https://lh3.googleusercontent.com/aida/AP1WRLvnE48sBYNvIbIys81Usc6cYQBSCktX_y5Udf8Yllqgfg7cvjUdpIG5Q-cNatfQrwThL4eT1pFS-ogkJWCgpOxoDwL7Ls-okczme5Z4-LrAoL72ATU1yF6JNv4ikCDJXkYKGgKQ8h-N2VOyyQAdcvQ3F5BZ_S1E73D2m_C_HkqWSR6Y08IptLuZBxkxMvrwTspLDFJ94R-64HGYTNXjrQ1NI24zi5dKUxEmRzAVHlFEvhNyn4qHr9poIZcp"
        }
    ];

    // Carousel slides link straight to assets/carousel/1.jpg .. N.jpg — drop
    // a file in with that exact name and it appears automatically, no code
    // changes needed. Until a given file exists, that slide shows a dashed
    // placeholder instead of a broken image icon (see initHeroCarousel).
    const CAROUSEL_IMAGE_FOLDER = "assets/carousel/";
    const CAROUSEL_PLACEHOLDER_COUNT = 5;

    const CATEGORY_LABEL_KEY = {
        drones: "cat_drones_title",
        camaras: "cat_camaras_title",
        enterprise: "cat_enterprise_title",
        accesorios: "cat_accesorios_title"
    };

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    function findProduct(id) {
        return PRODUCTS.find((p) => p.id === id);
    }

    function productName(p) {
        return window.DJI_I18N.currentLang() === "en" ? p.nameEn : p.nameEs;
    }

    function renderProductCard(p) {
        const t = window.DJI_I18N.t;
        const name = productName(p);
        let badgeHTML = "";
        if (p.badge === "new") {
            badgeHTML = `<span class="absolute top-4 left-4 bg-gold-deep text-white text-[10px] font-bold px-3 py-1 rounded-full" data-i18n="badge_new">${t("badge_new")}</span>`;
        } else if (p.badge === "bestseller") {
            badgeHTML = `<span class="absolute top-4 left-4 bg-gold text-deep-space text-[10px] font-bold px-3 py-1 rounded-full" data-i18n="badge_bestseller">${t("badge_bestseller")}</span>`;
        } else if (p.badge === "sale") {
            badgeHTML = `<span class="absolute top-4 left-4 bg-gold text-deep-space text-[10px] font-bold px-3 py-1 rounded-full" data-i18n="badge_sale">${t("badge_sale")}</span>`;
        }
        const originalPriceHTML = p.originalPrice
            ? `<span aria-label="${t("price_original_aria")}" class="text-outline text-sm line-through mr-2">$${p.originalPrice.toFixed(2)}</span>`
            : "";
        return `
<div class="glass-panel group border border-glass-stroke hover:border-gold transition-all spotlight-card reveal-element flex flex-col" id="prod-${p.id}" data-category="${p.category}" data-price="${p.price}">
  <div class="relative aspect-square bg-gradient-to-b from-surface-container-high to-black/70">
    <span aria-hidden="true" class="absolute left-1/2 bottom-5 -translate-x-1/2 w-2/3 h-6 rounded-full bg-gold/25 blur-xl"></span>
    <img alt="${escapeHtml(name)}" class="relative z-10 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" data-name-es="${escapeHtml(p.nameEs)}" data-name-en="${escapeHtml(p.nameEn)}" src="${p.image}"/>
    ${badgeHTML}
    <button aria-label="${t("favorite_aria")}" aria-pressed="false" class="js-favorite absolute top-3 right-3 z-10 material-symbols-outlined text-on-surface bg-black/40 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center cursor-pointer hover:text-gold transition-colors" data-i18n-aria-label="favorite_aria" type="button">favorite</button>
  </div>
  <div class="p-6 flex flex-col flex-1">
    <h4 class="font-title-md text-[18px] mb-3 group-hover:text-gold transition-colors" data-name-es="${escapeHtml(p.nameEs)}" data-name-en="${escapeHtml(p.nameEn)}">${escapeHtml(name)}</h4>
    <div class="mb-5">
      ${originalPriceHTML}<span class="font-code-sm text-gold text-xl">$${p.price.toFixed(2)}</span>
      <span class="block text-xs text-outline mt-0.5" data-i18n="price_suffix">${t("price_suffix")}</span>
    </div>
    <div class="mt-auto flex items-center gap-3">
      <a class="flex-1 text-center py-2.5 border border-gold/50 text-gold font-label-caps text-[11px] tracking-wider rounded-full hover:bg-gold/10 transition-all" data-i18n="product_view_details" href="catalogo.html?highlight=${p.id}">${t("product_view_details")}</a>
      <button class="js-add-cart flex-1 py-2.5 bg-gold text-deep-space font-label-caps text-[11px] font-bold tracking-wider gold-glow-btn transition-all" data-i18n="add_to_cart" data-product-id="${p.id}" type="button">${t("add_to_cart")}</button>
    </div>
  </div>
</div>`;
    }

    function renderEnterpriseEmptyState() {
        const t = window.DJI_I18N.t;
        return `
<div class="glass-panel p-10 flex flex-col items-center text-center gap-4 col-span-full md:col-span-2 lg:col-span-3">
  <span class="material-symbols-outlined text-gold text-5xl" aria-hidden="true">engineering</span>
  <h4 class="font-title-md text-xl" data-i18n="enterprise_empty_title">${t("enterprise_empty_title")}</h4>
  <p class="text-outline max-w-md" data-i18n="enterprise_empty_desc">${t("enterprise_empty_desc")}</p>
  <a class="mt-2 bg-gold text-deep-space px-6 py-3 font-label-caps text-[12px] font-bold tracking-wider gold-glow-btn transition-all" data-i18n="enterprise_empty_cta" href="index.html#soporte">${t("enterprise_empty_cta")}</a>
</div>`;
    }

    // -----------------------------------------------------------------
    // Cart (persisted in localStorage, shared across every page)
    // -----------------------------------------------------------------
    function getCart() {
        try {
            const raw = localStorage.getItem(CART_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartBadgeUI();
        document.dispatchEvent(new CustomEvent("dji:cart-changed", { detail: { cart } }));
    }

    function addToCart(productId, qty) {
        qty = qty || 1;
        const product = findProduct(productId);
        if (!product) return;
        const cart = getCart();
        const existing = cart.find((item) => item.id === productId);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({
                id: product.id,
                nameEs: product.nameEs,
                nameEn: product.nameEn,
                price: product.price,
                image: product.image,
                qty
            });
        }
        saveCart(cart);
        showToast(productName(product) + " " + window.DJI_I18N.t("added_to_cart"));
    }

    function removeFromCart(productId) {
        const cart = getCart().filter((item) => item.id !== productId);
        saveCart(cart);
    }

    function setQty(productId, qty) {
        const cart = getCart();
        const item = cart.find((i) => i.id === productId);
        if (!item) return;
        if (qty <= 0) {
            removeFromCart(productId);
            return;
        }
        item.qty = qty;
        saveCart(cart);
    }

    function cartCount(cart) {
        cart = cart || getCart();
        return cart.reduce((sum, item) => sum + item.qty, 0);
    }

    function cartSubtotal(cart) {
        cart = cart || getCart();
        return cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    }

    function updateCartBadgeUI() {
        const count = cartCount();
        document.querySelectorAll(".js-cart-badge").forEach((el) => {
            el.textContent = String(count);
            el.classList.toggle("is-visible", count > 0);
        });
    }

    // -----------------------------------------------------------------
    // Toast
    // -----------------------------------------------------------------
    function showToast(message) {
        const region = document.getElementById("toast-region");
        if (!region) return;
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = '<span class="material-symbols-outlined text-gold" aria-hidden="true">check_circle</span><span></span>';
        toast.querySelector("span:last-child").textContent = message;
        region.appendChild(toast);
        window.setTimeout(() => toast.remove(), 2600);
    }

    // -----------------------------------------------------------------
    // Same-page smooth scroll (still used by on-page CTAs, e.g. the
    // homepage hero's secondary button scrolling to #productos)
    // -----------------------------------------------------------------
    function scrollToSection(targetId, highlightId) {
        const target = document.getElementById(targetId);
        if (!target) return;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (highlightId) {
            const highlightEl = document.getElementById(highlightId);
            if (highlightEl) {
                window.setTimeout(() => {
                    highlightEl.classList.remove("highlight-pulse");
                    void highlightEl.offsetWidth; // restart animation
                    highlightEl.classList.add("highlight-pulse");
                }, 350);
            }
        }
    }

    // -----------------------------------------------------------------
    // Search index shared by the header search dialog and buscar.html
    // -----------------------------------------------------------------
    function buildSearchIndex() {
        const t = window.DJI_I18N.t;
        const categoryItems = Object.keys(CATEGORY_LABEL_KEY).map((cat) => ({
            label: t(CATEGORY_LABEL_KEY[cat]),
            type: "category",
            category: cat,
            href: "catalogo.html?cat=" + cat
        }));
        const productItems = PRODUCTS.map((p) => ({
            label: productName(p),
            type: "product",
            id: p.id,
            price: p.price,
            image: p.image,
            href: "catalogo.html?highlight=" + p.id
        }));
        return categoryItems.concat(productItems);
    }

    // -----------------------------------------------------------------
    // Common page wiring: mobile menu, search dialog, reveal animations,
    // spotlight cards, particle hero (only if present), active nav state.
    // Every hook is guarded so pages without a given element are unaffected.
    // -----------------------------------------------------------------
    function initMobileMenu() {
        const mobileMenu = document.getElementById("mobile-menu");
        const openBtn = document.getElementById("open-mobile-menu");
        const closeBtn = document.getElementById("close-mobile-menu");
        if (!mobileMenu || !openBtn) return;
        openBtn.addEventListener("click", () => mobileMenu.showModal());
        if (closeBtn) closeBtn.addEventListener("click", () => mobileMenu.close());
        mobileMenu.addEventListener("click", (e) => {
            if (e.target === mobileMenu) mobileMenu.close();
        });
        mobileMenu.querySelectorAll(".js-close-menu").forEach((el) => {
            el.addEventListener("click", () => mobileMenu.close());
        });
    }

    function initSearchDialog() {
        const dialog = document.getElementById("search-dialog");
        const openBtn = document.getElementById("open-search");
        const closeBtn = document.getElementById("close-search");
        const input = document.getElementById("search-input");
        const results = document.getElementById("search-results");
        const empty = document.getElementById("search-empty");
        const viewAll = document.getElementById("search-view-all");
        if (!dialog || !input || !results) return;

        function run(query) {
            const t = window.DJI_I18N.t;
            results.innerHTML = "";
            const trimmed = query.trim();
            if (viewAll) {
                if (trimmed) {
                    viewAll.href = "buscar.html?q=" + encodeURIComponent(trimmed);
                    viewAll.classList.remove("hidden");
                } else {
                    viewAll.classList.add("hidden");
                }
            }
            if (!trimmed) {
                empty.style.display = "block";
                empty.textContent = t("search_empty");
                return;
            }
            const matches = buildSearchIndex().filter((item) =>
                item.label.toLowerCase().includes(trimmed.toLowerCase())
            );
            if (matches.length === 0) {
                empty.style.display = "block";
                empty.textContent = t("search_no_results") + ' "' + query + '"';
                return;
            }
            empty.style.display = "none";
            matches.slice(0, 6).forEach((item) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = item.href;
                a.className = "w-full text-left px-3 py-3 hover:bg-gold/10 transition-colors flex items-center justify-between";
                a.innerHTML = '<span></span><span class="material-symbols-outlined text-outline" aria-hidden="true">arrow_forward</span>';
                a.querySelector("span").textContent = item.label;
                li.appendChild(a);
                results.appendChild(li);
            });
        }

        if (openBtn) {
            openBtn.addEventListener("click", () => {
                dialog.showModal();
                input.value = "";
                run("");
                input.focus();
            });
        }
        if (closeBtn) closeBtn.addEventListener("click", () => dialog.close());
        dialog.addEventListener("click", (e) => {
            if (e.target === dialog) dialog.close();
        });
        input.addEventListener("input", (e) => run(e.target.value));
    }

    function initRevealAnimations() {
        const options = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-reveal");
                    const staggered = entry.target.querySelectorAll(".reveal-element");
                    staggered.forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.15}s`;
                        item.classList.add("animate-reveal");
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        document.querySelectorAll("section, .reveal-element").forEach((el) => observer.observe(el));
    }

    function initSpotlightCards() {
        document.addEventListener("mousemove", (e) => {
            const card = e.target.closest && e.target.closest(".spotlight-card");
            if (!card) return;
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        });
    }

    // Full-page ambient particle field: white / near-black / gold flecks that
    // mostly sit dim, and every so often one "lights up" — flashing toward
    // the same gold glow as the #page-backdrop gradient — then fades back.
    function initParticleField() {
        const canvas = document.getElementById("particle-canvas");
        if (!canvas) return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const ctx = canvas.getContext("2d");
        const BASE_COLORS = ["#e5e2e3", "#3a3a3a", "#C9A227"];
        const GLOW_COLOR = "201, 162, 39"; // matches #page-backdrop's gold glow, as an rgb triplet for shadow/fill use
        let particles = [];
        const mouse = { x: null, y: null };

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resize);
        resize();

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.8;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.baseOpacity = Math.random() * 0.22 + 0.06;
                this.color = BASE_COLORS[Math.floor(Math.random() * BASE_COLORS.length)];
                this.flash = 0; // 0 = resting, 1 = fully lit; decays back to 0
                this.nextFlashAt = performance.now() + 1500 + Math.random() * 7000;
            }
            update(now) {
                this.x += this.speedX;
                this.y += this.speedY;
                if (mouse.x && mouse.y) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 200) {
                        this.x -= dx * 0.02;
                        this.y -= dy * 0.02;
                    }
                }
                if (this.flash <= 0 && now >= this.nextFlashAt) {
                    this.flash = 1;
                    this.nextFlashAt = now + 2500 + Math.random() * 8000;
                }
                if (this.flash > 0) this.flash = Math.max(0, this.flash - 0.018);
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                const opacity = Math.min(1, this.baseOpacity + this.flash * 0.9);
                ctx.globalAlpha = opacity;
                if (this.flash > 0.15) {
                    ctx.shadowBlur = 10 * this.flash;
                    ctx.shadowColor = `rgba(${GLOW_COLOR}, ${this.flash})`;
                    ctx.fillStyle = `rgba(${GLOW_COLOR}, 1)`;
                } else {
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = this.color;
                }
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * (1 + this.flash * 0.6), 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 160; i++) particles.push(new Particle());

        function animate() {
            const now = performance.now();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => { p.update(now); p.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
    }

    function initCartInteractions() {
        document.addEventListener("click", (e) => {
            const addBtn = e.target.closest && e.target.closest(".js-add-cart");
            if (addBtn) {
                addToCart(addBtn.dataset.productId, 1);
                return;
            }
            const favBtn = e.target.closest && e.target.closest(".js-favorite");
            if (favBtn) {
                const pressed = favBtn.getAttribute("aria-pressed") === "true";
                favBtn.setAttribute("aria-pressed", String(!pressed));
                favBtn.classList.toggle("is-filled", !pressed);
                favBtn.classList.toggle("text-gold-deep", !pressed);
            }
        });
        updateCartBadgeUI();
    }

    function initScrollLinks() {
        document.querySelectorAll(".js-scroll-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                const targetId = link.dataset.target;
                if (!targetId || !document.getElementById(targetId)) return;
                e.preventDefault();
                scrollToSection(targetId);
            });
        });
    }

    // Highlights a nav link as active while its matching same-page section
    // (href="#some-id") is in view. Nav links that point to another page
    // (e.g. catalogo.html?cat=drones) are simply not hash links, so they're
    // excluded automatically — no special-casing needed.
    function initActiveNav() {
        const navLinks = Array.from(document.querySelectorAll("#primary-nav .nav-link"));
        if (!navLinks.length) return;
        const tracked = navLinks
            .map((link) => {
                const href = link.getAttribute("href") || "";
                if (!href.startsWith("#")) return null;
                const section = document.getElementById(href.slice(1));
                return section ? { link, section } : null;
            })
            .filter(Boolean);
        if (!tracked.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach((l) => l.removeAttribute("aria-current"));
                    const match = tracked.find((item) => item.section === entry.target);
                    if (match) match.link.setAttribute("aria-current", "page");
                });
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );
        tracked.forEach((item) => observer.observe(item.section));
    }

    function initNewsletterForm() {
        const form = document.getElementById("newsletter-form");
        if (!form) return;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            showToast(window.DJI_I18N.t("footer_newsletter_success"));
            form.reset();
        });
    }

    // Interactive hero/banner carousel. Each slide tries to load
    // assets/carousel/<n>.jpg; if that file doesn't exist yet, the <img>
    // 404s and we swap in a dashed placeholder instead of a broken-image
    // icon. Multiple independent instances can coexist on a page; each
    // `.hero-carousel` root manages its own state.
    function initHeroCarousel() {
        const t = window.DJI_I18N.t;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        document.querySelectorAll(".hero-carousel").forEach((root) => {
            const track = root.querySelector(".hero-carousel-track");
            const dotsWrap = root.querySelector(".hero-carousel-dots");
            const prevBtn = root.querySelector(".hero-carousel-prev");
            const nextBtn = root.querySelector(".hero-carousel-next");
            if (!track) return;

            track.innerHTML = Array.from({ length: CAROUSEL_PLACEHOLDER_COUNT }, (_, i) => `
<div class="hero-carousel-slide${i === 0 ? " is-active" : ""}">
  <img alt="" class="hero-carousel-photo" src="${CAROUSEL_IMAGE_FOLDER}${i + 1}.jpg"/>
  <span class="hero-carousel-placeholder">
    <span class="material-symbols-outlined" aria-hidden="true">add_photo_alternate</span>
    <span class="hero-carousel-placeholder-label">${t("carousel_placeholder_label")} ${i + 1}</span>
  </span>
</div>`).join("");
            track.querySelectorAll(".hero-carousel-photo").forEach((img) => {
                img.addEventListener("error", () => img.remove(), { once: true });
            });
            if (dotsWrap) {
                dotsWrap.innerHTML = Array.from({ length: CAROUSEL_PLACEHOLDER_COUNT }, (_, i) =>
                    `<button aria-current="${i === 0 ? "true" : "false"}" aria-label="${t("carousel_goto_prefix")} ${i + 1}" class="hero-carousel-dot${i === 0 ? " is-active" : ""}" data-index="${i}" type="button"></button>`
                ).join("");
            }

            const slides = track.querySelectorAll(".hero-carousel-slide");
            const dots = dotsWrap ? dotsWrap.querySelectorAll(".hero-carousel-dot") : [];
            let index = 0;
            let timer = null;

            function goTo(newIndex) {
                slides[index].classList.remove("is-active");
                if (dots[index]) { dots[index].classList.remove("is-active"); dots[index].setAttribute("aria-current", "false"); }
                index = (newIndex + slides.length) % slides.length;
                slides[index].classList.add("is-active");
                if (dots[index]) { dots[index].classList.add("is-active"); dots[index].setAttribute("aria-current", "true"); }
            }
            function start() {
                if (reducedMotion) return;
                timer = window.setInterval(() => goTo(index + 1), Number(root.dataset.interval) || 5500);
            }
            function restart() {
                if (timer) window.clearInterval(timer);
                start();
            }

            if (prevBtn) prevBtn.addEventListener("click", () => { goTo(index - 1); restart(); });
            if (nextBtn) nextBtn.addEventListener("click", () => { goTo(index + 1); restart(); });
            dots.forEach((dot) => dot.addEventListener("click", () => { goTo(Number(dot.dataset.index)); restart(); }));
            root.addEventListener("mouseenter", () => { if (timer) window.clearInterval(timer); });
            root.addEventListener("mouseleave", start);
            root.addEventListener("focusin", () => { if (timer) window.clearInterval(timer); });
            root.addEventListener("focusout", start);

            start();
        });
    }

    function initCommon() {
        document.documentElement.style.scrollBehavior = "smooth";
        initMobileMenu();
        initSearchDialog();
        initRevealAnimations();
        initSpotlightCards();
        initParticleField();
        initHeroCarousel();
        initCartInteractions();
        initScrollLinks();
        initActiveNav();
        initNewsletterForm();
    }

    window.DJI_SITE = {
        PRODUCTS,
        findProduct,
        productName,
        renderProductCard,
        renderEnterpriseEmptyState,
        getCart,
        saveCart,
        addToCart,
        removeFromCart,
        setQty,
        cartCount,
        cartSubtotal,
        updateCartBadgeUI,
        showToast,
        scrollToSection,
        buildSearchIndex,
        initCommon,
        escapeHtml
    };
})();
