---
title: VScode에 Spring 개발환경 구축하기
date: 2022-09-10
tags: 
    - vscode 
    - spring
---
구름 IDE의 컨테이너에 Spring 개발환경을 구축하려고 한다. 

OS - Ubuntu 18.04

### Generate BLANK container
구름 IDE에 빈 컨테이너를 생성한다.  
![blank](https://user-images.githubusercontent.com/66898263/189467524-f7288f43-ed41-498d-a8ac-e9e510827974.png)

### Install JDK 17
아래 글을 참고한다.  
[Ubuntu에 Java 설치](https://ckdhkdwns.github.io/posts/Ubuntu%EC%97%90%EC%84%9C-%EC%9E%90%EB%B0%94-%EC%84%A4%EC%B9%98/)

### Install VScode Extension Pack for Java 

1. Extension Pack for Java  
Popular extensions for Java development that provides Java IntelliSense, debugging, testing, Maven/Gradle support, project management and more  
[VS Marketplace Link](https://open-vsx.org/vscode/item?itemName=vscjava.vscode-java-pack)
![extension-pack-for-java](https://user-images.githubusercontent.com/66898263/189467866-d82c9726-00f1-4f4f-9716-62f37d30d130.png)

2. Spring Boot Extension Pack  
A collection of extensions for developing Spring Boot applications  
[VS Marketplace Link](https://open-vsx.org/vscode/item?itemName=Pivotal.vscode-boot-dev-pack)
![spring-boot-extension-pack](https://user-images.githubusercontent.com/66898263/189467872-02f96318-734c-436a-9cd0-4e0e53af5881.png)

3. Lombok Annotations Support for VS Code  
A lightweight extension to support Lombok annotations processing in Visual Studio Code  
[VS Marketplace Link](https://open-vsx.org/vscode/item?itemName=GabrielBB.vscode-lombok)
![lombok-annotations-support-for-vs-code](https://user-images.githubusercontent.com/66898263/189467874-943442e9-b06d-4eb4-89db-78990a993f24.png)

### Start Project

1. `Ctrl + Shift + P` 
2. `Spring initalizr:Create a Gradle Project...` 
![start](https://user-images.githubusercontent.com/66898263/189468650-cc292cfd-21c1-4b91-ace0-da4d2088b305.png)
3. 2022-09-10 기준 
> Spring Boot: 2.7.3  
> Specify packaging type: Jar  
> Specify Java version: 17  

로딩 이후 프로젝트가 생성된다.  
![p](https://user-images.githubusercontent.com/66898263/189468739-cd9971d6-441f-41f1-b175-a0e50f878815.png)