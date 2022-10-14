import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { loadUserPosts, loadPopularPosts } from '../../actions/post';
import { loadMyInfo, loadUser } from '../../actions/user';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

import StarIcon from '@mui/icons-material/Star';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const [info, setInfo] = useState(null);

  const { userInfo, me } = useSelector((state) => state.user);

  useEffect(() => {
    const path_arr = router.asPath.split('/');

    dispatch(loadMyInfo());
    dispatch(loadUser({ userId: path_arr[2] }));
  }, [router.asPath]);

  const avatar = () => {
    if (userInfo.followers >= 2) {
      return (
        <Link href={`/user/${info.id}`}>
          <a>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={<StarIcon sx={{ color: 'yellow' }} />}
            >
              <Avatar
                sx={{ bgcolor: 'black', border: '2px solid yellow' }}
                aria-label="recipe"
              >
                {info.nickname[0]}
              </Avatar>
            </Badge>
          </a>
        </Link>
      );
    } else {
      return (
        <Link href={`/user/${info.id}`}>
          <a>
            <Avatar sx={{ bgcolor: 'grey' }} aria-label="recipe">
              {info.nickname[0]}
            </Avatar>
          </a>
        </Link>
      );
    }
  };

  useEffect(() => {
    setInfo(userInfo);
  }, [userInfo, me]);

  useEffect(() => {
    const onScroll = () => {
      if (hasMorePosts && !loadPostsLoading) {
        if (
          window.pageYOffset + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(
            loadUserPosts({
              lastId,
              userId: id,
            })
          );
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      {info && (
        <>
          <Head>
            <title>
              {info.nickname}
              님의 글
            </title>
            <meta name="description" content={`${info.nickname}님의 게시글`} />
            <meta property="og:title" content={`${info.nickname}님의 게시글`} />
            <meta
              property="og:description"
              content={`${info.nickname}님의 게시글`}
            />
          </Head>
          <Card
            sx={{
              width: '100%',
              backgroundColor: '#fefefe',
              border: '2px solid #1B3B1A',
              marginTop: 1.5,
            }}
          >
            <CardHeader
              avatar={avatar()}
              title={
                <Link href={`/user/${info.id}`}>
                  <a>
                    <span style={{ color: 'black' }}>{info.nickname}</span>
                  </a>
                </Link>
              }
            />

            <Divider variant="middle" />
            <CardActions disableSpacing>
              <Grid container>
                <Grid item xs={3.8}>
                  <span style={{ display: 'flex', justifyContent: 'center' }}>
                    게시글 :{info.Posts}
                  </span>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3.8}>
                  <span style={{ display: 'flex', justifyContent: 'center' }}>
                    팔로잉 :{info.Followings}
                  </span>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3.8}>
                  <span style={{ display: 'flex', justifyContent: 'center' }}>
                    팔로워 :{info.Followers}
                  </span>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </>
      )}

      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
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
    await context.store.dispatch(loadUserPosts({ userId: context.params.id }));
    await context.store.dispatch(loadUser({ userId: context.params.id }));
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

export default User;
