## 🚀 배포 링크
https://pokemonmap-steel.vercel.app
<br />
<br />

## 🚀 프로젝트 개요
### 프로젝트명 - 우리 동네 포켓몬 찾기
### 내용 - 지역별 존재할 수 있는 포켓몬 찾기 서비스
### 기간 - 2025.05 ~ 2025.06
### 목표 - Next.js 학습 내용 적용
<br />

## 🚀 기술 스택
<div>
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
</div>
<img src="https://img.shields.io/badge/vercel-21B573?style=for-the-badge&logo=vercel&logoColor=white">
<br />

## 🚀 화면
<img src="https://github.com/user-attachments/assets/22d975a6-5a40-4dc0-9250-4465354cf231" width="40%" height="800px" >
<br />

## 🚀 핵심 기술
### 1. 병렬 라우팅
#### - @modal 슬롯 기반 병렬 라우트 구현
#### - 백그라운드 페이지 유지 상태에서 모달 오버레이 동시 렌더링

### 2. 인터셉트 라우팅
#### - (.)info/[id] 패턴 라우트 인터셉트
#### - 동일 페이지 내 모달 기반 포켓몬 상세 정보 표시
#### - URL 변경과 모달 상태 동기화

### 3. 스켈레톤 UI
#### - Suspense fallback 옵션 비동기 렌더링 처리
#### - 포켓몬 리스트 로딩 중 스켈레톤 UI 표시, 사용자 이탈 방지
#### - Shimmer 효과 적용, 생동감 있는 로딩 화면 구현
<br />

## 🚀 성능 최적화
### Next Image 컴포넌트 활용
#### - WebP 포맷 자동 변환을 통한 이미지 용량 최적화
#### - 사진 크기 지정으로 Layout Shift 방지
#### - 레이지 로딩으로 초기 페이지 로딩 속도 향상
<br />

## 🚀 폴더 구조
![image](https://github.com/user-attachments/assets/0a048a9d-7f90-4d8a-b6f9-55c4771ebf6b)
<br />

## 🚀 트러블슈팅
### 페이지 전환 중 포켓몬 상세 페이지 오진입 현상

#### 문제 발생 배경
지역을 선택한 직후 포켓몬 카드를 빠르게 클릭할 경우, 선택한 지역으로 이동하지 않고 포켓몬 상세 페이지로 진입하는 현상

#### 원인
지역 선택 후 페이지 전환 과정이 비동기적으로 처리되어, 전환이 완료되기 전까지 포켓몬 카드가 클릭 가능한 상태로 유지되어 발생

#### 해결방법
지역 선택 시 전체 화면에 투명 오버레이 레이어를 추가하여 페이지 전환 중 클릭 임시 차단
전환 완료 후 오버레이를 제거하여 정상 상태로 전환

#### 결과
페이지 전환이 완료되기 전까지 포켓몬 카드를 클릭할 수 없도록 제한함으로써 잘못된 상세 페이지 진입 방지 및 사용자 경험 개선
<br />

## 🚀 회고
https://velog.io/@jaehooo13/%EC%9A%B0%EB%8F%99%ED%8F%AC%EC%B0%A8-ypbmi1kz
<br />

## 🚀 참고자료
https://pokeapi.co/
<br />
