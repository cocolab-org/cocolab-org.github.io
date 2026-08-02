/**
 * People page content
 * -------------------
 * Undergraduate interns are intentionally rendered without photos.
 * Add or remove entries by copying an object and updating its fields.
 */
window.COCOLAB = window.COCOLAB || {};

window.COCOLAB.people = {
  principalInvestigator: [
    {
      name: "Ranggi Hwang",
      role: "Principal Investigator",
      email: "ranggi.hwg@gmail.com",
      image: "assets/images/people/ranggi-hwang.jpg",
      imageAlt: "Placeholder portrait for Ranggi Hwang",
      bio: [
        "Assistant Professor",
        "Computer Architecture and Co-design Research Group (CoCoLab)",
        "Department of Computer Science and Engineering (CSE)",
        "Graduate School of Artificial Intelligence (AIGS)",
        "Ulsan National Institute of Science & Technology (UNIST)",
        "Office: #601-3, Bldg. 106"
      ],
      links: [
        { label: "Homepage", url: "https://sites.google.com/view/unist-cocolab/pi" },
        { label: "GitHub", url: "" },
        { label: "Google Scholar", url: "https://scholar.google.com/citations?user=X6GMiFIAAAAJ&hl=en" },
        { label: "LinkedIn", url: "https://lh3.googleusercontent.com/sitesv/AG8ngQXYlRQ1PQcWrWmIkDW7a-tqxXDOrs_ycVRkRwBuAO1eRyyPwZb6Xjub23vQhOy1_XdH6nYwjPFU6oq4g-LVaiIRxNlR1vswFO40QI9FdqQ1zmesxiJIwxcBlAxOf2GPyYDFOUv8sBAY5q_-9XDMPrIsLZnQcT7EVx0NKxGicA7wTjB3HgOa7rBdO3tlbemh3cXczLU8Aul30bMvTQ" }
      ]
    }
  ],

  graduateStudents: [
    {
      name: "Myeonghyeon Cho",
      degree: "M.S.-Ph.D.",
      email: "myeonghyeon.cho@unist.ac.kr",
      image: "assets/images/people/myeonghyeon-cho.jpg",
      imageAlt: " ",
      bio: ["AI accelerators", "Hardware-software co-design"],
      links: [
        { label: "Homepage", url: "https://sites.google.com/view/myeonghyeon-cho/home" },
        { label: "GitHub", url: "" },
        { label: "LinkedIn", url: "" }
      ]
    },
    {
      name: "Hyeonseo Kim",
      degree: "M.S.",
      email: "gustj919@gmail.com",
      image: "assets/images/people/hyeonseo-kim.jpg",
      imageAlt: " ",
      bio: ["AI accelerators", "Hardware-software co-design"],
      links: [
        { label: "Homepage", url: "https://sites.google.com/view/hyeonseo-kim/home" },
        { label: "GitHub", url: "" }
      ]
    }
  ],

  // No image field is needed here. These entries are shown as compact cards.
  undergraduateInterns: [
    {
      name: "Kihyeon Kim",
      affiliation: "UNIST",
      term: "Undergraduate Research Intern (Spring 2026 ~)",
      interests: []
    },
    {
      name: "Geonho Kim",
      affiliation: "UNIST",
      term: "Undergraduate Research Intern (Winter 2025 ~)",
      interests: []
    }
  ],

  formerUndergraduateInterns: [
    { name: "Soomin Cho", term: "Summer 2026" },
    { name: "Jeawoo Lim", term: "Spring 2026" },
    { name: "Jiho Park", term: "Spring 2026" },
    { name: "Jongyu Heo", term: "Winter 2025" },
    { name: "Seungik Son", term: "Winter 2025" }
  ],

  alumni: [
    // Example:
    // { name: "Alumni Name", degree: "M.S.", period: "2024-2026", next: "Company or university" }
  ]
};
