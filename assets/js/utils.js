(() => {
    "use strict";

    const App = window.COCOLAB_APP = window.COCOLAB_APP || {};
    App.DATA = window.COCOLAB || {};
    App.config = App.DATA.config || {};

    function formatDate(date) {
        const value = String(date || "");
        const parts = value.split("-");
        return parts.length === 3 ? parts.join(".") : escapeHtml(value);
    }

    function tagClass(tag) {
        return `tag-${slugify(tag)}`;
    }

    function slugify(value) {
        return String(value || "")
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    function normalizeSearch(value) {
        return String(value || "").trim().toLocaleLowerCase();
    }

    function hexToRgb(value) {
        const normalized = String(value || "").trim().replace(/^#/, "");
        if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;
        return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16)
        };
    }

    function escapeHtml(value) {
        return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function escapeAttribute(value) {
        return escapeHtml(value).replace(/`/g, "&#096;");
    }

    App.utils = {
        escapeAttribute,
        escapeHtml,
        formatDate,
        hexToRgb,
        normalizeSearch,
        slugify,
        tagClass
    };
})();
