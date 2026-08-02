(() => {
    "use strict";

    const App = window.COCOLAB_APP;
    const config = App.config;
    const { escapeAttribute, escapeHtml, hexToRgb } = App.utils;

    const pageMeta = {
        home: {
            title: config.siteTitle || "CoCoLab",
            description: config.labName || "Computer Architecture and Co-design Research"
        },
        people: {
            title: `People | ${config.siteTitle || "CoCoLab"}`,
            heading: "People",
            description: "Principal investigator, graduate students, undergraduate research interns, and alumni."
        },
        research: {
            title: `Research | ${config.siteTitle || "CoCoLab"}`,
            heading: "Research",
            description: "Research in computer architecture, AI systems, accelerators, memory systems, and hardware-software co-design."
        },
        publications: {
            title: `Publications | ${config.siteTitle || "CoCoLab"}`,
            heading: "Publications",
            description: "Search and filter publications by five research topics."
        },
        news: {
            title: `News | ${config.siteTitle || "CoCoLab"}`,
            heading: "News",
            description: "Research, awards, grants, and group updates from CoCoLab."
        },
        teaching: {
            title: `Teaching | ${config.siteTitle || "CoCoLab"}`,
            heading: "Teaching",
            description: "Courses and teaching activities."
        },
        photos: {
            title: `Photos | ${config.siteTitle || "CoCoLab"}`,
            heading: "Photos",
            description: "Group meetings, conference activities, and lab memories."
        }
    };

    function applyTheme() {
        const colors = config.colors || {};
        const root = document.documentElement;
        const themeColor = document.querySelector('meta[name="theme-color"]');

        applyColorVariable(root, "--coco-primary", "--coco-primary-rgb", colors.primary);
        applyColorVariable(root, "--coco-accent", "--coco-accent-rgb", colors.accent);
        applyColorVariable(root, "--coco-lime", "--coco-lime-rgb", colors.lime);

        if (colors.primary && themeColor) {
        themeColor.setAttribute("content", colors.primary);
        }
    }

    function applyColorVariable(root, colorVariable, rgbVariable, value) {
        if (!value) return;
        root.style.setProperty(colorVariable, value);
        const rgb = hexToRgb(value);
        if (rgb) root.style.setProperty(rgbVariable, `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }

    function updateDocumentMeta(page) {
        const meta = pageMeta[page] || pageMeta.home;
        document.title = meta.title;
        const description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute("content", meta.description || "");
        document.body.classList.add(`page-${page}`);
    }

    function renderHeader(page) {
        const mount = document.getElementById("site-header");
        if (!mount) return;

        const navigation = Array.isArray(config.navigation) ? config.navigation : [];
        const items = navigation
        .map(
            (item) => `
            <li class="nav-item">
                <a class="nav-link${page === item.key ? " active" : ""}" href="./${escapeAttribute(item.href)}"
                ${page === item.key ? 'aria-current="page"' : ""}>
                ${escapeHtml(item.label)}
                </a>
            </li>`
        )
        .join("");

        mount.innerHTML = `
        <header class="site-header">
            <nav class="navbar navbar-expand-lg navbar-light py-2" aria-label="Primary navigation">
            <div class="container-xl">
                <a class="navbar-brand" href="./index.html" aria-label="${escapeAttribute(config.siteTitle || "CoCoLab")} home"
                ${page === "home" ? 'aria-current="page"' : ""}>
                <img src="./assets/images/logo.png" alt="${escapeAttribute(config.siteTitle || "CoCoLab")}">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#primary-navigation"
                        aria-controls="primary-navigation" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="primary-navigation">
                <ul class="navbar-nav ms-auto align-items-lg-center">
                    ${items}
                </ul>
                </div>
            </div>
            </nav>
        </header>`;
    }

    function initializeNavbarBehavior() {
        const collapseElement = document.getElementById("primary-navigation");
        if (!collapseElement || !window.bootstrap) return;

        collapseElement.addEventListener("click", (event) => {
        if (!event.target.closest("a") || window.innerWidth >= 992) return;
        const instance = window.bootstrap.Collapse.getOrCreateInstance(collapseElement, { toggle: false });
        instance.hide();
        });
    }

    function renderFooter() {
        const mount = document.getElementById("site-footer");
        if (!mount) return;

        const footer = config.footer || {};
        const email = config.contactEmail || "";
        const name = footer.copyrightName || config.siteTitle || "CoCoLab";

        mount.innerHTML = `
        <footer class="site-footer py-4 mt-auto">
            <div class="container-xl">
            <div class="row g-3 align-items-center">
                <div class="col-md">
                <div class="footer-brand">${escapeHtml(name)}</div>
                <div class="small text-body-secondary">&copy; ${new Date().getFullYear()} ${escapeHtml(name)}. All rights reserved.</div>
                </div>
                <div class="col-md-auto text-md-end small text-body-secondary">
                ${footer.address ? `<div>${escapeHtml(footer.address)}</div>` : ""}
                ${email ? `<a href="mailto:${escapeAttribute(email)}">${escapeHtml(email)}</a>` : ""}
                </div>
            </div>
            </div>
        </footer>`;
    }

    function renderPageBanner(page) {
        const meta = pageMeta[page] || {};
        return `
        <section class="page-banner">
            <div class="page-banner-art" aria-hidden="true">
            <span class="banner-shape banner-shape-large"></span>
            <span class="banner-shape banner-shape-solid"></span>
            <span class="banner-shape banner-shape-outline"></span>
            <span class="banner-shape banner-shape-small"></span>
            <span class="banner-line banner-line-one"></span>
            <span class="banner-coconut-mark"></span>
            </div>
            <div class="container-xl py-5">
            <p class="section-kicker">${escapeHtml(config.siteTitle || "CoCoLab")}</p>
            <h1 class="display-5 mb-3">${escapeHtml(meta.heading || "")}</h1>
            <p class="lead mb-0">${escapeHtml(meta.description || "")}</p>
            </div>
        </section>`;
    }

    function renderSectionHeading(kicker, title, description = "") {
        return `
        <div class="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-2 mb-4">
            <div>
            ${kicker ? `<p class="section-kicker">${escapeHtml(kicker)}</p>` : ""}
            <h2 class="section-title">${escapeHtml(title)}</h2>
            </div>
            ${description ? `<p class="mb-0 text-body-secondary">${escapeHtml(description)}</p>` : ""}
        </div>`;
    }

    function renderExternalButton(link) {
        const isExternal = /^https?:\/\//i.test(link.url || "");
        return `
        <a class="btn btn-sm btn-outline-dark" href="${escapeAttribute(link.url || "#")}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ""}>
            ${escapeHtml(link.label || "Link")} <span aria-hidden="true">&nearr;</span>
        </a>`;
    }

    function renderEmptyColumn(message) {
        return `<div class="col-12">${renderEmptyState(message)}</div>`;
    }

    function renderEmptyState(message) {
        return `<div class="empty-state">${escapeHtml(message)}</div>`;
    }

    App.layout = {
        applyTheme,
        initializeNavbarBehavior,
        pageMeta,
        renderEmptyColumn,
        renderEmptyState,
        renderExternalButton,
        renderFooter,
        renderHeader,
        renderPageBanner,
        renderSectionHeading,
        updateDocumentMeta
    };
})();
