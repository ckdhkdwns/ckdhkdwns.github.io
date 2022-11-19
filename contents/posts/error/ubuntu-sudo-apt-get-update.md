---
title: Ubuntu sudo apt-get update 다음 서명들은 공개키가 없기 때문에 인증할 수 없습니다
date: 2022-10-14
tags:
  - ubuntu
  - error
---

## 문제 상황
`sudo apt-get update`를 실행했을 때 아래의 오류와 함께 업데이트가 되지 않았다.
```bash
W: An error occurred during the signature verification. The repository is not updated and the previous index files will be used. GPG error: https://cli-assets.heroku.com/apt ./ InRelease: 다음 서명들은 공개키가 없기 때문에 인증할 수 없습니다: NO_PUBKEY 536F8F1DE80F6A35
W: An error occurred during the signature verification. The repository is not updated and the previous index files will be used. GPG error: https://cf-cli-debian-repo.s3.amazonaws.com stable InRelease: 다음 서명이 올바르지 않습니다: EXPKEYSIG 172B5989FCD21EF8 CF CLI Team <cf-cli-eng@pivotal.io>
W: http://packages.cloudfoundry.org/debian/dists/stable/InRelease 파일을 받는데 실패했습니다  다음 서명이 올바르지 않습니다: EXPKEYSIG 172B5989FCD21EF8 CF CLI Team <cf-cli-eng@pivotal.io>
W: https://cli-assets.heroku.com/apt/./InRelease 파일을 받는데 실패했습니다  다음 서명들은 공개키가 없기 때문에 인증할 수 없습니다: NO_PUBKEY 536F8F1DE80F6A35
W: Some index files failed to download. They have been ignored, or old ones used instead.
```

## 해결
공개키를 등록한다.
```bash
$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys {공캐 키}adsf
$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 536F8F1DE80F6A35
```

구름 컨테이너에서 위 명령어를 입력해도 다시 업데이트를 시도해도 비슷한 오류 발생 시 키를 다시 받는다.
```bash
$ wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add -
```