/**
 * Skenario pengujian threadDetailReducer:
 *
 * - threadDetailReducer function:
 *   1. Harus mengembalikan initial state (null) ketika diberi action tidak dikenal
 *   2. Harus mengembalikan threadDetail ketika menerima RECEIVE_THREAD_DETAIL
 *   3. Harus mengembalikan null ketika menerima CLEAR_THREAD_DETAIL
 *   4. Harus menambahkan comment di awal array ketika menerima ADD_COMMENT
 *   5. Harus menambahkan userId ke upVotesBy ketika menerima TOGGLE_UPVOTE_DETAIL dan user belum upvote
 *   6. Harus menghapus userId dari upVotesBy ketika menerima TOGGLE_UPVOTE_DETAIL dan user sudah upvote
 *   7. Harus menghapus userId dari downVotesBy ketika user upvote (mutually exclusive)
 *   8. Harus menambahkan userId ke downVotesBy ketika menerima TOGGLE_DOWNVOTE_DETAIL dan user belum downvote
 *   9. Harus menghapus userId dari downVotesBy ketika menerima TOGGLE_DOWNVOTE_DETAIL dan user sudah downvote
 *  10. Harus menghapus userId dari upVotesBy dan downVotesBy ketika menerima NEUTRALIZE_VOTE_DETAIL
 *  11. Harus toggle upvote pada comment yang tepat ketika menerima TOGGLE_UPVOTE_COMMENT
 *  12. Harus toggle downvote pada comment yang tepat ketika menerima TOGGLE_DOWNVOTE_COMMENT
 *  13. Harus neutralize vote pada comment ketika menerima NEUTRALIZE_VOTE_COMMENT
 */

import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer', () => {
  const initialThreadDetail = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2023-01-01T00:00:00.000Z',
    owner: { id: 'user-1', name: 'User 1', avatar: 'https://example.com/avatar.png' },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Komentar pertama',
        createdAt: '2023-01-01T01:00:00.000Z',
        owner: { id: 'user-2', name: 'User 2', avatar: 'https://example.com/avatar2.png' },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  it('should return the initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = threadDetailReducer(undefined, action);
    expect(nextState).toBeNull();
  });

  it('should return threadDetail when receiving RECEIVE_THREAD_DETAIL', () => {
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: initialThreadDetail },
    };
    const nextState = threadDetailReducer(null, action);
    expect(nextState).toEqual(initialThreadDetail);
  });

  it('should return null when receiving CLEAR_THREAD_DETAIL', () => {
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };
    const nextState = threadDetailReducer(initialThreadDetail, action);
    expect(nextState).toBeNull();
  });

  it('should add a comment at the beginning of comments array when receiving ADD_COMMENT', () => {
    const newComment = {
      id: 'comment-2',
      content: 'Komentar baru',
      createdAt: '2023-01-01T02:00:00.000Z',
      owner: { id: 'user-3', name: 'User 3', avatar: 'https://example.com/avatar3.png' },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    };
    const nextState = threadDetailReducer(initialThreadDetail, action);
    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('should add userId to upVotesBy when receiving TOGGLE_UPVOTE_DETAIL and user has not upvoted', () => {
    const action = {
      type: ActionType.TOGGLE_UPVOTE_DETAIL,
      payload: { userId: 'user-3' },
    };
    const nextState = threadDetailReducer(initialThreadDetail, action);
    expect(nextState.upVotesBy).toContain('user-3');
  });

  it('should remove userId from upVotesBy when receiving TOGGLE_UPVOTE_DETAIL and user has already upvoted', () => {
    const threadWithUpvote = {
      ...initialThreadDetail,
      upVotesBy: ['user-3'],
    };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_DETAIL,
      payload: { userId: 'user-3' },
    };
    const nextState = threadDetailReducer(threadWithUpvote, action);
    expect(nextState.upVotesBy).not.toContain('user-3');
  });

  it('should remove userId from downVotesBy when user upvotes (mutually exclusive)', () => {
    const threadWithDownvote = {
      ...initialThreadDetail,
      downVotesBy: ['user-3'],
    };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_DETAIL,
      payload: { userId: 'user-3' },
    };
    const nextState = threadDetailReducer(threadWithDownvote, action);
    expect(nextState.upVotesBy).toContain('user-3');
    expect(nextState.downVotesBy).not.toContain('user-3');
  });

  it('should add userId to downVotesBy when receiving TOGGLE_DOWNVOTE_DETAIL and user has not downvoted', () => {
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_DETAIL,
      payload: { userId: 'user-3' },
    };
    const nextState = threadDetailReducer(initialThreadDetail, action);
    expect(nextState.downVotesBy).toContain('user-3');
  });

  it('should remove userId from downVotesBy when receiving TOGGLE_DOWNVOTE_DETAIL and user has already downvoted', () => {
    const threadWithDownvote = {
      ...initialThreadDetail,
      downVotesBy: ['user-3'],
    };
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_DETAIL,
      payload: { userId: 'user-3' },
    };
    const nextState = threadDetailReducer(threadWithDownvote, action);
    expect(nextState.downVotesBy).not.toContain('user-3');
  });

  it('should remove userId from both upVotesBy and downVotesBy when receiving NEUTRALIZE_VOTE_DETAIL', () => {
    const threadWithVotes = {
      ...initialThreadDetail,
      upVotesBy: ['user-3'],
      downVotesBy: ['user-4'],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_DETAIL,
      payload: { userId: 'user-3' },
    };
    const nextState = threadDetailReducer(threadWithVotes, action);
    expect(nextState.upVotesBy).not.toContain('user-3');
    expect(nextState.downVotesBy).not.toContain('user-3');
  });

  it('should toggle upvote on the correct comment when receiving TOGGLE_UPVOTE_COMMENT', () => {
    const action = {
      type: ActionType.TOGGLE_UPVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-3' },
    };
    const nextState = threadDetailReducer(initialThreadDetail, action);
    const targetComment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(targetComment.upVotesBy).toContain('user-3');
  });

  it('should toggle downvote on the correct comment when receiving TOGGLE_DOWNVOTE_COMMENT', () => {
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-3' },
    };
    const nextState = threadDetailReducer(initialThreadDetail, action);
    const targetComment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(targetComment.downVotesBy).toContain('user-3');
  });

  it('should neutralize vote on the correct comment when receiving NEUTRALIZE_VOTE_COMMENT', () => {
    const threadWithCommentVotes = {
      ...initialThreadDetail,
      comments: [
        {
          ...initialThreadDetail.comments[0],
          upVotesBy: ['user-3'],
          downVotesBy: ['user-4'],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-3' },
    };
    const nextState = threadDetailReducer(threadWithCommentVotes, action);
    const targetComment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(targetComment.upVotesBy).not.toContain('user-3');
    expect(targetComment.downVotesBy).not.toContain('user-3');
  });
});
