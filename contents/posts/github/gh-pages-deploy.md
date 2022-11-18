---
title: gh-pages로 React 배포하기
date: 2022-09-09
tags: 
    - react
    - github
    - gh-pages
---


### gh-pages 설치
```bash
npm install gh-pages --save-dev
```
### 홈페이지 주소 추가
`pakage.json`에 추가한다.
```json
"homepage": "http://{사용자 이름}.github.io/{프로젝트 이름}"

"homepage": "http://ckdhkdwns.github.io/typingPractice"
```
### deploy 명령어 추가
`pakage.json`에 추가한다.
```json
"scripts": {
  "deploy": "gh-pages -d build"
}
```
### 배포하기
먼저 React 프로젝트가 빌드되어 있어야 gh-pages로 빌드 가능하다.
```bash
npm run-script build
npm run deploy
```

### 확인하기
프로젝트 저장소의 `gh-pages` 브랜치에서 초록색 체크가 뜨면 배포가 완료된 것이다.

![gp](https://user-images.githubusercontent.com/66898263/189485906-7e2666d5-7ae4-48f7-8ecf-44f761b7fd80.png)
