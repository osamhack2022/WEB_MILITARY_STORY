import React, { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../actions/post';

import useInput from '../hooks/useInput';

import styled from 'styled-components';

const BoardDiv = styled.div`
  position: relative;
  border: 3px solid #ddd;
  border-left: 5px solid #ddd;
  margin: 0px -2px;
  width: 99%;
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
  border: 3px solid #ddd;
  box-sizing: border-box;
  color: #333;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  background: #fff;

  height: 40px;
  margin-top: 5px;

  border-radius: 1.5px;
`;

const BoardTextarea = styled.textarea`
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

const BigSpan = styled.span`
  font-size: 23px;
`;

const PostCardContent = ({
  postId,
  postContent,
  editMode,
  onToggleChangePost,
}) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(false);
  const [title, onChangeTitle, setTitle] = useInput(
    postContent.split('\n$').shift()
  );
  const [text, onChangeText, setText] = useInput(
    postContent.split('\n$').slice(1).join('\n')
  );
  const [splitedContent, setSplitedContent] = useState([]);
  const [distribute, setDistribute] = useState([]);

  const { updatePostLoading, updatePostDone, updatePostError } = useSelector(
    (state) => state.post
  );
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 'px';
    }
  }, [text, editMode]);

  useEffect(() => {
    if (action) {
      if (updatePostDone) {
        alert('게시글이 수정되었습니다.');
      }
      if (updatePostError) {
        alert(updatePostError);
      }
      setAction(false);
      onToggleChangePost();
    }
  }, [updatePostDone, updatePostError]);

  const onSubmit = useCallback(() => {
    dispatch(
      updatePost({
        postId,
        content: title + '\n$' + text,
      })
    );
    setAction(true);
  }, [title, text]);

  useEffect(() => {
    let result_arr = []; // 제목이면서 해시태그 : 3, 제목이면 : 2, 해시태그 : 1, 내용 : 0
    let arr = [postContent.split('\n$')[0] + '\n', postContent.split('\n$')[1]];
    let splited_arr = [];
    // console.log(Number(!0))
    for (let i = 0; i < arr.length; i++) {
      arr[i].split(/(#[^\s#]+)/g).map((el, idx) => {
        if (el.match(/(#[^\s#]+)/g)) {
          result_arr.push(1 + Number(!i) * 2);
          splited_arr.push(el);
        } else {
          result_arr.push(Number(!i) * 2);
          splited_arr.push(el);
        }
      });
    }
    setDistribute(result_arr);
    setSplitedContent(splited_arr);
  }, []);

  return (
    <>
      {editMode ? (
        <BoardDiv>
          <BoardInput
            name="boardTitle"
            placeholder="글제목"
            value={title}
            onChange={onChangeTitle}
          />
          <hr />
          <BoardTextarea
            name="boardContent"
            placeholder="글의 내용을 작성해주세요"
            value={text}
            ref={textAreaRef}
            onChange={onChangeText}
          />
          <hr />
          <Button onClick={onSubmit}>수정</Button>
          <Button onClick={onToggleChangePost}>취소</Button>
        </BoardDiv>
      ) : (
        splitedContent?.map((el, idx) => {
          if (distribute[idx] === 3) {
            return (
              <BigSpan>
                <strong>
                  <Link href={`/hashtag/${el.slice(1)}`} key={idx}>
                    <a>{el}</a>
                  </Link>
                </strong>
              </BigSpan>
            );
          } else if (distribute[idx] === 2) {
            return (
              <BigSpan>
                <strong>{el}</strong>
              </BigSpan>
            );
          } else if (distribute[idx] === 1) {
            return (
              <span>
                <Link href={`/hashtag/${el.slice(1)}`} key={idx}>
                  <a>{el}</a>
                </Link>
              </span>
            );
          } else {
            return <span>{el}</span>;
          }
        })
      )}
    </>
  );
};

PostCardContent.propTypes = {
  postId: PropTypes.number.isRequired,
  postContent: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onToggleChangePost: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
