import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.TOGGLE_UPVOTE_DETAIL: {
    const isUpVoted = threadDetail.upVotesBy.includes(action.payload.userId);
    if (isUpVoted) {
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
      };
    }
    return {
      ...threadDetail,
      upVotesBy: [...threadDetail.upVotesBy, action.payload.userId],
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };
  }
  case ActionType.TOGGLE_DOWNVOTE_DETAIL: {
    const isDownVoted = threadDetail.downVotesBy.includes(action.payload.userId);
    if (isDownVoted) {
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
      };
    }
    return {
      ...threadDetail,
      downVotesBy: [...threadDetail.downVotesBy, action.payload.userId],
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
    };
  }
  case ActionType.NEUTRALIZE_VOTE_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };
  case ActionType.TOGGLE_UPVOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) {
          return comment;
        }
        const isUpVoted = comment.upVotesBy.includes(action.payload.userId);
        if (isUpVoted) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return {
          ...comment,
          upVotesBy: [...comment.upVotesBy, action.payload.userId],
          downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }),
    };
  case ActionType.TOGGLE_DOWNVOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) {
          return comment;
        }
        const isDownVoted = comment.downVotesBy.includes(action.payload.userId);
        if (isDownVoted) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return {
          ...comment,
          downVotesBy: [...comment.downVotesBy, action.payload.userId],
          upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
        };
      }),
    };
  case ActionType.NEUTRALIZE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) {
          return comment;
        }
        return {
          ...comment,
          upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }),
    };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
