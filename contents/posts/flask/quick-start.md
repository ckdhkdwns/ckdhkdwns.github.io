---
title: Flask - Quick start
date: 2022-09-09
tags: 
    - flask
    - python
---

[Flask 공식문서](https://flask.palletsprojects.com/en/2.2.x/)

## A Minimal Application

플라스크 앱의 형태는 다음과 같다.

```python

from flask import Flask

app = Flask(__name__) 

@app.route("/")
def  hello_world():
    return  "<p>Hello, World!</p>"

#app.run()
```

1.  `Flask` 클래스를 import한다.
2.  `app`이란 instance를 만든다.
3.  `route()`함수를 통해 어떤 URL이 `Flask` 앱의 함수를 실행시킬건지 지정한다.
4.  `hello_word()` 함수는 사용자의 화면에 출력할 메세지를 리턴한다.

이 함수를 `app.py` 로 저장한다. (충돌 방지를 위해 이름을 `flask.py`로 저장하지 않도록 한다.)
이후 `flask` 명령어나 `python -m flask`를 통해 앱을 실행한다.
```bash

$ flask --app app run
* Serving Flask app 'app'
* Running on http://127.0.0.1:5000 (Press CTRL+C to quit)
```

## Routing

현대의 웹 어플리케이션들은 유저를 돕기 위해 의미있는 URL들을 사용한다.
`route()`함수를 통해 함수와 URL을 연결해준다.

```python
@app.route('/')
def  index():
    return  'Index Page'

@app.route('/hello')
def  hello():
    return  'Hello, World'
```

## Variable Rules
`<variable_name>`을 URL에 삽입해 변수를 받아올 수 있다. 함수는 `<variable_name>`의 값을 매개변수로 받는다.
```python
from markupsafe import escape

@app.route('/user/<username>')
def  show_user_profile(username):
# show the user profile for that user
    return  f'User {escape(username)}'

@app.route('/post/<int:post_id>')
def  show_post(post_id):
# show the post with the given id, the id is an integer
    return  f'Post {post_id}'

@app.route('/path/<path:subpath>')
def  show_subpath(subpath):
# show the subpath after /path/
    return  f'Subpath {escape(subpath)}'

```

## HTTP Methods
웹 어플리케이션은 URL에 접근할 때 각각 다른 HTTP 메소드들을 사용한다. 기본적으로, `@app.route()`는 `GET` 요청에만 응답한다. `methods` 매개변수를 이용해 HTTP 메소드들을 조작할 수 있다.

```python
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
```
위의 예제는 각각의 메소드들을 하나의 함수안에 라우팅했다. 

아래와 같이 `@app.get()`과 `@app.post()`를 사용하면 각각의 메서드들을 조작하는 함수들을 만들 수 있다. 
```python
@app.get('/login')
def login_get():
    return show_the_login_form()

@app.post('/login')
def login_post():
    return do_the_login()
```
## Static Files
동적 웹 애플리케이션은 정적 파일들도 필요하다. 간단하다. `static`폴더를 생성하면 `/static` 경로에서 사용 가능하다.

URL을 생성하고 싶다면 아래와 같이 하면 된다.
```python
url_for('static', filename='style.css')
```
물론 `static/style.css`가 존재해야 한다.

## Rendering Templates
`render_template()`메소드를 통해 템플릿을 렌더링할 수 있다. 

```python
from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
```
`render_template`는 `template` 폴더에서 `hello.html`을 찾고 `name` 의 값을 넘겨준다.

```xml
<!-- template/hello.html -->
<!doctype html>
<title>Hello from Flask</title>
{% if name %}
  <h1>Hello {{ name }}!</h1>
{% else %}
  <h1>Hello, World!</h1>
{% endif %}
```