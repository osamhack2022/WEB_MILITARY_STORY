import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loadMyInfo } from '../actions/user';
import { loadPosts, loadPopularPosts } from '../actions/post';
import wrapper from '../store/configureStore';

import { useRouter } from 'next/router';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { asPath } = useRouter();
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  const post = useSelector((state) => state.post);

  useEffect(() => {
    function onScroll() {
      if (hasMorePosts && !loadPostsLoading) {
        if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(
            loadPosts({
              lastId,
              category: asPath[1],
            })
          );
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  useEffect(() => {
    dispatch(loadMyInfo());
  }, []);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log(context.req);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    await context.store.dispatch(
      loadPosts({
        category: context.params.id,
      })
    );
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

export default Home;
