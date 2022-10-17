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

## DB 모델
### User 
#### 사용자를 나타냅니다.
|이름|타입|설명|비고|
|----|---|----|----|
|id|INTEGER|사용자들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|email|varchar(30)|사용자의 email입니다.|UNIQUE, NOT NULL|
|nickname|varchar(30)|사용자의 Military Story 활동명입니다.|NOT NULL|
|password|varchar(100)|사용자의 비밀번호입니다.(bcrypt 모듈로 암호화됩니다.)|NOT NULL|
|followers|INTEGER|팔로워 수입니다.|NOT NULL|
|annual|INTEGER|사용자의 연가 일수입니다.|NOT NULL|
|reward|INTEGER|사용자의 보상휴가 일수입니다.|NOT NULL|
|compensation|INTEGER|사용자의 포상휴가 일수입니다.|NOT NULL|
|consolation|INTEGER|사용자의 위로휴가 일수입니다.|NOT NULL|
|petition|INTEGER|사용자의 청원휴가 일수입니다.|NOT NULL|
|start_date|DATE|사용자의 입대일입니다.|NOT NULL|
|end_date|DATE|사용자의 전역일입니다.|NOT NULL|

### Post
#### 게시글을 나타냅니다.
|이름|타입|설명|비고|
|----|----|---|---|
|id|INTEGER|게시글들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|content|TEXT|게시글의 내용입니다.(제목+내용+해시태그)|NOT NULL|
|category|TEXT|게시글이 속한 게시판입니다.|NOT NULL|
|private_mode|BOOLEAN|게시글의 익명 모드입니다.|NOT NULL|
|report_count|INTEGER|게시글이 신고당한 횟수입니다.|NOT NULL|
|hidden_mode|BOOLEAN|게시글의 은신 모드입니다.|NOT NULL|
|like_counts|INTEGER|게시글의 좋아요 수입니다.|NOT NULL|
|UserId(←User)|INTEGER|게시글 작성자의 ID입니다.|NULLABLE, FOREIGN_KEY|
### Comment
#### 댓글을 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|----|
|id|INTEGER|댓글들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|content|TEXT|댓글의 내용입니다.|NOT NULL|
|private_mode|BOOLEAN|댓글의 익명 모드입니다.|NOT NULL|
|anonymous|TEXT|댓글이 익명일 경우 댓글은 '익명'+anonymous로 됩니다.|NOT NULL|
|UserId(←User)|INTEGER|댓글 작성자의 ID입니다.|NULLABLE, FOREIGN_KEY|
|PostId(←Post)|INTEGER|댓글이 속한 게시글의 ID입니다.|NULLABLE, FOREIGN_KEY|
### Hashtag
#### 해시태그를 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|----|
|id|INTEGER|해시태그들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|name|varchar(20)|해시태그입니다.|NOT NULL|
### Userid
#### 게시글에 익명 댓글을 작성한 사용자들의 id를 나타냅니다, Post에 1대n 관계로 사용자들의 id가 배열 형태로 저장될 수 있도록 했습니다.
|이름|타입|설명|비고|
|----|----|---|---|
|id|INTEGER|Userid들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|my_id|INTEGER|게시글에 익명댓글을 작성한 사용자의 id입니다.|NOT NULL|
|PostId(←Post)|INTEGER|Userid가 속한 게시글의 ID입니다.|NULLABLE, FOREIGN_KEY|
### Record
#### 사용자의 휴가기록을 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|----|
|id|INTEGER|Record들을 구분해주는 id입니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|category|INTEGER|포상휴가, 위로휴가 같이 휴가의 종류를 나타냅니다.|NOT NULL|
|reason|varchar(300)|휴가의 사유를 적습니다.|NOT NULL|
|num_of_days|INTEGER|휴가 일수를 적습니다.|NOT NULL|
|UserId(←User)|INTEGER|휴가 기록의 사용자의 ID를 나타냅니다.|NULLABLE, FOREIGN_KEY|
### Image
#### 게시글의 이미지를 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|---|
|id|INTEGER|Image들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|src|varchar(200)|Image의 주소를 나타냅니다.|NOT NULL|
|PostId(←Post)|INTEGER|이미지가 속한 게시글의 ID를 나타냅니다.|NOT NULL|


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

## db 구조

## api 문서
