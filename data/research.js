/** Research page content */
window.COCOLAB = window.COCOLAB || {};

window.COCOLAB.research = {
  statementHtml: "We design both <strong>hardware</strong> and <strong>software</strong> to make AI systems faster and more efficient!",
  areas: [
    {
      title: "Computer architecture and systems",
      description: " "
    },
    {
      title: "AI accelerators",
      description: " "
    },
    {
      title: "Hardware-software co-design for AI/ML",
      description: " "
    }
  ],
  recentIntroHtml: "Currently, we are designing <strong>LLM / physical AI / agentic AI systems</strong> for both datacenters and edge devices.",
  topics: [
    {
      title: "Algorithm-system co-design for large language models on GPU systems",
      image: "assets/images/research/llm-system.png",
      imageAlt: "Conceptual block diagram of an LLM execution and scheduling system",
      description: "LLMs have advanced significantly, but they present substantial memory challenges. To address this, we propose an algorithm-system co-design that overcomes these memory challenges while improving inference performance. This approach reduces GPU memory usage and maintains model accuracy, making it feasible to efficiently deploy large-scale LLMs on a single GPU.",
      relatedWorks: [
        { label: "[ASPLOS'24]", url: "https://dl.acm.org/doi/10.1145/3620665.3640384" },
        { label: "[ISCA'24]", url: "https://www.computer.org/csdl/proceedings-article/isca/2024/265800b018/1Z3pEe79xPW" },
        { label: "[HPCA'26]", url: "" }
      ]
    },
    {
      title: "Hardware accelerator design for graph neural networks",
      image: "assets/images/research/gnn-accelerator.png",
      imageAlt: "Conceptual block diagram of a graph neural network accelerator",
      description: "GNNs have emerged as a key technology in application domains where the input data is relational. However, their reliance on sparse matrix multiplication leads to inefficient data movement, resulting in significant performance bottlenecks. To address this, we present an NPU accelerator based on a row-wise product, co-designing hardware and software to balance locality and parallelism in GNNs. This approach achieves substantial energy-efficiency improvements compared to state-of-the-art NPU accelerators.",
      relatedWorks: [
        { label: "[MICRO'22]", url: "https://dl.acm.org/doi/10.1109/MICRO56248.2022.00084" },
        { label: "[CAL'23]", url: "https://ieeexplore.ieee.org/document/10005793" },
        { label: "[HPCA'23]", url: "https://ieeexplore.ieee.org/document/10070983" }
      ]
    },
    {
      title: "Memory systems for efficient AI inference",
      image: "assets/images/research/memory-system.png",
      imageAlt: "Conceptual diagram of a hierarchical AI memory system",
      description: "Personalized recommendations power major applications such as ads, videos, and e-commerce. However, recommendation systems face two key performance bottlenecks: memory-intensive embedding layers and compute-intensive multi-layer perceptron (MLP) layers. To address these challenges, we propose a chiplet-based hybrid accelerator that overcomes both the memory throughput limitations and the compute demands. We implement and evaluate our design on Intel HARPv2, a package-integrated CPU+FPGA device, achieving significant speedups and energy-efficiency improvements.",
      relatedWorks: [
        { label: "[ISCA'20]", url: "https://ieeexplore.ieee.org/document/9138942" },
        { label: "[ISCA'25]", url: "https://dl.acm.org/doi/full/10.1145/3695053.3731050" }
      ]
    }
  ]
};
