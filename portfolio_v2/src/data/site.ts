// Single source of content for the v2 bento home.
// Kept separate from v1's config so the two sites can evolve independently.

export const site = {
  name: { first: "JOON HYUK", last: "LEE", ko: "이준혁" },
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
    // Theme-aware logo (dark variant has light text) + the mark alone for small spots.
    logo: {
      light: "/brand/naver-cloud-platform.png",
      dark: "/brand/naver-cloud-platform-dark.png",
      symbol: "/brand/naver-cloud-symbol.png",
      alt: "NAVER Cloud Platform",
    },
    role: "Business Strategy Intern — new business in healthcare & manufacturing",
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
            body: "Reconstruction-based methods outperformed self-supervised ones for intracranial hemorrhage. The study was submitted to KSC 2026.",
            bodyKo: "두개내출혈 탐지에서는 재구성 기반 방법이 자기지도학습 방법보다 우수했고, 이 연구는 KSC 2026에 투고되었습니다.",
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
        badges: ["Paper", "KSC 2026"],
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
            body: "Reached accuracy 0.762 under subject-level validation, and was presented as a poster at KSC 2025 as first author.",
            bodyKo: "피험자 단위 검증에서 accuracy 0.762를 기록했고, KSC 2025에 1저자로 포스터 발표했습니다.",
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
            body: "Won the top excellence award at KHUTHON 2024, an inter-university hackathon.",
            bodyKo: "대학연합 해커톤 KHUTHON 2024에서 최우수상을 받았습니다.",
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
        badges: ["KHUTHON 2024 · Top Excellence Award"],
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
      venue: "KSC 2026",
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
        "Predicted learner attention from wearable HR, RRI, EDA and skin-temperature signals with a multimodal time-series ML pipeline — accuracy 0.762 under subject-level validation (first author).",
      href: "/projects/ksc-2025-poster.pdf",
      linkLabel: "View poster",
      summaryKo: "웨어러블 HR, RRI, EDA, 피부 온도 신호로 학습자 집중도를 예측하는 멀티모달 시계열 머신러닝 파이프라인을 만들었고, 피험자 단위 검증에서 accuracy 0.762를 기록했습니다 (1저자).",
      linkLabelKo: "포스터 보기",
    },
  ],

  // "The Story" modal (My Journey tile). Oldest first.
  // Facts come from the résumé (public/resume.pdf, 2026-11); the narrative lines are a DRAFT —
  // rewrite freely in your own voice. `meta`/`highlights` are optional per chapter.
  story: [
    {
      year: "2023",
      icon: "users",
      headline: "KHUDA — where data analysis started",
      headlineKo: "KHUDA, 데이터 분석의 시작",
      meta: { org: "KHUDA · Kyung Hee University data analysis & AI club", orgKo: "KHUDA · 경희대 데이터분석·AI 동아리", period: "2023.08 — 2024.06", role: "4th member → 5th Head of Planning & Operations, NLP track lead", roleKo: "4기 부원 → 5기 기획·운영부장 겸 NLP 트랙 리더" },
      bodyKo: [
        "전역 후 KHUDA 4기 Data Business 트랙에 들어가 데이터 분석과 AI를 처음 배웠습니다.",
        "5기에는 기획·운영부장과 NLP 트랙 리더를 맡았고, 이 기간에 동아리가 중앙동아리로 승격됐습니다. 금융·경제·IT 뉴스레터 Tech Talk를 만들어 13회 넘게 발행했습니다.",
      ],
      body: [
        "After my military service I joined KHUDA's Data Business track (4th cohort) and learned data analysis and AI for the first time.",
        "In the 5th cohort I was Head of Planning & Operations and led the NLP track; the club became an official central club during that term. I also started Tech Talk, a finance / economy / IT newsletter, and put out 13+ issues.",
      ],
      highlights: [
        { en: "Promoted to central club", ko: "중앙동아리 승격" },
        { en: "Tech Talk · 13+ issues", ko: "Tech Talk 13회+" },
        { en: "Final conference · 3rd (Sol_T, team lead)", ko: "최종 컨퍼런스 3위 (Sol_T, 팀장)" },
      ],
    },
    {
      year: "2024",
      icon: "trophy",
      headline: "Hackathons and team projects",
      headlineKo: "해커톤과 팀 프로젝트",
      meta: { org: "KHUTHON · Korea University INISW Academy", orgKo: "KHUTHON · 고려대 INISW 아카데미", period: "2024.05 — 2024.12", role: "AI Engineering & PM · Team lead", roleKo: "AI 엔지니어링 & PM · 팀장" },
      bodyKo: [
        "KHUTHON 해커톤에서 도시농업 플랫폼 CiFarm을 기획하고, 텃밭 분양 중개와 재배 가이드를 맡는 AI 에이전트를 LangGraph로 만들었습니다. 최우수상을 받았습니다.",
        "고려대 INISW 아카데미에서는 팀장으로 FinWise를 만들었습니다. 경제 뉴스 키워드를 그래프로 이어 보여 주는 크롬 확장 프로그램이고, 한국경제신문 아이디어 공모전 장려상과 아카데미 우수상을 받았습니다.",
      ],
      body: [
        "At the KHUTHON hackathon I planned CiFarm, an urban-farming platform, and built its LangGraph agent for plot matching and growing guides. It won the Top Excellence Award.",
        "At Korea University's INISW Academy I led the team behind FinWise, a Chrome extension that links economic-news keywords into a graph. It won an Honorable Mention at the Korea Economic Daily idea contest and the academy's Excellence Award.",
      ],
      highlights: [
        { en: "KHUTHON · Top Excellence Award", ko: "KHUTHON 최우수상" },
        { en: "Korea Economic Daily · Honorable Mention", ko: "한국경제신문 공모전 장려상" },
        { en: "INISW Academy · Excellence Award", ko: "INISW 아카데미 우수상" },
      ],
      image: "/projects/cifarm-1.webp",
    },
    {
      year: "2024",
      icon: "bot",
      headline: "FutureWorkLab · LinkBrain PoC",
      headlineKo: "퓨처워크랩 · LinkBrain PoC",
      meta: { org: "FutureWorkLab", orgKo: "퓨처워크랩", period: "2024.12 — 2025.09", role: "AI Research & Engineering Intern", roleKo: "AI Research & Engineering 인턴" },
      bodyKo: [
        "링크와 메모를 지식 그래프로 정리해 주는 서비스 LinkBrain의 초기 PoC 단계에 합류했습니다. GNN 기반 지식 그래프 PoC를 만들고, LangGraph로 검색·추론 에이전트와 프롬프트 흐름을 구현했습니다.",
        "PoC에서 기술적으로 가능한지 확인한 결과는 서비스 방향을 정하는 데 쓰였습니다.",
      ],
      body: [
        "I joined LinkBrain — a service that organizes links and memos into a knowledge graph — at its early PoC stage. I built the GNN-based knowledge-graph PoC and implemented the LangGraph search / reasoning agent and its prompt flow.",
        "The feasibility results from the PoC were used to decide where the service would go next.",
      ],
      highlights: [
        { en: "GNN knowledge-graph PoC", ko: "GNN 지식 그래프 PoC" },
        { en: "LangGraph multi-step agent", ko: "LangGraph 멀티스텝 에이전트" },
      ],
    },
    {
      year: "2025",
      icon: "activity",
      headline: "AIMS Lab · biosignal research",
      headlineKo: "AIMS Lab · 생체신호 연구",
      meta: { org: "AIMS Lab, Kyung Hee University", orgKo: "경희대학교 AIMS Lab", period: "2025.08 — 2026.07", role: "Undergraduate Research Intern", roleKo: "학부연구인턴" },
      bodyKo: [
        "웨어러블 생체신호 4종(심박, R-R 간격, 피부전도, 피부 온도)으로 학습자의 집중도를 예측하는 연구를 했습니다.",
        "피험자 단위로 검증해 accuracy 0.762가 나왔고, KSC 2025에 1저자로 투고해 포스터로 발표했습니다.",
      ],
      body: [
        "I worked on predicting learners' attention from four wearable signals: heart rate, R-R intervals, EDA and skin temperature.",
        "Validated at the subject level, it reached accuracy 0.762. I submitted it to KSC 2025 as first author and presented it as a poster.",
      ],
      highlights: [
        { en: "accuracy 0.762 (subject-level)", ko: "accuracy 0.762 (피험자 단위)" },
        { en: "KSC 2025 · first author", ko: "KSC 2025 1저자" },
      ],
      image: "/projects/ksc-1.webp",
    },
    {
      year: "2026",
      icon: "microscope",
      headline: "SNUH · pathology dataset",
      headlineKo: "서울대병원 · 병리 데이터셋",
      meta: { org: "Seoul National University Hospital · Biomedical Informatics Lab", orgKo: "서울대학교병원 융합의학기술원 · 의생명정보학 Lab", period: "2026.03 — 2026.08", role: "Undergraduate Research Intern", roleKo: "학부연구인턴" },
      bodyKo: [
        "수작업 라벨링 없이 병리 학습 라벨을 만드는 방법론 RINPAG에서 데이터셋을 만들고 주석 기준을 정했습니다. 공저로 참여해 원고를 쓰고 있습니다.",
        "ImageNet에서 DINO를 재현하고, 병리 슬라이드용 자기지도 인코더를 검증하는 일도 맡았습니다.",
      ],
      body: [
        "For RINPAG, a method that creates pathology training labels without manual labeling, I built the dataset and set the annotation criteria. I'm a co-author; the manuscript is in progress.",
        "I also reproduced DINO on ImageNet and validated self-supervised encoders for pathology slides.",
      ],
      highlights: [
        { en: "RINPAG · co-author", ko: "RINPAG 공저" },
        { en: "Dataset & annotation criteria", ko: "데이터셋·주석 기준 설계" },
      ],
    },
    {
      year: "2026",
      icon: "shopping",
      headline: "Musinsa SKIN-Fit",
      headlineKo: "무신사 SKIN-Fit",
      meta: { org: "Applied Data Analysis course, Kyung Hee University", orgKo: "경희대학교 응용데이터분석 수업", period: "2026.03", role: "Musinsa SKIN-Fit", roleKo: "Musinsa SKIN-Fit" },
      bodyKo: [
        "무신사 리뷰 약 70만 건(제품 1,198개)을 분석해 보니, 고객의 피부 타입 정보를 받아 두고도 추천에는 쓰지 않고 있었습니다.",
        "그래서 제품 성분을 OCR로 읽어 피부 적합도 점수를 보여 주는 크롬 확장 프로그램을 만들었습니다.",
      ],
      body: [
        "Analyzing about 700K Musinsa reviews across 1,198 products, I found that the platform collects shoppers' skin types but doesn't use them for recommendations.",
        "So I built a Chrome extension that reads a product's ingredients with OCR and shows a skin-fit score.",
      ],
      highlights: [
        { en: "~700K reviews · 1,198 products", ko: "리뷰 약 70만 건 · 제품 1,198개" },
        { en: "Ingredient OCR → skin-fit score", ko: "성분 OCR → 피부 적합도 점수" },
      ],
      image: "/projects/musinsa-fit-1.webp",
    },
    {
      year: "2026",
      icon: "handshake",
      logo: {
        light: "/brand/naver-cloud-platform.png",
        dark: "/brand/naver-cloud-platform-dark.png",
        alt: "NAVER Cloud Platform",
      },
      current: true,
      headline: "NAVER Cloud · new business strategy",
      headlineKo: "네이버클라우드 · 신사업 전략",
      meta: { org: "NAVER Cloud", orgKo: "네이버클라우드", period: "2026.08 — Now", periodKo: "2026.08 — 현재", role: "Business Strategy Intern · Healthcare & Manufacturing", roleKo: "헬스케어·제조 분야 신사업 발굴, 전략 인턴" },
      bodyKo: [
        "지금은 네이버클라우드에서 헬스케어·제조 분야 신사업 발굴과 전략 업무를 하고 있습니다.",
        "시장·경쟁사 조사, 사업 기회 관리, 파트너 협업을 맡고 있습니다.",
      ],
      body: [
        "I'm now at NAVER Cloud, working on new-business discovery and strategy in healthcare and manufacturing.",
        "My work covers market and competitor research, tracking business opportunities, and working with partners.",
      ],
      highlights: [
        { en: "New business discovery", ko: "신사업 발굴" },
        { en: "Market & competitive research", ko: "시장·경쟁 분석" },
        { en: "Partner collaboration", ko: "파트너 협업" },
      ],
    },
  ],

  // Newest first. Mirrors the résumé (public/resume.pdf, updated 2026-11).
  experience: [
    {
      company: "NAVER Cloud",
      role: "Business Strategy Intern — New Business Development (Healthcare & Manufacturing)",
      period: "2026.08 — Now",
      current: true,
      kind: "work",
      companyKo: "네이버클라우드",
      roleKo: "헬스케어·제조 분야 신사업 발굴, 전략 인턴",
      periodKo: "2026.08 — 현재",
      bullets: [
        "Supports new-business discovery and strategy in healthcare and manufacturing.",
        "Researches markets and competitors and structures the findings into strategy proposals.",
        "Helps set up a structured way to track and evaluate business opportunities.",
        "Works with partners to support business execution.",
      ],
    },
    {
      company: "Seoul National University Hospital — Institute of Convergence Medicine with Innovative Technology, Biomedical Informatics Lab",
      role: "Undergraduate Research Intern",
      period: "2026.03 — 2026.08",
      kind: "research",
      companyKo: "서울대학교병원 융합의학기술원 · 의생명정보학 Lab",
      roleKo: "학부연구인턴",
      bullets: [
        "Built the dataset and designed the annotation criteria for RINPAG, a method that creates pathology training labels without manual labeling (co-author, manuscript in preparation).",
        "Validated DINO-based self-supervised ViT encoders for stain/scanner-robust features on pathology whole-slide images.",
        "Reproduced the full DINO pipeline (ViT-B/14) on ImageNet-1k, matching paper numbers (kNN 82.4%, linear 79.2%).",
      ],
    },
    {
      company: "AIMS Lab, Kyung Hee University",
      role: "Undergraduate Research Intern",
      period: "2025.08 — 2026.07",
      kind: "research",
      companyKo: "경희대학교 AIMS Lab",
      roleKo: "학부연구인턴",
      bullets: [
        "Designed experiments comparing reconstruction-based and self-supervised anomaly detection on label-scarce brain CT images (submitted to KSC 2026).",
        "Designed an attention-prediction pipeline from 4 wearable biosignals with subject-level validation (accuracy 0.762; KSC 2025, first author).",
      ],
    },
    {
      company: "FutureWorkLab",
      role: "AI Research & Engineering Intern",
      period: "2024.12 — 2025.09",
      kind: "work",
      companyKo: "퓨처워크랩",
      roleKo: "AI Research & Engineering 인턴",
      bullets: [
        "Personal knowledge-management service PoC (LinkBrain, B2C): developed a GNN-based knowledge-graph (GNN-KG) service PoC.",
        "Designed and implemented a LangGraph multi-step search / reasoning agent and its prompt workflows.",
        "Validated technical feasibility at the PoC stage and fed the results into decisions on the service's direction.",
        "Researched GNN + BERT knowledge-graph link prediction (GnBERT).",
      ],
    },
  ],

  // From the résumé. intro shows beside the name; the rest feeds the chatbot and the "Résumé at a glance" modal (#resume).
  intro: "I like finding the gaps in data — and building the thing that fills them myself.",
  introKo: "데이터에서 공백을 찾고, 그 공백을 메우는 결과물을 직접 만드는 걸 좋아합니다.",
  // Same line, broken by hand for the narrow column beside the photo (box hugs the text).
  introLines: ["I like finding the gaps", "in data — and building", "the thing that fills", "them myself."],
  introLinesKo: ["데이터에서 공백을 찾고,", "그 공백을 메우는 결과물을", "직접 만드는 걸 좋아합니다."],

  education: [
    {
      school: "Kyung Hee University",
      degree: "Software Convergence, double major in Physical Education",
      period: "2020.03 — 2027.02 (coursework completed)",
      note: "GPA 3.97 / 4.5",
      schoolKo: "경희대학교",
      degreeKo: "소프트웨어융합학과 · 체육학과 복수전공",
      years: "2020.03 — 2027.02",
      status: "Coursework completed",
      statusKo: "수료",
    },
  ],

  // Projects on the résumé that have no Work Gallery page.
  otherProjects: [
    {
      name: "FinWise",
      context: "Korea University INISW Academy, 5th cohort — team lead",
      period: "2024.09 — 2024.12",
      summary: "Planned and built a Chrome extension that links economic-news keywords into a graph to deliver insights.",
    },
  ],

  activities: [
    {
      name: "KHUDA, 5th cohort",
      nameKo: "KHUDA 5기",
      roleKo: "경희대학교 데이터분석·AI 중앙동아리 · 기획·운영부장 겸 NLP 트랙 리더",
      role: "Head of Planning & Operations, NLP track lead — Kyung Hee University data analysis & AI central club",
      period: "2024.01 — 2024.06",
      bullets: [
        "The club was promoted to an official central club during his term.",
        "Planned and ran Tech Talk, a finance / economy / IT newsletter (13+ issues).",
      ],
    },
    {
      name: "KHUDA, 4th cohort",
      nameKo: "KHUDA 4기",
      roleKo: "경희대학교 데이터분석·AI 학회 · Data Business 트랙 부원",
      role: "Member, Data Business track",
      period: "2023.08 — 2023.12",
      bullets: ["Studied data analysis and AI fundamentals."],
    },
  ],

  awards: [
    { title: "Top Excellence Award (최우수상)", label: "Top Excellence Award", labelKo: "최우수상", event: "KHUTHON inter-university hackathon", eventKo: "KHUTHON 대학연합 해커톤", project: "CiFarm", date: "2024.05" },
    { title: "Honorable Mention (장려상)", label: "Honorable Mention", labelKo: "장려상", event: "Korea Economic Daily idea contest", eventKo: "한국경제신문 아이디어 공모전", project: "FinWise", date: "2024.10" },
    { title: "Excellence Award (우수상)", label: "Excellence Award", labelKo: "우수상", event: "Korea University INISW Academy, 5th cohort", eventKo: "고려대학교 INISW 아카데미 5기", project: "FinWise", date: "2024.12" },
    { title: "3rd place", label: "3rd Place", labelKo: "3위", event: "KHUDA 5th cohort final conference", eventKo: "KHUDA 5기 최종 컨퍼런스", project: "Sol_T (team lead)", projectKo: "Sol_T · 팀장", date: "2024" },
  ],

  skills: {
    "Analysis & docs": ["Excel", "Google Sheets", "PowerPoint", "Notion", "CRM"],
    "Data & AI": ["Python (pandas, scikit-learn)", "PyTorch", "LangGraph"],
    Language: ["TEPS 396 / 600 (2026)"],
    "Military service": ["Republic of Korea Army, honorably discharged (2021.10 – 2023.04)"],
  },
  // Shown on the "Résumé at a glance" modal header.
  resumeUpdated: { en: "Nov 2026", ko: "2026.11" },

  journey: [
    { year: "2024", label: "AI Engineering", labelKo: "AI 엔지니어링" },
    { year: "2025", label: "Medical AI Research", labelKo: "의료 AI 연구" },
    { year: "2026", label: "AX & AI Strategy", labelKo: "AX·AI 전략" },
  ],
} as const;
