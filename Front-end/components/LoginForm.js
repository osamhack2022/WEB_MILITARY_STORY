import React, { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/user';
import useInput from '../hooks/useInput';
import LoadingButton from '@mui/lab/LoadingButton';

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid #2F9658;
  box-sizing: border-box;
  color: #333;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  background: #fff;

  height: 40px;
  margin-top: 5px;

  border-radius: 5px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const { loginLoading, loginError } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (action) {
      if (loginError) {
        alert(logInError);
      }
      action.setSubmitting(false);
      setAction(null);
    }
  }, [loginError]);

  const onSubmitForm = useCallback(() => {
    dispatch(
      login({
        email,
        password,
      })
    );
  }, [email, password]);

  return (
    <form>
      <Card sx={{ width: '80%', border: '2px solid #2F9658' }}>
        <Box component="div" sx={{ p: 2 }}>
          <div>
            <span>
              <strong>email</strong>
            </span>
            <StyledInput
              type="text"
              name="userId"
              placeholder="email을 입력해주세요"
              onChange={onChangeEmail}
              value={email}
            />
          </div>
          <br />
          <div>
            <span>
              <strong>비밀번호</strong>
            </span>
            <StyledInput
              type="password"
              value={password}
              name="userPW"
              placeholder="비밀번호를 입력해주세요"
              onChange={onChangePassword}
            />
          </div>
        </Box>
        <div style={{ marginTop: '10px', marginLeft: '3%' }}>
          <CardActions>
            {loginLoading ? (
              <LoadingButton loading variant="outlined" sx={{ color: 'black' }}>
                로그인
              </LoadingButton>
            ) : (
              <Button
                type="primary"
                onClick={onSubmitForm}
                sx={{ color: 'black', border:"1px solid #2F9658" }}
              >
                로그인
              </Button>
            )}
          </CardActions>
					<CardActions>
            <Link href="/signup"><a style={{ textDecoration:'none', color:'#2196f3' }}>Military Story 가입하기!</a></Link>
					</CardActions>
        </div>
      </Card>
    </form>
  );
};
export default LoginForm;
