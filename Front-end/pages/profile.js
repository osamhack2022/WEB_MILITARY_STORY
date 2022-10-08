import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import useSWR from 'swr';

import { loadPopularPosts } from '../actions/post';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import MyChart from "../components/MyChart";
import { loadMyInfo, editDate } from '../actions/user';
import wrapper from '../store/configureStore';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(4);
  const [followingsLimit, setFollowingsLimit] = useState(4);
  const dispatch = useDispatch();

  const { data: followersData, error: followerError } = useSWR(
    me && me.id ? `/user/followers?limit=${followersLimit}` : null,
    fetcher
  );
  const { data: followingsData, error: followingError } = useSWR(
    me && me.id ? `/user/followings?limit=${followingsLimit}` : null,
    fetcher
  );

  useEffect(() => {
    dispatch(loadMyInfo());
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 4);
  }, []);
  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 4);
  }, []);

  if (!me) {
    return null;
  }
	
	const onEdit = (value1, value2) => {
		if(value1 && value2){
			dispatch(
				editDate({
				start_date: value1?.$d,
				end_date: value2?.$d,
			}))
			
		}
		dispatch(
				loadMyInfo()
			)
	}

  // 주의 return 이 hooks 보다 위에 있으면 안됨
  if (followerError || followingError) {
    console.error(followerError, followingError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | Military Story</title>
      </Head>
			<MyChart onEdit={onEdit}/>
      <NicknameEditForm />
      {followingsData && (
        <FollowList
          header="팔로잉"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingError}
        />
      )}
      {followersData && (
        <FollowList
          header="팔로워"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followerError}
        />
      )}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
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

export default Profile;
