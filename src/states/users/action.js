import { getAllUsers } from '../../utils/api';
import { showLoading, hideLoading } from '../isLoading/action';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

function asyncReceiveUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, receiveUsersActionCreator, asyncReceiveUsers };
