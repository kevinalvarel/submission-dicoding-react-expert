/**
 * Skenario pengujian asyncSetAuthUser thunk:
 *
 * - asyncSetAuthUser function:
 *   1. Harus dispatch showLoading, memanggil login dan getOwnProfile, memanggil putAccessToken,
 *      dispatch setAuthUser, dan dispatch hideLoading ketika login berhasil
 *   2. Harus dispatch showLoading, hideLoading dan memanggil alert ketika login gagal
 */

import { asyncSetAuthUser } from './action';
import { showLoading, hideLoading } from '../isLoading/action';
import { ActionType } from './action';
import * as api from '../../utils/api';

// mock api module
jest.mock('../../utils/api');

const fakeToken = 'fake-token-12345';
const fakeAuthUser = {
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'https://example.com/avatar.png',
};

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch actions correctly when login is successful', async () => {
    // arrange
    api.login.mockResolvedValue(fakeToken);
    api.putAccessToken.mockImplementation(() => {});
    api.getOwnProfile.mockResolvedValue(fakeAuthUser);
    const dispatch = jest.fn();

    // action
    await asyncSetAuthUser({ email: 'test@example.com', password: 'password123' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeAuthUser },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions correctly and call alert when login fails', async () => {
    // arrange
    const fakeError = new Error('email or password is wrong');
    api.login.mockRejectedValue(fakeError);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncSetAuthUser({ email: 'wrong@example.com', password: 'wrongpassword' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});
