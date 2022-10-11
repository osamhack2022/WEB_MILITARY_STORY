import React, { useCallback, useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import postSlice from '../reducers/post';
import { addPost, uploadImages } from '../actions/post';
import { backUrl } from '../config/config';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import TagIcon from '@mui/icons-material/Tag';
import useInput from '../hooks/useInput';

import styled from 'styled-components';

import Checkbox from '@mui/material/Checkbox';

import { useRouter } from 'next/router';

const pages = [
  '자유 게시판',
  '고민상담 게시판',
  '정보 게시판',
  '취미 게시판',
  '질문 답변 게시판',
  '감사 게시판',
];

const TitleDiv = styled.div`
  position: relative;
  border: 2px solid #1B3B1A;
  margin: 0px -2px;
  width: 100%;
  padding-top: 5px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 27px;
	border-radius: 5px;
	color: #009000;
`;

const BoardDiv = styled.div`
  position: relative;
  border: 2px solid #1B3B1A;
  margin: 0px -2px;
  width: 100%;
  padding-top: 5px;
	border-radius: 5px;
	color: #009000;
`;

const BoardInput = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid #fff;
  box-sizing: border-box;
  color: #333;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  background: #fff;

  height: 32px;
  margin-top: 5px;

  border-radius: 1.5px;

  font-weight: bold;
  font-size: 23px;
  vertical-align: middle;
`;

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: 3px solid #1B3B1A;
  box-sizing: border-box;
  color: #333;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  background: #fff;

  height: 40px;
  margin-top: 5px;

  border-radius: 1.5px;
	
	 ::placeholder {
     color: #1B3B1A;
   }
`;

const BoardTagarea = styled.textarea`
  width: 100%;
  outline: none;
  padding: 10px;
  border: 1px solid #fff;
  box-sizing: border-box;
  font-size: 13px;
  text-align: start;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  vertical-align: middle;
  flex-direction: column;
  resize: none;
  overflow-y: hidden;
`;

const BoardTextarea = styled.textarea`
  width: 100%;
  height: 40px;
  outline: none;
  padding: 8px;
  border: 1px solid #fff;
  box-sizing: border-box;
  font-size: 13px;
  text-align: start;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  vertical-align: middle;
  flex-direction: column;
  resize: none;
  overflow-y: hidden;
`;

const StyledForm = styled.form`
  margintop: 16px;
  marginbottom: 16px;
`;

const PostForm = () => {
  const [action, setAction] = useState(null);
  const { imagePaths, addPostLoading, addPostDone, addPostError } = useSelector(
    (state) => state.post
  );
  const { id } = useSelector((state) => state.user.me);

  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const [writeForm, setWriteForm] = useState(false);
  const [title, onChangeTitle, setTitle] = useInput('');
  const [tag, onChangeTag, setTag] = useInput('');

  const textAreaRef = useRef(null);
  const inputRef = useRef(null);
  const tagRef = useRef(null);
  const [privateMode, setPrivateMode] = useState(false);

  const { asPath } = useRouter();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  useEffect(() => {
    if (tagRef.current) {
      tagRef.current.style.height = 'auto';
      tagRef.current.style.height = tagRef.current.scrollHeight + 'px';
    }
  }, [tag]);

  useEffect(() => {
    if (action) {
      if (addPostDone) {
        alert('게시글이 등록 되었습니다!');
        setText('');
        setTitle('');
      }
      if (addPostError) {
        alert(addPostError);
      }
    }
  }, [addPostDone, addPostError]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (image) => {
      imageFormData.append('image', image);
    });
    dispatch(uploadImages(imageFormData));
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(postSlice.actions.removeImage(index));
    },
    []
  );

  const onChangePrivateMode = useCallback((e) => {
    setPrivateMode(e.target.checked);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title || !title.trim()) {
        return alert('게시글 제목을 작성하세요.');
      }
      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요.');
      }
      if (!tag || !tag.trim()) {
        return alert('해시태그를 작성하세요.');
      }
      const formData = new FormData();
      imagePaths.forEach((p) => {
        formData.append('image', p);
      });
      formData.append('content', title + '\n$' + tag + '\n' + text);
      formData.append('category', asPath);
      formData.append('private_mode', privateMode);
      dispatch(addPost(formData));
      setWriteForm(false);
      setText('');
      setTag('');
      setTitle('');
      setPrivateMode(false);
    },
    [title, text, imagePaths, asPath, privateMode]
  );

  return (
    <form
      style={{ marginTop: 10, marginBottom: 10 }}
      encType="multipart/form-data"
    >
      <TitleDiv>{pages[parseInt(asPath[1], 10)]}</TitleDiv>
      {!writeForm && (
        <StyledInput
          maxLength={140}
          placeholder="글 작성하기"
          onClick={() => setWriteForm(true)}
        />
      )}
      {writeForm && (
        <BoardDiv>
          <div style={{ textAlign: 'center' }}>
            <strong>{pages[parseInt(asPath[1], 10)]}</strong>
          </div>
          <hr />
          <BoardInput
            name="boardTitle"
            placeholder="글 제목"
            value={title}
            onChange={onChangeTitle}
            ref={inputRef}
          />
          <hr />
          <BoardTagarea
            name="boardContent"
            placeholder="글의 내용을 작성해주세요"
            ref={tagRef}
            value={tag}
            onChange={onChangeTag}
          />
          <hr />
          <BoardTextarea
            name="boardHashTag"
            placeholder="#해시태그"
            ref={textAreaRef}
            value={text}
            onChange={onChangeText}
          />
          <hr />
          <div style={{ paddingTop: -3, marginTop: -7 }}>
            <input
              type="file"
              name="image"
              multiple
              hidden
              ref={imageInput}
              onChange={onChangeImages}
            />
            <Button onClick={onClickImageUpload}>
              <PhotoOutlinedIcon color="primary" />
            </Button>
            <label style={{ display: 'inline-block' }}>
              <Checkbox
                name="private-mode"
                checked={privateMode}
                onChange={onChangePrivateMode}
              />
              <span>닉네임 비공개</span>
            </label>
            <Button
              type="primary"
              style={{ float: 'right', display: 'inline-block' }}
              onClick={onSubmit}
            >
              <BorderColorIcon color="primary" />
            </Button>
          </div>
        </BoardDiv>
      )}
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`${v.replace(/\/thumb\//, '/original/')}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default PostForm;
