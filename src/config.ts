export const siteConfig = {
  name: "jo._.on",
  title: "Junior AI Researcher / Engineer",
  description: "AI와 의료 데이터의 교차점에서 연구하는 개발자 jo._.on의 포트폴리오입니다.",
  accentColor: "#2a3c6e",
  social: {
    email: "jhk_lee@gmail.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://x.com/rfitzio",
    github: "https://github.com/RyanFitzgerald",
  },
  sectionSubtitles: {
    about: "AI와 의료의 경계에서",
    projects: "직접 만들어본 것들",
    experience: "일했던 곳들",
    education: "배웠던 곳들",
    blog: "기록하는 것들",
  },
  aboutMe:
    "AI와 의료 데이터가 만나는 지점에 관심이 많은 주니어 연구자입니다. 경희대학교 소프트웨어융합학과를 졸업하고, 현재 서울대학교병원 융합의학기술원에서 의료 <strong>인공지능</strong> 연구를 병행하고 있습니다. 임상, 병리학 데이터 분석, 컴퓨터 비전 그리고 <strong>실제 현장</strong>에서 쓰일 수 있는 AI 시스템 개발에 관심이 많습니다. 연구와 개발 사이 어딘가에서, 작지만 의미 있는 것들을 만들어가고 있습니다.",
  skills: [
    "Python", "PyTorch",
    "FastAPI", "Docker", "Git",
    "Computer Vision", "Medical Imaging",
    "Clinical NLP",
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
    {
      name: "Portfolio — 이 사이트",
      description:
        "Astro + Tailwind CSS v4로 구축한 개인 포트폴리오. D3.js force simulation 기반의 인터랙티브 지식 그래프와 Astro Content Collections 블로그를 포함합니다.",
      link: "https://github.com/RyanFitzgerald",
      skills: ["Astro", "TypeScript", "D3.js", "Tailwind CSS"],
    },
  ],
  experience: [
    {
      company: "FutureWorkLab.co",
      title: "Junior AI Software Engineer / Researcher",
      dateRange: "Dec 2024 — Aug 2025",
      bullets: [
        "LangGraph 기반 업무 카테고리 graph 자동화 솔루션 개발 및 내부 실험",
        "RAG(Retrieval-Augmented Generation) 파이프라인 구현 및 prompt engineering 성능 평가",
        "FastAPI + Docker를 활용한 AI 서비스 백엔드 구축 및 배포",
      ],
    },
    {
      company: "경희대학교 소프트웨어융합학과 AimsLab 학부 연구생",
      title: "Undergraduate Researcher",
      dateRange: "Aug 2025 — Current ",
      bullets: [
        "헬스케어 데이터 전처리 및 시계열 분류 모델 실험",
        "웨어러블 센서 기반 데이터 분석 & 활동 간 정량적 집중도 측정 모델 비교 연구",
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