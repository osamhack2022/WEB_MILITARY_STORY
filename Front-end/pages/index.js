import React, { useEffect } from 'react';
import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loadMyInfo } from '../actions/user';
import { loadPosts, loadIndexPosts } from '../actions/post';
import wrapper from '../store/configureStore';
import MainCard from "../components/MainCard"

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, indexPosts } = useSelector(
    (state) => state.post
  );
	
  const post = useSelector((state)=>state.post)

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
      <Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<MainCard index='0' posts={indexPosts}/>
				</Grid>
				<Grid item xs={12} md = {6}>
					<MainCard index='1' posts={indexPosts} />
				</Grid>
				<Grid item xs={12} md = {6}>
					<MainCard index='2' posts={indexPosts} />
				</Grid>
				<Grid item xs={12} md = {6}>
					<MainCard index='3'posts={indexPosts} />
				</Grid>
				<Grid item xs={12} md = {6}>
					<MainCard index='4' posts={indexPosts} />
				</Grid>
				<Grid item xs={12} md = {6}>
					<MainCard index='5' posts={indexPosts} />
				</Grid>
			</Grid>
    </AppLayout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadIndexPosts({
			limit: 3,
			category: '0'
		}));
		await context.store.dispatch(loadIndexPosts({
			limit: 3,
			category: '1'
		}))
		await context.store.dispatch(loadIndexPosts({
			limit: 3,
			category: '2'
		}))
		await context.store.dispatch(loadIndexPosts({
			limit: 3,
			category: '3'
		}))
		await context.store.dispatch(loadIndexPosts({
			limit: 3,
			category: '4'
		}))
		await context.store.dispatch(loadIndexPosts({
			limit: 3,
			category: '5'
		}))

    return {
      props: {},
    };
  }
);

export default Home;
