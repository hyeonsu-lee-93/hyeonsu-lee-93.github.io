# 홈페이지 글 모음

홈페이지에 보이는 글은 모두 이 폴더에 있습니다. 파일을 고치고 Commit하면 1~2분 뒤 사이트에 반영됩니다.

| 고칠 내용 | 파일 |
| --- | --- |
| 이름, 직함, 소속, 이메일, 링크, 관심 분야, 기술, 메뉴·섹션 제목, 버튼 문구 | [site.yaml](site.yaml) |
| 홈 자기소개 문단 | [home.md](home.md) |
| Recent News (파일 하나 = 소식 하나) | [news/](news) |
| Research 맨 위 소개 문장 | [research.md](research.md) |
| Research 주제별 제목, 설명, 대표 논문, 그림 | [research/](research) |
| 논문, 프리프린트, 학회 발표, 특허 | [cv/publications.yaml](cv/publications.yaml) |
| 학력 / 경력 / 수상 | [cv/education.yaml](cv/education.yaml), [cv/experience.yaml](cv/experience.yaml), [cv/awards.yaml](cv/awards.yaml) |

사진, 그림, CV PDF 같은 파일은 이 폴더가 아니라 [public/](../public) 폴더에 있습니다.

## 쓰는 법

- **`.md` 파일**: 일반 글처럼 쓰면 됩니다. `**굵게**`, `*기울임*`, `[링크 글자](https://주소)`를 쓸 수 있습니다. 맨 위 `---` 사이 부분(제목, 날짜 등)은 형식을 유지하세요.
- **`.yaml` 파일**: 콜론(:) 오른쪽만 고치세요. 앞쪽 들여쓰기 칸 수는 바꾸지 마세요. 문구에 콜론이 들어가거나 `*`로 시작하면 큰따옴표로 감싸세요.

## 소식 추가 예시

`news` 폴더에서 **Add file → Create new file**을 누르고, 파일 이름을 `2026-11-01-new-paper.md`처럼 날짜로 시작하게 만듭니다.

```md
---
title: "Paper on XXX published in *Nature Neuroscience*"
date: 2026-11-01
---

본문은 선택입니다. 쓰면 제목 옆에 +가 생기고, 누르면 펼쳐집니다.
```

## 논문 추가 예시

`cv/publications.yaml`의 알맞은 위치에 붙여 넣습니다. 맨 위 설명에 각 항목의 뜻이 있습니다.

```yaml
- id: lee2026natneuro
  type: journal
  title: Paper title
  authors: Lee H*, Kim A* & Paik SB
  venue: Nature Neuroscience
  year: 2026
  doi: 10.1038/xxxx
```

Research 페이지 주제에 대표 논문으로 넣으려면, `research/` 폴더의 주제 파일에서 `papers:` 목록에 이 `id`를 추가하세요.

## 문제가 생기면

형식이 틀리면 저장소 **Actions** 탭에 빨간 X가 뜨고, 사이트는 직전 버전이 그대로 유지됩니다. 빨간 X를 누르면 어느 파일 몇 번째 줄이 문제인지 나옵니다. 고쳐서 다시 Commit하면 됩니다.
