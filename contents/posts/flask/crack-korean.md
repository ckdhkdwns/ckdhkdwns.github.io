---
title: Flask Response 한글 깨짐 현상
date: 2022-09-09
tags: 
    - flask
    - python
    - error
---

ASCII 인코딩을 꺼준다.

```python
from flask import Flask

app = Flask(__name__)

app.config['JSON_AS_ASCII'] = False
```


+ 파일을 읽을 때 `utf-8` 코덱으로 인코딩한다. 
```python
with open('file.txt', encoding = 'utf-8') as file:
    ...
```

