/**
 * Skenario pengujian asyncPopulateUsersAndThreads thunk:
 *
 * - asyncPopulateUsersAndThreads function:
 *   1. Harus dispatch showLoading, receiveUsers, receiveThreads, hideLoading secara berurutan ketika berhasil
 *   2. Harus dispatch showLoading, hideLoading dan memanggil alert ketika gagal (API error)
 */

import { asyncPopulateUsersAndThreads } from './action';
import { showLoading, hideLoading } from '../isLoading/action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import * as api from '../../utils/api';

// mock api module
jest.mock('../../utils/api');

const fakeUsers = [
  { id: 'user-1', name: 'User 1', email: 'user1@example.com', avatar: 'https://example.com/avatar1.png' },
  { id: 'user-2', name: 'User 2', email: 'user2@example.com', avatar: 'https://example.com/avatar2.png' },
];

const fakeThreads = [
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
];

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch actions correctly when data fetching is successful', async () => {
    // arrange
    api.getAllUsers.mockResolvedValue(fakeUsers);
    api.getAllThreads.mockResolvedValue(fakeThreads);
    const dispatch = jest.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions correctly and call alert when data fetching fails', async () => {
    // arrange
    const fakeError = new Error('Network error');
    api.getAllUsers.mockRejectedValue(fakeError);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});
