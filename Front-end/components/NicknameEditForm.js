import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@mui/material/FormGroup';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import useInput from '../hooks/useInput';
import { changeNickname } from '../actions/user';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  display: 'flex',
  marginLeft: 40,
  color: 'black',
  '& .MuiInputBase-input': {
    borderBottom: '1px solid #1B3B1A',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em+ ${theme.spacing(10)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '90ch',
    },
  },
}));

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me, changeNicknameLoading, changeNicknameDone, changeNicknameError } =
    useSelector((state) => state.user);
  const [nickname, setNickname] = useState('');
  const onChangeNickname = useCallback(
    (e) => {
      setNickname(e.target.value);
    },
    [nickname]
  );

  useEffect(() => {
    if (nickname) {
      if (changeNicknameDone) {
        alert('닉네임이 변경되었습니다.');
      }
      if (changeNicknameError) {
        alert(changeNicknameError);
      }
    }
  }, [changeNicknameDone, changeNicknameError]);

  const onSubmit = useCallback(() => {
    dispatch(
      changeNickname({
        nickname,
      })
    );
  }, [nickname]);
  return (
    <FormGroup
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
        border: '2px solid #2F9658',
        padding: '20px',
        paddingRight: '50px',
        marginTop: '13px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <StyledInputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="닉네임 변경하기"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={onChangeNickname}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={onSubmit}
            sx={{ color: '#1B3B1A', border: '2px solid #2F9658' }}
          >
            수정
          </Button>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default NicknameEditForm;
