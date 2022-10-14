import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  loadStartFollowingsPosts,
  loadFollowingsPosts,
  loadPopularPosts,
} from '../../actions/post';
import { loadMyInfo, loadUser } from '../../actions/user';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';

const Followings = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { followingsPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const { me } = useSelector((state) => state.user);

  const post = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadMyInfo());
  }, []);

  useEffect(() => {
    dispatch(loadMyInfo());
    dispatch(loadFollowingsPosts());
    dispatch(
      loadPopularPosts({
        limit: 3,
      })
    );
  }, [router.asPath]);

  return (
    <AppLayout>
      <Head>
        <title>팔로잉 게시물</title>
      </Head>
      {followingsPosts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    // await context.store.dispatch(loadUserComments);
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

export default Followings;
