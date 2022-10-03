import { createSlice } from '@reduxjs/toolkit';
import _concat from 'lodash/concat';
import _remove from 'lodash/remove';
import _find from 'lodash/find';
import {
  addComment,
  addPost,
  likePost,
  loadHashtagPosts,
  loadPost,
  loadPosts,
	loadIndexPosts,
  loadUserPosts,
  removePost,
  scrapPost,
  unScrapPost,
  unlikePost,
  updatePost,
  uploadImages,
	loadUserComments,
	loadUserScraps,
	loadMyPosts,
	loadPopularPosts,
} from '../actions/post';

// 기본 state
export const initialState = {
  mainPosts: [],
	indexPosts: [],
	popularPosts: [],
	userComments: [],
  hasMorePosts: true,
  singlePost: null,
  imagePaths: [],
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
	loadUserCommentsLoading: false,
	loadUserCommentsDone: false,
	loadUserCommentsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  scrapPostLoading: false,
  scrapPostDone: false,
  scrapPostError: null,
	loadScrapLoading: false,
	loadScrapDone: false,
	loadScrapError: null,
	loadIndexPostsLoading: false,
	loadIndexPostsDone: false,
	loadIndexPostsError: null,
	loadPopularPostsLoading: false,
	loadPopularPostsDone: false,
	loadPopularPostsError: null,
};

// toolkit 사용방법
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    removeImage(state, action) {
      state.imagePaths = state.imagePaths.filter(
        (v, i) => i !== action.payload
      );
    },
  },
  extraReducers: (builder) =>
    builder
			.addCase(loadIndexPosts.pending, (state) => {
        state.loadIndexPostsLoading = true;
        state.loadIndexPostsDone = false;
        state.loadIndexPostsError = null;
      })
      .addCase(loadIndexPosts.fulfilled, (state, action) => {
        state.loadIndexPostsLoading = false;
        state.loadIndexPostsDone = true;
        state.indexPosts = _concat(state.indexPosts, action.payload);
				state.mainPosts = _concat(state.mainPosts, action.payload);
      })
      .addCase(loadIndexPosts.rejected, (state, action) => {
        state.loadIndexPostsLoading = false;
        state.loadIndexPostsError = action.error.message;
      })
			.addCase(loadPopularPosts.pending, (state) => {
				state.loadPopularPostsLoading = true;
				state.loadPopularPostsDone = false;
				state.loadPopularPostsError = null;
			})
			.addCase(loadPopularPosts.fulfilled, (state, action) => {
				state.loadPopularPostsLoading = false;
				state.loadPopularPostsDone = true;
				state.popularPosts = _concat(state.popularPostsular, action.payload);
				state.hasMorePosts = action.payload.length;
			})
			.addCase(loadPopularPosts.rejected, (state, action) => {
				state.loadPopularPostsLoading = false;
				state.loadPopularPostsError = action.error.message;
			})
      .addCase(loadPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      // loadHashtagPosts
      .addCase(loadHashtagPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadHashtagPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadHashtagPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      // loadUserPosts
      .addCase(loadUserPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadUserPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
			.addCase(loadMyPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadMyPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadMyPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      // addPost
      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addPostLoading = false;
        state.addPostDone = true;
        state.mainPosts.unshift(action.payload);
        state.imagePaths = [];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message;
      })
      // uploadImages
      .addCase(uploadImages.pending, (state) => {
        state.uploadImagesLoading = true;
        state.uploadImagesDone = false;
        state.uploadImagesError = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesDone = true;
        state.imagePaths = _concat(state.imagePaths, action.payload);
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesError = action.error.message;
      })
      // addComment
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
        state.addCommentDone = false;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        let post = _find(state.mainPosts, { id: action.payload.PostId });
        state.addCommentLoading = false;
        state.addCommentDone = true;
				if(!post){
					post = state.singlePost
				}
        post.Comments.unshift(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error.message;
      })
      // removePost
      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
        state.removePostDone = false;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.removePostLoading = false;
        state.removePostDone = true;
        _remove(state.mainPosts, { id: action.payload.PostId });
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostLoading = false;
        state.removePostError = action.error.message;
      })
      // likePost
      .addCase(likePost.pending, (state) => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        let post = _find(state.mainPosts, { id: action.payload.PostId });
        state.likePostLoading = false;
        state.likePostDone = true;
				if (!post) {
					post = state.singlePost
				}
        post.Likers.push({ id: action.payload.UserId });
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likePostLoading = false;
        state.likePostError = action.error.message;
      })
      // scrapPost
      .addCase(scrapPost.pending, (state) => {
        state.scrapPostLoading = true;
        state.scrapPostDone = false;
        state.scrapPostError = null;
      })
      .addCase(scrapPost.fulfilled, (state, action) => {
        let post = _find(state.mainPosts.concat(state.indexPosts), { id: action.payload.PostId });
        state.scrapPostLoading = false;
        state.scrapPostDone = true;
				if(!post){
					post = state.singlePost
				}
        post.Scrappers.push({ id: action.payload.UserId });
      })
      .addCase(scrapPost.rejected, (state, action) => {
        state.scrapPostLoading = false;
        state.scrapPostError = action.error.message;
      })
      // unlikePost
      .addCase(unlikePost.pending, (state) => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        let post = _find(state.mainPosts, { id: action.payload.PostId });
        state.likePostLoading = false;
        state.likePostDone = true;
				if (!post){
					post = state.singlePost
				}
        _remove(post.Likers, { id: action.payload.UserId });
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.likePostLoading = false;
        state.likePostError = action.error.message;
      })
      .addCase(unScrapPost.pending, (state) => {
        state.scrapPostLoading = true;
        state.scrapPostDone = false;
        state.scrapPostError = null;
      })
      .addCase(unScrapPost.fulfilled, (state, action) => {
        let post = _find(state.mainPosts, { id: action.payload.PostId });
        state.scrapPostLoading = false;
        state.scrapPostDone = true;
				if(!post){
					post = state.singlePost
				}
        _remove(post.Scrappers, { id: action.payload.UserId });
      })
      .addCase(unScrapPost.rejected, (state, action) => {
        state.scrapPostLoading = false;
        state.scrapPostError = action.error.message;
      })
      // updatePost
      .addCase(updatePost.pending, (state) => {
        state.updatePostLoading = true;
        state.updatePostDone = false;
        state.updatePostError = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        let post = _find(state.mainPosts, { id: action.payload.PostId });
        state.updatePostLoading = false;
        state.updatePostDone = true;
				if (!post){
					post = state.singlePost
				}
        post.content = action.payload.content;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updatePostLoading = false;
        state.updatePostError = action.error.message;
      })
      // loadPost
      .addCase(loadPost.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.singlePost = action.payload;
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
			.addCase(loadUserComments.pending, (state, action)=>{
				state.loadUserCommentslLoaidng = true;
				state.loadUserCommentsDone = false;
				state.loadUserCommentsError = null;
			})
			.addCase(loadUserComments.fulfilled, (state, action)=>{
				state.loadUserCommentsLoading=false;
				state.loadPostsDone = true;
				state.userComments = _concat(state.userComments, action.payload);
			})
		  .addCase(loadUserComments.rejected, (state, action)=>{
				state.loadUserCommentsLoading = false;
				state.loadUserCommentsError = action.error.message;
			})
			.addCase(loadUserScraps.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadUserScraps.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadUserScraps.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      .addDefaultCase((state) => state),
});

export default postSlice;