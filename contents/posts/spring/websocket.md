---
title: Springboot Stomp로 채팅 구현하기
date: 2022-09-26
tags:
    - spring
    - stomp
    - websocket
---

## HTTP 
<b>HTTP(HyperText Transfer Protocol)</b>은  서버와 클라이언트의 사이에서 어떻게 메시지를 교환할지를 정해 놓은 규칙이다. 요청(Request)과 응답(Response)으로 구성되어 있으며, 일반적으로 80번 포트를 사용한다. 

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/1200px-HTTP_logo.svg.png" style = "transform: scale(0.5); left: 0"/>

## HTTP의 한계

<b>HTTP</b>는 클라이언트가 서버로 <b>요청(Request)</b>을 보내면 서버는 클라이언트에게 <b>응답(Response)</b>을 보낸다. 한 쪽 방향으로만 통신을 하는 <b>반이중</b> 방식을 사용하므로 실시간 통신에는 적합하지 않다.  
  
물론  이런 문제는 Long polling 방식이나 Ajax를 사용해도 어느정도 해결이 가능하지만 데이터의 빠른 업데이트가 아주 중요한 어플리케이션에서는 실시간 업데이트가 아주 중요하기 때문에 <b>WebSocket</b>을 사용한다.

## WebSocket
<b>WebSocket</b>은 웹 서버와 웹 브라우저간 실시간 양방향 통신환경을 제공해주는 실시간 통신 기술이며 HTTP와 달리 웹소켓은 <b>전이중</b> 통신을 사용한다.  
  

연결을 계속 유지하기 때문에 클라이언트와 한 번 연결이 되면 HTTP 사용시 필요없이 발생되는 HTTP와 TCP연결 트래픽을 피할 수 있다. 그리고 HTTP와 같은 80번 포트를 사용하기에 기업용 어플리케이션에 적용할 때 방화벽을 재설정하지 않아도 된다.

## Stomp 
스트리밍 텍스트 지향 메세지 프로토콜로 raw websocket보다 더 많은 프로그래밍 모델을 지원하며 여러 브로커를 사용 가능하다.

---
## 구현

진행중인 프로젝트에 구현된 채팅 기능의 소스이다.

### WebSocketConfig.java

1. `configureMessageBroker()`  
메세지를 주고 받을 **Prefix**를 설정한다.
- `config.enableSimpleBroker('/sub')` - 클라이언트가 메세지를 **구독할(subscribe)** 주소를 지정한다.
- `config.setApplicationDestinationPrefixes("/pub")` - 클라이언트가 메세지를 **보낼(publish)** 주소를 지정한다.

2. `registerStompEndpoints()`  
Websocket 연결을 위한 엔드포인트를 지정해준다. 코드에서는 `/chat`으로 지정해 줬다. 

3. `configureClientInboundChannel()`  
웹 소켓 통신간에 중간에서 정보를 처리하는 **Interceptor**를 지정해준다.  
프로젝트에서는 메세지 송수신간에 JWT 인증을 위해 Interceptor를 설정해줬다.

```java
// WebSocketConfig.java
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final StompHandler stompHandler; 

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub"); 
        config.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat").setAllowedOriginPatterns("*").withSockJS();
    }
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }
}
```
```java
// StompHandler.java
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {
    private final TokenProvider tokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        /** message의 토큰 유효성 검증 */
        if(accessor.getCommand() == StompCommand.CONNECT) {
            if(!tokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization")))
                throw new NotFoundException("유저를 찾을 수 없습니다.");  
        }   
        return message;
    }
}
```

### MessageController.java

서버에서 메세지를 받으면 유저와 팀 정보를 통해 Message를 생성하고 송신자와 수신자 모두에게 메세지를 보내는 방식이다.  
1. `sendingOperations.convertAndSend(String path, Object messageObject)`  
path를 구독한 유저에게 messageObject를 보낸다.


```java
@MessageMapping("/message")
public void handleMessage(MessageDto messageDto, @Header(name = "Authorization") String token) {
    User user = userService.getUserByUserId(tokenProvider.getUserId(token));
    Team team = teamService.getTeamByTeamId(messageDto.getTeamId());
    LocalDateTime now = LocalDateTime.now();
        
    Message message = Message.builder()
        .content(messageDto.getContent())
        .unread(1L)
        .type(messageDto.getType())
        .createdDate(now)
        .sender(user)
        .receiver(userService.getSimpleUserByUsername(messageDto.getReceiver()))
        .team(team)
        .build();

    messageService.createMessage(message);

    
    sendingOperations.convertAndSend(
        "/sub/chat/users/" + user.getUsername(), 
        MessageDto.from(message));
    sendingOperations.convertAndSend(
        "/sub/chat/users/" + messageDto.getReceiver(), 
        MessageDto.from(message));
}
```