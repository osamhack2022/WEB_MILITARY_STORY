import React, {useState} from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button"

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useSelector } from 'react-redux';

import styled from "styled-components";
import { styled as styledMui, createTheme } from '@mui/material/styles';

import Link from "next/link"

const StyledSpan = styled.div`
	color:#666;
	font-size:15px;
	margin-left:5px;
	margin-bottom:-5px;
	border-radius:3px;
`

const StyledDiv = styled.div`
	margin-top: 13px;
	border: 3px solid #ddd;
	background-color: #fefefe;
`

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#000',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
    third: {
      main: '#ccc',
    },
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  width:"100%"
}));

export default function ProfilePost(){
	const { me } = useSelector((state) => state.user);
	
	return (
		<StyledDiv>
			<Link href={`/user/${me.id}`}>
				<StyledButton>
					<FormatListBulletedIcon sx={{color:"#cdd0ff"}}/>
					{' '}
					<StyledSpan>나의 게시물</StyledSpan>
				</StyledButton>
			</Link>
			<Divider variant="middle" />
			<Link href={"/me/comment"}>
				<StyledButton>
					<ChatBubbleOutlineIcon sx={{color:"#A0DE98"}}/>
					{' '}
					<StyledSpan>댓글 단 게시물</StyledSpan>
				</StyledButton>
			</Link>
			<Divider variant="middle" />
			<Link href={"/me/scrap"}>
				<StyledButton>
					<StarBorderIcon sx={{color:"#FCE285"}}/>
					{' '}
					<StyledSpan>나의 스크랩</StyledSpan>
				</StyledButton>
			</Link>
		</StyledDiv>
	)
}
