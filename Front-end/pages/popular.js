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

import styled from 'styled-components';

const TitleDiv = styled.div`
  marginbottom: 10px;
  position: relative;
  border: 3px solid #2F9658;
  margin: 0px -2px;
  width: 100%;
  padding-top: 5px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 27px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { asPath } = useRouter();
  const { mainPosts, hasMorePosts, loadPostsLoading, popularPosts } =
    useSelector((state) => state.post);

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
			<br/>
      <TitleDiv>인기 게시물 페이지</TitleDiv>
      {popularPosts.map((post) => (
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
