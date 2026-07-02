const ActionType = {
  SET_LOADING: 'SET_LOADING',
};

function setLoadingActionCreator(isLoading) {
  return {
    type: ActionType.SET_LOADING,
    payload: { isLoading },
  };
}

function showLoading() {
  return setLoadingActionCreator(true);
}

function hideLoading() {
  return setLoadingActionCreator(false);
}

export { ActionType, showLoading, hideLoading };
