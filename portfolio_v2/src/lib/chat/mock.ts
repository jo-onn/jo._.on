import type { ChatLang } from "./systemPrompt";

const WORD_DELAY_MS = 30;
const ECHO_MAX_CHARS = 120;

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      resolve();
    });
  });
}

function cannedReply(question: string, lang: ChatLang): string {
  const q = question.length > ECHO_MAX_CHARS ? `${question.slice(0, ECHO_MAX_CHARS)}…` : question;
  return lang === "ko"
    ? `"${q}"라고 물어보셨네요. 이것은 목업(mock) 응답이에요. 실제 모델은 호출되지 않았고, 채팅 UI를 테스트할 수 있도록 단어 단위로 천천히 스트리밍하고 있어요. 실제 배포에서는 이 자리에 이준혁 님의 경력, 프로젝트, 연구에 대한 답변이 표시됩니다.`
    : `You asked: "${q}". This is a mock reply — no model was called. It streams word by word so the chat UI can be tested, and in production this is where an answer about Joon Hyuk's experience, projects and research would appear.`;
}

/** Yields the canned reply word by word (whitespace kept) with small delays. */
export async function* mockAnswer(
  question: string,
  lang: ChatLang,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  const parts = cannedReply(question, lang).match(/\S+\s*/g) ?? [];
  for (const part of parts) {
    if (signal?.aborted) return;
    yield part;
    await sleep(WORD_DELAY_MS, signal);
  }
}
