import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';

import { styled } from '@mui/material/styles';
import Link from 'next/link';

import ProTypes from 'prop-types';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useDispatch, useSelector } from 'react-redux';

import { removeFollow, unfollow } from '../actions/user';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '90px',
}));

const ItemMore = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '60px',
}));

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();
  const { Followers, Followings } = useSelector((state) => state.user);
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    if (header === '팔로잉') {
      setMydata(Followings);
    } else {
      setMydata(Followers);
    }
  }, [header]);

  const onCancel = (userId) => () => {
    if (header === '팔로잉') {
      dispatch(
        unfollow({
          userId,
        })
      );
    } else {
      dispatch(
        removeFollow({
          userId,
        })
      );
    }
  };

  return (
    <>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          border: '2px solid #dddddd',
          borderRadius: 2,
          marginBottom: '20px',
        }}
        subheader={<ListSubheader>{header}</ListSubheader>}
      >
        <ListItem>
          <Grid container spacing={2}>
            {data?.map((v, idx) => (
              <Grid item xs={3} key={v.id} sx={{ height: '50%'}}>
                <Item
                  sx={{
                    border: '2px solid #dddddd',
                    display: 'flex',
                    justifyContent: 'center',
										height: '50%'
                  }}
                >
                  <Link href={`/user/${v.id}`}>
                    <a style={{ textDecoration: 'none', color:'black'}}>
                      <div style={{ display: 'flex' }}>
                        <Avatar>{v.nickname[0]}</Avatar>
                        <span
                          style={{
                            fontSize: '20px',
                            marginTop: 6,
                            marginLeft: 7,
                          }}
                        >
                          {v.nickname}
                        </span>
                      </div>
                    </a>
                  </Link>
                  {header === '팔로잉' && (
                    <>
                      <br />
                      <hr />
                      <IconButton onClick={onCancel(v.id)}>
                        <DoDisturbIcon />
                      </IconButton>
                    </>
                  )}
                </Item>
              </Grid>
            ))}
          </Grid>
        </ListItem>
        <ListItem>
          <Grid item xs={12}>
            <ItemMore>
              {loading ? (
                <LoadingButton>더보기</LoadingButton>
              ) : (
                <Button onClick={onClickMore}>더보기</Button>
              )}
            </ItemMore>
          </Grid>
        </ListItem>
      </List>
    </>
  );
};
FollowList.propTypes = {
  header: ProTypes.string.isRequired,
  data: ProTypes.array.isRequired,
  onClickMore: ProTypes.func.isRequired,
  loading: ProTypes.bool.isRequired,
};

export default FollowList;
