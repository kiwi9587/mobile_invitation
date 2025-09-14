---
mode: agent
---

# API 명세 상세

이 문서는 모바일 청첩장 프로젝트의 주요 API 엔드포인트와 데이터 구조, 예외 처리 등을 상세히 설명합니다.

## 1. 결혼식 정보
### GET /api/wedding-info
- 설명: 결혼식 기본 정보 조회
- 응답 예시:
```json
{
	"groom": { "name": "홍길동", "profileImg": "url", "intro": "..." },
	"bride": { "name": "김영희", "profileImg": "url", "intro": "..." },
	"wedding": {
		"date": "2025-10-10T14:00:00",
		"venue": "서울웨딩홀",
		"address": "서울시 ...",
		"mapUrl": "..."
	}
}
```

## 2. 갤러리
### GET /api/gallery
- 설명: 이미지 목록 조회
- 응답 예시:
```json
[
	{ "imgUrl": "...", "desc": "...", "uploadedAt": "2025-09-01T12:00:00" }
]
```

## 3. 방명록
### GET /api/guestbook
- 설명: 방명록 목록 조회
- 응답 예시:
```json
[
	{ "name": "이순신", "message": "축하해요!", "createdAt": "2025-09-10T10:00:00" }
]
```

### POST /api/guestbook
- 설명: 방명록 작성
- 요청 예시:
```json
{ "name": "이순신", "message": "축하해요!" }
```
- 응답 예시:
```json
{ "success": true, "id": "123" }
```

## 4. 계좌 정보
### GET /api/account-info
- 설명: 축의금 계좌 정보 조회
- 응답 예시:
```json
[
	{ "owner": "신랑", "bank": "국민", "number": "123-456-7890" },
	{ "owner": "신부", "bank": "신한", "number": "987-654-3210" }
]
```

## 5. 공통 사항
- 모든 API는 JSON 반환
- 인증 필요 시 JWT 토큰 사용(관리자 기능 등)
- 에러 응답 예시:
```json
{ "success": false, "error": "권한 없음" }
```

## 6. 실제 사용 예시 (curl)
```bash
curl https://yourdomain.com/api/wedding-info
curl -X POST -H "Content-Type: application/json" -d '{"name":"홍길동","message":"축하합니다!"}' https://yourdomain.com/api/guestbook
```
