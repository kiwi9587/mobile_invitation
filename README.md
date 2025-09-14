# 모바일 청첩장 프로젝트

React와 Express로 구현한 모바일 청첩장 웹 애플리케이션입니다.

## 기술 스택

### 프론트엔드
- React 18
- React Router DOM
- Webpack 5 + Babel
- CSS Variables (테마/스타일링)

### 백엔드
- Node.js + Express
- MongoDB (Mongoose) - 선택사항: in-memory fallback 지원
- CORS enabled

## 시작하기

### 프론트엔드 실행
```bash
cd frontend
npm install
npm start    # http://localhost:3000 에서 실행됨
```

### 백엔드 실행
```bash
cd backend
npm install
npm run dev  # http://localhost:4000 에서 실행됨
```

## 프로젝트 구조

### 프론트엔드 (`/frontend`)
```
frontend/
├── public/
│   └── index.html        # 앱 진입점
├── src/
│   ├── pages/
│   │   ├── Home.jsx     # 메인 페이지 (청첩장 정보)
│   │   ├── Gallery.jsx  # 갤러리 그리드 뷰
│   │   └── Guestbook.jsx # 방명록 폼 + 목록
│   ├── App.jsx          # 라우터 + 네비게이션
│   ├── index.js         # 앱 마운트 + ErrorBoundary
│   └── styles.css       # 글로벌 스타일
└── webpack.config.js    # 빌드 & 개발 서버 설정
```

### 백엔드 (`/backend`)
```
backend/
├── src/
│   ├── models/          # Mongoose 스키마
│   │   ├── Invitation.js  # 청첩장 정보
│   │   ├── Gallery.js     # 갤러리 항목
│   │   ├── Guestbook.js   # 방명록 항목
│   │   └── Account.js     # 계좌 정보
│   ├── routes/          # API 엔드포인트
│   │   ├── invitation.js  # GET /api/wedding-info
│   │   ├── gallery.js     # GET/POST /api/gallery
│   │   ├── guestbook.js   # GET/POST /api/guestbook
│   │   └── seed.js        # POST /api/seed (개발용)
│   └── app.js          # Express 설정
└── index.js            # 서버 시작점
```

## 주요 기능

### 1. 프론트엔드
- **라우팅**: /, /gallery, /guestbook
- **반응형 레이아웃**: 모바일 우선 디자인
- **컴포넌트**:
  - 홈: 히어로 섹션 + 신랑/신부 카드
  - 갤러리: 반응형 이미지 그리드
  - 방명록: 입력 폼(검증) + 메시지 목록
- **사용자 경험**:
  - 로딩/에러 상태 표시
  - 폼 검증 (이름 1~30자, 메시지 1~500자)
  - API 타임아웃 처리 (5초)
  - ARIA 속성 지원

### 2. 백엔드
- **API 엔드포인트**:
  - `GET /api/wedding-info`: 청첩장 정보
  - `GET/POST /api/gallery`: 갤러리 조회/추가
  - `GET/POST /api/guestbook`: 방명록 조회/작성
  - `POST /api/seed`: 개발용 데이터 시드
- **개발 편의성**:
  - MongoDB 없이도 in-memory로 동작
  - CORS 설정으로 로컬 개발 지원

## 스타일 가이드

### CSS 변수 (테마)
```css
:root {
  --bg: #fffdf8;        /* 배경색 */
  --card: #ffffff;      /* 카드 배경 */
  --muted: #6b7280;     /* 부가 텍스트 */
  --primary: #d946ef;   /* 주 강조색 */
  --accent: #f97316;    /* 보조 강조색 */
  --border: #e6e6e6;    /* 테두리 */
  --max-width: 900px;   /* 최대 너비 */
}
```

### 컴포넌트 클래스
- `.container`: 최대 너비 + 중앙 정렬
- `.card`: 흰색 배경 + 그림자 + 둥근 모서리
- `.grid`: 반응형 그리드 레이아웃
- `.btn`: 기본 버튼 스타일
- `.small`: 작은 텍스트 (부가 정보)

## 개발 참고사항

### 1. 포트 사용
- 프론트엔드: 기본 3000번 포트 (webpack-dev-server)
- 백엔드: 기본 4000번 포트 (Express)

### 2. MongoDB 관련
- 개발 시 MongoDB 없이도 실행 가능 (in-memory fallback)
- 실제 DB 연결 시:
  1. MongoDB 실행
  2. `POST /api/seed`로 초기 데이터 생성

### 3. 에러 해결
- **EADDRINUSE**: 포트 충돌 시
  ```bash
  # Windows
  netstat -ano | findstr :[포트번호]
  taskkill /PID [프로세스ID] /F
  ```
- **Failed to fetch**: 백엔드 미실행 또는 CORS 이슈
  - 백엳드 실행 상태 확인
  - Network 탭에서 요청/응답 확인

## 향후 계획

### 1. 기능 개선
- [ ] 갤러리 라이트박스 추가
- [ ] 방명록 토스트 메시지
- [ ] 입력 길이 카운터

### 2. 개발 편의성
- [ ] 백엔드 자동 시작 스크립트
- [ ] 테스트 코드 추가
- [ ] API 문서화

### 3. 배포/운영
- [ ] MongoDB 연결 설정
- [ ] 이미지 업로드
- [ ] 프로덕션 빌드/배포

## 라이선스
MIT