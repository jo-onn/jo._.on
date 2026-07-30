export const siteConfig = {
  name: "jo._.on",
  title: "Data Analyst / AI Researcher",
  titleKo: "데이터 분석가 / AI 연구자",
  description: "AI와 데이터의 교차점에 있는 jo._.on의 포트폴리오입니다.",
  accentColor: "#2a3c6e",
  social: {
    email: "leejoon2067@gmail.com",
    linkedin: "https://www.linkedin.com/in/jo-on/",
    github: "https://github.com/jo-onn",
    cv: "/resume.pdf",
  },  sectionDescriptions: {
    about:      "AI와 데이터의 교차점에 서 있는 데이터 분석가입니다.",
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
    about:      "A junior AI engineer at the crossroads of AI and data.",
    experience: "Hands-on experience from AI startups and university research labs.",
    projects:   "AI and service projects I designed and built from scratch.",
    education:  "Academic background in software convergence and AI.",
    blog:       "A space to write down what I study and discover.",
  },
  aboutMe: `
    <p>HI, I'm <strong>JOON HYUK LEE</strong> 👋</p>
    <p>I've worked both sides of a problem: <strong>analyzing data</strong> to find where the real gap is, and <strong>building the thing</strong> that closes it. What I took from it is that a model disconnected from a real problem stays a model.</p>
    <p>So the part I care about is the link between them — reading the context of an industry, following where the data points, and putting it in language the people who decide can act on. More in my <a href='resume.pdf' target='_blank'>Résumé</a>.</p>
  `,
  // NOTE: 현재 렌더링되지 않음. 국문 지원 추가 시 aboutMe와 동일한 내용으로 사용.
  aboutMeKo: `
    <p>안녕하세요, <strong>이준혁</strong>입니다 👋</p>
    <p><strong>데이터를 분석해</strong> 진짜 공백이 어디인지 찾고, 그 공백을 메우는 <strong>결과물을 직접 만드는</strong> 일을 좋아합니다. 그 과정에서 얻은 확신은, 현장의 문제와 연결되지 않은 모델은 결국 모델로만 남는다는 것이었습니다.</p>
    <p>그래서 제가 관심을 두는 지점은 둘 사이의 연결입니다. 산업의 맥락을 읽고, 데이터가 가리키는 곳을 따라가고, 그것을 의사결정하는 사람이 실행할 수 있는 언어로 옮기는 일입니다. 자세한 내용은 제 <a href='resume.pdf' target='_blank'>Résumé</a>에서 확인하실 수 있습니다.</p>
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
      dateRange: "Mar 2026 — Current",
      link: "https://snuh-bmilab.ai.kr/",
      bullets: [
        "Validating <strong>DINO</strong>-based self-supervised ViT encoders for stain/scanner-robust feature extraction on pathology whole-slide images (WSI).",
        "Justified self-distillation (DINO) over contrastive SSL for label-scarce, downstream-agnostic pathology data; analyzed centering/sharpening, teacher-student EMA, and multi-crop.",
        "Reproduced the full DINO pipeline (ViT-B/14) on ImageNet-1k, matching paper numbers (kNN top-1 82.4%, linear probing 79.2%), then ran from-scratch training.",
        "Proposed a hierarchical patch → bag (MIL) → slide style-embedding structure with stain/scanner conditional tokens; reviewed DINOv2 (iBOT, KoLeo, Sinkhorn-Knopp).",
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