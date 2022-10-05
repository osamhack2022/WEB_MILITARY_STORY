import React, { useState, useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import moment from 'moment';
import 'moment/locale/ko';
import wrapper from '../store/configureStore';

import { useRouter } from 'next/router';

moment.locale('ko');

import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import Link from 'next/link';

const StyledSpan = styled.span`
  color: #009000;
  font-size: 20px;
  margin-left: 5px;
  margin-bottom: -5px;
  border-radius: 3px;
`;

const StyledDiv = styled.div`
  margin-top: 13px;
  border: 3px solid #ddd;
  background-color: #fefefe;
  margin-left: 24px;
  margin-right: 31px;
`;

const PaddingDiv = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 4px;
  padding-right: 5px;
`;

const PopularPosts = ({ index, posts }) => {
  const { indexPosts, popularPosts } = useSelector((state) => state.post);
  const [popularPost, setPopularPost] = useState([]);
  const dipatch = useDispatch();
  const { asPath } = useRouter();

  useEffect(() => {
    setPopularPost(popularPosts);
    console.log(asPath);
  }, [asPath]);

  useEffect(() => {
    setPopularPost(popularPosts);
  }, [popularPosts]);

  return (
    <StyledDiv>
      <PaddingDiv>
        <StyledSpan>
          <strong>인기 게시물</strong>
        </StyledSpan>
        <Link href={`/popular`}>
          <a>
            <strong
              style={{
                float: 'right',
                marginRight: 1,
                color: 'black',
                marginTop: 5,
              }}
            >
              {' '}
              더보기 +
            </strong>
          </a>
        </Link>
      </PaddingDiv>
      <Divider variant="middle" />
      {popularPost?.map((el, idx) => (
        <div key={el.id}>
          <Link href={`/post/${el.id}`}>
            <Button
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 1,
                paddingBottom: 1,
              }}
            >
              {el.content.split('\n$')[0]}
              <p style={{ fontSize: 3 }}>{moment(el.createdAt).fromNow()}</p>
            </Button>
          </Link>
          <Divider variant="middle" />
        </div>
      ))}
    </StyledDiv>
  );
};

export default PopularPosts;
