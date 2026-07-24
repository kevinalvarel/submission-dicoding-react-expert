/**
 * Skenario pengujian threadsReducer:
 *
 * - threadsReducer function:
 *   1. Harus mengembalikan initial state (array kosong) ketika diberi action tidak dikenal
 *   2. Harus mengembalikan threads ketika menerima RECEIVE_THREADS
 *   3. Harus menambahkan thread baru di awal array ketika menerima ADD_THREAD
 *   4. Harus menambahkan userId ke upVotesBy thread yang tepat ketika menerima TOGGLE_UPVOTE_THREAD
 *   5. Harus menghapus userId dari upVotesBy jika user sudah upvote (toggle off)
 *   6. Harus menghapus downVote ketika user upvote (mutually exclusive)
 *   7. Harus menambahkan userId ke downVotesBy thread yang tepat ketika menerima TOGGLE_DOWNVOTE_THREAD
 *   8. Harus menghapus userId dari upVotesBy dan downVotesBy ketika menerima NEUTRALIZE_VOTE_THREAD
 *   9. Tidak boleh mengubah thread lain ketika toggle vote
 */

import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {
  const initialThreads = [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
    },
    {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'Tech',
      createdAt: '2023-01-02T00:00:00.000Z',
      ownerId: 'user-2',
      totalComments: 5,
      upVotesBy: [],
      downVotesBy: [],
    },
  ];

  it('should return the initial state (empty array) when given an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = threadsReducer(undefined, action);
    expect(nextState).toEqual([]);
  });

  it('should return threads when receiving RECEIVE_THREADS', () => {
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: initialThreads },
    };
    const nextState = threadsReducer([], action);
    expect(nextState).toEqual(initialThreads);
  });

  it('should add a new thread at the beginning of the array when receiving ADD_THREAD', () => {
    const newThread = {
      id: 'thread-3',
      title: 'Thread Baru',
      body: 'Ini adalah thread baru',
      category: 'Random',
      createdAt: '2023-01-03T00:00:00.000Z',
      ownerId: 'user-3',
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    };
    const nextState = threadsReducer(initialThreads, action);
    expect(nextState).toHaveLength(3);
    expect(nextState[0]).toEqual(newThread);
  });

  it('should add userId to upVotesBy of the correct thread when receiving TOGGLE_UPVOTE_THREAD', () => {
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-3' },
    };
    const nextState = threadsReducer(initialThreads, action);
    const targetThread = nextState.find((t) => t.id === 'thread-1');
    expect(targetThread.upVotesBy).toContain('user-3');
  });

  it('should remove userId from upVotesBy if user has already upvoted (toggle off)', () => {
    const threadsWithUpvote = initialThreads.map((thread) => {
      if (thread.id === 'thread-1') {
        return { ...thread, upVotesBy: ['user-3'] };
      }
      return thread;
    });
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-3' },
    };
    const nextState = threadsReducer(threadsWithUpvote, action);
    const targetThread = nextState.find((t) => t.id === 'thread-1');
    expect(targetThread.upVotesBy).not.toContain('user-3');
  });

  it('should remove downVote when user upvotes (mutually exclusive)', () => {
    const threadsWithDownvote = initialThreads.map((thread) => {
      if (thread.id === 'thread-1') {
        return { ...thread, downVotesBy: ['user-3'] };
      }
      return thread;
    });
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-3' },
    };
    const nextState = threadsReducer(threadsWithDownvote, action);
    const targetThread = nextState.find((t) => t.id === 'thread-1');
    expect(targetThread.upVotesBy).toContain('user-3');
    expect(targetThread.downVotesBy).not.toContain('user-3');
  });

  it('should add userId to downVotesBy of the correct thread when receiving TOGGLE_DOWNVOTE_THREAD', () => {
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-3' },
    };
    const nextState = threadsReducer(initialThreads, action);
    const targetThread = nextState.find((t) => t.id === 'thread-1');
    expect(targetThread.downVotesBy).toContain('user-3');
  });

  it('should remove userId from both upVotesBy and downVotesBy when receiving NEUTRALIZE_VOTE_THREAD', () => {
    const threadsWithVotes = initialThreads.map((thread) => {
      if (thread.id === 'thread-1') {
        return { ...thread, upVotesBy: ['user-3'], downVotesBy: ['user-4'] };
      }
      return thread;
    });
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-3' },
    };
    const nextState = threadsReducer(threadsWithVotes, action);
    const targetThread = nextState.find((t) => t.id === 'thread-1');
    expect(targetThread.upVotesBy).not.toContain('user-3');
    expect(targetThread.downVotesBy).not.toContain('user-3');
  });

  it('should not modify other threads when toggling vote', () => {
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-3' },
    };
    const nextState = threadsReducer(initialThreads, action);
    const otherThread = nextState.find((t) => t.id === 'thread-2');
    expect(otherThread).toEqual(initialThreads[1]);
  });
});
