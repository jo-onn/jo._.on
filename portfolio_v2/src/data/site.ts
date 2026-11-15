// Single source of content for the v2 bento home.
// Kept separate from v1's config so the two sites can evolve independently.

export const site = {
  name: { first: "JOON HYUK", last: "LEE" },
  handle: "jo._.on",
  tagline: "Data Analyst / AX & AI Business Strategy",
  description:
    "jo._.on — from building medical AI models to bringing them to market. Data analysis, AX and AI business strategy.",
  email: "leejoon2067@gmail.com",
  social: {
    github: "https://github.com/jo-onn",
    linkedin: "https://www.linkedin.com/in/jo-on/",
    tistory: "https://jhklee-coder.tistory.com/",
  },
  resume: "/resume.pdf",
  // Placeholder (v1 avatar) — swap for a real photo at public/profile.*
  photo: "/profile.png",

  now: {
    org: "NAVER Cloud",
    role: "Healthcare AI Business Strategy Intern",
    timeZone: "Asia/Seoul",
    zoneLabel: "SEOUL / KST",
  },

  chat: {
    title: "Ask about jo._.on",
    placeholder: "Ask anything…",
    suggestions: ["Brain CT paper", "Why AX strategy?", "Musinsa SKIN-Fit"],
  },

  projects: {
    cover: "/projects/musinsa-fit-1.png",
    list: [
      {
        name: "Deep-Learning Anomaly Detection for Intracranial Hemorrhage in Brain CT",
        year: "2026",
        badges: ["Paper", "MIDL 2026"],
        image: "/projects/brain-ct-1.png",
        description:
          "A systematic benchmark of 11 deep-learning anomaly detection methods for intracranial hemorrhage in brain CT, favoring reconstruction-based over self-supervised approaches.",
        skills: ["PyTorch", "Medical Imaging", "Anomaly Detection"],
        links: [{ label: "Paper", href: "/projects/midl-2026-paper.pdf" }],
      },
      {
        name: "Musinsa SKIN-Fit — Ingredient-Based Skincare Recommendation",
        year: "2026",
        badges: ["Project"],
        image: "/projects/musinsa-fit-1.png",
        description:
          "From ~700K reviews and 1,198 products, shows the platform doesn't use the skin-type data it collects — then closes the gap with an ingredient-OCR → skin-fit scoring pipeline shipped as a Chrome extension.",
        skills: ["Python", "FastAPI", "Data Analysis", "Chrome Extension"],
        links: [
          { label: "Demo", href: "https://www.youtube.com/watch?v=NTmTXhBoTvY" },
          { label: "Report", href: "/projects/musinsa-fit-report.pdf" },
        ],
      },
      {
        name: "Multimodal Biosignal-Based Attention Prediction",
        year: "2025",
        badges: ["Paper", "KSC 2025"],
        image: "/projects/ksc-1.png",
        description:
          "An ML pipeline predicting learner attention from multimodal wearable biosignals — HR, RRI, EDA and skin temperature — beyond single-sensor approaches.",
        skills: ["Python", "Machine Learning", "Time Series"],
        links: [{ label: "Poster", href: "/projects/ksc-2025-poster.pdf" }],
      },
      {
        name: "CiFarm — Urban Farm Matching & AI Farming Coach",
        year: "2024",
        badges: ["KHUTHON 2024 · Grand Prize"],
        image: "/projects/cifarm-1.png",
        description:
          "An urban-farming platform where a LangGraph-based AI agent handles plot matching and step-by-step growing guides.",
        skills: ["LangChain", "LangGraph", "FastAPI"],
        links: [{ label: "KHUTHON", href: "https://hello.khlug.org/105312" }],
      },
    ],
  },

  research: [
    {
      venue: "MIDL 2026",
      title: "Anomaly detection for brain CT hemorrhage",
      status: "Submitted",
      summary:
        "Benchmarked 11 deep-learning anomaly detection methods on brain CT; reconstruction-based models outperformed self-supervised ones for intracranial hemorrhage.",
      href: "/projects/midl-2026-paper.pdf",
      linkLabel: "Read paper",
    },
    {
      venue: "KSC 2025",
      title: "Multimodal biosignal attention prediction",
      status: "Poster",
      summary:
        "Predicted learner attention from wearable HR, RRI, EDA and skin-temperature signals with a multimodal time-series ML pipeline.",
      href: "/projects/ksc-2025-poster.pdf",
      linkLabel: "View poster",
    },
  ],

  // "The Story" modal (My Journey tile). Oldest first.
  // DRAFT copy: written only from facts already on the site (experience + About).
  // Rewrite freely in your own voice.
  story: [
    {
      year: "2024",
      icon: "bot",
      headline: "Shipping agents in a startup",
      body: [
        "At FutureWorkLab I joined LinkBrain at its earliest PoC stage — a 'second brain' that turns links and memos into a knowledge graph.",
        "I designed the LangGraph agent pipeline end to end and researched GNN + BERT link prediction. That same year, an AI farming-coach agent won the KHUTHON grand prize.",
      ],
      image: "/projects/cifarm-1.png",
    },
    {
      year: "2025",
      icon: "activity",
      headline: "Learning to measure what matters",
      body: [
        "In AIMS Lab I moved from building products to asking research questions: can wearable biosignals tell us when a learner is paying attention?",
        "The multimodal HR, EDA and skin-temperature pipeline became a KSC 2025 poster — and the start of my work with medical data.",
      ],
      image: "/projects/ksc-1.png",
    },
    {
      year: "2026",
      icon: "microscope",
      headline: "Teaching models to read medical images",
      body: [
        "A benchmark of 11 anomaly-detection methods on brain CT turned into a MIDL 2026 submission.",
        "At SNUH's BMI Lab I reproduced DINO on ImageNet and validated self-supervised encoders for pathology slides — and saw how far a strong model still is from a hospital workflow.",
      ],
      image: "/projects/brain-ct-1.png",
    },
    {
      year: "2026",
      icon: "handshake",
      headline: "Crossing to the other side of the gap",
      body: [
        "A model disconnected from a real problem stays a model. So now, at NAVER Cloud, I work on the business side of healthcare AI.",
        "Sizing the market, mapping government programs and budgets, and building the sales pipeline that carries a medical AI service from first contact to contract.",
      ],
    },
  ],

  // Newest first. Mirrors v1's experience entries (English).
  experience: [
    {
      company: "NAVER Cloud",
      role: "Healthcare AI Business Strategy Intern",
      period: "2026.09 — Now",
      current: true,
      bullets: [
        "Support healthcare AI business strategy — sizing the market and mapping government programs and budget flows.",
        "Build the sales pipeline and partner process that carry a medical AI service from first contact to contract.",
      ],
    },
    {
      company: "Seoul National University Hospital, BMI Lab",
      role: "Research Intern",
      period: "2026.03 — 2026.08",
      bullets: [
        "Validated DINO-based self-supervised ViT encoders for stain/scanner-robust features on pathology whole-slide images.",
        "Reproduced the full DINO pipeline (ViT-B/14) on ImageNet-1k, matching paper numbers (kNN 82.4%, linear 79.2%).",
      ],
    },
    {
      company: "AIMS Lab, Kyung-Hee University",
      role: "Undergraduate Researcher",
      period: "2025.08 — 2026.07",
      bullets: [
        "Comparative study of quantitative attention-measurement models from wearable-sensor data.",
        "Deep-learning model comparison analysis on brain CT data.",
      ],
    },
    {
      company: "FutureWorkLab",
      role: "AI Engineer · Research Intern",
      period: "2024.12 — 2025.08",
      bullets: [
        "Built the LangGraph agentic pipeline for LinkBrain, a graph-centric 'second brain' service.",
        "Researched GNN + BERT knowledge-graph link prediction (GnBERT).",
      ],
    },
  ],

  journey: [
    { year: "2024", label: "AI Engineering" },
    { year: "2025", label: "Medical AI Research" },
    { year: "2026", label: "AX & AI Strategy" },
  ],
} as const;
