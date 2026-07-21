// Shared ES / EN dictionary + apply/persist logic, used by every page.
(function () {
    const translations = {
        es: {
            meta_title: "DJI Ecuador | Drones & Accesorios Originales",
            meta_description: "Distribuidor autorizado DJI en Ecuador. Drones, cámaras de acción, estabilizadores y accesorios originales con garantía de fábrica.",
            skip_link: "Saltar al contenido principal",
            nav_home_aria: "Ir al inicio",
            nav_tagline: "DISTRIBUIDOR AUTORIZADO",
            nav_drones: "DRONES",
            nav_camaras: "CÁMARAS",
            nav_estabilizadores: "ESTABILIZADORES",
            nav_accesorios: "ACCESORIOS",
            nav_soporte: "SOPORTE",
            nav_comprar: "COMPRAR",
            nav_cart_aria: "Ver carrito",
            lang_switch_aria: "Cambiar idioma",
            search_aria: "Buscar",
            search_input_aria: "Buscar productos",
            search_placeholder: "Buscar drones, cámaras, accesorios...",
            search_close_aria: "Cerrar búsqueda",
            search_empty: "Escribe para buscar en el catálogo.",
            search_no_results: "Sin resultados para",
            search_view_all_results: "Ver todos los resultados",
            account_aria: "Cuenta",
            account_soon: "Próximamente",
            menu_open_aria: "Abrir menú",
            menu_close_aria: "Cerrar menú",
            menu_title: "MENÚ",
            mobile_nav_aria: "Navegación principal",
            hero_kicker: "DISTRIBUIDOR AUTORIZADO ECUADOR",
            hero_title_l1: "Drones & Accesorios",
            hero_title_l2: "Originales & Profesionales",
            hero_cta_primary: "EXPLORAR CATÁLOGO",
            hero_cta_secondary: "VER PROMOCIONES",
            hero_image_alt: "Mavic 3 Enterprise en vuelo",
            categories_title: "Explora por Categoría",
            categories_subtitle: "Equipos de alto rendimiento diseñados para cada necesidad profesional y creativa.",
            categories_view_all: "VER TODAS",
            cat_drones_title: "Drones de Consumo",
            cat_drones_alt: "Drones de Consumo",
            cat_camaras_title: "Cámaras de Acción",
            cat_camaras_alt: "Cámaras de Acción",
            cat_enterprise_title: "Enterprise",
            cat_enterprise_alt: "Línea Enterprise",
            cat_accesorios_title: "Audio & Accesorios",
            cat_accesorios_alt: "Audio y Accesorios",
            products_title: "Productos Más Recientes",
            badge_new: "NUEVO",
            badge_bestseller: "MÁS VENDIDO",
            badge_sale: "OFERTA EXCLUSIVA",
            price_suffix: "+ IVA",
            price_original_aria: "Precio original",
            favorite_aria: "Añadir a favoritos",
            carousel_prev_aria: "Imagen anterior",
            carousel_next_aria: "Siguiente imagen",
            carousel_goto_prefix: "Ir a la imagen",
            carousel_placeholder_label: "Espacio para imagen",
            add_to_cart: "AÑADIR",
            product_view_details: "VER DETALLES",
            added_to_cart: "añadido al carrito",
            industrial_title: "Soluciones Industriales",
            industrial_kicker: "MAVIC 3 ENTERPRISE SERIES",
            industrial_headline: "Eficiencia en cada misión",
            industrial_desc: "La herramienta definitiva para inspección, búsqueda, rescate y topografía con precisión centimétrica.",
            industrial_cta: "DESCUBRIR",
            industrial_hero_alt: "Vista de alta resolución del DJI Mavic 3 Enterprise",
            agri_title: "Agricultura de Precisión",
            agri_desc: "Optimice sus cultivos con la serie Agras T. Pulverización inteligente y mapeo multiespectral.",
            support_title: "Soporte Técnico Especializado",
            support_desc: "Único centro autorizado en Ecuador con repuestos originales y técnicos certificados.",
            trust_secure_title: "Compra Segura",
            trust_secure_desc: "Cifrado de grado militar para proteger todos sus datos de pago y transacciones.",
            trust_shipping_title: "Envíos a Nivel Nacional",
            trust_shipping_desc: "Cobertura total en Ecuador con rastreo en tiempo real de su pedido.",
            trust_warranty_title: "Garantía Real",
            trust_warranty_desc: "Todos nuestros productos incluyen garantía directa de fábrica por 12 meses.",
            footer_about: "Distribuidores autorizados líderes en tecnología de drones y estabilización en el mercado ecuatoriano.",
            footer_categories_heading: "CATEGORÍAS",
            footer_cat_consumo: "Consumo",
            footer_cat_industrial: "Industrial",
            footer_cat_camaras: "Cámaras de Acción",
            footer_cat_estabilizadores: "Estabilizadores",
            footer_support_heading: "SOPORTE",
            footer_support_tech: "Servicio Técnico",
            footer_support_warranty: "Garantías",
            footer_support_shipping: "Políticas de Envío",
            footer_support_contact: "Contacto",
            footer_newsletter_heading: "NEWSLETTER",
            footer_newsletter_desc: "Recibe las últimas novedades y ofertas exclusivas.",
            footer_newsletter_email_label: "Correo electrónico",
            footer_newsletter_placeholder: "Email",
            footer_newsletter_submit_aria: "Suscribirse",
            footer_newsletter_success: "¡Gracias por suscribirte!",
            footer_rights: "© 2024 DJI ECUADOR. TODOS LOS DERECHOS RESERVADOS. DISTRIBUIDOR AUTORIZADO.",
            whatsapp_aria: "Contactar por WhatsApp",

            // Breadcrumbs
            breadcrumb_home: "Inicio",
            breadcrumb_catalog: "Catálogo",
            breadcrumb_cart: "Carrito",
            breadcrumb_search: "Búsqueda",

            // Catalog page
            catalog_page_title: "Catálogo | DJI Ecuador",
            catalog_meta_description: "Explora el catálogo completo DJI en Ecuador: drones, cámaras de acción, soluciones Enterprise y accesorios originales.",
            catalog_header_title: "Catálogo Completo",
            catalog_header_subtitle: "Explora toda la línea DJI disponible en Ecuador, con garantía de fábrica y soporte técnico autorizado.",
            filter_all: "TODOS",
            sort_label: "Ordenar por",
            sort_relevance: "Relevancia",
            sort_price_asc: "Precio: menor a mayor",
            sort_price_desc: "Precio: mayor a menor",
            catalog_results_singular: "producto",
            catalog_results_plural: "productos",
            catalog_no_results: "No hay productos en esta categoría todavía.",
            enterprise_empty_title: "Línea Enterprise",
            enterprise_empty_desc: "Estamos preparando el catálogo completo de soluciones Enterprise. Contáctanos para cotizaciones y disponibilidad inmediata.",
            enterprise_empty_cta: "Contactar a Soporte",

            // Cart page
            cart_page_title: "Carrito | DJI Ecuador",
            cart_meta_description: "Revisa los productos en tu carrito de compras DJI Ecuador antes de finalizar tu pedido.",
            cart_header_title: "Tu Carrito",
            cart_header_subtitle: "Revisa tus productos antes de finalizar la compra.",
            cart_empty_title: "Tu carrito está vacío",
            cart_empty_desc: "Explora el catálogo y encuentra el equipo DJI perfecto para tu próximo proyecto.",
            cart_empty_cta: "Ir al Catálogo",
            cart_item_remove_aria: "Eliminar producto",
            cart_qty_decrease_aria: "Reducir cantidad",
            cart_qty_increase_aria: "Aumentar cantidad",
            cart_summary_title: "Resumen del Pedido",
            cart_subtotal: "Subtotal",
            cart_tax: "IVA (15%)",
            cart_shipping: "Envío",
            cart_shipping_free: "Gratis",
            cart_total: "Total",
            cart_checkout_cta: "FINALIZAR COMPRA",
            cart_checkout_demo_notice: "Esta es una demo: en producción este botón conectaría con la pasarela de pago.",
            cart_continue_shopping: "Seguir Comprando",
            cart_removed: "Producto eliminado del carrito",

            // Search page
            search_page_title: "Buscar | DJI Ecuador",
            search_meta_description: "Busca drones, cámaras de acción y accesorios DJI disponibles en Ecuador.",
            search_header_title: "Resultados de Búsqueda",
            search_results_for: "Resultados para",
            search_no_query_title: "¿Qué estás buscando?",
            search_no_query_desc: "Escribe el nombre de un producto o categoría para empezar.",
            search_results_count_singular: "resultado",
            search_results_count_plural: "resultados"
        },
        en: {
            meta_title: "DJI Ecuador | Original Drones & Accessories",
            meta_description: "Authorized DJI distributor in Ecuador. Drones, action cameras, gimbals and original accessories with factory warranty.",
            skip_link: "Skip to main content",
            nav_home_aria: "Go to homepage",
            nav_tagline: "AUTHORIZED RETAIL STORE",
            nav_drones: "DRONES",
            nav_camaras: "CAMERAS",
            nav_estabilizadores: "GIMBALS",
            nav_accesorios: "ACCESSORIES",
            nav_soporte: "SUPPORT",
            nav_comprar: "SHOP",
            nav_cart_aria: "View cart",
            lang_switch_aria: "Change language",
            search_aria: "Search",
            search_input_aria: "Search products",
            search_placeholder: "Search drones, cameras, accessories...",
            search_close_aria: "Close search",
            search_empty: "Start typing to search the catalog.",
            search_no_results: "No results for",
            search_view_all_results: "See all results",
            account_aria: "Account",
            account_soon: "Coming soon",
            menu_open_aria: "Open menu",
            menu_close_aria: "Close menu",
            menu_title: "MENU",
            mobile_nav_aria: "Main navigation",
            hero_kicker: "AUTHORIZED DISTRIBUTOR ECUADOR",
            hero_title_l1: "Drones & Accessories",
            hero_title_l2: "Original & Professional",
            hero_cta_primary: "EXPLORE CATALOG",
            hero_cta_secondary: "VIEW PROMOTIONS",
            hero_image_alt: "Mavic 3 Enterprise in flight",
            categories_title: "Explore by Category",
            categories_subtitle: "High-performance equipment designed for every professional and creative need.",
            categories_view_all: "VIEW ALL",
            cat_drones_title: "Consumer Drones",
            cat_drones_alt: "Consumer Drones",
            cat_camaras_title: "Action Cameras",
            cat_camaras_alt: "Action Cameras",
            cat_enterprise_title: "Enterprise",
            cat_enterprise_alt: "Enterprise line",
            cat_accesorios_title: "Audio & Accessories",
            cat_accesorios_alt: "Audio and Accessories",
            products_title: "Latest Products",
            badge_new: "NEW",
            badge_bestseller: "BEST SELLER",
            badge_sale: "EXCLUSIVE OFFER",
            price_suffix: "+ tax",
            price_original_aria: "Original price",
            favorite_aria: "Add to favorites",
            carousel_prev_aria: "Previous image",
            carousel_next_aria: "Next image",
            carousel_goto_prefix: "Go to image",
            carousel_placeholder_label: "Image placeholder",
            add_to_cart: "ADD",
            product_view_details: "VIEW DETAILS",
            added_to_cart: "added to cart",
            industrial_title: "Industrial Solutions",
            industrial_kicker: "MAVIC 3 ENTERPRISE SERIES",
            industrial_headline: "Efficiency in every mission",
            industrial_desc: "The definitive tool for inspection, search and rescue, and surveying with centimeter-level precision.",
            industrial_cta: "DISCOVER",
            industrial_hero_alt: "High-resolution view of the DJI Mavic 3 Enterprise",
            agri_title: "Precision Agriculture",
            agri_desc: "Optimize your crops with the Agras T series. Smart spraying and multispectral mapping.",
            support_title: "Specialized Technical Support",
            support_desc: "The only authorized center in Ecuador with original parts and certified technicians.",
            trust_secure_title: "Secure Checkout",
            trust_secure_desc: "Military-grade encryption to protect all your payment data and transactions.",
            trust_shipping_title: "Nationwide Shipping",
            trust_shipping_desc: "Full coverage across Ecuador with real-time order tracking.",
            trust_warranty_title: "Real Warranty",
            trust_warranty_desc: "All our products include a direct 12-month factory warranty.",
            footer_about: "Leading authorized distributors in drone and stabilization technology in the Ecuadorian market.",
            footer_categories_heading: "CATEGORIES",
            footer_cat_consumo: "Consumer",
            footer_cat_industrial: "Industrial",
            footer_cat_camaras: "Action Cameras",
            footer_cat_estabilizadores: "Gimbals",
            footer_support_heading: "SUPPORT",
            footer_support_tech: "Technical Service",
            footer_support_warranty: "Warranties",
            footer_support_shipping: "Shipping Policies",
            footer_support_contact: "Contact",
            footer_newsletter_heading: "NEWSLETTER",
            footer_newsletter_desc: "Get the latest news and exclusive offers.",
            footer_newsletter_email_label: "Email address",
            footer_newsletter_placeholder: "Email",
            footer_newsletter_submit_aria: "Subscribe",
            footer_newsletter_success: "Thanks for subscribing!",
            footer_rights: "© 2024 DJI ECUADOR. ALL RIGHTS RESERVED. AUTHORIZED DISTRIBUTOR.",
            whatsapp_aria: "Contact via WhatsApp",

            breadcrumb_home: "Home",
            breadcrumb_catalog: "Catalog",
            breadcrumb_cart: "Cart",
            breadcrumb_search: "Search",

            catalog_page_title: "Catalog | DJI Ecuador",
            catalog_meta_description: "Explore the full DJI catalog in Ecuador: drones, action cameras, Enterprise solutions and original accessories.",
            catalog_header_title: "Full Catalog",
            catalog_header_subtitle: "Explore the full DJI lineup available in Ecuador, with factory warranty and authorized technical support.",
            filter_all: "ALL",
            sort_label: "Sort by",
            sort_relevance: "Relevance",
            sort_price_asc: "Price: low to high",
            sort_price_desc: "Price: high to low",
            catalog_results_singular: "product",
            catalog_results_plural: "products",
            catalog_no_results: "No products in this category yet.",
            enterprise_empty_title: "Enterprise Line",
            enterprise_empty_desc: "We're preparing the full Enterprise solutions catalog. Contact us for quotes and immediate availability.",
            enterprise_empty_cta: "Contact Support",

            cart_page_title: "Cart | DJI Ecuador",
            cart_meta_description: "Review the items in your DJI Ecuador shopping cart before checking out.",
            cart_header_title: "Your Cart",
            cart_header_subtitle: "Review your items before checking out.",
            cart_empty_title: "Your cart is empty",
            cart_empty_desc: "Browse the catalog and find the perfect DJI gear for your next project.",
            cart_empty_cta: "Go to Catalog",
            cart_item_remove_aria: "Remove item",
            cart_qty_decrease_aria: "Decrease quantity",
            cart_qty_increase_aria: "Increase quantity",
            cart_summary_title: "Order Summary",
            cart_subtotal: "Subtotal",
            cart_tax: "VAT (15%)",
            cart_shipping: "Shipping",
            cart_shipping_free: "Free",
            cart_total: "Total",
            cart_checkout_cta: "CHECKOUT",
            cart_checkout_demo_notice: "This is a demo: in production this button would connect to the payment gateway.",
            cart_continue_shopping: "Continue Shopping",
            cart_removed: "Item removed from cart",

            search_page_title: "Search | DJI Ecuador",
            search_meta_description: "Search DJI drones, action cameras and accessories available in Ecuador.",
            search_header_title: "Search Results",
            search_results_for: "Results for",
            search_no_query_title: "What are you looking for?",
            search_no_query_desc: "Type a product or category name to get started.",
            search_results_count_singular: "result",
            search_results_count_plural: "results"
        }
    };

    const LANG_KEY = "dji-ec-lang";

    function currentLang() {
        return document.documentElement.lang === "en" ? "en" : "es";
    }

    function t(key) {
        return translations[currentLang()][key] || translations.es[key] || key;
    }

    function applyLanguage(lang) {
        const dict = translations[lang] || translations.es;
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (dict[key] !== undefined) el.textContent = dict[key];
        });
        document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
            const key = el.getAttribute("data-i18n-alt");
            if (dict[key] !== undefined) el.setAttribute("alt", dict[key]);
        });
        document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
            const key = el.getAttribute("data-i18n-aria-label");
            if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
        });
        document.querySelectorAll("[data-i18n-title]").forEach((el) => {
            const key = el.getAttribute("data-i18n-title");
            if (dict[key] !== undefined) el.setAttribute("title", dict[key]);
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
        });
        document.querySelectorAll("[data-i18n-content]").forEach((el) => {
            const key = el.getAttribute("data-i18n-content");
            if (dict[key] !== undefined) el.setAttribute("content", dict[key]);
        });
        // Per-instance bilingual content that isn't a shared dictionary
        // entry (product names): the element carries both language
        // variants directly, so no key lookup is needed.
        document.querySelectorAll("[data-name-es][data-name-en]").forEach((el) => {
            const value = lang === "en" ? el.dataset.nameEn : el.dataset.nameEs;
            if (el.tagName === "IMG") el.setAttribute("alt", value);
            else el.textContent = value;
        });

        document.querySelectorAll(".js-lang-btn").forEach((btn) => {
            btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
        });

        localStorage.setItem(LANG_KEY, lang);
        document.dispatchEvent(new CustomEvent("dji:language-changed", { detail: { lang } }));
    }

    function initLanguageToggle() {
        document.querySelectorAll(".js-lang-btn").forEach((btn) => {
            btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
        });
        applyLanguage(localStorage.getItem(LANG_KEY) || "es");
    }

    window.DJI_I18N = { translations, applyLanguage, initLanguageToggle, currentLang, t, LANG_KEY };
})();
