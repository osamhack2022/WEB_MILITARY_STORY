import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import PostForm from '../../components/PostForm';
import PostCard from '../../components/PostCard';
import MyScraps from '../../components/MyScraps';
import { loadMyInfo } from '../../actions/user';
import Head from 'next/head';
import {
  loadPosts,
  loadUserScraps,
  loadPopularPosts,
} from '../../actions/post';
import wrapper from '../../store/configureStore';

const Scrap = () => {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
  const { me } = useSelector((state) => state.user);
	
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(loadMyInfo());
    dispatch(loadUserScraps());
    dispatch(
      loadPopularPosts({
        limit: 3,
      })
    );
  }, [asPath]);
  return (
    <AppLayout>
      <Head>
        <title>나의 스크랩</title>
      </Head>
      {mainPosts?.map((post, idx) => (
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

export default Scrap;
