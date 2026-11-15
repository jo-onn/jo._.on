// Single source of content for the v2 bento home.
// Kept separate from v1's config so the two sites can evolve independently.

export const site = {
  name: { first: "JOON HYUK", last: "LEE" },
  handle: "jo._.on",
  tagline: "Data Analyst / AX & AI Business Strategy",
  taglineKo: "데이터 분석가 / AX·AI 사업전략 기획",
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
    orgKo: "네이버클라우드",
    role: "Healthcare AI Business Strategy Intern",
    timeZone: "Asia/Seoul",
    zoneLabel: "SEOUL / KST",
  },

  chat: {
    title: "Ask about jo._.on",
    placeholder: "Ask anything…",
    placeholderKo: "무엇이든 물어보세요…",
    suggestions: ["Brain CT paper", "Why AX strategy?", "Musinsa SKIN-Fit"],
    suggestionsKo: ["뇌 CT 논문", "왜 AX 전략인가요?", "무신사 SKIN-Fit"],
  },

  projects: {
    cover: "/projects/musinsa-fit-1.webp",
    list: [
      {
        // ── Work Gallery + detail page (/projects/<slug>) ──
        slug: "brain-ct-anomaly-detection",
        category: "research",
        featured: true,
        headline: ["BRAIN CT", "ANOMALY DETECTION"],
        headlineKo: ["뇌 CT", "이상 탐지"],
        sections: [
          {
            heading: "Problem",
            headingKo: "문제",
            body: "Many deep-learning anomaly detection methods exist, but which family of them suits intracranial hemorrhage in brain CT needed to be checked systematically.",
            bodyKo: "딥러닝 이상 탐지 기법은 많지만, 그중 어떤 계열이 뇌 CT의 두개내출혈 탐지에 맞는지는 체계적으로 확인해 볼 필요가 있었습니다.",
          },
          {
            heading: "Approach",
            headingKo: "접근",
            body: "Benchmarked 11 deep-learning anomaly detection methods side by side on brain CT, comparing reconstruction-based and self-supervised approaches.",
            bodyKo: "뇌 CT에서 딥러닝 이상 탐지 기법 11종을 나란히 비교하며 재구성 기반 방법과 자기지도학습 방법을 견주었습니다.",
          },
          {
            heading: "Result",
            headingKo: "결과",
            body: "Reconstruction-based methods outperformed self-supervised ones for intracranial hemorrhage. The study was submitted to MIDL 2026.",
            bodyKo: "두개내출혈 탐지에서는 재구성 기반 방법이 자기지도학습 방법보다 우수했고, 이 연구는 MIDL 2026에 투고되었습니다.",
          },
        ],
        // TODO(user): fill in — each is shown on the detail page only once set (string instead of null).
        role: null,
        roleKo: null,
        team: null,
        teamKo: null,
        period: null,
        name: "Deep-Learning Anomaly Detection for Intracranial Hemorrhage in Brain CT",
        nameKo: "뇌 CT 두개내출혈 딥러닝 이상 탐지 비교 연구",
        descriptionKo:
          "뇌 CT의 두개내출혈 탐지를 위해 딥러닝 이상 탐지 기법 11종을 체계적으로 비교했고, 자기지도학습보다 재구성 기반 방법이 우세함을 확인했습니다.",
        year: "2026",
        badges: ["Paper", "MIDL 2026"],
        image: "/projects/brain-ct-1.webp",
        description:
          "A systematic benchmark of 11 deep-learning anomaly detection methods for intracranial hemorrhage in brain CT, favoring reconstruction-based over self-supervised approaches.",
        skills: ["PyTorch", "Medical Imaging", "Anomaly Detection"],
        links: [{ label: "Paper", href: "/projects/midl-2026-paper.pdf" }],
      },
      {
        // ── Work Gallery + detail page (/projects/<slug>) ──
        slug: "musinsa-skin-fit",
        category: "product",
        featured: true,
        headline: ["MUSINSA", "SKIN-FIT"],
        headlineKo: ["무신사", "SKIN-FIT"],
        sections: [
          {
            heading: "Problem",
            headingKo: "문제",
            body: "Analyzing ~700K reviews across 1,198 products showed that the platform collects shoppers' skin-type data but doesn't use it.",
            bodyKo: "제품 1,198개의 리뷰 약 70만 건을 분석한 결과, 플랫폼이 고객의 피부 타입 데이터를 수집하면서도 활용하지 않고 있었습니다.",
          },
          {
            heading: "Approach",
            headingKo: "접근",
            body: "Built a pipeline that reads a product's ingredients with OCR and turns them into a skin-fit score.",
            bodyKo: "제품 성분을 OCR로 읽어 피부 적합도 점수로 바꾸는 파이프라인을 만들었습니다.",
          },
          {
            heading: "Result",
            headingKo: "결과",
            body: "Shipped the pipeline as a Chrome extension. The demo video and full report are linked below.",
            bodyKo: "파이프라인을 크롬 확장 프로그램으로 구현했습니다. 데모 영상과 보고서는 아래 링크에서 볼 수 있습니다.",
          },
        ],
        // TODO(user): fill in — each is shown on the detail page only once set (string instead of null).
        role: null,
        roleKo: null,
        team: null,
        teamKo: null,
        period: null,
        name: "Musinsa SKIN-Fit — Ingredient-Based Skincare Recommendation",
        nameKo: "무신사 SKIN-Fit — 성분 기반 스킨케어 추천",
        descriptionKo:
          "리뷰 약 70만 건과 제품 1,198개를 분석해 플랫폼이 수집한 피부 타입 데이터를 활용하지 못하고 있음을 보이고, 성분 OCR → 피부 적합도 점수 파이프라인을 크롬 확장 프로그램으로 구현했습니다.",
        year: "2026",
        badges: ["Project"],
        image: "/projects/musinsa-fit-1.webp",
        description:
          "From ~700K reviews and 1,198 products, shows the platform doesn't use the skin-type data it collects — then closes the gap with an ingredient-OCR → skin-fit scoring pipeline shipped as a Chrome extension.",
        skills: ["Python", "FastAPI", "Data Analysis", "Chrome Extension"],
        links: [
          { label: "Demo", href: "https://www.youtube.com/watch?v=NTmTXhBoTvY" },
          { label: "Report", href: "/projects/musinsa-fit-report.pdf" },
        ],
      },
      {
        // ── Work Gallery + detail page (/projects/<slug>) ──
        slug: "biosignal-attention-prediction",
        category: "research",
        featured: false,
        headline: ["BIOSIGNAL", "ATTENTION"],
        headlineKo: ["생체신호", "집중도 예측"],
        sections: [
          {
            heading: "Problem",
            headingKo: "문제",
            body: "Predicting a learner's attention from a single sensor has clear limits.",
            bodyKo: "단일 센서만으로 학습자의 집중도를 예측하는 데에는 분명한 한계가 있습니다.",
          },
          {
            heading: "Approach",
            headingKo: "접근",
            body: "Built a multimodal time-series ML pipeline that combines wearable biosignals: heart rate (HR), R-R intervals (RRI), electrodermal activity (EDA) and skin temperature.",
            bodyKo: "웨어러블 생체신호인 심박(HR), R-R 간격(RRI), 피부전도(EDA), 피부 온도를 함께 쓰는 멀티모달 시계열 머신러닝 파이프라인을 만들었습니다.",
          },
          {
            heading: "Result",
            headingKo: "결과",
            body: "Presented as a poster at KSC 2025.",
            bodyKo: "KSC 2025에서 포스터로 발표했습니다.",
          },
        ],
        // TODO(user): fill in — each is shown on the detail page only once set (string instead of null).
        role: null,
        roleKo: null,
        team: null,
        teamKo: null,
        period: null,
        name: "Multimodal Biosignal-Based Attention Prediction",
        nameKo: "멀티모달 생체신호 기반 집중도 예측",
        descriptionKo:
          "웨어러블 생체신호(HR, RRI, EDA, 피부 온도)를 함께 활용해 학습자의 집중도를 예측하는 머신러닝 파이프라인으로, 단일 센서 접근의 한계를 넘었습니다.",
        year: "2025",
        badges: ["Paper", "KSC 2025"],
        image: "/projects/ksc-1.webp",
        description:
          "An ML pipeline predicting learner attention from multimodal wearable biosignals — HR, RRI, EDA and skin temperature — beyond single-sensor approaches.",
        skills: ["Python", "Machine Learning", "Time Series"],
        links: [{ label: "Poster", href: "/projects/ksc-2025-poster.pdf" }],
      },
      {
        // ── Work Gallery + detail page (/projects/<slug>) ──
        slug: "cifarm",
        category: "ai-agent",
        featured: true,
        headline: ["CIFARM", "AI FARM COACH"],
        headlineKo: ["CiFarm", "AI 도시농부 코치"],
        sections: [
          {
            heading: "Idea",
            headingKo: "아이디어",
            body: "An urban-farming platform that matches people with urban farm plots and coaches them through growing.",
            bodyKo: "사람들을 도시텃밭과 이어 주고 재배 과정을 코칭하는 도시농업 플랫폼입니다.",
          },
          {
            heading: "Approach",
            headingKo: "접근",
            body: "A LangGraph-based AI agent handles plot matching and gives step-by-step growing guides, served with FastAPI.",
            bodyKo: "LangGraph 기반 AI 에이전트가 텃밭 매칭과 단계별 재배 가이드를 맡고, FastAPI로 서비스했습니다.",
          },
          {
            heading: "Result",
            headingKo: "결과",
            body: "Won the grand prize at KHUTHON 2024.",
            bodyKo: "KHUTHON 2024에서 대상을 받았습니다.",
          },
        ],
        // TODO(user): fill in — each is shown on the detail page only once set (string instead of null).
        role: null,
        roleKo: null,
        team: null,
        teamKo: null,
        period: null,
        name: "CiFarm — Urban Farm Matching & AI Farming Coach",
        nameKo: "CiFarm — 도시텃밭 중개 및 AI 도시농부 코치",
        descriptionKo: "LangGraph 기반 AI 에이전트가 텃밭 분양과 단계별 재배 가이드를 제공하는 도시농업 플랫폼입니다.",
        year: "2024",
        badges: ["KHUTHON 2024 · Grand Prize"],
        image: "/projects/cifarm-1.webp",
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
      titleKo: "뇌 CT 출혈 이상 탐지",
      status: "Submitted",
      statusKo: "투고",
      summary:
        "Benchmarked 11 deep-learning anomaly detection methods on brain CT; reconstruction-based models outperformed self-supervised ones for intracranial hemorrhage.",
      href: "/projects/midl-2026-paper.pdf",
      linkLabel: "Read paper",
      summaryKo: "뇌 CT에서 딥러닝 이상 탐지 기법 11종을 비교한 결과, 두개내출혈 탐지에서 재구성 기반 모델이 자기지도학습 모델보다 우수했습니다.",
      linkLabelKo: "논문 보기",
    },
    {
      venue: "KSC 2025",
      title: "Multimodal biosignal attention prediction",
      titleKo: "멀티모달 생체신호 집중도 예측",
      status: "Poster",
      statusKo: "포스터",
      summary:
        "Predicted learner attention from wearable HR, RRI, EDA and skin-temperature signals with a multimodal time-series ML pipeline.",
      href: "/projects/ksc-2025-poster.pdf",
      linkLabel: "View poster",
      summaryKo: "웨어러블 HR, RRI, EDA, 피부 온도 신호로 학습자 집중도를 예측하는 멀티모달 시계열 머신러닝 파이프라인을 만들었습니다.",
      linkLabelKo: "포스터 보기",
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
      headlineKo: "스타트업에서 에이전트를 만들다",
      bodyKo: [
        "퓨처워크랩에서 링크와 메모를 지식 그래프로 바꿔 주는 '세컨드 브레인' 서비스 LinkBrain의 가장 초기 PoC 단계에 합류했습니다.",
        "LangGraph 에이전트 파이프라인을 처음부터 끝까지 설계하고 GNN + BERT 링크 예측을 연구했습니다. 같은 해 AI 도시농부 코치 에이전트로 KHUTHON 대상을 받았습니다.",
      ],
      body: [
        "At FutureWorkLab I joined LinkBrain at its earliest PoC stage — a 'second brain' that turns links and memos into a knowledge graph.",
        "I designed the LangGraph agent pipeline end to end and researched GNN + BERT link prediction. That same year, an AI farming-coach agent won the KHUTHON grand prize.",
      ],
      image: "/projects/cifarm-1.webp",
    },
    {
      year: "2025",
      icon: "activity",
      headline: "Learning to measure what matters",
      headlineKo: "중요한 것을 측정하는 법을 배우다",
      bodyKo: [
        "AIMS Lab에서는 제품을 만드는 일에서 연구 질문을 던지는 일로 옮겨 갔습니다. 웨어러블 생체신호로 학습자가 집중하고 있는지 알 수 있을까?",
        "HR, EDA, 피부 온도를 함께 쓰는 멀티모달 파이프라인은 KSC 2025 포스터가 되었고, 의료 데이터를 다루는 일의 출발점이 되었습니다.",
      ],
      body: [
        "In AIMS Lab I moved from building products to asking research questions: can wearable biosignals tell us when a learner is paying attention?",
        "The multimodal HR, EDA and skin-temperature pipeline became a KSC 2025 poster — and the start of my work with medical data.",
      ],
      image: "/projects/ksc-1.webp",
    },
    {
      year: "2026",
      icon: "microscope",
      headline: "Teaching models to read medical images",
      headlineKo: "모델에게 의료 영상을 읽히다",
      bodyKo: [
        "뇌 CT에서 이상 탐지 기법 11종을 비교한 연구는 MIDL 2026 투고로 이어졌습니다.",
        "서울대병원 BMI Lab에서는 ImageNet에서 DINO를 재현하고 병리 슬라이드용 자기지도학습 인코더를 검증하며, 좋은 모델과 병원 현장 사이의 거리가 아직 멀다는 것을 보았습니다.",
      ],
      body: [
        "A benchmark of 11 anomaly-detection methods on brain CT turned into a MIDL 2026 submission.",
        "At SNUH's BMI Lab I reproduced DINO on ImageNet and validated self-supervised encoders for pathology slides — and saw how far a strong model still is from a hospital workflow.",
      ],
      image: "/projects/brain-ct-1.webp",
    },
    {
      year: "2026",
      icon: "handshake",
      headline: "Crossing to the other side of the gap",
      headlineKo: "간극의 반대편으로 건너가다",
      bodyKo: [
        "현장의 문제와 연결되지 않은 모델은 결국 모델로만 남습니다. 그래서 지금은 네이버클라우드에서 헬스케어 AI의 사업 쪽 일을 하고 있습니다.",
        "시장 규모를 추정하고, 정부 사업과 예산 흐름을 정리하고, 의료 AI 서비스가 첫 접촉에서 계약까지 이어지도록 영업 파이프라인을 만듭니다.",
      ],
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
    { year: "2024", label: "AI Engineering", labelKo: "AI 엔지니어링" },
    { year: "2025", label: "Medical AI Research", labelKo: "의료 AI 연구" },
    { year: "2026", label: "AX & AI Strategy", labelKo: "AX·AI 전략" },
  ],
} as const;
