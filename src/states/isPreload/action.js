import { getAccessToken, getOwnProfile } from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { showLoading, hideLoading } from '../isLoading/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = getAccessToken();
      if (token) {
        const authUser = await getOwnProfile();
        dispatch(setAuthUserActionCreator(authUser));
      }
    } catch (error) {
      // token invalid, clear it
      localStorage.removeItem('accessToken');
    }
    dispatch(setIsPreloadActionCreator(false));
    dispatch(hideLoading());
  };
}

export { ActionType, asyncPreloadProcess };
