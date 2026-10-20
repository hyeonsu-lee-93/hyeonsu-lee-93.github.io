# Personal homepage

[Astro](https://astro.build)로 만든 개인 홈페이지. Home, Research, CV 세 페이지로 구성되어 있고,
GitHub Pages로 배포된다.

## 자주 하는 일

| 하고 싶은 일 | 고칠 곳 |
| --- | --- |
| 소식(News) 추가 | `src/content/news/YYYY-MM-DD-slug.md` 파일 하나 추가 |
| 논문·학회·특허 추가 | `src/data/publications.yaml`에 항목 추가 |
| Research 주제 수정 | `src/content/research/*.md` (frontmatter의 `papers`에 논문 id를 넣으면 대표 논문으로 표시) |
| Research 그림 | 그림을 `public/research/`에 넣고, 주제 파일 frontmatter에 `image: /research/파일명.png`, `caption: "설명"` 추가 |
| 기술(Skills) | `src/data/profile.yaml`의 `skills` (한 줄이 CV의 한 줄) |
| 학력·경력·수상 수정 | `src/data/education.yaml`, `experience.yaml`, `awards.yaml` (학력·경력은 파일에 적은 순서대로, 논문·학회·수상은 최신 연도부터 CV에 표시) |
| 이름·소속·이메일·링크 | `src/data/profile.yaml` |
| 자기소개 문단 | `src/pages/index.astro` |
| CV PDF 교체 | `public/cv.pdf` 덮어쓰기 |
| 사진 교체 | `public/avatar.jpg` 덮어쓰기 |
| 색·글꼴·여백 | `src/styles/global.css` |
| 구글 애널리틱스 ID | `src/layouts/Base.astro`의 `GA_ID` (실제 사이트에서만 동작) |

### News 파일 예시

```md
---
title: "Paper on XXX published in *Nature Neuroscience*"
date: 2026-01-15
---

본문 (선택). 있으면 제목 옆에 +가 생기고, 누르면 펼쳐진다.
```

### 논문 항목 예시

```yaml
- id: lee2026natneuro        # research/*.md 에서 참조할 때 쓰는 고유 id
  type: journal              # journal | preprint | conference | patent
  title: Paper title
  authors: Lee H*, Kim A* & Paik SB   # "Lee H"는 자동으로 굵게 표시
  venue: Nature Neuroscience
  year: 2026
  doi: 10.1038/xxxx
  code: https://github.com/...        # 선택
```

학회는 `scope: international | domestic`, `note: (Oral)` 같은 항목을 추가로 쓸 수 있다.
`selected: true`를 넣으면 CV의 Selected Conference Presentations에 따로 나오고, International/Domestic 목록에서는 빠진다.

CV 페이지는 브라우저에서 인쇄(⌘P)하면 메뉴와 버튼이 빠진 깔끔한 문서로 나온다. `public/cv.pdf`를 새로 만들 때 쓰면 된다.

## 로컬에서 보기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:4321 을 연다.

## 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드해서 GitHub Pages에 올린다.
저장소 Settings → Pages → Source를 **GitHub Actions**로 한 번만 설정해 두면 된다.

## 개인 도메인 연결 (예: hyeonsulee.io)

도메인을 산 뒤에만 아래를 진행한다. 먼저 하면 github.io 주소까지 접속이 안 된다.

1. 도메인 등록 업체의 DNS 설정에서 다음 레코드를 추가한다.
   - `A` 레코드 4개, 이름 `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` 레코드, 이름 `www`: `hyeonsu-lee-93.github.io`
2. 저장소 Settings → Pages → Custom domain에 `hyeonsulee.io`를 입력하고, 확인이 끝나면 Enforce HTTPS를 켠다.
3. `public/CNAME` 파일을 만들고 내용으로 `hyeonsulee.io` 한 줄을 넣는다.
4. `astro.config.mjs`의 `site`를 `https://hyeonsulee.io`로 바꾼다.

기존 `hyeonsu-lee-93.github.io` 주소로 들어오면 새 도메인으로 자동으로 넘어간다.
