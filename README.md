# CoCoLab Bootstrap Homepage

GitHub Pages에 바로 올릴 수 있는 **Bootstrap 5 기반 정적 홈페이지**입니다. 별도의 빌드 도구나 패키지 설치가 필요하지 않으며, 대부분의 내용은 `data/` 폴더만 수정하면 관리할 수 있습니다.

## 핵심 구성

- Bootstrap 5.3.6을 프로젝트 안에 포함하여 CDN 없이 동작
- 반응형 상단 내비게이션과 모바일 메뉴
- 첫 화면에 `Latest News` 표시
- Publication 검색 및 태그 필터
- Publication 태그는 아래 5개만 사용
  - `AI`
  - `Architecture`
  - `System`
  - `Accelerator`
  - `Memory system`
- `Top-tier` 태그 없음
- Undergraduate Research Intern은 사진 없이 간단한 카드로 표시
- GitHub Pages에서 별도 빌드 없이 배포 가능

## 폴더 구조

```text
cocolab-homepage/
├── index.html
├── people.html
├── research.html
├── publications.html
├── news.html
├── teaching.html
├── photos.html
├── data/
│   ├── config.js          # 사이트 이름, 색상, 메뉴
│   ├── home.js            # 첫 화면 소개 문구, 홈 뉴스 개수
│   ├── people.js          # PI, 대학원생, 학부연구생, Alumni
│   ├── research.js        # 연구 분야와 최근 주제
│   ├── publications.js    # 논문 목록
│   ├── news.js            # 뉴스 목록
│   ├── teaching.js        # 강의 목록
│   └── photos.js          # 사진 갤러리
└── assets/
    ├── css/styles.css     # Bootstrap 위에 적용되는 CoCoLab 테마
    ├── js/app.js          # 페이지 렌더링, 검색 및 필터 기능
    ├── images/            # 로고, 구성원 사진, 연구 그림, 갤러리 사진
    └── vendor/bootstrap/  # 로컬 Bootstrap CSS/JS
```

## 가장 자주 수정할 파일

### 1. 홈 화면 뉴스 개수

`data/home.js`에서 다음 값만 바꾸면 됩니다.

```js
latestNewsLimit: 6,
```

### 2. 뉴스 추가

`data/news.js` 배열의 위쪽에 새 항목을 추가합니다. 날짜는 `YYYY-MM-DD` 형식을 사용합니다.

```js
{
  date: "2026-08-01",
  html: "New research news goes here."
},
```

뉴스는 날짜 기준으로 자동 정렬됩니다.

### 3. 구성원 추가

`data/people.js`를 수정합니다.

PI와 대학원생은 `image` 경로를 사용할 수 있습니다.

```js
{
  name: "Student Name",
  degree: "M.S.",
  email: "student@unist.ac.kr",
  image: "assets/images/people/student-name.jpg",
  imageAlt: "Portrait of Student Name",
  bio: ["AI systems", "Computer architecture"],
  links: [
    { label: "Homepage", url: "https://example.com" },
    { label: "GitHub", url: "https://github.com/example" }
  ]
},
```

학부연구생은 사진 없이 아래처럼 간단히 관리합니다. `image` 필드는 넣지 않아도 됩니다.

```js
{
  name: "Intern Name",
  affiliation: "UNIST CSE",
  term: "Undergraduate Research Intern",
  interests: ["AI", "Architecture"]
},
```

### 4. 논문 추가

`data/publications.js` 배열에 항목을 추가합니다.

```js
{
  id: "C9",
  venueShort: "MICRO",
  status: "published",
  year: 2027,
  title: "Paper Title",
  authors: "First Author, <span class=\"lab-author\">Ranggi Hwang</span>, and Coauthor",
  venue: "<strong>Conference or Journal Name</strong>, 2027",
  tags: ["AI", "Architecture"],
  details: ["<strong>Optional note</strong>"],
  links: [
    { label: "PDF", url: "https://example.com/paper.pdf" },
    { label: "Code", url: "https://github.com/example/repository" }
  ]
},
```

`tags`에는 반드시 다음 값만 사용합니다.

```text
AI
Architecture
System
Accelerator
Memory system
```

`status`는 `preprint` 또는 `published`를 사용합니다. 링크의 `url`을 빈 문자열로 두면 해당 버튼은 표시되지 않습니다.

`authors`, `venue`, `details`는 HTML로 렌더링됩니다. 이름 강조, 굵게 표시, 줄바꿈 같은 마크업을 직접 넣을 수 있습니다.

### 5. 강의 및 TA 항목 추가

`data/teaching.js`에서 `sections` 아래에 `Courses`, `Teaching Assistant (TA)` 같은 큰 분류를 두고, 각 분류 안의 `institutions` 배열에 학교별 항목을 추가합니다.

```js
{
  title: "Courses",
  institutions: [
    {
      institution: "UNIST",
      items: [
        {
          code: "CSE511",
          title: "Advanced Computer Architecture",
          term: "Spring 2026",
          note: ""
        }
      ]
    },
    {
      institution: "DGIST",
      items: [
        {
          code: "CSE000",
          title: "Course Title",
          term: "Fall 2026",
          note: ""
        }
      ]
    }
  ]
}
```

### 6. 사진 교체

새 이미지를 `assets/images/` 아래에 넣고 해당 데이터 파일의 경로를 수정합니다. 파일명은 공백보다 하이픈을 권장합니다.

`data/photos.js`에서 `date`, `title`, `caption`을 작성하고, `images` 배열에 사진 경로를 넣습니다. `images[0]`이 Photos 페이지에 보이는 대표 사진이고, 나머지는 대표 사진을 클릭했을 때 열리는 사진 모음 modal에 표시됩니다.

```js
{
  title: "Group Meeting",
  caption: "Lab group meeting photos.",
  date: "2026",
  images: [
    {
      src: "assets/images/photos/2026-group-cover.jpg",
      alt: "Group meeting cover photo"
    },
    {
      src: "assets/images/photos/2026-group-01.jpg",
      alt: "Group meeting photo"
    }
  ]
}
```

```text
assets/images/people/student-name.jpg
assets/images/research/topic-name.png
assets/images/photos/2026-group-photo.jpg
```

## 로컬에서 확인하기

프로젝트 폴더에서 다음 명령을 실행합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 열면 됩니다. 단순히 `index.html`을 더블클릭해도 대부분 동작하지만, 로컬 서버 방식이 배포 환경과 더 유사합니다.

## GitHub Pages 배포

1. GitHub에 새 repository를 만듭니다.
2. 이 폴더 안의 파일과 폴더를 repository 최상위에 업로드합니다.
3. GitHub repository의 **Settings → Pages**로 이동합니다.
4. **Build and deployment**에서 `Deploy from a branch`를 선택합니다.
5. Branch는 `main`, 폴더는 `/(root)`를 선택하고 저장합니다.
6. 배포가 완료되면 Pages 주소가 표시됩니다.

`.nojekyll` 파일은 삭제하지 않는 것이 좋습니다. GitHub Pages가 이 프로젝트를 그대로 정적 파일로 배포하도록 해 줍니다.

## 디자인 수정

Bootstrap 컴포넌트와 유틸리티 클래스를 기본으로 사용합니다. 색상과 세부 스타일은 `assets/css/styles.css`에서 조정할 수 있습니다.

대표 색상은 다음 CSS 변수로 연결되어 있습니다.

```css
--coco-primary: #FFC000;
--coco-accent: #82CAFF;
--coco-lime: #D0FF7E;
```

사이트 전역 색상은 `data/config.js`의 `colors`에서도 바꿀 수 있습니다.
