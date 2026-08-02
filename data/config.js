/**
 * CoCoLab website settings
 * ------------------------
 * Site-wide settings live here. No build command is required:
 * edit, commit, and push to GitHub Pages.
 */
window.COCOLAB = window.COCOLAB || {};

window.COCOLAB.config = {
  siteTitle: "CoCoLab",
  labName: "Computer Architecture and Co-design Research",
  organization: "Department of Computer Science and Engineering, UNIST",
  contactEmail: "ranggi.hwg@gmail.com",

  // Theme colors from the supplied design document.
  colors: {
    primary: "#FFC000",
    accent: "#82CAFF",
    lime: "#D0FF7E"
  },

  // These are the only publication tags displayed by the site.
  publicationTags: [
    "AI",
    "Architecture",
    "System",
    "Accelerator",
    "Memory system"
  ],

  navigation: [
    { key: "people", label: "People", href: "people.html" },
    { key: "research", label: "Research", href: "research.html" },
    { key: "publications", label: "Publications", href: "publications.html" },
    { key: "news", label: "News", href: "news.html" },
    { key: "teaching", label: "Teaching", href: "teaching.html" },
    { key: "photos", label: "Photos", href: "photos.html" }
  ],

  footer: {
    copyrightName: "CoCoLab",
    address: "UNIST, Ulsan, Republic of Korea"
  }
};
