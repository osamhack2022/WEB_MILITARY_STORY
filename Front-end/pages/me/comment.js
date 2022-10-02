import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import AppLayout from "../../components/AppLayout"
import PostForm from "../../components/PostForm"
import PostCard from "../../components/PostCard"
import MyComments from "../../components/MyComments";
import { loadMyInfo } from "../../actions/user"
import { loadPosts, loadUserComments } from "../../actions/post"
import wrapper from "../../store/configureStore"


const Comment = () => {
	const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
	
  const { mainPosts, hasMorePosts, loadPostsLoading, userComments } = useSelector(
    (state) => state.post
  );
	
	useEffect(()=>{
		dispatch(loadMyInfo())
		dispatch(loadUserComments())
		console.log(userComments)
	}, [])
	return (
		<AppLayout>
			{userComments.map((el, idx)=>(
				<MyComments key = {idx} comments = {el[0].content} post={el[1]} />
			))}
		</AppLayout>)
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
		
		await context.store.dispatch(loadUserComments());

    return {
      props: {},
    };
  }
);


export default Comment;