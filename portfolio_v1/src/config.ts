export const siteConfig = {
  name: "jo._.on",
  title: "Junior AI Researcher / Engineer",
  titleKo: "주니어 AI 연구원 / 엔지니어",
  description: "AI와 의료 데이터의 교차점에서 연구하는 개발자 jo._.on의 포트폴리오입니다.",
  accentColor: "#2a3c6e",
  social: {
    email: "leejoon2067@gmail.com",
    linkedin: "https://www.linkedin.com/in/jo-on/",
    github: "https://github.com/jo-onn",
    cv: "/resume.pdf",
  },  sectionDescriptions: {
    about:      "AI와 의료 데이터의 교차점에서 연구하는 주니어 AI 엔지니어입니다.",
    experience: "AI 스타트업과 대학 연구실에서 쌓아온 실무 경험들입니다.",
    projects:   "직접 설계하고 구현해본 AI·서비스 프로젝트들입니다.",
    education:  "소프트웨어 융합과 의료 AI를 중심으로 공부해온 학업 배경입니다.",
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
    about:      "A junior AI engineer at the crossroads of AI and medical data.",
    experience: "Hands-on experience from AI startups and university research labs.",
    projects:   "AI and service projects I designed and built from scratch.",
    education:  "Academic background in software convergence and medical AI.",
    blog:       "A space to write down what I study and discover.",
  },
  aboutMe: `
    <p>HI, I'm <strong>JOON</strong> 👋</p>
    <p>I am currently a Graduate student in <strong>Software Convergence & Physical Education</strong> at <a href='https://www.khu.ac.kr' target='_blank'>Kyung-Hee University</a>, Korea. Advised by <a href='https://scholar.google.com/citations?user=p79efpQAAAAJ&hl=en' target='_blank'>Prof. Won-Hee Lee</a>. My research focused on <strong>Artificial Intelligence</strong> in <strong>medical image analysis</strong> and <strong>Anomaly Detection</strong>. 🤗🤗</p>
    <p>I have also gained engineering experience through an internship at <a href='https://www.futureworklab.co.kr' target='_blank'>futureworkLab</a> as an AI Software Engineer & Research Intern, where I worked on the LinkBrain Project. More details can be found in my <a href='resume.pdf' target='_blank'>CV</a>.</p>
  `,
  aboutMeKo: `
    <p>안녕하세요, 저는 <strong>이준혁</strong>입니다 👋</p>
    <p>현재 <a href='https://www.khu.ac.kr' target='_blank'>경희대학교</a>에 재학 중이며, 소프트웨어융합학과 <a href='https://scholar.google.com/citations?user=p79efpQAAAAJ&hl=en' target='_blank'>이원희 교수님</a>의 지도 아래 연구를 진행하고 있습니다.</p>
    <p>저는 <strong>의료 영상 분석</strong>과 <strong>이상 탐지</strong> 분야에서의 <strong>인공지능</strong> 활용 연구에 관심이 많습니다. 🤗🤗 </p>
    <p>스타트업 <a href='https://www.futureworklab.co.kr' target='_blank'>futureworkLab</a>에서 AI 소프트웨어 엔지니어 인턴으로 근무하며 LinkBrain 프로젝트에 참여한 실무 경험도 있습니다.</p>
    <p>자세한 내용은 <a href='resume.pdf' target='_blank'>CV</a>에서 확인하실 수 있습니다.</p>
  `,
  skills: [
    "Python", "Deep Learning","Computer Vision", "Medical Imaging", "Machine Learning",
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
      company: "KyungHee University",
      title: "Department of Physical Education & Software Convergence",
      dateRange: "Mar 2020 — June 2026",
      link: "https://www.khu.ac.kr",
      bullets: [
        "경희대학교 체육학과 & 소프트웨어융합학과 다전공생"
      ],
    },
    {
      company: "FutureWorkLab.co",
      title: "AI Software Engineer Intern",
      dateRange: "Dec 2024 — Aug 2025",
      link: "https://futureworklab.co",
      bullets: [
        "LangGraph 기반 업무 카테고리 graph 자동화 솔루션 개발 및 내부 실험",
        "RAG(Retrieval-Augmented Generation) 파이프라인 구현 및 prompt engineering 성능 평가",
        "FastAPI + Docker를 활용한 AI 서비스 백엔드 구축 및 배포",
      ],
    },
    {
      company: "경희대학교 소프트웨어융합학과 Aims Lab",
      title: "Undergraduate Researcher",
      dateRange: "Aug 2025 — Current ",
      bullets: [
        "웨어러블 센서 기반 데이터 분석 & 활동 간 정량적 집중도 측정 모델 비교 연구",
        "CT data 를 활용한 Deep Learning model Comparsion Analysis"
      ],
    },
    {
      company: "서울대학교 병원 BMI Lab",
      title: "AI Intern Researcher",
      dateRange: "Mar 2026 — Current ",
      bullets: [
        "Pathology Data & Image Data 기반 AI (ex. vLLM, Transformer, AI Architecture) 모델링 연구",
        "의료 데이터 특성에 따른 AI 모델링 전략 연구"
      ],
    },
  ],
  education: [
    {
      school: "Seoul National University",
      degree: "Intern Researcher in Bio-Medical Informatics & AI Lab",
      dateRange: "2026.03 - current",
      status: "upcoming",
      link: "https://www.snu.ac.kr",
      achievements: [
        "인턴 연구원"],
    },
    {
      school: "Kyung-Hee University",
      degree: "B.S. in Software Convergence",
      dateRange: "2020.03 - 2026",
      link: "https://www.khu.ac.kr",
      achievements: [
        "GPA 3.91 / 4.5 졸업 예정"],
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