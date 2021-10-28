# 크롬 메모장 (Chrome Notepad)

<img src="https://github.com/ImInnocent/chrome-memo-client/blob/master/store/screenshot.png" width="640" /> 

https://chrome.google.com/webstore/detail/chrome-notepad/apijbpbcechjobmeafogbmlbaofmehed?hl=ko

## 크롬 메모장 (Chrome notepad)란 무엇인가요?
크롬 확장 프로그램을 통해 언제 어디서든 빠르게 메모할 수 있는 서비스입니다.

#### 크롬 메모장의 장점은 무엇인가요?
크롬 확장 프로그램을 이용해서 언제나 빠르게 창을 열 수 있고,<br />
구글에서 사용하는 Material 디자인으로 구성되어 깔끔합니다.

#### 어떻게 빠르게 메모할 수 있나요?
크롬 우측 상단의 퍼즐모양 이미지를 선택하신 후, 크롬 메모장 옆의 핀을 눌러주세요.<br/>
크롬 메모장이 고정되면, 아이콘을 클릭하여 미니 메모 팝업이 나옵니다.

<img src="https://lh3.googleusercontent.com/GYv_FywBaUW9jfF05FvQodcmr6RS5eMfY3pJugXYXkEIxwSgSQ9bHbjR04-jxYrGxBuIkATtlzZ5A9C2wMRZ9HOW=w640-h400-e365-rj-sc0x00ffffff" width="640" /> 

# 패치노트

### 자세한 내용은 페이지의 '공지사항' 탭을 참고해주세요.
chrome-extension://apijbpbcechjobmeafogbmlbaofmehed/index.html

__v1.2.0__
- 설정 창이 추가되었습니다.
- 연결된 계정끼리 메모가 공유됩니다.
- 언어를 설정할 수 있습니다. (브라우저 언어로 기본 설정됩니다)

__v1.1.0__
- 상단바가 추가되었습니다.
- 상단 좌측에 메뉴창이 생겼습니다.
- 공지사항을 확인할 수 있습니다.

__v1.0.1__
- 메모가 삭제되지 않는 버그가 수정되었습니다.

__v1.0.0__
- 메모를 추가, 수정, 삭제할 수 있습니다.
- 팝업창을 사용할 수 있습니다.
- 새 창을 열었을 때 크롬 메모장으로 연결됩니다.


# 기술 관련

### Github Link
https://github.com/ImInnocent/chrome-memo-client

### 주요 패키지들
__React__: 17.0.2 이상<br/>
__@material-ui/core__: 4.12.3 이상<br/>
__lodash__: 4.17.21 이상<br/>
__typescript__: 4.1.2 이상

### 기술 스택
__클라이언트 프레임워크__: React (Typescript)<br/>
__클라이언트 UI__: HTML + CSS + MaterialUI (Material-UI v4)<br/>
__빌드__: Webpack + Customize-cra<br/>
__배포__: Chrome Extension

### 프로젝트 빌드 방법
```
# 프로젝트 클론
git clone https://github.com/ImInnocent/chrome-memo-client

cd chrome-memo-client

# 패키지 설치
npm install

# 빌드 (/build 폴더에 생성)
yarn build

# 빌드 + 실행 (/dist 폴더에 생성)
yarn start
```

### Trouble Shooting
copy-webpack-plugin이 7.0.0버전 이상부터 getCache함수를 지원하지 않기 때문에, 이전버전인 6.3.2버전을 설치해야 한다.<br/>
