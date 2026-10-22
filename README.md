# Personal homepage

https://hyeonsu-lee-93.github.io/

[Astro](https://astro.build)로 만든 개인 홈페이지입니다. Home, Research, CV 세 페이지로 되어 있고,
`main` 브랜치에 변경이 올라가면 GitHub Actions가 자동으로 빌드해서 GitHub Pages에 배포합니다.

## 글 고치기 → [`content/`](content) 폴더

**홈페이지에 보이는 글은 모두 [`content/`](content) 폴더에 있습니다.** 자세한 안내는 [content/README.md](content/README.md)를 보세요.

| 고칠 내용 | 파일 |
| --- | --- |
| 이름, 직함, 소속, 이메일, 링크, 관심 분야, 기술, 메뉴·섹션 제목, 버튼 문구, 애널리틱스 ID | [content/site.yaml](content/site.yaml) |
| 홈 자기소개 문단 | [content/home.md](content/home.md) |
| Recent News (파일 하나 = 소식 하나) | [content/news/](content/news) |
| Research 맨 위 소개 문장 | [content/research.md](content/research.md) |
| Research 주제별 글, 대표 논문, 그림 | [content/research/](content/research) |
| 논문·학회·특허 / 학력 / 경력 / 수상 | [content/cv/](content/cv) |

## 사진·그림·PDF → [`public/`](public) 폴더

| 바꿀 파일 | 위치 |
| --- | --- |
| 홈 사진 | `public/avatar.jpg` 덮어쓰기 |
| CV PDF (Download PDF 버튼) | `public/cv.pdf` 덮어쓰기 |
| Research 그림 | `public/research/`에 올리고, 주제 파일에 `image: /research/파일명.png` |

## 고치는 방법

- **GitHub 웹에서**: 파일을 열고 연필 아이콘 → 수정 → **Commit changes**. 1~2분 뒤 사이트에 반영됩니다.
- **여러 파일을 한 번에**: 저장소 페이지에서 키보드 `.`을 누르면 브라우저 안에서 편집기가 열립니다.
- **내 컴퓨터에서**: 아래처럼 미리 본 뒤 commit, push 합니다.

```bash
npm install
npm run dev
```

형식이 틀려 빌드가 실패하면 **Actions** 탭에 빨간 X가 뜨고, 사이트는 직전 버전이 그대로 유지됩니다.

## 디자인 (보통은 건드릴 필요 없음)

| 바꿀 것 | 위치 |
| --- | --- |
| 색, 글꼴, 여백, 본문 폭 | `src/styles/global.css` |
| 페이지 구조 | `src/pages/` (`index.astro`, `research.astro`, `cv.astro`) |

## 개인 도메인 연결 (예: hyeonsulee.io)

도메인을 산 뒤에만 진행합니다. 먼저 하면 github.io 주소까지 접속이 안 됩니다.

1. 도메인 업체의 DNS 설정에 다음 레코드를 추가합니다.
   - `A` 레코드 4개, 이름 `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` 레코드, 이름 `www`: `hyeonsu-lee-93.github.io`
2. 저장소 Settings → Pages → Custom domain에 도메인을 입력하고, 확인이 끝나면 Enforce HTTPS를 켭니다.
3. `public/CNAME` 파일을 만들고 도메인 한 줄을 넣습니다.
4. `astro.config.mjs`의 `site`를 새 주소로 바꿉니다.

## 이전 사이트

예전 Hugo Blox 사이트는 `hugo-backup` 브랜치에 그대로 있습니다.
