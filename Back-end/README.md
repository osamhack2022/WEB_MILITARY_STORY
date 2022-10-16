# osam_back

## 실행방법
##### npm install --force
##### npx sequelize db:create
##### npm run dev

## 미리 설치 및 설정해야할 것
### mysql 
### .env파일 
> #### COOKIEPARSER=원하는것(따옴표 없이)
> #### DB_PASSWORD=mysql_db_비밀번호(따옴표 없이)
> #### S3_ACCESS_KEY_ID=AWS_S3_KEYID(따옴표 없이)
> #### S3_SECRET_ACCESS_KEY=AWS_SECRET_KEY(따옴표 없이)
> S3 key는 AWS에서 엑셀 파일로 주는데 그거 다운 받고 복사 붙여넣기 하시면 됩니다.

## 코드 설명
### '/'
#### app.js
> ##### backend server의 기본적인 설정을 하고, routes를 합쳐 서비스를 제공
### 'routes'
> #### hashtag.js
> 해시태그와 관련된 게시글을 모두 가져옵니다.
> #### middlewares.js
> 로그인했는지 안 했는지 체크해줍니다.
> ### post.js
> #### 하나의 게시글과 관련된 처리를 합니다. (좋아요 누르기, 댓글 달기 등)
> ### posts.js
> #### 여러개의 게시글을 가져옵니다.(가져오는 방식이 각각 다름)
> ### user.js
> #### user정보와 관련된 정보를 처리합니다.
### 'passport'
> #### index.js
> ##### 이미 로그인 한 유저의 정보를 다룹니다.
> #### local.js
> ##### 로그인 할 때 입력된 정보가 맞는지 판단합니다.
### 'config'
> #### config.js
> #### db 관련 configuration을 나타냅니다.
