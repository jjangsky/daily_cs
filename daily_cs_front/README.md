# CS Challenge Mobile - React 퍼블리싱

매일 CS 문제로 실력을 키우는 학습 플랫폼의 모바일 웹 버전입니다.

## 🚀 주요 기능

- Google/GitHub OAuth 로그인
- 매일 새로운 CS 문제 제공
- AI 기반 답변 피드백
- 학습 통계 및 진도 추적
- 모바일 최적화 UI/UX

## 📱 구현된 화면

1. **로그인 페이지** (`/login`)
   - Google OAuth 로그인
   - GitHub OAuth 로그인
   - 일반 이메일 로그인

2. **대시보드** (`/dashboard`)
   - 사용자 레벨 및 경험치
   - 연속 학습 일수 (Streak)
   - 오늘의 문제 미리보기
   - 학습 통계 차트
   - 최근 획득 배지

3. **문제 페이지** (`/challenge`)
   - 문제 상세 내용
   - 답변 작성 에디터
   - 힌트 보기
   - 남은 시간 표시
   - 관련 개념 태그

4. **OAuth 콜백** (`/auth/callback`)
   - OAuth 인증 처리
   - 자동 리다이렉트

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Backend API**: Spring Boot (준비됨)

## 📦 설치 및 실행

1. **패키지 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정**
   ```bash
   cp .env.example .env
   ```
   `.env` 파일을 열어 필요한 값들을 설정하세요.

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   브라우저에서 `http://localhost:3000` 접속

4. **프로덕션 빌드**
   ```bash
   npm run build
   ```

## 🔐 OAuth 설정

### Google OAuth
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. OAuth 2.0 클라이언트 ID 생성
4. 승인된 리다이렉트 URI: `http://localhost:3000/auth/callback`
5. 클라이언트 ID를 `.env`의 `REACT_APP_GOOGLE_CLIENT_ID`에 설정

### GitHub OAuth
1. GitHub Settings > Developer settings > OAuth Apps
2. New OAuth App 생성
3. Authorization callback URL: `http://localhost:3000/auth/callback`
4. Client ID를 `.env`의 `REACT_APP_GITHUB_CLIENT_ID`에 설정

## 🔗 Spring Backend API 연동

이 프로젝트는 Spring Boot 백엔드와 연동하도록 설계되었습니다.

### 필요한 API 엔드포인트

- `POST /api/auth/login` - 일반 로그인
- `POST /api/auth/oauth/{provider}/callback` - OAuth 콜백
- `GET /api/auth/me` - 현재 사용자 정보
- `GET /api/challenges/today` - 오늘의 문제
- `POST /api/answers` - 답변 제출
- `GET /api/users/stats` - 사용자 통계

### API 응답 형식
```json
{
  "success": true,
  "data": {
    // 실제 데이터
  },
  "error": null
}
```

## 📱 모바일 최적화

- Viewport 메타 태그 설정
- Touch 이벤트 최적화
- 하단 네비게이션 바
- 안전 영역(Safe Area) 처리
- 반응형 레이아웃

## 🎨 디자인 시스템

- **Primary Color**: Blue (#3b82f6)
- **Font**: System UI Font Stack
- **Spacing**: 4px 기반 시스템
- **Border Radius**: 8px (rounded-lg)
- **Shadow**: Subtle shadows for depth

## 📝 추가 개발 예정

- [ ] 피드백 결과 화면
- [ ] 커뮤니티 페이지
- [ ] 프로필 및 설정 페이지
- [ ] Push 알림
- [ ] 오프라인 모드
- [ ] PWA 지원

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request