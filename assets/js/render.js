(() => {
    "use strict";

    const App = window.COCOLAB_APP;
    const DATA = App.DATA;
    const config = App.config;
    const { escapeAttribute, escapeHtml, formatDate, normalizeSearch, tagClass } = App.utils;
    const {
        renderEmptyColumn,
        renderEmptyState,
        renderExternalButton,
        renderPageBanner,
        renderSectionHeading
    } = App.layout;
    const {
        getSortedNews,
        groupNewsByYear,
        groupPublications,
    } = App.dataHelpers;

    function renderCurrentPage(page) {
        const mount = document.getElementById("main");
        if (!mount) return;

        const renderers = {
        home: renderHome,
        people: renderPeople,
        research: renderResearch,
        publications: renderPublications,
        news: renderNews,
        teaching: renderTeaching,
        photos: renderPhotos
        };

        (renderers[page] || renderHome)(mount);
    }

    function renderHome(mount) {
        const home = DATA.home || {};
        const news = getSortedNews().slice(0, getHomeNewsLimit(home));

        mount.innerHTML = `
        <section class="home-hero py-5">
            <div class="container-xl">
            <div class="text-center pt-lg-3 mb-5">
                <img class="hero-wordmark mb-4" src="./assets/images/logo.png" alt="${escapeAttribute(config.siteTitle || "CoCoLab")}">
                <h1 class="hero-headline display-5">${home.headlineHtml || escapeHtml(config.labName || "Computer Architecture and Co-design Research")}</h1>
            </div>
            <br><br><br>
            <div class="row g-4 g-lg-5 align-items-center pb-lg-4">
                <div class="col-lg-5">
                <div class="hero-diagram-card p-3 p-md-4">
                    <img src="./${escapeAttribute(home.diagram?.src || "assets/images/research/co-design-diagram.jpg")}" alt="${escapeAttribute(home.diagram?.alt || "Co-design research diagram")}">
                </div>
                </div>
                <div class="col-lg-7">
                <div class="welcome-copy">
                    <h2 class="welcome-title display-6 fw-bold mb-4">${home.welcomeTitleHtml || `Welcome to <span>${escapeHtml(config.siteTitle || "CoCoLab")}</span>`}</h2>
                    ${(home.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join("")}
                    ${home.prospectiveHtml ? `<div class="prospective-note">${home.prospectiveHtml}</div>` : ""}
                </div>
                </div>
            </div>
            </div>
        </section>

        <section class="py-5">
            <div class="container-xl">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                ${renderSectionHeading(" ", "Latest News")}
                <div class="list-group list-group-flush news-list mb-4">
                    ${renderNewsRows(news)}
                </div>
                <div class="text-center">
                    <a class="btn btn-outline-primary px-4" href="./news.html">More news <span aria-hidden="true">&rarr;</span></a>
                </div>
                </div>
            </div>
            </div>
        </section>`;
    }

    function getHomeNewsLimit(home) {
        const value = Number(home.latestNewsLimit ?? config.homeNewsLimit ?? 6);
        return Number.isFinite(value) && value >= 0 ? value : 6;
    }

    function renderPeople(mount) {
        const people = DATA.people || {};
        const pi = people.principalInvestigator || [];
        const grads = people.graduateStudents || [];
        const interns = people.undergraduateInterns || [];
        const formerInterns = people.formerUndergraduateInterns || [];
        const alumni = people.alumni || [];

        mount.innerHTML = `
        ${renderPageBanner("people")}
        <section class="py-5">
            <div class="container-xl">
            <section class="mb-5" aria-labelledby="pi-heading">
                ${renderSectionHeading("Faculty", "Principal Investigator")}
                <div class="row g-4">
                ${pi.length ? pi.map((person) => `<div class="col-lg-8">${renderProfileCard(person, true)}</div>`).join("") : renderEmptyColumn("Add a principal investigator in data/people.js.")}
                </div>
            </section>

            <section class="mb-5" aria-labelledby="graduate-heading">
                ${renderSectionHeading("Members", "Graduate Students")}
                <div class="row g-4">
                ${grads.length ? grads.map((person) => `<div class="col-lg-6">${renderProfileCard(person, false)}</div>`).join("") : renderEmptyColumn("Graduate student entries will appear here.")}
                </div>
            </section>

            <section class="mb-5" aria-labelledby="undergraduate-heading">
                ${renderSectionHeading("Members", "Undergraduate Research Interns", " ")}
                <div class="row g-3">
                ${interns.length ? interns.map(renderInternCard).join("") : renderEmptyColumn("Undergraduate intern entries will appear here.")}
                </div>

                ${formerInterns.length ? `
                <div class="mt-5">
                    <h3 class="h4 fw-bold mb-3">Former Undergraduate Interns</h3>
                    <div class="row g-3">
                    ${formerInterns.map(renderCompactPerson).join("")}
                    </div>
                </div>` : ""}
            </section>
            <!--
            <section aria-labelledby="alumni-heading">
                ${renderSectionHeading("Former members", "Alumni")}
                ${alumni.length ? `<div class="row g-3">${alumni.map(renderAlumnus).join("")}</div>` : renderEmptyState("Alumni entries can be added in data/people.js.")}
            </section> -->
            </div>
        </section>`;
    }

    function renderProfileCard(person, isPi) {
        const links = (person.links || []).filter((link) => link.url);
        const badgeText = isPi ? person.role : person.degree;
        const imageColumn = isPi ? "col-sm-4" : "col-sm-5";
        const contentColumn = isPi ? "col-sm-8" : "col-sm-7";

        return `
        <article class="card profile-card h-100 border-0">
            <div class="row g-0 h-100">
            <div class="${imageColumn}">
                <div class="profile-image-wrap h-100">
                <img class="profile-image" src="./${escapeAttribute(person.image || "assets/images/people/ranggi-hwang.svg")}" alt="${escapeAttribute(person.imageAlt || `Portrait of ${person.name || "lab member"}`)}" loading="lazy">
                </div>
            </div>
            <div class="${contentColumn}">
                <div class="card-body p-4 h-100 d-flex flex-column">
                <h3 class="h4 fw-bold mb-1">${escapeHtml(person.name || "Name")}</h3>
                ${person.email ? `<a class="profile-email mb-3" href="mailto:${escapeAttribute(person.email)}">${escapeHtml(person.email)}</a>` : ""}
                ${badgeText ? `<div class="mb-3"><span class="badge rounded-pill ${isPi ? "role-badge" : "degree-badge"}">${escapeHtml(badgeText)}</span></div>` : ""}
                ${(person.bio || []).length ? `<ul class="profile-bio">${person.bio.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
                ${links.length ? `<div class="d-flex flex-wrap gap-2 mt-auto">${links.map(renderExternalButton).join("")}</div>` : ""}
                </div>
            </div>
            </div>
        </article>`;
    }

    function renderInternCard(person) {
        const interests = (person.interests || [])
        .map((interest) => `<span class="badge rounded-pill interest-badge">${escapeHtml(interest)}</span>`)
        .join("");

        return `
        <div class="col-md-6 col-xl-4">
            <article class="card undergrad-card h-100 border-0">
            <div class="card-body">
                <h3 class="h5 fw-bold mb-2">${escapeHtml(person.name || "Name")}</h3>
                ${person.affiliation ? `<div class="intern-meta">${escapeHtml(person.affiliation)}</div>` : ""}
                ${person.term ? `<div class="intern-meta mb-3">${escapeHtml(person.term)}</div>` : ""}
                ${interests ? `<div class="d-flex flex-wrap gap-2" aria-label="Research interests">${interests}</div>` : ""}
            </div>
            </article>
        </div>`;
    }

    function renderCompactPerson(person) {
        return `
        <div class="col-md-6">
            <div class="list-group compact-person-list">
            <div class="list-group-item d-flex flex-wrap justify-content-between gap-2 rounded-3 border">
                <strong>${escapeHtml(person.name || "Name")}</strong>
                <span class="text-body-secondary">${escapeHtml(person.term || "")}</span>
            </div>
            </div>
        </div>`;
    }

    function renderAlumnus(person) {
        const details = [person.degree, person.period, person.next].filter(Boolean).join(" \u00b7 ");
        return `
        <div class="col-md-6">
            <div class="list-group compact-person-list">
            <div class="list-group-item rounded-3 border">
                <strong class="d-block">${escapeHtml(person.name || "Name")}</strong>
                <span class="text-body-secondary">${escapeHtml(details)}</span>
            </div>
            </div>
        </div>`;
    }

    function renderResearch(mount) {
        const research = DATA.research || {};
        const areas = research.areas || [];
        const topics = research.topics || [];

        mount.innerHTML = `
        ${renderPageBanner("research")}
        <section class="py-5">
            <div class="container-xl">
            <div class="research-statement p-4 p-md-5 text-center mb-5">
                <p class="mb-0">${research.statementHtml || ""}</p>
            </div>

            <section class="mb-5">
                ${renderSectionHeading(" ", "Research Areas")}
                <div class="row g-4">
                ${areas.map((area, index) => `
                    <div class="col-md-6 col-xl-4">
                    <article class="card area-card border-0">
                        <div class="card-body p-4">
                        <div class="area-heading">
                            <div class="area-index">${String(index + 1).padStart(2, "0")}</div>
                            <h3 class="h5 fw-bold mb-0">${escapeHtml(area.title || "Research area")}</h3>
                        </div>
                        <p class="mb-0 text-body-secondary">${escapeHtml(area.description || "")}</p>
                        </div>
                    </article>
                    </div>`).join("")}
                </div>
            </section>

            <section>
                ${renderSectionHeading(" ", "Recent Topics")}
                ${research.recentIntroHtml ? `<div class="recent-intro mb-4">${research.recentIntroHtml}</div>` : ""}
                <div class="vstack gap-4">
                ${topics.map(renderResearchTopic).join("")}
                </div>
            </section>
            </div>
        </section>`;
    }

    function renderResearchTopic(topic) {
        const related = (topic.relatedWorks || [])
        .map(renderRelatedWork)
        .join("");

        return `
        <article class="card topic-card border-0">
            <div class="row g-0 align-items-stretch">
            <div class="col-lg-5">
                <div class="topic-image-wrap h-100">
                <img src="./${escapeAttribute(topic.image || "")}" alt="${escapeAttribute(topic.imageAlt || topic.title || "Research diagram")}" loading="lazy">
                </div>
            </div>
            <div class="col-lg-7">
                <div class="card-body p-4 p-lg-5">
                <h3 class="h3 fw-bold mb-3">${escapeHtml(topic.title || "Research topic")}</h3>
                <p class="text-body-secondary">${escapeHtml(topic.description || "")}</p>
                ${related ? `<p class="mb-0"><strong>Related works:</strong> ${related}</p>` : ""}
                </div>
            </div>
            </div>
        </article>`;
    }

    function renderRelatedWork(work) {
        if (typeof work === "string") {
        return `<span class="related-work">${escapeHtml(work)}</span>`;
        }

        const label = work?.label || work?.title || work?.url || "Related work";
        if (!work?.url) {
        return `<span class="related-work">${escapeHtml(label)}</span>`;
        }

        return `
        <span class="related-work">
            <a href="${escapeAttribute(work.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>
        </span>`;
    }

    function renderPublications(mount) {
        const allowedTags = Array.isArray(config.publicationTags) ? config.publicationTags : [];
        const publications = DATA.publications || [];
        const groups = groupPublications(publications);

        mount.innerHTML = `
        ${renderPageBanner("publications")}
        <section class="py-5">
            <div class="container-xl">
                <p class="lead text-body mb-4">We prioritize publishing in top-tier venues in computer architecture and systems. Primary targets include:</p>
                <ul class="lead text-body mb-4">
                    <li>Architecture: ISCA, MICRO, ASPLOS, and HPCA</li>
                    <li>Related: DAC, ICCAD, PACT, among others</li>
                </ul>
                <p class="lead text-body mb-4">
                    We follow the top-tier classifications used by
                    <a href="https://csrankings.org/#/fromyear/2020/toyear/2025/index?arch&asia" style="color: #333333;">
                        CSRankings</a>,
                    <a href="https://www.kiise.or.kr/TopConferences/data/SW%EB%B6%84%EC%95%BC%EC%9A%B0%EC%88%98%ED%95%99%EC%88%A0%EB%8C%80%ED%9A%8C%EB%AA%A9%EB%A1%9D_2024.pdf" style="color: #333333;">
                        KIISE</a>, and
                    <a href="https://drive.google.com/open?id=138-hiJFfcnRs8VrB29RazC4FuU6XcNv6&usp=drive_fs" style="color: #333333;">
                    BK21</a>.
                </p>

                <div class="card publication-toolbar border-0 mb-5">
                    <div class="card-body p-4">
                        <div class="row g-3 align-items-end">
                            <div class="col-lg-9">
                                <label class="form-label fw-bold" for="publication-search">Search by author, title, venue, or year</label>
                                <input class="form-control form-control-lg" id="publication-search" type="search" placeholder="Search publications" autocomplete="off">
                            </div>
                            <div class="col-lg-3">
                            <div class="publication-result-summary rounded-3 border bg-white p-3" aria-live="polite">
                                <div class="small text-body-secondary">Results</div>
                                <div class="result-number" id="publication-count">${publications.length}</div>
                            </div>
                        </div>
                    </div>

                        <div class="publication-filter-controls d-flex flex-column flex-xl-row align-items-xl-center justify-content-between gap-3 mt-4">
                            <div class="d-flex flex-wrap gap-2" id="publication-filters" aria-label="Filter publications by topic">
                                <button class="btn btn-sm publication-filter filter-all active" type="button" data-filter="all" aria-pressed="true">All</button>
                                ${allowedTags.map((tag) => `
                                <button class="btn btn-sm publication-filter ${tagClass(tag)}" type="button" data-filter="${escapeAttribute(tag)}" aria-pressed="false">${escapeHtml(tag)}</button>`).join("")}
                            </div>
                            <div class="publication-filter-mode" aria-label="Choose how selected publication tags are matched">
                                <span class="small text-body-secondary fw-bold">Match selected tags</span>
                                <div class="btn-group btn-group-sm" id="publication-filter-mode" role="group" aria-label="Tag filter match mode">
                                    <button class="btn publication-mode-button active" type="button" data-filter-mode="or" aria-pressed="true">OR</button>
                                    <button class="btn publication-mode-button" type="button" data-filter-mode="and" aria-pressed="false">AND</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="lead text-body mb-4">* Co-first authors with equal contributions</p>
                <div class="row g-4">
                    <div class="col-lg-10 order-2 order-lg-1" id="publication-groups">
                    ${groups.map((group) => renderPublicationGroup(group, allowedTags)).join("")}
                    <div class="alert alert-light border text-center" id="publication-no-results" hidden>No publications match the current search and tag filter.</div>
                    </div>
                    <div class="col-lg-2 order-1 order-lg-2">
                    <nav class="publication-year-nav" aria-label="Publication years">
                        <div class="list-group list-group-flush">
                        ${groups.map((group) => `<a class="list-group-item rounded-2" href="#${escapeAttribute(group.anchor)}" data-year-link="${escapeAttribute(group.anchor)}">${escapeHtml(group.label)}</a>`).join("")}
                        </div>
                    </nav>
                    </div>
                </div>
            </div>
        </section>`;

        initializePublicationFilters();
    }

    function renderPublicationGroup(group, allowedTags) {
        return `
        <section class="publication-group mb-5" id="${escapeAttribute(group.anchor)}" data-publication-group="${escapeAttribute(group.anchor)}">
            <h2 class="publication-group-heading h3 mb-0">${escapeHtml(group.label)}</h2>
            <div>
            ${group.publications.map((publication) => renderPublication(publication, allowedTags)).join("")}
            </div>
        </section>`;
    }

    function renderPublication(publication, allowedTags) {
        const tags = (publication.tags || []).filter((tag) => allowedTags.includes(tag));
        const searchText = [
        publication.id,
        publication.venueShort,
        publication.title,
        htmlToSearchText(publication.authors),
        htmlToSearchText(publication.venue),
        publication.year,
        ...tags,
        ...getPublicationDetails(publication.details).map(htmlToSearchText)
        ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

        const links = (publication.links || []).filter((link) => link.url);
        const details = getPublicationDetails(publication.details);

        return `
        <article class="publication-item py-4" data-publication data-search="${escapeAttribute(searchText)}" data-tags="${escapeAttribute(tags.join("|"))}">
            <div class="row g-3">
            <div class="col-md-3 col-lg-2 publication-meta">
                <div class="publication-code ${publicationCodeClass(publication)}">${escapeHtml(publication.id || "")}</div>
                <div class="publication-venue-short">${escapeHtml(publication.venueShort || "")}</div>
                <div>
                ${tags.map((tag) => `<span class="pub-tag ${tagClass(tag)}">${escapeHtml(tag)}</span>`).join("")}
                </div>
            </div>
            <div class="col-md-9 col-lg-10">
                <h3 class="publication-title mb-2">${escapeHtml(publication.title || "Untitled publication")}</h3>
                ${publication.authors ? `<p class="publication-authors mb-1">${publication.authors}</p>` : ""}
                ${publication.venue ? `<p class="publication-venue mb-2">${publication.venue}</p>` : ""}
                ${details.length ? `<ul class="publication-details">${details.map((detail) => `<li>${detail}</li>`).join("")}</ul>` : ""}
                ${links.length ? `<div class="d-flex flex-wrap gap-2">${links.map(renderExternalButton).join("")}</div>` : ""}
            </div>
            </div>
        </article>`;
    }

    function getPublicationDetails(details) {
        if (Array.isArray(details)) return details;
        return details ? [details] : [];
    }

    function publicationCodeClass(publication) {
        const id = String(publication.id || "").trim().toLocaleUpperCase();
        if (publication.status === "preprint" || id.startsWith("P")) return "publication-code-preprint";
        if (id.startsWith("J")) return "publication-code-journal";
        return "";
    }

    function htmlToSearchText(value) {
        const container = document.createElement("div");
        container.innerHTML = String(value || "");
        return container.textContent || "";
    }

    function initializePublicationFilters() {
        const searchInput = document.getElementById("publication-search");
        const filterContainer = document.getElementById("publication-filters");
        const modeContainer = document.getElementById("publication-filter-mode");
        const publications = [...document.querySelectorAll("[data-publication]")];
        const groups = [...document.querySelectorAll("[data-publication-group]")];
        const yearLinks = [...document.querySelectorAll("[data-year-link]")];
        const count = document.getElementById("publication-count");
        const noResults = document.getElementById("publication-no-results");
        if (!searchInput || !filterContainer) return;

        const selectedFilters = new Set();
        let filterMode = "or";

        const update = () => {
        const query = normalizeSearch(searchInput.value);
        let visibleCount = 0;

        publications.forEach((publication) => {
            const searchText = normalizeSearch(publication.dataset.search || "");
            const tags = (publication.dataset.tags || "").split("|").filter(Boolean);
            const matchesQuery = !query || searchText.includes(query);
            const matchesTag = selectedFilters.size === 0
            || (filterMode === "and"
                ? [...selectedFilters].every((filter) => tags.includes(filter))
                : [...selectedFilters].some((filter) => tags.includes(filter)));
            const visible = matchesQuery && matchesTag;
            publication.hidden = !visible;
            if (visible) visibleCount += 1;
        });

        groups.forEach((group) => {
            const hasVisiblePublication = [...group.querySelectorAll("[data-publication]")]
            .some((publication) => !publication.hidden);
            group.hidden = !hasVisiblePublication;
            const anchor = group.dataset.publicationGroup || "";
            const yearLink = yearLinks.find((link) => link.dataset.yearLink === anchor);
            if (yearLink) yearLink.hidden = !hasVisiblePublication;
        });

        if (count) count.textContent = String(visibleCount);
        if (noResults) noResults.hidden = visibleCount !== 0;
        };

        const updateFilterButtons = () => {
        filterContainer.querySelectorAll("[data-filter]").forEach((candidate) => {
            const filter = candidate.dataset.filter || "all";
            const selected = filter === "all" ? selectedFilters.size === 0 : selectedFilters.has(filter);
            candidate.classList.toggle("active", selected);
            candidate.setAttribute("aria-pressed", String(selected));
        });
        };

        const updateModeButtons = () => {
        if (!modeContainer) return;

        modeContainer.querySelectorAll("[data-filter-mode]").forEach((candidate) => {
            const selected = candidate.dataset.filterMode === filterMode;
            candidate.classList.toggle("active", selected);
            candidate.setAttribute("aria-pressed", String(selected));
        });
        };

        searchInput.addEventListener("input", update);
        filterContainer.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter]");
        if (!button) return;

        const filter = button.dataset.filter || "all";
        if (filter === "all") {
            selectedFilters.clear();
        } else if (selectedFilters.has(filter)) {
            selectedFilters.delete(filter);
        } else {
            selectedFilters.add(filter);
        }

        updateFilterButtons();
        update();
        });

        modeContainer?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter-mode]");
        if (!button) return;

        filterMode = button.dataset.filterMode === "and" ? "and" : "or";
        updateModeButtons();
        update();
        });
    }

    function renderNews(mount) {
        const groups = groupNewsByYear(getSortedNews());

        mount.innerHTML = `
        ${renderPageBanner("news")}
        <section class="py-5">
            <div class="container-xl">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                ${groups.length ? groups.map((group) => `
                    <section class="mb-5" aria-labelledby="news-${escapeAttribute(group.year)}">
                    <h2 class="h3 fw-bold mb-3" id="news-${escapeAttribute(group.year)}">${escapeHtml(group.year)}</h2>
                    <div class="list-group list-group-flush news-list">${renderNewsRows(group.items)}</div>
                    </section>`).join("") : renderEmptyState("News entries will appear here.")}
                </div>
            </div>
            </div>
        </section>`;
    }

    function renderNewsRows(news) {
        if (!news.length) return renderEmptyState("No news has been added yet.");

        return news.map((item) => `
        <article class="list-group-item">
            <div class="row g-1 g-md-3 align-items-start">
            <div class="col-md-2 col-lg-2">
                <time class="news-date" datetime="${escapeAttribute(item.date || "")}">${formatDate(item.date)}</time>
            </div>
            <div class="col-md-10 col-lg-10 news-body">${item.html || ""}</div>
            </div>
        </article>`).join("");
    }



    // ========== ========== ========== ========== ========== //
    // ========== ========== ========== ========== ========== //
    // ========== ========== ========== ========== ========== //



    function renderTeaching(mount) {
        const teaching = DATA.teaching || {};
        const sections = teaching.sections || [];

        mount.innerHTML = `
        ${renderPageBanner("teaching")}
        <section class="py-5">
            <div class="container-xl">
            <div class="row justify-content-center">
                <div class="col-xl-9">
                ${sections.map((section) => `
                    <section class="mb-5">
                    <h2 class="h3 fw-bold mb-1">${escapeHtml(section.title || "Teaching")}</h2>
                    ${getTeachingInstitutions(section).map(renderTeachingInstitution).join("")}
                    </section>`).join("")}
                </div>
            </div>
            </div>
        </section>`;
    }

    function getTeachingInstitutions(section) {
        if (Array.isArray(section.institutions) && section.institutions.length) {
            return section.institutions;
        }

        if (Array.isArray(section.groups) && section.groups.length) {
            return section.groups;
        }

        return [{
            institution: section.institution || "",
            items: section.items || []
        }];
    }

    function renderTeachingInstitution(group) {
        const items = Array.isArray(group.items) ? group.items : [];
        return `
        <div class="teaching-institution-group">
            ${group.institution ? `<p class="institution-label mb-3">${escapeHtml(group.institution)}</p>` : ""}
            <div class="list-group course-list shadow-sm rounded-3 overflow-hidden">
            ${items.map(renderCourse).join("")}
            </div>
        </div>`;
    }

    function renderCourse(course) {
        return `
        <article class="list-group-item p-3 p-md-4 d-flex flex-column flex-md-row justify-content-between gap-2">
            <div>
            ${course.code ? `<span class="course-code">${escapeHtml(course.code)}:</span> ` : ""}${escapeHtml(course.title || "")}
            </div>
            <div class="course-term">
            <span class="d-block">${escapeHtml(course.term || "")}</span>
            ${course.note ? `<span class="d-block fw-semibold">${escapeHtml(course.note)}</span>` : ""}
            </div>
        </article>`;
    }

    function renderPhotos(mount) {
        const photos = DATA.photos || [];

        mount.innerHTML = `
        ${renderPageBanner("photos")}
        <section class="py-5">
            <div class="container-xl">
            ${photos.length ? `
                <div class="row g-4">
                ${photos.map(renderPhotoAlbum).join("")}
                </div>
                ${photos.map(renderPhotoGalleryModal).join("")}` : renderEmptyState("Photo entries will appear here.")}
            </div>
        </section>`;
    }

    function renderPhotoAlbum(photo, index) {
        const images = getPhotoImages(photo);
        const representativeImage = images[0];
        if (!representativeImage) return "";

        return `
        <div class="col-md-6 col-xl-4">
            <a class="card photo-card photo-gallery-trigger border-0 mb-0 text-decoration-none" href="#photo-gallery-modal-${index}" role="button" data-bs-toggle="modal" data-bs-target="#photo-gallery-modal-${index}" aria-label="Open ${escapeAttribute(photo.title || "photo gallery")}">
            ${renderPhotoCardContent(photo, representativeImage, "div")}
            </a>
        </div>`;
    }

    function renderPhotoGalleryModal(photo, index) {
        const galleryImages = getPhotoImages(photo);
        if (!galleryImages.length) return "";

        return `
        <div class="modal fade photo-gallery-modal" id="photo-gallery-modal-${index}" tabindex="-1" aria-labelledby="photo-gallery-title-${index}" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content border-0">
                <div class="modal-header">
                <h2 class="modal-title h5 fw-bold" id="photo-gallery-title-${index}">${escapeHtml(photo.title || "Photos")}</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                <div class="photo-gallery-stack">
                    ${galleryImages.map((image) => renderGalleryPhoto(image, photo)).join("")}
                </div>
                </div>
            </div>
            </div>
        </div>`;
    }

    function renderGalleryPhoto(image, photo) {
        return `
        <div class="photo-gallery-frame">
            <img class="photo-gallery-image" src="./${escapeAttribute(image.src || "")}" alt="${escapeAttribute(image.alt || photo.title || "Lab photo")}" loading="lazy">
        </div>`;
    }

    function renderPhotoCardContent(photo, image, captionTag = "figcaption") {
        return `
        <img src="./${escapeAttribute(image.src || "")}" alt="${escapeAttribute(image.alt || photo.title || "Lab photo")}" loading="lazy">
        <${captionTag} class="card-body p-4">
            ${photo.date ? `<div class="photo-date mb-2">${escapeHtml(photo.date)}</div>` : ""}
            <h3 class="h5 fw-bold">${escapeHtml(photo.title || "Photo")}</h3>
            ${photo.caption ? `<p class="mb-0 text-body-secondary">${escapeHtml(photo.caption)}</p>` : ""}
        </${captionTag}>`;
    }

    function getPhotoImages(photo) {
        if (Array.isArray(photo.images) && photo.images.length) {
        return photo.images
            .map((image) => {
            if (typeof image === "string") return { src: image, alt: photo.title || "Lab photo" };
            return {
                src: image.src || image.image || "",
                alt: image.alt || photo.title || "Lab photo"
            };
            })
            .filter((image) => image.src);
        }

        if (photo.image) {
        return [{ src: photo.image, alt: photo.alt || photo.title || "Lab photo" }];
        }

        return [];
    }

    App.render = {
        renderCurrentPage,
        renderHome,
        renderNews,
        renderPeople,
        renderPhotos,
        renderPublications,
        renderResearch,
        renderTeaching
    };
})();
