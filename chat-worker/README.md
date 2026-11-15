# chat-worker: 포트폴리오 챗봇 서버 (Cloudflare Worker)

사이트(`portfolio_v2`)는 GitHub Pages에 정적 파일로 배포되기 때문에 서버 코드를 실행할 수 없습니다.
그래서 "Ask about jo._.on" 챗봇의 서버 부분만 Cloudflare Worker로 따로 띄웁니다.
브라우저는 `https://jo-onn.github.io/jo._.on/`에서 이 Worker 주소로 직접 요청을 보냅니다.

- 답변 내용(시스템 프롬프트)은 `portfolio_v2/src/data/site.ts`에서 그대로 가져옵니다.
  사이트 내용을 고친 뒤 **Worker도 다시 배포해야** 챗봇에 반영됩니다(`npm run deploy`).
- 요청 검증, 목업 응답, 프롬프트 생성 코드는 `portfolio_v2/src/lib/chat/`를 공유합니다.
  Worker 전용 코드는 `src/index.ts`(라우팅, CORS, 레이트 리밋)와 `src/claude.ts`(API 키를 `env`에서 받는 Claude 호출)입니다.

## API (사이트 UI와 맞춰진 계약이므로 바꾸지 마세요)

`POST /` 또는 `POST /api/chat`, 본문 `{ "messages": [{ "role": "user", "content": "..." }], "lang": "ko" }`

| 상태 | 본문 | 의미 |
|---|---|---|
| 200 | `text/plain` 스트림 | 답변 텍스트 |
| 400 | `{"error":"invalid_request"}` | 형식 오류 |
| 403 | `{"error":"forbidden_origin"}` | 허용되지 않은 사이트(Origin)에서 온 요청 |
| 413 | `{"error":"payload_too_large"}` | 본문이 약 51 KB 초과 |
| 429 | `{"error":"rate_limited"}` + `Retry-After` | 요청이 너무 많음 |
| 502 | `{"error":"upstream_error"}` | Anthropic API 오류 |
| 500 | `{"error":"server_error"}` | 기타 오류 |

## 보호 장치

- **CORS / Origin 제한**: `ALLOWED_ORIGINS`에 있는 사이트에서 온 요청만 받습니다. 나머지는 모델 호출 전에 403.
  기본값: `https://jo-onn.github.io,http://localhost:3000,http://127.0.0.1:3000`
  (Origin은 경로 없이 `https://jo-onn.github.io`까지만 씁니다. `/jo._.on/`는 붙이지 않습니다.)
- **레이트 리밋**: Cloudflare Rate Limiting 바인딩으로 **IP(`CF-Connecting-IP`)당 60초에 10회**.
  Cloudflare 위치(데이터센터)별로 세는 근사치라 정확한 전역 한도는 아닙니다.
  주기는 10초 또는 60초만 고를 수 있습니다. 바꾸려면 `wrangler.jsonc`의 `ratelimits`를 수정하세요
  (60초가 아니면 `src/index.ts`의 `RATE_LIMIT_PERIOD_SEC`도 같이 바꿉니다).
- **본문 크기 제한**: 약 51 KB(`MAX_BODY_BYTES`, 질문 12개 × 1000자 한국어 기준). JSON을 읽기 전에 확인합니다.
- **비용 상한**: 진짜 안전장치는 아래 5단계의 Anthropic Console 지출 한도입니다. 꼭 설정하세요.

## 설정과 배포 (처음 한 번)

준비물: Node.js 20 이상, 터미널.

### 1. Cloudflare 계정 만들기

1. https://dash.cloudflare.com/sign-up 에서 무료 계정을 만들고 이메일 인증을 마칩니다.
2. 도메인은 없어도 됩니다. Worker는 `*.workers.dev` 주소로 동작합니다.

### 2. 설치하고 로그인하기

```bash
cd chat-worker
npm install
npx wrangler login      # 브라우저가 열리면 "Allow"를 누릅니다
npx wrangler whoami     # 로그인된 계정이 보이면 성공
```

### 3. Anthropic API 키를 비밀값(secret)으로 등록하기

1. https://platform.claude.com 의 Console에서 **API Keys** 메뉴로 가 새 키를 만듭니다. 키 이름은 `portfolio-chat`처럼 알아보기 쉽게 정합니다.
2. 아래 명령을 실행하고, 물어보면 키를 붙여넣습니다. 키는 화면이나 파일에 남지 않습니다.

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

처음 실행하면 "Worker가 아직 없는데 만들까요?"라고 물을 수 있습니다. `Y`를 누르면 됩니다.
키는 **절대** `wrangler.jsonc`나 git에 넣지 마세요.

### 4. 배포하기

```bash
npm run deploy
```

- 처음 배포하면 `workers.dev` 서브도메인을 정하라고 할 수 있습니다(예: `jo-onn`). 원하는 이름을 입력합니다.
- 배포가 끝나면 터미널에 다음과 같은 주소가 나옵니다.
  `https://jo-on-chat.<서브도메인>.workers.dev`
  (`jo-on-chat`은 `wrangler.jsonc`의 `name`입니다.)
- 나중에 주소를 다시 확인하려면: Cloudflare 대시보드 → **Workers & Pages** → `jo-on-chat` → **Settings → Domains & Routes**.

배포 확인(목업이 아니라 실제 모델이 1번 호출되므로 아주 적은 비용이 듭니다):

```bash
curl -i -X POST https://jo-on-chat.<서브도메인>.workers.dev/ \
  -H "Origin: https://jo-onn.github.io" -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Who is Joon Hyuk?"}],"lang":"en"}'
```

### 5. Anthropic Console에서 지출 한도 걸기 (필수)

1. Console → **Settings → Limits**에서 월 지출 한도(spend limit)를 원하는 금액(예: $10)으로 낮춥니다.
2. 더 안전하게 하려면 **Settings → Workspaces**에서 `portfolio` 같은 별도 워크스페이스를 만들고,
   그 워크스페이스에 지출 한도를 걸고, 3단계의 API 키를 그 워크스페이스 안에서 만드세요.
   그러면 챗봇이 그 한도 이상으로는 돈을 쓸 수 없습니다.
3. 결제(**Billing**)의 자동 충전(auto-reload)은 꺼 두는 것을 권장합니다.

### 6. 사이트에 Worker 주소 연결하기

사이트는 빌드할 때 `NEXT_PUBLIC_CHAT_ENDPOINT` 환경변수로 챗봇 주소를 받습니다. 배포 워크플로(`.github/workflows/deploy.yml`)가 저장소 변수 `CHAT_ENDPOINT` 값을 이 환경변수로 넘겨 줍니다.

1. GitHub 저장소 → **Settings → Secrets and variables → Actions → Variables** 탭 → **New repository variable**
2. Name: `CHAT_ENDPOINT`, Value: `https://jo-on-chat.<서브도메인>.workers.dev` (4단계에서 나온 주소)
3. GitHub Actions에서 사이트 배포 워크플로를 다시 실행합니다. 빌드할 때 값이 들어가므로 **값을 바꾸면 다시 빌드해야 합니다**.

## 설정값 정리

| 이름 | 종류 | 어디에 | 설명 |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | secret | `wrangler secret put` | 없으면 자동으로 목업 모드 |
| `ALLOWED_ORIGINS` | var | `wrangler.jsonc` → `vars` | 쉼표로 구분한 허용 Origin 목록 |
| `CHAT_MOCK` | var | `wrangler.jsonc` → `vars` | `"1"`이면 모델을 호출하지 않고 목업 답변 |
| `CHAT_RATE_LIMITER` | 바인딩 | `wrangler.jsonc` → `ratelimits` | IP당 10회/60초 |
| `CHAT_ENDPOINT` | GitHub 저장소 variable | 사이트 빌드 (→ `NEXT_PUBLIC_CHAT_ENDPOINT`) | Worker 주소 |

`vars`를 바꾼 뒤에는 `npm run deploy`로 다시 배포해야 반영됩니다.
챗봇을 잠시 끄고 싶으면 `CHAT_MOCK`을 `"1"`로 바꿔 배포하세요. 그러면 비용이 나가지 않습니다.

## 로컬에서 테스트하기 (비용 없음)

```bash
cd chat-worker
cp .dev.vars.example .dev.vars   # CHAT_MOCK=1 (목업). .dev.vars는 git에 올라가지 않습니다
npm run dev                      # http://127.0.0.1:8799
```

다른 터미널에서 사이트를 이 Worker에 연결해 띄울 수 있습니다.

```bash
cd portfolio_v2
NEXT_PUBLIC_CHAT_ENDPOINT=http://127.0.0.1:8799 npm run dev   # http://localhost:3000
```

레이트 리밋 바인딩은 로컬 `wrangler dev`에서도 시뮬레이션됩니다(10회 넘으면 429).
바인딩을 쓸 수 없는 환경이면 코드가 요청을 그냥 허용합니다.

기타 명령:

```bash
npm run typecheck              # 타입 검사
npx wrangler tail              # 배포된 Worker의 실시간 로그 보기
```
