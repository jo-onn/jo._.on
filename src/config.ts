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
    "AI와 의료 데이터가 만나는 지점에 관심이 많은 주니어 연구자입니다. 경희대학교 소프트웨어융합학과를 졸업하고, 현재 서울대학교 의료정보학 석사 과정에 재학 중입니다. 임상 데이터 분석, 자연어 처리, 그리고 실제 의료 현장에서 쓰일 수 있는 AI 시스템 개발에 관심을 갖고 있습니다. 연구와 개발 사이 어딘가에서, 작지만 의미 있는 것들을 만들어가고 있습니다.",
  skills: [
    "Python", "PyTorch", "Hugging Face",
    "FastAPI", "Node.js", "TypeScript",
    "Docker", "PostgreSQL",
    "Clinical NLP", "Medical Imaging",
  ],
  projects: [
    {
      name: "MediNote — 임상 노트 요약 AI",
      description:
        "전자의무기록(EMR)의 비정형 임상 노트를 자동으로 요약하는 LLM 기반 파이프라인. 내과 퇴원 요약문 데이터셋으로 fine-tuning하여 핵심 진단·처치 항목을 구조화된 형태로 추출합니다.",
      link: "",
      skills: ["Python", "PyTorch", "Hugging Face", "FastAPI"],
    },
    {
      name: "CXR-Classifier — 흉부 X-ray 이상 탐지",
      description:
        "공개 흉부 X-ray 데이터셋(NIH ChestX-ray14)을 활용한 다중 레이블 분류 모델. EfficientNet 백본에 class activation map 시각화를 적용해 병변 위치를 직관적으로 확인할 수 있습니다.",
      link: "",
      skills: ["Python", "PyTorch", "Medical Imaging"],
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
      dateRange: "Aug 2024 — Mar 2025",
      bullets: [
        "LLM 기반 업무 자동화 솔루션 프로토타입 개발 및 내부 실험 설계",
        "RAG(Retrieval-Augmented Generation) 파이프라인 구현 및 성능 평가",
        "FastAPI + Docker를 활용한 AI 서비스 백엔드 구축 및 배포",
      ],
    },
    {
      company: "경희대학교 소프트웨어융합학과 학부 연구생",
      title: "Undergraduate Researcher",
      dateRange: "Mar 2023 — Jun 2024",
      bullets: [
        "헬스케어 데이터 전처리 및 시계열 분류 모델 실험",
        "웨어러블 센서 기반 활동 인식 모델 비교 연구 참여",
        "연구실 세미나에서 딥러닝 논문 리뷰 발표 다수 진행",
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