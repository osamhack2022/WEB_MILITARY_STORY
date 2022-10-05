import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { loadMyInfo } from '../../actions/user';
import { loadPost, loadPopularPosts } from '../../actions/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyInfo());
  }, [router.asPath]);

  return (
    <AppLayout>
      <div>
        {singlePost && (
          <>
            <Head>
              <title>{singlePost.User.nickname} 님의 글</title>
              <meta name="description" content={singlePost.content} />
              <meta
                property="og:title"
                content={`${singlePost.User.nickname}님의 게시글`}
              />
              <meta property="og:description" content={singlePost.content} />
            </Head>
            <PostCard post={singlePost} />
          </>
        )}
      </div>
    </AppLayout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadPost({ postId: context.params.id }));
    // await context.store.dispatch(loadMyInfo());
    await context.store.dispatch(
      loadPopularPosts({
        limit: 3,
      })
    );
    return {
      props: {},
    };
  }
);

export default Post;
