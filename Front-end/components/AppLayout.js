import React, { useState, useCallback, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { styled, alpha } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import ProfilePost from "./ProfilePost";
import PopularPosts from "./PopularPosts"

const drawerWidth = 240;
const navItems = ['자유 게시판', '고민상담 게시판', '정보 게시판', '취미 게시판', '질문 답변 게시판', '감사 게시판'];

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
      main: '#009000',
    },
  },
});

const Margin = styled('div')(({ theme }) => ({
  marginBottom: 100,
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '3px solid #ddd',
  backgroundColor: alpha(theme.palette.common.black, 0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0),
  },
  marginRight: theme.spacing(4),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: -8,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  display: 'flex',
  marginLeft: 40,
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em+ ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  verticalAlign: 'middle',
}));

const InfoDiv = styled('div')(({ theme }) => ({
	borderRadius:"5px",
	// border:"2px solid #ddd",
	height:"90%",
	width:"90%"
}));

const LeftDiv = styled('div')(({ theme }) => ({
	paddingLeft:"5%",
}));

const StyledBox = styled(Box)(({theme})=>({
	textAlign: 'center'
}))

const BlackSpan = styled('span')(({theme})=>({
	color: 'black',
}))

const StyledTypography = styled(Typography)(({theme})=>({
	padding:5,
	margin:5,
	color:'black'
}))

const StyledListItemButton = styled(ListItemButton)(({theme})=>({
	textAlign:'center',
	color:'black'
}))

const StyledAppBar = styled(AppBar)(({theme})=>({
	backgroundColor:'white'
}))

function Home({ children }) {
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      Router.push(`/hashtag/${searchInput}`);
    },
    [searchInput]
  );

  const handleListOpen = () => {
    setListOpen(!listOpen);
  };

  const goProfile = () => {
    Router.push(`/profile`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <StyledBox onClick={handleDrawerToggle}>
      <StyledTypography variant="h6">
        <Link href="/">
          <a>
						<BlackSpan>Military Story</BlackSpan>
          </a>
        </Link>
      </StyledTypography>
      <Divider />
      <List>
        {navItems.map((item, idx) => (
          <ListItem key={item} disablePadding>
            <StyledListItemButton href={`/${idx}`}>
              <ListItemText primary={item} />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledBox>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <StyledAppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                color: 'black',
              }}
            >
              <Link href="/">
                <a>
                  <BlackSpan>Military Story</BlackSpan>
                </a>
              </Link>
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <IconButton
                color="inherit"
                aria-label="open list"
                edge="start_list"
                onClick={handleListOpen}
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                  fontSize: '20px',
                }}
                size="small"
              >
                <span style={{ color: '#009000', fontSize: '25px' }}>게시판</span>
                {listOpen === false && <ArrowDropDownIcon color="third" />}
                {listOpen && <ArrowDropUpIcon color="third" />}
              </IconButton>
            </Box>
            {me && (
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <IconButton sx={{ flexGrow: 1 }} onClick={goProfile}>
                  <AccountBoxIcon color="black" />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </StyledAppBar>
        <Box sx={{ flexGrow: 1, marginTop: 9 }}>
          {listOpen && (
            <Grid container spacing={2} sx={{ background: '#eee', paddingLeft:3, marginBottom:1, boxShadow: '0 4px 4px -4px black' }}>
              {navItems.map((item, idx) => (
                <>
                  <Grid key={item} item xs={5.6} md={1.8} sx={{ paddingBottom: 1 }}>
                    <Link href={'/' + idx}>
                      <a>
                        <span style={{ color: 'black' }}>{item}</span>
                      </a>
                    </Link>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                </>
              ))}
            </Grid>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <LeftDiv>
								{me ? <UserProfile /> : <LoginForm />}
								
								{me && <InfoDiv><ProfilePost /></InfoDiv>}
								
							</LeftDiv>
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginTop:-1.5}}>
              {children}
            </Grid>
            <Grid item xs={12} md={3}>
              <form onSubmit={onSubmit}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon style={{ color: 'black' }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="# 해시태그 검색"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </Search>
              </form>
							<PopularPosts />
            </Grid>
          </Grid>
        </Box>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Home.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Home;
