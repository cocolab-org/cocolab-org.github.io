/**
 * Publications
 * ------------
 * Allowed tags: AI, Architecture, System, Accelerator, Memory system.
 *
 * `status` can be "preprint" or "published".
 * `links` may contain PDF, arXiv, Code, Project, DOI, etc.
 * `authors`, `venue`, and `details` are rendered as trusted HTML.
 */

window.COCOLAB = window.COCOLAB || {};

window.COCOLAB.publications = [
    {
        id: "C8",
        venueShort: "DAC",
        status: "published",
        year: 2026,
        title: "SpecMoE: A Fast and Efficient Mixture-of-Experts Inference via Self-Assisted Speculative Decoding",
        authors: "Jehyeon Bang, Eunyeong Cho, <span class=\"lab-author\">Ranggi Hwang</span>, Jinha Chung, and Minsoo Rhu",
        venue: "The 63rd ACM/ESDA/IEEE Design Automation Conference (<a href=\"https://dac.com/2026\"><b>DAC</b>-63</a>), Long Beach, CA, Jul. 2026",
        tags: ["AI", "System"],
        details: ["Acceptance rate: 22%"],
        links: [
            { label: "arXiv", url: "https://arxiv.org/abs/2604.10152" },
            { label: "Code", url: "" }
        ]
    },
    {
        id: "C7",
        venueShort: "HPCA",
        status: "published",
        year: 2026,
        title: "PASCAL: A Phase-Aware Scheduling Algorithm for Serving Reasoning-based Large Language Models",
        authors: "Eunyeong Cho, Jehyeon Bang, <span class=\"lab-author\">Ranggi Hwang</span>, and Minsoo Rhu",
        venue: "The 32nd IEEE International Symposium on High-Performance Computer Architecture (<a href=\"https://conf.researchr.org/home/hpca-2026\"><b>HPCA</b>-32</a>), Sydney, Australia, Feb. 2026",
        tags: ["AI", "System"],
        details: ["Acceptance rate: 20% (119 among 602)"],
        links: [
            { label: "arXiv", url: "https://arxiv.org/abs/2602.11530" }
        ]
    },
    {
        id: "J2",
        venueShort: "CAL",
        status: "published",
        year: 2026,
        title: "Exploring KV Cache Quantization in Multimodal Large Language Model Inference",
        authors: "Hyesung Ahn, <span class=\"lab-author\">Ranggi Hwang</span>, and Minsoo Rhu",
        venue: "IEEE Computer Architecture Letters, Jan.-Jun. 2026",
        tags: ["AI", "Architecture", "Memory system"],
        details: [],
        links: [
            { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/document/11304543/" }
        ]
    },
    {
        id: "C6",
        venueShort: "ISCA",
        status: "published",
        year: 2025,
        title: "Debunking the CUDA Myth Towards GPU-based AI Systems",
        authors: "Yunjae Lee*, Juntaek Lim*, Jehyeon Bang, Eunyeong Cho, Huijong Jeong, Taesu Kim, Hyungjun Kim, Joonhyung Lee, Jinseop Im, <span class=\"lab-author\">Ranggi Hwang</span>, Se Jung Kwon, Dongsoo Lee, and Minsoo Rhu",
        venue: "The 52nd IEEE/ACM International Symposium on Computer Architecture (<a href=\"https://iscaconf.org/isca2025/\"><b>ISCA</b>-52</a>), Tokyo, Japan, June 2025",
        tags: ["AI", "Architecture", "System", "Accelerator"],
        details: ["Acceptance rate: 23% (132 among 570)"],
        links: [
            { label: "arXiv", url: "https://arxiv.org/abs/2501.00210" }
        ]
    },
    {
        id: "C5",
        venueShort: "ISCA",
        status: "published",
        year: 2024,
        title: "Pre-gated MoE: An Algorithm-System Co-Design for Fast and Scalable Mixture-of-Expert Inference",
        authors: "<span class=\"lab-author\">Ranggi Hwang*</span>, Jianyu Wei*, Shijie Cao, Changho Hwang, Xiaohu Tang, Ting Cao, and Mao Yang",
        venue: "The 51st IEEE/ACM International Symposium on Computer Architecture (<a href=\"https://iscaconf.org/isca2024/\"><b>ISCA</b>-51</a>), Buenos Aires, Argentina, June 2024",
        tags: ["AI", "Architecture", "System"],
        details: ["Acceptance Rate: 19% (83 among 423)", "Featured in Microsoft Research Blog's Research Focus series."],
        links: [
            { label: "arXiv", url: "https://arxiv.org/pdf/2308.12066.pdf" },
            { label: "Github", url: "https://github.com/ranggihwang/Pregated_MoE" },
            { label: "Microsoft Reaserch Blog", url: "https://www.microsoft.com/en-us/research/blog/research-focus-week-of-july-15-2024/" }
        ]
    },
    {
        id: "C4",
        venueShort: "ASPLOS",
        status: "published",
        year: 2024,
        title: "LazyDP: Co-Designing Algorithm-Software for Scalable Training of Differentially Private Recommendation Models",
        authors: "Juntaek Lim, Youngeun Kwon, <span class=\"lab-author\">Ranggi Hwang</span>, Kiwan Maeng, Edward Suh, and Minsoo Rhu",
        venue: "The 29th ACM International Conference on Architectural Support for  Programming Languages and Operating Systems (<a href=\"https://www.asplos-conference.org/asplos2024/\"><b>ASPLOS</b>-29</a>), San Diego, CA, USA, Mar. 2024",
        tags: ["AI", "System"],
        details: ["Acceptance Rate: 20% (193 among 921)"],
        links: [
            { label: "arXiv", url: "https://arxiv.org/abs/2404.08847" },
            { label: "Presentation", url: "https://www.youtube.com/watch?v=DY4Mcohscds" },
            { label: "Github", url: "https://github.com/VIA-Research/LazyDP" }
        ]
    },
    {
        id: "C3",
        venueShort: "HPCA",
        status: "published",
        year: 2023,
        title: "GROW: A Row-Stationary Sparse-Dense GEMM Accelerator for Memory-Efficient Graph Convolutional Neural Networks",
        authors: "<span class=\"lab-author\">Ranggi Hwang*</span>, Minhoo Kang*, Jiwon Lee, Dongyun Kam, Youngjoo Lee, and Minsoo Rhu",
        venue: "The 29th IEEE International Symposium on High-Performance Computer Architecture (<a href=\"https://hpca-conf.org/2023/\"><b>HPCA</b>-29</a>), Montreal, QC, Canada, Feb. 2023",
        tags: ["AI", "Architecture", "Accelerator", "Memory system"],
        details: ["Acceptance Rate: 25% (91 among 364)"],
        links: [
            { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/document/10070983" }
        ]
    },
    {
        id: "J1",
        venueShort: "CAL",
        status: "published",
        year: 2023,
        title: "HAMMER: Hardware-friendly Approximate Computing for Self-attention with Mean-redistribution and Linearization",
        authors: "Seonho Lee, <span class=\"lab-author\">Ranggi Hwang</span>, Jongse Park, and Minsoo Rhu",
        venue: "IEEE Computer Architecture Letters, Jan.-Jun. 2023",
        tags: ["AI", "Architecture", "Accelerator"],
        details: [],
        links: [
            { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/document/10005793" }
        ]
    },
    {
        id: "C2",
        venueShort: "MICRO",
        status: "published",
        year: 2022,
        title: "DiVa: An Accelerator for Differentially Private Machine Learning",
        authors: "Beomsik Park*, <span class=\"lab-author\">Ranggi Hwang*</span>, Dongho Yoon, Yoonhyuk Choi, and Minsoo Rhu",
        venue: "The 55th IEEE/ACM International Symposium on Microarchitecture (<a href=\"https://www.microarch.org/micro55/\"><b>MICRO</b>-55</a>), Chicago, IL, USA, Oct. 2022",
        tags: ["AI", "Architecture", "Accelerator"],
        details: ["Acceptance Rate: 22% (83 among 369)"],
        links: [
            { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/document/9923814" },
            { label: "Article", url: "https://n.news.naver.com/mnews/article/001/0013385417?sid=105" }
        ]
    },
    {
        id: "C1",
        venueShort: "ISCA",
        status: "published",
        year: 2020,
        title: "Centaur: A Chiplet-based, Hybrid Sparse-Dense Accelerator for Personalized Recommendations",
        authors: "<span class=\"lab-author\">Ranggi Hwang</span>, Taehun Kim, Youngeun Kwon, and Minsoo Rhu",
        venue: "The 47th IEEE/ACM International Symposium on Computer Architecture (<a href=\"https://iscaconf.org/isca2020/\"><b>ISCA</b>-47</a>), Valencia, Spain, June 2020",
        tags: ["AI", "Architecture", "Accelerator"],
        details: ["Acceptance Rate: 18% (77 among 421)"],
        links: [
            { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/document/9138942" },
            { label: "Presentation", url: "https://www.youtube.com/watch?v=NWjcZ8GZmks&t=4s" },
            { label: "Article", url: "https://n.news.naver.com/mnews/article/030/0002891849?sid=101" }

        ]
    },
];
