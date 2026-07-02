import { ActionType } from './action';

function isLoadingReducer(isLoading = false, action = {}) {
  switch (action.type) {
  case ActionType.SET_LOADING:
    return action.payload.isLoading;
  default:
    return isLoading;
  }
}

export default isLoadingReducer;
