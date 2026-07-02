import {
  getThreadDetail,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
} from '../../utils/api';
import { showLoading, hideLoading } from '../isLoading/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_DETAIL: 'TOGGLE_UPVOTE_DETAIL',
  TOGGLE_DOWNVOTE_DETAIL: 'TOGGLE_DOWNVOTE_DETAIL',
  NEUTRALIZE_VOTE_DETAIL: 'NEUTRALIZE_VOTE_DETAIL',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function toggleUpVoteDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_DETAIL,
    payload: { userId },
  };
}

function toggleDownVoteDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_DETAIL,
    payload: { userId },
  };
}

function neutralizeVoteDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_DETAIL,
    payload: { userId },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote.');
      return;
    }

    dispatch(toggleUpVoteDetailActionCreator(authUser.id));

    try {
      await upVoteThread(threadDetail.id);
    } catch (error) {
      dispatch(toggleUpVoteDetailActionCreator(authUser.id));
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote.');
      return;
    }

    dispatch(toggleDownVoteDetailActionCreator(authUser.id));

    try {
      await downVoteThread(threadDetail.id);
    } catch (error) {
      dispatch(toggleDownVoteDetailActionCreator(authUser.id));
      alert(error.message);
    }
  };
}

function asyncNeutralizeVoteDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote.');
      return;
    }

    dispatch(neutralizeVoteDetailActionCreator(authUser.id));

    try {
      await neutralVoteThread(threadDetail.id);
    } catch (error) {
      dispatch(neutralizeVoteDetailActionCreator(authUser.id));
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote.');
      return;
    }

    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote.');
      return;
    }

    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      alert(error.message);
    }
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote.');
      return;
    }

    dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await neutralVoteComment(threadDetail.id, commentId);
    } catch (error) {
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteDetail,
  asyncToggleDownVoteDetail,
  asyncNeutralizeVoteDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralizeVoteComment,
};
