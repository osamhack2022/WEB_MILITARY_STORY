import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import Badge from "@mui/material/Badge";
import StarIcon from '@mui/icons-material/Star';

import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { logoutLoading, me } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, []);
	
	const returnAvatar = () => {
		if(me.Followers.length >= 2){
			return (
				<Link href={`/user/${me.id}`}>
          <a>
            <Badge 
							overlap="circular"
							anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
							badgeContent={
								<StarIcon sx={{ color: 'yellow'}}/>
							}
						>
							<Avatar sx={{ border:'2px solid yellow', bgcolor: 'black' }} aria-label="recipe">
              	{me.nickname[0]}
            	</Avatar>
						</Badge>
          </a>
      	</Link>
			)
		}
		else{
			return (
			<Link href={`/user/${me.id}`}>
        <a>
    			<Avatar sx={{ bgcolor: 'grey' }} aria-label="recipe">
            {me.nickname[0]}
          </Avatar>
        </a>
      </Link>
			)
		}
	}

  return (
    <Card
      sx={{
        width: '90%',
        backgroundColor: '#fefefe',
        border: '2px solid #ddd',
      }}
    >
      <CardHeader
        avatar={
          returnAvatar()
        }
        action={
          logoutLoading ? (
            <LoadingButton
              loading
              variant="outlined"
              sx={{ border: '2px solid #ccc' }}
            >
              로그아웃
            </LoadingButton>
          ) : (
            <Button
              sx={{ marginTop: '6px', border: '2px solid #ccc' }}
              onClick={onLogout}
            >
              로그아웃
            </Button>
          )
        }
        title={
          <Link href={`/user/${me.id}`}>
            <a>
              <span style={{ color: 'black' }}>{me.nickname}</span>
            </a>
          </Link>
        }
      />

      <Divider variant="middle" />
      <CardActions disableSpacing>
        <Grid container>
          <Grid item xs={3}>
            <Button
              sx={{ marginLeft: '15%', border: '2px solid #ccc' }}
              onClick={() => Router.push('/profile')}
            >
              내 정보
            </Button>
          </Grid>
          <Divider
            sx={{ marginLeft: '1%', marginRight: '5%' }}
            orientation="vertical"
            variant="middle"
            flexItem
          />
          <Grid item xs={3}>
            <Button
              sx={{ border: '2px solid #ccc' }}
              onClick={() => Router.push('/profile')}
            >
              팔로잉 {me.Followings.length}
            </Button>
          </Grid>
          <Divider
            sx={{ marginLeft: '1%', marginRight: '5%' }}
            orientation="vertical"
            variant="middle"
            flexItem
          />
          <Grid item xs={3}>
            <Button
              sx={{ border: '2px solid #ccc' }}
              onClick={() => Router.push('/profile')}
            >
              팔로워 {me.Followers.length}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default UserProfile;
