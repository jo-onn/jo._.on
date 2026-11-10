export const siteConfig = {
  name: "jo._.on",
  title: "Data Analyst / AX & AI Business Strategy",
  titleKo: "데이터 분석가 / AX·AI 사업전략 기획",
  description: "의료 AI 연구와 사업 전략 사이를 잇는 jo._.on의 포트폴리오입니다.",
  accentColor: "#2a3c6e",
  social: {
    email: "leejoon2067@gmail.com",
    linkedin: "https://www.linkedin.com/in/jo-on/",
    github: "https://github.com/jo-onn",
    cv: "/resume.pdf",
  },  sectionDescriptions: {
    about:      "의료 AI를 만드는 일에서, 현장에 닿게 하는 일로.",
    experience: "AI 스타트업과 대학 연구실에서 쌓아온 실무 경험들입니다.",
    projects:   "직접 설계하고 구현한 AI·서비스 프로젝트들입니다.",
    education:  "소프트웨어융합과 데이터 분석을 중심으로 공부해온 학업 배경입니다.",
    blog:       "공부하고 느낀 것들을 글로 정리한 공간입니다.",
  },
  // sectionSubtitles: {
  //   about: "AI와 의료의 경계에서",
  //   projects: "직접 만들어본 것들",
  //   experience: "일했던 곳들",
  //   education: "배웠던 곳들",
  //   blog: "기록하는 것들",
  // },
  sectionSubtitles: {
    about: "At the intersection of AI & Medicine",
    projects: "Things I've Built",
    experience: "Where I started",
    education: "Where I've Studied",
    blog: "Things I Write About",
  },
  sectionDescriptionsEn: {
    about:      "From building medical AI models to bringing them to market.",
    experience: "Hands-on experience from AI startups and university research labs.",
    projects:   "AI and service projects I designed and built from scratch.",
    education:  "Academic background in software convergence and AI.",
    blog:       "A space to write down what I study and discover.",
  },
  aboutMe: `
    <p>HI, I'm <strong>JOON HYUK LEE</strong> 👋</p>
    <p>I started on the technical side — <strong>training models</strong> on medical images and biosignals, from brain CT anomaly detection to self-supervised pathology encoders. Along the way I learned that a model disconnected from a real problem stays a model.</p>
    <p>Now I work on the other side of that gap. At <strong>NAVER Cloud</strong>, I support healthcare AI business strategy — sizing the market, mapping government programs and budgets, and building the sales pipeline and partner process that carry a medical AI service from first contact to contract.</p>
    <p>What ties it together is translation: reading an industry's context, following where the data points, and putting it in language the people who decide can act on. More in my <a href='resume.pdf' target='_blank'>Résumé</a>.</p>
  `,
  aboutMeKo: `
    <p>안녕하세요, <strong>이준혁</strong>입니다 👋</p>
    <p>의료 영상과 생체신호로 <strong>모델을 직접 만드는 일</strong>에서 출발했습니다. 뇌 CT 이상 탐지부터 병리 이미지 자기지도학습 인코더까지 다루며 얻은 확신은, 현장의 문제와 연결되지 않은 모델은 결국 모델로만 남는다는 것이었습니다.</p>
    <p>지금은 그 간극의 반대편에서 일하고 있습니다. <strong>네이버클라우드</strong>에서 헬스케어 AI 사업 전략을 지원하며, 시장 규모를 추정하고 정부 사업·예산 흐름을 정리하고, 의료 AI 서비스가 첫 접촉에서 계약까지 이어지도록 영업 파이프라인과 파트너 협업 체계를 만들고 있습니다.</p>
    <p>제가 하는 일을 한 단어로 묶으면 '번역'입니다. 산업의 맥락을 읽고, 데이터가 가리키는 곳을 따라가고, 그것을 의사결정하는 사람이 실행할 수 있는 언어로 옮기는 일입니다. 자세한 내용은 <a href='resume.pdf' target='_blank'>Résumé</a>에서 확인하실 수 있습니다.</p>
  `,
  skills: [
    "Python", "SQL", "Data Analysis", "Machine Learning",
    "Deep Learning", "Computer Vision", "Medical Imaging",
  ],
  projects: [
    {
      name: "A Comparative Study of Deep Learning-Based Anomaly Detection for Intracranial Hemorrhage in Brain CT",
      dateRange: "2026",
      badges: [
        { label: "Paper Submission", type: "paper" },
        { label: "MIDL 2026", type: "conference" },
      ],
      images: ["/projects/brain-ct-1.png", "/projects/brain-ct-2.png"],
      imagePosition: "center top",
      description:
        "A systematic benchmark of 11 deep learning anomaly detection methods for intracranial hemorrhage detection in brain CT favors reconstruction-based over self-supervised approaches.",
      links: [
        { label: "Paper", href: "/projects/midl-2026-paper.pdf" },
      ],
      skills: ["Python", "PyTorch", "Deep Learning", "Medical Imaging", "Anomaly Detection"],
    },
    {
      name: "Musinsa SKIN-Fit — Ingredient-Based Skincare Recommendation",
      dateRange: "2026",
      badges: [
        { label: "Project", type: "project" },
      ],
      images: ["/projects/musinsa-fit-1.png"],
      imagePosition: "center top",
      description:
        "An ingredient-based skincare recommendation service for Musinsa Beauty. From ~700K reviews and 1,198 products, it shows the platform doesn't use the skin-type data it collects, then closes the gap with an ingredient-OCR → skin-fit scoring pipeline surfaced as a Chrome extension.",
        links: [
        { label: "Demo", href: "https://www.youtube.com/watch?v=NTmTXhBoTvY" },
        { label: "Report", href: "/projects/musinsa-fit-report.pdf" },
      ],
      skills: ["Python", "JavaScript", "FastAPI", "Data Analysis", "Chrome Extension"],
    },
    {
      name: "Multimodal Biosignal-Based Attention Prediction Model",
      dateRange: "2025",
      badges: [
        { label: "Paper Submission", type: "paper" },
        { label: "KSC 2025", type: "conference" },
      ],
      images: ["/projects/ksc-1.png"],
      imagePosition: "center center",
      description:
        "Proposes a machine learning pipeline to predict learner attention using multimodal wearable biosignals — HR, RRI, EDA, and skin temperature / beyond single-sensor approaches by leveraging multimodal time-series data in educational attention monitoring.",
      links: [
        { label: "Poster", href: "/projects/ksc-2025-poster.pdf" },
      ],
      skills: ["Python", "Data Analysis", "Medical Data", "Machine Learning", "TimeSeries"],
    },
    {
      name: "CiFarm — 도시텃밭 중개 및 AI 도시농부 육성 플랫폼",
      dateRange: "2024",
      badges: [
        { label: "Project", type: "project" },
        { label: "KHUthon 2024", type: "award" },
      ],
      images: ["/projects/cifarm-1.png"],
      imagePosition: "center top",
      description:
        "LangGraph 기반 AI 에이전트로 텃밭 분양·재배 가이드를 제공하는 도시농업 플랫폼",
      links: [
        { label: "KHUTHON", href: "https://hello.khlug.org/105312" },
        { label: "GitHub", href: "https://github.com/jo-onn" }
      ],
      skills: ["Python", "PyTorch", "LangChain", "LangGraph", "FastAPI"],
    },
  ],
  experience: [
    {
      company: "Kyung-Hee University",
      title: "Physical Education & Software Convergence",
      dateRange: "Mar 2020 — Feb 2026",
      link: "https://www.khu.ac.kr",
      bullets: [
        "Double major in Physical Education & Software Convergence.",
      ],
    },
    {
      company: "FutureWorkLab",
      title: "AI Engineer · Research 인턴",
      dateRange: "Dec 2024 — Aug 2025",
      link: "https://futureworklab.co",
      bullets: [
        "Joined the early PoC stage of <strong>LinkBrain</strong>, a graph-centric 'second brain' service that auto-structures links & memos into a knowledge graph with AI-powered search.",
        "Designed and built the <strong>LangGraph</strong>-based agentic pipeline — a query-intent routing node (user_query_analysis) and a hierarchical category flow (main → sub → subsub → critique) branched by domain.",
        "Researched GNN-based knowledge-graph link prediction (<strong>GnBERT</strong>), combining GNN + BERT to overcome KG-BERT's lack of structural information.",
        "Built entity-extraction and critique nodes (critique_entity) to keep the knowledge graph high-quality; refactored prompts and fixed link/memo storage bugs.",
        "Coordinated specs across PM & engineers — issues in Linear, pipeline/policy/research docs in Notion.",
      ],
    },
    {
      company: "AIMS Lab, Kyung-Hee University",
      title: "학부연구생",
      dateRange: "Aug 2025 — Jul 2026",
      link: "https://sites.google.com/view/khu-aims/home/",
      bullets: [
        "Comparative study of quantitative attention-measurement models from wearable-sensor data.",
        "Deep-learning model comparison analysis on brain CT data.",
      ],
    },
    {
      company: "Seoul National University Hospital, BMI Lab",
      title: "인턴 연구원 · 서울대학교병원 융합의학기술원 BMI Lab",
      dateRange: "Mar 2026 — Aug 2026",
      link: "https://snuh-bmilab.ai.kr/",
      bullets: [
        "Validating <strong>DINO</strong>-based self-supervised ViT encoders for stain/scanner-robust feature extraction on pathology whole-slide images (WSI).",
        "Justified self-distillation (DINO) over contrastive SSL for label-scarce, downstream-agnostic pathology data; analyzed centering/sharpening, teacher-student EMA, and multi-crop.",
        "Reproduced the full DINO pipeline (ViT-B/14) on ImageNet-1k, matching paper numbers (kNN top-1 82.4%, linear probing 79.2%), then ran from-scratch training.",
        "Proposed a hierarchical patch → bag (MIL) → slide style-embedding structure with stain/scanner conditional tokens; reviewed DINOv2 (iBOT, KoLeo, Sinkhorn-Knopp).",
      ],
    },
    {
      company: "NAVER Cloud",
      title: "Healthcare AI Business Strategy 인턴",
      dateRange: "Sep 2026 — Current",
      link: "https://www.ncloud.com",
      bullets: [
        "Support healthcare AI business strategy — sizing the market and mapping government programs and budget flows.",
        "Build the sales pipeline and partner process that carry a medical AI service from first contact to contract.",
      ],
    },
  ],
  education: [
    {
      school: "KyungHee University",
      lab : "Aims Lab",
      degree: ["B.S. in Software Convergence", "B.S. in Physical Education"],
      dateRange: "2020.03 - 2026.12 (졸업 예정)",
      link: "https://www.khu.ac.kr",
      achievements: [
        "GPA 3.91 / 4.5 ",
        "KHUDA 경희대학교 데이터분석 & AI 학회",
        "AIMS Lab 학부연구생 (2025.08 - 2026.07)",]
    },
  ],
  awards: [
    {
      title: "KyungHee Univ KHUDA 5th Final Competition",
      prize: "🥉 [Excellence Award] ",
      issuer: "경희대학교",
      dateRange: "2024.04",
    },
    {
      title: "KyungHee Univ KHUTHON",
      prize: "🥈 [Grand Prize] ",
      issuer: "경희대학교",
      dateRange: "2024.05",
    },
    {
      title: "한국경제신문사 Idea Competition",
      prize: "🎖️ [Encouragement Award] ",
      issuer: "한국경제신문사",
      dateRange: "2024.10",
    },
    {
      title: "Korea Univ INISW Ac 5th Final Competition",
      prize: "🥉 [Excellence Award] ",
      issuer: "고려대학교",
      dateRange: "2024.12",
    },
  ],
};