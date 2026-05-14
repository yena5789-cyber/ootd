"use client";

import { useMemo, useState } from "react";
import { Candidate, CandidateGender, ConnectionDegree, KAKAO_CHAT_URL, candidates } from "@/lib/candidates";

type Filter = "전체" | CandidateGender | ConnectionDegree;
type ModalState =
  | { type: "request"; candidate: Candidate }
  | { type: "register" }
  | null;

const filters: Filter[] = ["전체", "여성", "남성", "1촌", "2촌", "3촌"];

const registrationTemplate = `[에나버스 후보 카드용]

- 출생년도 (예: 1994):
- 성별:
- 키:
- 거주 지역 (대충):
- 직업/직군:

- 성격 키워드 3개
  예: 차분함, 유머감각, 책임감

- 취미
  예: 운동, 카페, 여행, 전시 등

- 연애 스타일
  예: 편안한 관계 / 자주 연락 / 서로 존중하는 스타일 등

- 원하는 상대
  예: 대화 잘 통하는 사람 / 예의 있는 사람 / 자기 일 열심히 하는 사람 등

- MBTI:

- 한 줄 소개:

사진은 같이 보내주세요.
사진은 매칭될 때만 상대에게 전달됩니다.`;

function requestTemplate(candidateId: string) {
  return `[에나버스 소개 요청]

관심 후보 ID: ${candidateId}
이름/닉네임:
출생년도:
성별:
거주 지역:
에나와의 관계 / 소개 경로:
간단한 자기소개:
관심 있는 이유:`;
}

export default function EnaVerseApp() {
  const [activeFilter, setActiveFilter] = useState<Filter>("전체");
  const [modal, setModal] = useState<ModalState>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredCandidates = useMemo(() => {
    if (activeFilter === "전체") return candidates;
    return candidates.filter(
      (candidate) => candidate.gender === activeFilter || candidate.connectionDegree === activeFilter,
    );
  }, [activeFilter]);

  async function copyText(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1800);
  }

  const modalTemplate = modal?.type === "request" ? requestTemplate(modal.candidate.id) : registrationTemplate;

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#fffaf5] pb-28 text-stone-900">
      <section className="relative overflow-hidden px-5 pb-8 pt-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="absolute -left-24 top-48 h-52 w-52 rounded-full bg-amber-200/60 blur-3xl" />
        <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-card backdrop-blur">
          <p className="mb-3 inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-500">
            지인이니까 믿고, 지인이니까 편하게
          </p>
          <h1 className="text-4xl font-black tracking-tight text-stone-950">에나버스</h1>
          <p className="mt-3 text-lg font-semibold leading-7 text-stone-800">
            에나의 지인망 안에서 시작되는 비공개 소개
          </p>
          <p className="mt-4 text-sm leading-6 text-stone-600">
            모든 후보는 실제 지인 연결 경로를 확인한 뒤 등록됩니다. 사진과 연락처는 양측 동의 후에만 전달됩니다.
          </p>
          <div className="mt-6 grid gap-3">
            <a
              href="#candidates"
              className="rounded-2xl bg-stone-950 px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-stone-300/50"
            >
              소개 후보 보기
            </a>
            <button
              type="button"
              onClick={() => setModal({ type: "register" })}
              className="rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-bold text-rose-600"
            >
              내 프로필 등록하기
            </button>
          </div>
        </div>
      </section>

      <section id="candidates" className="px-5">
        <div className="mb-4 rounded-3xl border border-amber-100 bg-amber-50/80 p-4 text-xs leading-5 text-stone-600">
          <p className="font-bold text-stone-800">지인 연결 기준</p>
          <p className="mt-1">1촌은 에나 직접 지인, 2촌은 에나 친구의 친구, 3촌은 지인 경로 확인 완료를 의미합니다.</p>
        </div>

        <div className="sticky top-0 z-10 -mx-5 bg-[#fffaf5]/90 px-5 py-3 backdrop-blur">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                  activeFilter === filter
                    ? "bg-stone-950 text-white shadow-md"
                    : "border border-stone-200 bg-white text-stone-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-4">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} onRequest={() => setModal({ type: "request", candidate })} />
          ))}
        </div>
      </section>

      <section className="mx-5 mt-8 rounded-3xl border border-stone-200 bg-white p-5 text-xs leading-6 text-stone-600 shadow-card">
        <p className="mb-2 text-sm font-black text-stone-900">프라이버시 안내</p>
        <p>본 서비스는 지인 기반 비공개 소개 요청 서비스입니다.</p>
        <p>프로필 정보는 당사자의 동의를 받은 범위 내에서만 공개됩니다.</p>
        <p>사진 및 연락처는 양측 동의 후에만 전달됩니다.</p>
        <p>무단 캡처, 공유, 외부 유포를 금지합니다.</p>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t border-stone-200 bg-white/95 p-4 backdrop-blur">
        <button
          type="button"
          onClick={() => setModal({ type: "register" })}
          className="w-full rounded-2xl bg-rose-500 px-5 py-4 text-sm font-black text-white shadow-lg shadow-rose-200"
        >
          카카오톡으로 후보 등록하기
        </button>
      </div>

      {modal ? (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-stone-950/45 px-4" role="dialog" aria-modal="true">
          <div className="mb-4 max-h-[86vh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-rose-500">에나버스 카카오톡 연결</p>
                <h2 className="mt-1 text-xl font-black text-stone-950">
                  {modal.type === "request" ? `소개 요청 · ${modal.candidate.id}` : "내 프로필 등록"}
                </h2>
              </div>
              <button type="button" onClick={() => setModal(null)} className="rounded-full bg-stone-100 px-3 py-2 text-sm font-bold">
                닫기
              </button>
            </div>

            {modal.type === "request" ? (
              <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-stone-700">
                사진과 연락처는 바로 공개되지 않습니다. 카카오톡으로 소개 요청을 남기면 운영자가 확인 후 안내합니다.
              </p>
            ) : (
              <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-stone-700">
                후보 등록은 비공개로 진행됩니다. 이름, 사진, 연락처는 공개 페이지에 노출되지 않습니다. 사진과 연락처는 매칭될 때만 상대에게 전달됩니다.
              </p>
            )}

            <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs leading-5 text-stone-700">
              {modalTemplate}
            </pre>

            <div className="mt-4 grid gap-3">
              <button
                type="button"
                onClick={() => copyText(modalTemplate, modal.type)}
                className="rounded-2xl bg-stone-950 px-5 py-4 text-sm font-black text-white"
              >
                {copiedKey === modal.type ? "복사 완료!" : modal.type === "request" ? "신청문구 복사하기" : "등록 양식 복사하기"}
              </button>
              <a
                href={KAKAO_CHAT_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-[#fee500] px-5 py-4 text-center text-sm font-black text-stone-900"
              >
                {modal.type === "request" ? "카카오톡으로 문의하기" : "카카오톡으로 후보 등록 신청하기"}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function CandidateCard({ candidate, onRequest }: { candidate: Candidate; onRequest: () => void }) {
  return (
    <article className="rounded-[1.75rem] border border-white bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-rose-500">[{candidate.id}]</p>
          <h2 className="mt-1 text-lg font-black text-stone-950">
            {candidate.gender} · {candidate.ageRange} · {candidate.region}
          </h2>
        </div>
        <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
          {candidate.connectionDegree}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-stone-700">
        <Info label="직군" value={candidate.jobCategory} />
        <Info label="키" value={candidate.height} />
        <Info label="MBTI" value={candidate.mbti} />
        <Info label="지인 연결" value={`${candidate.connectionDegree} (${candidate.connectionDescription})`} />
      </div>

      <CardSection title="성격" text={candidate.personalityKeywords.join(" / ")} />
      <CardSection title="취미" text={candidate.hobbies.join(", ")} />
      <CardSection title="연애 스타일" text={candidate.datingStyle} />
      <CardSection title="원하는 상대" text={candidate.preferredPartner} />
      <CardSection title="한 줄 소개" text={candidate.intro} />

      <button
        type="button"
        onClick={onRequest}
        className="mt-5 w-full rounded-2xl bg-rose-500 px-5 py-4 text-sm font-black text-white shadow-md shadow-rose-100"
      >
        소개 요청하기
      </button>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <p className="rounded-2xl bg-stone-50 px-3 py-2">
      <span className="font-bold text-stone-950">{label}: </span>
      {value}
    </p>
  );
}

function CardSection({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-black text-stone-400">{title}</p>
      <p className="mt-1 text-sm leading-6 text-stone-700">{text}</p>
    </div>
  );
}
