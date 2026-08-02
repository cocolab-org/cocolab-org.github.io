(() => {
    "use strict";

    const App = window.COCOLAB_APP || {};

    if (!App.layout || !App.render || !App.dataHelpers) {
        console.error("CoCoLab scripts are not loaded in the expected order.");
        return;
    }

    const {
        applyTheme,
        initializeNavbarBehavior,
        renderFooter,
        renderHeader,
        updateDocumentMeta
    } = App.layout;
    const { renderCurrentPage } = App.render;
    const { validatePublicationTags } = App.dataHelpers;

    document.addEventListener("DOMContentLoaded", initialize);

    function initialize() {
        const page = document.body.dataset.page || "home";
        applyTheme();
        renderHeader(page);
        renderFooter();
        renderCurrentPage(page);
        updateDocumentMeta(page);
        initializeNavbarBehavior();
        validatePublicationTags();
    }
})();
