(() => {
    "use strict";

    const App = window.COCOLAB_APP;
    const DATA = App.DATA;
    const config = App.config;

    function getSortedNews() {
        return [...(DATA.news || [])].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    }

    function groupNewsByYear(news) {
        const map = new Map();

        news.forEach((item) => {
        const year = String(item.date || "").slice(0, 4) || "Other";
        if (!map.has(year)) map.set(year, []);
        map.get(year).push(item);
        });

        return [...map.entries()]
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([year, items]) => ({ year, items }));
    }

    function groupPublications(publications) {
        const groups = [];
        const anchorCounts = new Map();
        let currentGroup = null;

        publications.forEach((publication) => {
        const label = publication.status === "preprint" ? "Preprint" : String(publication.year || "Other");

        if (!currentGroup || currentGroup.label !== label) {
            const anchorBase = publication.status === "preprint" ? "pub-preprint" : `pub-${publication.year || "other"}`;
            const count = anchorCounts.get(anchorBase) || 0;
            anchorCounts.set(anchorBase, count + 1);

            currentGroup = {
            label,
            anchor: count === 0 ? anchorBase : `${anchorBase}-${count + 1}`,
            publications: []
            };
            groups.push(currentGroup);
        }

        currentGroup.publications.push(publication);
        });

        return groups;
    }

    function validatePublicationTags() {
        const allowedTags = new Set(config.publicationTags || []);
        (DATA.publications || []).forEach((publication) => {
        (publication.tags || []).forEach((tag) => {
            if (!allowedTags.has(tag)) {
            console.warn(`Unsupported publication tag "${tag}" in ${publication.id || publication.title || "publication"}.`);
            }
        });
        });
    }

    App.dataHelpers = {
        getSortedNews,
        groupNewsByYear,
        groupPublications,
        validatePublicationTags
    };
})();
