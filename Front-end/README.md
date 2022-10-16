# Front-end 개발문서

## 실행방법
npm install --force
npm run dev

## 코드 설명

> ### pages

>> #### '/'
>>> ##### index.js
>>> 처음 웹사이트를 시작할 때 페이지. 여러 게시판의 최근 3개 게시물 제목이 보이도록 합니다.
>>> ##### popular.js
>>> 인기 게시물이 보이는 페이지
>>> ##### _app.js
>>> 사이트 기본 설정
>>> ##### _document.js
>>> 서버사이드 렌더링 설정
>>> ##### profile.js
>>> 프로필 페이지
>>> ##### signup.js
>>> 회원가입 페이지
>>> ##### [id].js
>>> 각 게시판 페이지
>> #### 'user'
>>> ##### [id].js
>>> 유저 게시물 보는 페이지
>> #### 'post'
>>> ##### [id].js
>>> 특정 게시물 보는 페이지
>> #### 'me'
>>> ##### comment.js
>>> 내가 댓글 단 게시물을 보는 페이지
>>> ##### following.js
>>> 내가 팔로잉 한 유저들이 올린 게시물을 보는 페이지(익명 글은 보이지 않습니다.)
>>> ##### posts.js
>>> 내가 작성한 게시물을 보는 페이지
>>> ##### scrap.js
>>> 내가 스크랩한 게시물을 보는 페이지
>> #### 'hashtag'
>>> ##### [tag].js
>>> 해시태그 키워드 관련 게시물을 보는 페이지(게시글 내의 해시태그를 클릭하거나 직접 해시태그를 검색하면 이 페이지로 이동합니다.)

> ### components
>> #### AppLayout.js
>> 웹 전체적인 구조를 짜는 component
>> #### CommentForm.js
>> 댓글 작성 폼 component
>> #### FollowButton.js
>> 각 게시물의 팔로우 버튼 component
>> #### FollowList.js
>> 프로필 페이지의 팔로잉, 팔로워 리스트를 볼 수 있는 component
>> #### LoginForm.js
>> 로그인 폼 component
>> #### MainCard.js
>> 메인화면에서 각 게시판 미리보기(최신 3개의 게시물의 제목이 보이도록)component
>> #### MyChart.js
>> 나의 남은 군생활을 도넛차트로 보여주는 component
>> #### MyComment.js
>> 내가 댓글 단 게시물을 보는 페이지에서 게시글을 나타내주는 component
>> #### MyVacation.js
>> 나의 휴가를 보여주는 component
>> #### NicknameEditForm.js
>> 닉네임 수정 폼 component
>> #### PopularPosts.js
>> 인기 많은 게시글 미리보기를 보여주는 component
>> #### PostCard.js
>> 게시글을 보여주는 component
>> #### PostCardContent.js
>> 게시글 내용을 보여주는 component(PostCard.js에 속함)
>> #### PostForm.js
>> 게시글 작성 폼 component
>> #### PostImage.js
>> 게시글 이미지 component(PostCard.js에 속함)
>> #### ProfilePost.js
>> 페이지에서 왼쪽 UserProfile component밑에 나의 스크랩, 나의 게시글 등 보여주는 component
>> #### UserProfile.js
>> 로그아웃, 내 정보 등 보여주는 component
>> #### VacaAccordion.js
>> 연가, 포상 휴가 등 다양한 휴가를 기록할 수 있도록 하는 component(MyVacation.js에 속함)
> ### actions
>> #### post.js 
>> post 정보 관련 내용을 backend와 소통하도록 해주는 코드
>> #### user.js 
>> user 정보 관련 내용을 backend와 소통하도록 해주는 코드
> ### hooks 
>> 코딩을 하면서 onChangeXXX 함수를 많이 만드는데, 이를 hook으로 만든 코드
> ### config 
>> backendUrl을 지정함으로써 axios에 backendUrl을 따로 적지 않아도 default baseURL로 설정해주도록 하는 코드
> ### reducers
>> #### index.js
>>> 상태는 user와 post로 나뉘는데 이를 코드 스플리팅을 해주고 합쳐주는 코드
>> #### user.js
>>> user 관련 state를 global하게 관리해주는 코드
>> #### post.js
>>> post 관련 state를 global하게 관리해주는 코드

> ### store 
>> #### configureStore.js
>> nextjs와 redux를 매끄럽게 연동하기 위한 코드(next-redux-wrapper, reduxjs/toolkit)
