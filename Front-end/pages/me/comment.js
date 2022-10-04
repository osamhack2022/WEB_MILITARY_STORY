import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import AppLayout from "../../components/AppLayout"
import PostForm from "../../components/PostForm"
import PostCard from "../../components/PostCard"
import MyComments from "../../components/MyComments";
import { loadMyInfo } from "../../actions/user"
import { loadPosts, loadUserComments, loadPopularPosts } from "../../actions/post"
import wrapper from "../../store/configureStore"


const Comment = () => {
	const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
	const [instanceComment, setInstanceComment] = useState([])
	
  const { mainPosts, hasMorePosts, loadPostsLoading, userComments } = useSelector(
    (state) => state.post
  );
	
	useEffect(()=>{
		dispatch(loadMyInfo())
		dispatch(loadUserComments())
	}, [])
	
	useEffect(()=>{
		const _instance = [];
		const _instancecomment = []
		for (let i = 0;i<userComments.length;i++) {
			if(_instance.indexOf(userComments[i][1].id) === -1) {
				_instance.push(userComments[i][1].id)
				_instancecomment.push(userComments[i])
			}
		}
		console.log(_instance)
		setInstanceComment(_instancecomment)
	}, [userComments])
	
	return (
		<AppLayout>
			{instanceComment.map((el, idx)=>(
				<MyComments key = {el[1].id} comments = {el[0].content} post={el[1]} />
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
		
		await context.store.dispatch(loadPopularPosts({
			limit: 3,
		}))
    return {
      props: {},
    };
  }
);


export default Comment;