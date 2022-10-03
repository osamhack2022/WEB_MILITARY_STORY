import React, {useState, useEffect} from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import moment from "moment";
import 'moment/locale/ko'

import wrapper from "../store/configureStore";

import { loadPopularPosts } from "../actions/post"

import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import Link from "next/link";

const StyledSpan = styled.span`
	color: #009000;
	font-size: 20px;
	margin-left: 5px;
	margin-bottom: -5px;
	border-radius: 3px;
`

const StyledDiv = styled.div`
	margin-top: 13px;
	border: 3px solid #ddd;
	background-color: #fefefe;
	margin-left: 24px;
	margin-right: 31px;
	border-radius: 3px;
`

const PaddingDiv = styled.div`
	padding-top: 5px;
	padding-bottom : 5px;
	padding-left: 4px;
	padding-right: 5px;
`

const PopularPost = ({ posts }) => {
	const { popularPosts, hasMorePosts, loadPopularPostsLoading } = useSelector((state)=>state.post);
	const [ popularPost, setPopularPost ] = useState([]);
	const { me } = useSelector((state)=> state.user);
	
	useEffect(()=>{
		console.log(popularPosts)
	}, [])
	
	return (
		<StyledDiv>
			<PaddingDiv>
				<StyledSpan><strong>인기 게시물</strong></StyledSpan>
				<Link href={"/post/popular"}>
					<a>
						<strong style={{float:"right", marginRight:1, color:"black", marginTop: 5}}>더보기 +</strong>
					</a>
				</Link>
			</PaddingDiv>
			<Divider variant = "middle" />
			{popularPosts?.map((el, idx)=>(
				<div key={el.id}>
					<Link href={`/post/${el.id}`}>
						<Button sx={{width:"100%", display:'flex', justifyContent: 'space-betweent', paddingTop: 1, paddingBottom: 1}}>
							{el.content.split("\n$")[0]}
							<span style={{fontSize:3}}>{momeent(el.createdAt).fromNow()}</span>
						</Button>
					</Link>
					<Divider variant="middle" />
				</div>
			))}
		</StyledDiv>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadPopularPosts({
			limit: 3,
		}));
		

    return {
      props: {},
    };
  }
);


export default PopularPost;