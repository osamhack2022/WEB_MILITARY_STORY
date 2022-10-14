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
  reportPost,
  loadHotPosts,
  loadStartPosts,
  loadStartPopularPosts,
  loadStartHotPosts,
  loadStartIndexPosts,
  loadStartUserPosts,
  loadStartUserScraps,
  loadStartFollowingsPosts,
  loadFollowingsPosts,
} from '../actions/post';

// 기본 state
export const initialState = {
  mainPosts: [],
  indexPosts: [],
  popularPosts: [],
  hotPosts: [],
  userComments: [],
  myPosts: [],
  followingsPosts: [],
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
  reportPostLoading: false,
  reportPostDone: false,
  reportPostError: null,
};

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
      .addCase(loadStartIndexPosts.pending, (state) => {
        state.loadIndexPostsLoading = true;
        state.loadIndexPostsDone = false;
        state.loadIndexPostsError = null;
      })
      .addCase(loadStartIndexPosts.fulfilled, (state, action) => {
        state.loadIndexPostsLoading = false;
        state.loadIndexPostsDone = true;
        state.indexPosts = _concat([], action.payload);
        state.mainPosts = _concat(state.mainPosts, action.payload);
      })
      .addCase(loadStartIndexPosts.rejected, (state, action) => {
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
        state.popularPosts = _concat([], action.payload);
      })
      .addCase(loadPopularPosts.rejected, (state, action) => {
        state.loadPopularPostsLoading = false;
        state.loadPopularPostsError = action.error.message;
      })
      .addCase(loadHotPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadHotPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.hotPosts = _concat(state.hotPosts, action.payload);
      })
      .addCase(loadHotPosts.rejected, (state) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      .addCase(loadStartHotPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadStartHotPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.hotPosts = _concat([], action.payload);
      })
      .addCase(loadStartHotPosts.rejected, (state) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
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
      .addCase(loadStartPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadStartPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat([], action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadStartPosts.rejected, (state, action) => {
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
      .addCase(loadStartUserPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadStartUserPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat([], action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadStartUserPosts.rejected, (state, action) => {
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
        state.myPosts = _concat(state.myPosts, action.payload);
        state.hasMorePosts = action.payload?.length === 10;
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
        if (!post) {
          post = state.singlePost;
        }
        if (!post) {
          post = _find(state.myPosts, { id: action.payload.PostId });
        }
        if (!post) {
          post = _find(state.hotPosts, { id: action.payload.PostId });
        }
        if (!post) {
          post = _find(state.followingsPosts, { id: action.payload.PostId });
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
				_remove(state.myPosts, { id: action.payload.PostId });
				_remove(state.followingsPosts, { id: action.payload.PostId });
				_remove(state.popularPosts, { id: action.payload.PostId });
				_remove(state.hotPosts, { id: action.payload.PostId });
				_remove(state.singlePost, { id: action.payload.PostId});
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostLoading = false;
        state.removePostError = action.error.message;
      })
      .addCase(reportPost.pending, (state) => {
        state.reportPostLoading = true;
        state.reportPostDone = false;
        state.reportPostError = null;
      })
      .addCase(reportPost.fulfilled, (state, action) => {
        state.reportPostLoading = false;
        state.reportPostDone = true;
        if (action.payload.hidden_mode) {
          _remove(state.mainPosts, { id: action.payload.PostId });
          _remove(state.indexPosts, { id: action.payload.PostId });
          _remove(state.singlePost, { id: action.payload.PostId });
          _remove(state.popularPosts, { id: action.payload.PostId });
          _remove(state.followingsPosts, { id: action.payload.PostId });
          _remove(state.myPosts, { id: action.payload.PostId });
        }
      })
      .addCase(reportPost.rejected, (state, action) => {
        state.reportPostLoading = false;
        state.reportPostError = action.error.message;
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
          post = state.singlePost;
        }
        if (!post) {
          post = _find(state.myPosts, { id: action.payload.PostId });
        }
        if (!post) {
          post = _find(state.followingsPosts, { id: action.payload.PostId });
        }
        if (!post) {
          post = _find(state.hotPosts, { id: action.payload.PostId });
        }
				if(!post){
					post = _find(state.popularPosts, {id:action.payload.PostId});
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
        let post = _find(state.mainPosts.concat(state.indexPosts), {
          id: action.payload.PostId,
        });
        state.scrapPostLoading = false;
        state.scrapPostDone = true;
        if (!post) {
          post = state.singlePost;
        }
        if (!post) {
          post = _find(state.hotPosts.concat(state.indexPosts), {
            id: action.payload.PostId,
          });
        }
				if (!post) {
          post = _find(state.popularPosts.concat(state.indexPosts), {
            id: action.payload.PostId,
          });
        }
        if (!post) {
          post = _find(state.myPosts.concat(state.indexPosts), {
            id: action.payload.PostId,
          });
        }
        if (!post) {
          post = _find(state.followingsPosts.concat(state.indexPosts), {
            id: action.payload.PostId,
          });
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
        if (!post) {
          post = state.singlePost;
        }
        if (!post) {
          post = _find(state.hotPosts, { id: action.payload.PostId });
        }
				if(!post) {
					post = _find(state.popularPosts, {id: action.payload.PostId});
				}
				if(!post) {
					post = _find(state.myPosts, {id: action.payload.PostId});
				}
				if(!post) {
					post = _find(state.followingsPosts, {id: action.payload.PostId});
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
        if (!post) {
          post = state.singlePost;
        }
        if (!post) {
          post = _find(state.myPosts, { id: action.payload.PostId });
        }
        if (!post) {
          post = _find(state.hotPosts, { id: action.payload.PostId });
        }
				if (!post) {
          post = _find(state.popularPosts, { id: action.payload.PostId });
        }
        if (!post) {
          post = _find(state.followingsPosts, { id: action.payload.PostId });
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
        if (!post) {
          post = state.singlePost;
        }
        if (!post) {
          post = _find(state.myPosts, { id: action.payload.PostId });
        }
				if (!post) {
          post = _find(state.popularPosts, { id: action.payload.PostId });
        }
        if (!post) {
          post = _find(state.followingsPosts, { id: action.payload.PostId });
        }
        if (!post) {
          post = _find(state.hotPosts, { id: action.payload.PostId });
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
      .addCase(loadUserComments.pending, (state, action) => {
        state.loadUserCommentslLoaidng = true;
        state.loadUserCommentsDone = false;
        state.loadUserCommentsError = null;
      })
      .addCase(loadUserComments.fulfilled, (state, action) => {
        state.loadUserCommentsLoading = false;
        state.loadPostsDone = true;
        state.userComments = _concat(state.userComments, action.payload);
      })
      .addCase(loadUserComments.rejected, (state, action) => {
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
      .addCase(loadStartUserScraps.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadStartUserScraps.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat([], action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadStartUserScraps.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      .addCase(loadFollowingsPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadFollowingsPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.followingsPosts = _concat(state.followingsPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadFollowingsPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      .addDefaultCase((state) => state),
});

export default postSlice;
