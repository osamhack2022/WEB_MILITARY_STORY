import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Router from 'next/router';
import axios from 'axios';
import { loadPopularPosts } from "../actions/post"
import { loadMyInfo, signup } from '../actions/user';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

import useInput from '../hooks/useInput';

const Signup = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const { me, signupLoading, signupDone, signupError } = useSelector(
    (state) => state.user
  );

  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (me && me.id) {
      Router.push('/').then();
    }
  }, [me && me.id]);

  useEffect(() => {
    dispatch(loadMyInfo());
  }, []);

  useEffect(() => {
    if (signupDone) {
      Router.push('/').then();
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    // console.log(email, nickname, password);
    dispatch(
      signup({
        email: email,
        nickname: nick,
        password: password,
      })
    );
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | Military Story</title>
      </Head>
      <form>
        <Paper sx={{ padding: '3%' }}>
          <br />
          <h2 htmlFor="sign-up">Military Story 회원가입</h2>
          <div>
            <TextField
              email="ID"
              label="이메일"
              type="email"
              variant="standard"
              sx={{ width: '100%' }}
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <TextField
              email="nick"
              label="닉네임"
              variant="standard"
              sx={{ width: '100%' }}
              value={nick}
              onChange={onChangeNick}
            />
          </div>
          <div>
            <TextField
              email="password"
              label="비밀번호"
              variant="standard"
              sx={{ width: '100%' }}
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div>
            <TextField
              email="password-check"
              label="비밀번호 체크"
              variant="standard"
              sx={{ width: '100%' }}
              type="password"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <div>
            <label>
              <Checkbox
                name="user-term"
                checked={term}
                onChange={onChangeTerm}
              />
              <span>Military Story 가입에 동의합니다.</span>
            </label>
            {termError && (
              <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" sx={{ color: 'black' }} onClick={onSubmit}>
              가입하기
            </Button>
          </div>
        </Paper>
      </form>
    </AppLayout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadMyInfo());
		await context.store.dispatch(loadPopularPosts({
			limit: 3,
		}))
    return {
      props: {},
    };
  }
);

export default Signup;
