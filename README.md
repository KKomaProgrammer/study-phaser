# Phaser Step Lab

Phaser를 단계별로 배우고 Monaco Editor에서 직접 코드를 실행해보는 HTML/CSS/JS 강좌 사이트입니다.

## 기능

- 기본값 라이트 모드, 다크 모드 전환 및 localStorage 저장
- 사이트 테마에 맞춘 Monaco Editor `vs` / `vs-dark` 자동 전환
- 단계별 Phaser 강좌, 검색, 현재 진행도 표시 및 저장
- 강좌별 예제 코드 로드, 수정 코드 저장, 예제 복원
- Phaser 브라우저 미리보기 iframe 실행
- 브라우저 미리보기 전체화면 모달 및 부드러운 애니메이션
- 모바일 세로 화면에서도 강좌, 에디터, 미리보기를 카드형으로 편하게 사용
- Cloudflare Pages Functions `/api/run`으로 MyCompiler Node.js 실행 프록시

## 실행 방식

### Phaser 미리보기

Phaser 예제는 브라우저 iframe에서 실행됩니다. `require`, `fs`, `stdin` 같은 Node.js 전용 문법이 들어간 코드는 브라우저 미리보기에서 실행하지 않고 안내 화면을 보여줍니다.

### Node.js 실행

Node.js 예제는 `/api/run`으로 다음 JSON을 보냅니다.

```json
{
  "code": "console.log('hello')",
  "stdin": "",
  "files": {}
}
```

`functions/api/run.js`는 이를 `https://www.mycompiler.io/exec/run/nodejs`로 전달하고, 아래 형태를 반환합니다.

```json
{
  "payload": "실행 결과\n",
  "files": []
}
```

프론트 코드에서는 요청 객체를 다음처럼 여러 줄로 구성해 가독성을 유지합니다.

```js
const requestBody = {
  code,
  stdin: stdinValue,
  files: {}
};
```

## Cloudflare Pages 배포

- Framework preset: None
- Build command: 비워도 됨
- Output directory: `/` 또는 프로젝트 루트
- GitHub 연동 배포 권장

Cloudflare Pages Functions는 프로젝트 루트의 `/functions` 폴더에 두면 파일 경로 기반으로 라우팅됩니다. 이 프로젝트의 API는 `/api/run`입니다.

## 로컬 테스트

```bash
npx wrangler pages dev .
```

정적 화면만 보려면 일반 정적 서버로도 열 수 있습니다. 단, 일반 정적 서버나 `file://`에서는 `/api/run` 백엔드가 없으므로 Node.js 실행 기능은 동작하지 않습니다.
