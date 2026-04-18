export const siteConfig = {
  name: "jo._.on",
  title: "Junior AI Researcher / Engineer",
  description: "AI와 의료 데이터의 교차점에서 연구하는 개발자 jo._.on의 포트폴리오입니다.",
  accentColor: "#2a3c6e",
  social: {
    email: "jhk_lee@gmail.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/jo-onn",
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
  aboutMe:"I am currently a Undergraduate student in <strong>Software Convergence & Physical Education</strong> at <a href='https://www.khu.ac.kr' target='_blank' style='font-weight:600; text-decoration: underline;'>Kyung-Hee University </a>Korea, advised by Prof. Won-hee Lee.\
          My research focuses on <strong>Aritificial Intelligence</strong> in <strong>medical image analysis</strong>, <strong>Anomaly Detection</strong>. \
          I have also gained Engineering experience through internships at startup company <a href='https://www.futureworklab.co.kr' target='_blank' style='font-weight:600; text-decoration: underline;'>futureworkLab</a>, as a AI Software Engineer Intern where I worked on LinkBrain Project. \
          More details can be found in my CV.",
  skills: [
    "Python", "Deep Learning","Computer Vision", "Medical Imaging", "Clinical NLP",
  ],
  projects: [
    {
      name: "015B: 도시텃밭 중개 및 AI를 활용한 도시농부 육성 플랫폼, 'CiFarm' ",
      description:
        "LangGraph 기반 AI 에이전트로 텃밭 분양·재배 가이드를 제공하는 도시농업 플랫폼",
      link: "https://hello.khlug.org/105312",
      skills: ["Python", "PyTorch", "langchain", "langgraph", "FastAPI"],
    },
    {
      name: "멀티모달 생체신호 데이터를 이용한 머신러닝 기반 집중도 예측 모델 개발 <ksc 2025>",
      description:
        "K-EmoPhone 공개 데이터셋 기반 다중 생체신호 머신러닝 집중도 예측 모델",
        link: "",
      skills: ["Python", "Data Analysis", "Medical Data", "Machine Learning"],
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
        "웨어러블 센서 기반 데이터 분석 & 활동 간 정량적 집중도 측정 모델 비교 연구",
        "CT data 를 활용한 Deep Learning model Comparsion Analysis"
      ],
    },
  ],
  education: [
    {
      school: "Seoul National University",
      degree: "Master's in Medical Informatics",
      dateRange: "2026 —",
      achievements: [
        "임상 자연어 처리 및 의료 AI 연구 예정",
        "전자의무기록 데이터 표준화(HL7 FHIR) 관련 프로젝트 참여 예정",
      ],
    },
    {
      school: "Kyung-Hee University",
      degree: "B.S. in Software Convergence",
      dateRange: "2020 — 2026",
      achievements: [
        "GPA 4.01 / 4.5 졸업",
        "캡스톤 프로젝트: 웨어러블 기반 낙상 감지 시스템 (최우수상)",
      ],
    },
  ],
};