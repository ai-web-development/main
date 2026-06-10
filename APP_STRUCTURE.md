# ANOTHER STAR — 앱 구조 문서

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [전체 폴더 구조](#3-전체-폴더-구조)
4. [앱 진입점 흐름](#4-앱-진입점-흐름)
5. [라우팅 구조](#5-라우팅-구조)
6. [레이아웃 구조](#6-레이아웃-구조)
7. [페이지 목록](#7-페이지-목록)
8. [컴포넌트 목록](#8-컴포넌트-목록)
9. [전역 상태 (Context)](#9-전역-상태-context)
10. [데이터 파일](#10-데이터-파일)
11. [데이터 흐름 요약](#11-데이터-흐름-요약)
12. [컴포넌트 관계도](#12-컴포넌트-관계도)

---

## 1. 프로젝트 개요

**ANOTHER STAR**는 우주를 테마로 한 커뮤니티 Q&A 웹앱입니다.  
사용자는 질문을 작성해 3개의 "별"(감정의 별 / 이성의 별 / 상상의 별)에 쏘아 올리면, 각 별의 페이지에서 그 질문에 답변을 달 수 있습니다.

| 핵심 아이디어 | 설명 |
|---|---|
| 질문 쏘아 올리기 | 사용자가 별 1개를 선택하면, 나머지 2개 중 1개가 **무작위로 추가 선택**되어 질문이 2개의 별에 동시 전달됨 |
| 별 페이지 | 각 별 페이지는 자신에게 도착한 질문 목록을 보여주고, 초기 질문에만 답변 작성이 가능 |
| 영속성 | 모든 질문·답변은 `localStorage`에 저장되어 새로고침 후에도 유지됨 |

---

## 2. 기술 스택

| 분류 | 라이브러리 / 도구 | 버전 |
|---|---|---|
| UI 프레임워크 | React | 19 |
| 언어 | TypeScript | 6 |
| 빌드 도구 | Vite | 8 |
| 라우팅 | react-router-dom | 7 |
| UI 컴포넌트 | Bootstrap / react-bootstrap | 5 / 2 |
| 스타일링 | CSS Modules + 일반 CSS | — |

---

## 3. 전체 폴더 구조

```
src/
├── main.tsx                          # 앱 진입점 (React DOM 렌더링)
├── App.tsx                           # 최상위 컴포넌트 (Provider 감싸기 + RouterProvider)
├── index.css                         # 전역 기본 스타일
│
├── routes/
│   └── router.tsx                    # URL ↔ 페이지 컴포넌트 매핑 정의
│
├── context/
│   ├── QuestionContext.tsx            # 질문 목록 전역 상태 (CRUD + localStorage)
│   └── AnswerContext.tsx              # 답변 목록 전역 상태 (CRUD + localStorage)
│
├── data/
│   ├── categories.json               # 별 카테고리 이름 상수
│   └── starDescriptions.json         # 별 소개 카드 데이터
│
├── assets/
│   └── logo.png                      # 앱 로고 이미지
│
├── pages/                            # URL에 대응하는 페이지 컴포넌트
│   ├── homePage/
│   │   ├── Home.tsx                  # "/" — 질문 작성 페이지
│   │   └── Home.module.css
│   ├── starexplainPage/
│   │   ├── StarExplain.tsx           # "/stars" — 별 소개 페이지
│   │   └── StarExplain.module.css
│   ├── emotionStarPage/
│   │   ├── EmotionStar.tsx           # "/emotion" — 감정의 별 Q&A
│   │   └── EmotionStar.module.css
│   ├── reasonStarPage/
│   │   ├── ReasonStar.tsx            # "/reason" — 이성의 별 Q&A
│   │   └── ReasonStar.module.css
│   └── imaginationStarPage/
│       ├── ImaginationStar.tsx       # "/imagination" — 상상의 별 Q&A
│       └── ImaginationStar.module.css
│
└── components/                       # 재사용 가능한 UI 컴포넌트
    ├── Header.tsx / Header.module.css       # 상단 내비게이션 바
    ├── Footer.tsx / Footer.module.css       # 하단 바
    ├── layouts/
    │   ├── Layout.tsx                       # Header + Outlet + Footer 뼈대
    │   └── Layout.module.css
    ├── starCard/
    │   ├── StarCard.tsx                     # 별 소개 카드 (StarExplain에서 사용)
    │   └── StarCard.module.css
    └── askAndAnswer/
        ├── ask/
        │   ├── Ask.tsx                      # 질문 작성 폼
        │   └── Ask.css
        └── answer/
            ├── QuestionList.tsx             # 질문 목록 + 삭제 버튼
            ├── AnswerSection.tsx            # 답변 입력/표시 (QuestionList 안에서 사용)
            └── QuestionList.css
```

---

## 4. 앱 진입점 흐름

```
index.html
  └─ <div id="root" />
       └─ main.tsx  →  createRoot(...).render(...)
            └─ App.tsx
                 ├─ <QuestionProvider>   (질문 상태 제공)
                 │    └─ <AnswerProvider>  (답변 상태 제공)
                 │         └─ <RouterProvider router={router} />  (URL 기반 페이지 렌더링)
                 └─ (모든 페이지는 두 Provider 안에서 동작하므로 어디서든 질문·답변 상태에 접근 가능)
```

---

## 5. 라우팅 구조

`src/routes/router.tsx`에서 `createBrowserRouter`로 정의됩니다.

| URL | 렌더링되는 컴포넌트 | 설명 |
|---|---|---|
| `/` | `<Home />` | 질문 작성 페이지 |
| `/stars` | `<StarExplain />` | 별 소개 페이지 |
| `/emotion` | `<EmotionStar />` | 감정의 별 Q&A |
| `/reason` | `<ReasonStar />` | 이성의 별 Q&A |
| `/imagination` | `<ImaginationStar />` | 상상의 별 Q&A |

> 모든 페이지는 **`<Layout />`의 자식(children)**으로 등록되어, `<Layout>` 안의 `<Outlet />` 자리에 삽입됩니다.

```
<Layout>
  ├─ <Header />     (항상 고정)
  ├─ <Outlet />     ← 주소에 따라 Home / StarExplain / EmotionStar 등으로 교체
  └─ <Footer />     (항상 고정)
```

---

## 6. 레이아웃 구조

`src/components/layouts/Layout.tsx`가 모든 페이지의 **공통 뼈대** 역할을 합니다.

```
┌─────────────────────────────────────────┐
│  outer (화면 전체 감싸기)                │
│  ┌───────────────────────────────────┐  │
│  │  pageBox (앱 메인 박스)            │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  <Header />  (상단 고정)    │  │  │
│  │  ├─────────────────────────────┤  │  │
│  │  │                             │  │  │
│  │  │  <main> ← <Outlet />        │  │  │
│  │  │  (이 영역만 스크롤됨)        │  │  │
│  │  │                             │  │  │
│  │  ├─────────────────────────────┤  │  │
│  │  │  <Footer />  (하단 고정)    │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Header 내비게이션 링크:**

| 표시 이름 | 이동 경로 |
|---|---|
| 별에 대해 | `/stars` |
| 감정의 별 | `/emotion` |
| 이성의 별 | `/reason` |
| 상상의 별 | `/imagination` |
| 로고 클릭 | `/` (홈) |

---

## 7. 페이지 목록

### Home (`/`)
- 로고 이미지 + 설명 문구 표시
- `<Ask />` 컴포넌트를 포함해 질문 작성 UI 제공

### StarExplain (`/stars`)
- `starDescriptions.json` 데이터를 읽어 `<StarCard />`를 목록으로 렌더링
- 3개의 별(감정 / 이성 / 상상)의 특징을 카드 형태로 소개

### EmotionStar (`/emotion`)
- `useQuestions()`로 전체 질문 중 `sentTo`에 `"감정의 별"`이 포함된 것만 필터링
- `<QuestionList />`에 필터된 질문과 강조색(`#e87070`)을 전달

### ReasonStar (`/reason`)
- EmotionStar와 동일한 구조, `"이성의 별"` 필터링, 강조색 `#5bafc5`

### ImaginationStar (`/imagination`)
- EmotionStar와 동일한 구조, `"상상의 별"` 필터링, 강조색 `#9b71c8`

---

## 8. 컴포넌트 목록

### `Ask` (질문 작성 폼)
**파일:** `src/components/askAndAnswer/ask/Ask.tsx`

| 상태 | 타입 | 역할 |
|---|---|---|
| `selected` | `Category \| null` | 사용자가 선택한 별 |
| `title` | `string` | 질문 제목 |
| `text` | `string` | 질문 본문 |
| `launched` | `boolean` | 발사 완료 여부 |
| `sentTo` | `{ main, random } \| null` | 질문이 전달된 두 별 |

**핵심 로직:**
1. 사용자가 별 1개 선택 + 제목·본문 입력
2. "쏘아 올리기" 버튼 클릭 → `pickRandomOther(selected)`로 나머지 별 중 1개 무작위 선택
3. `addQuestion({ title, text, sentTo: [selected, random] })` 호출
4. 3.5초 동안 발사 완료 화면 표시 후 폼 초기화

---

### `QuestionList` (질문 목록)
**파일:** `src/components/askAndAnswer/answer/QuestionList.tsx`

- `questions` 배열을 받아 각 질문을 `<li>`로 렌더링
- 질문이 현재 별에 **직접 보낸 것인지 / 무작위로 날아온 것인지** 뱃지로 표시
- 초기 질문(`isInitial: false`)이 아닌 경우에만 삭제 버튼 표시
- 각 질문 하단에 `<AnswerSection />`을 포함

---

### `AnswerSection` (답변 입력·표시)
**파일:** `src/components/askAndAnswer/answer/AnswerSection.tsx`

- `useAnswers()`로 해당 질문의 답변을 가져와 표시
- **초기 질문(`isInitial: true`)에만** 답변 textarea + 등록 버튼 표시
- 직접 작성한 질문에는 답변 불가 안내 문구 표시
- 답변 삭제 버튼 포함

---

### `StarCard` (별 소개 카드)
**파일:** `src/components/starCard/StarCard.tsx`

- `emoji`, `name`, `description` props를 받아 카드 UI로 렌더링
- StarExplain 페이지에서 `starDescriptions.json` 데이터와 함께 사용

---

## 9. 전역 상태 (Context)

앱은 두 개의 Context로 상태를 전역 관리합니다.

### QuestionContext
**파일:** `src/context/QuestionContext.tsx`  
**localStorage 키:** `another-star-questions`

```typescript
type Question = {
  id: string;
  title: string;
  text: string;
  sentTo: Category[];   // 이 질문이 전달된 별 목록 (항상 2개)
  isInitial?: boolean;  // true = 기본 예시 질문 (삭제 불가)
}
```

| 제공 값 | 설명 |
|---|---|
| `questions` | 전체 질문 배열 |
| `addQuestion(q)` | 새 질문 추가 (UUID 자동 생성) |
| `removeQuestion(id)` | 질문 삭제 (isInitial인 경우 삭제 불가) |

**초기 데이터:** 앱 최초 실행 시 예시 질문 3개가 기본으로 로드됩니다.

---

### AnswerContext
**파일:** `src/context/AnswerContext.tsx`  
**localStorage 키:** `another-star-answers`

```typescript
type Answer = {
  id: string;
  questionId: string;   // 어느 질문에 대한 답변인지
  text: string;
  createdAt: string;    // ISO 형식 날짜
  category: Category;   // 어느 별 페이지에서 작성했는지
}
```

| 제공 값 | 설명 |
|---|---|
| `getAnswers(questionId)` | 특정 질문의 답변 배열 반환 |
| `addAnswer(questionId, text, category)` | 새 답변 추가 |
| `removeAnswer(questionId, answerId)` | 특정 답변 삭제 |

> **마이그레이션 로직:** 과거 버전에서 질문 데이터 안에 답변이 내장된 경우, `loadInitial()`이 자동으로 추출·변환합니다.

---

## 10. 데이터 파일

### `categories.json`
별 카테고리 이름을 상수로 관리합니다. 컴포넌트에서 직접 문자열을 쓰지 않고 이 파일을 import해 타입 안전성을 확보합니다.

```json
{
  "home": "별에 대해",
  "emotion": "감정의 별",
  "reason": "이성의 별",
  "imagination": "상상의 별"
}
```

### `starDescriptions.json`
StarExplain 페이지의 별 소개 카드 데이터입니다.

```json
[
  { "id": "emotion",     "emoji": "❤️", "name": "감정의 별",  "description": "..." },
  { "id": "reason",      "emoji": "🔵", "name": "이성의 별",  "description": "..." },
  { "id": "imagination", "emoji": "✨", "name": "상상의 별",  "description": "..." }
]
```

---

## 11. 데이터 흐름 요약

```
[사용자가 질문 작성]
        │
        ▼
    Ask.tsx
    ─ 별 선택 + 무작위 별 1개 추가
    ─ addQuestion() 호출
        │
        ▼
QuestionContext (localStorage에 저장)
        │
        ├──▶ EmotionStar  : sentTo에 "감정의 별" 포함된 것 필터링
        ├──▶ ReasonStar   : sentTo에 "이성의 별" 포함된 것 필터링
        └──▶ ImaginationStar : sentTo에 "상상의 별" 포함된 것 필터링
                │
                ▼
         QuestionList.tsx
         ─ 질문 카드 목록 렌더링
         ─ 삭제 버튼 (초기 질문 제외)
                │
                ▼
         AnswerSection.tsx
         ─ 해당 질문 + 현재 별 카테고리로 답변 필터링 표시
         ─ 초기 질문에만 답변 작성 가능
         ─ addAnswer() / removeAnswer() 호출
                │
                ▼
         AnswerContext (localStorage에 저장)
```

---

## 12. 컴포넌트 관계도

```
App
├─ QuestionProvider
│   └─ AnswerProvider
│       └─ RouterProvider
│           └─ Layout
│               ├─ Header         (nav 링크: /stars, /emotion, /reason, /imagination)
│               ├─ [Outlet]
│               │   ├─ Home             (/)
│               │   │   └─ Ask
│               │   ├─ StarExplain      (/stars)
│               │   │   └─ StarCard × 3
│               │   ├─ EmotionStar      (/emotion)
│               │   │   └─ QuestionList
│               │   │       └─ AnswerSection × N
│               │   ├─ ReasonStar       (/reason)
│               │   │   └─ QuestionList
│               │   │       └─ AnswerSection × N
│               │   └─ ImaginationStar  (/imagination)
│               │       └─ QuestionList
│               │           └─ AnswerSection × N
│               └─ Footer
```
