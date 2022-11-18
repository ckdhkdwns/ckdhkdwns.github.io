---
title: "Ubuntu에서 Java 설치"
date: 2022-09-07
tags: 
    - ubuntu
    - java
--- 
Spring 공부 도중 VScode extension 호환성 문제로 Java 17을 설치해야 했다. 
- OS: Ubuntu 18.04  
- Installed Java version: 11

![error-extension](https://user-images.githubusercontent.com/66898263/189289285-640086de-65c5-4c9a-ada6-3f2599c9bf94.png){: .center}

## 1. 기존에 있던 Java 제거
설치되어 있는 모든 openjdk를 삭제한다.
```bash
sudo apt-get remove openjdk*
```
## 2. Ubuntu 내의 패키지들 최신화
```bash
sudo apt-get update
sudo apt-get upgrade
```
## 3. OpenJDK 17 설치
- (Ubuntu 20.04는 기본적으로 Java17이 내포되어 있다.)

```bash
sudo apt install openjdk-17-jdk
```
이후 버전 확인 
```bash
java -version

# Expected result
openjdk version "17.0.4" 2022-07-19
OpenJDK Runtime Environment (build 17.0.4+8-Ubuntu-118.04)
OpenJDK 64-Bit Server VM (build 17.0.4+8-Ubuntu-118.04, mixed mode, sharing)
```