import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import { ActionTypes } from '../constants';
import UserService from '../services/user';

export function* userLogin(action) {
  try {
    const profile = yield all([
      call(UserService.login, action.data.username, action.data.password)
    ]);

    yield put({
      type: ActionTypes.USER_LOGIN.SUCCESS,
      data: profile
    });
  } catch (error) {
    yield put({
      type: ActionTypes.USER_LOGIN.FAILED,
      payload: { error },
      error: true
    });
  }
}

export function* watchUserLogin() {
  yield takeEvery(ActionTypes.USER_LOGIN.REQUEST, userLogin);
}

export default function* user() {
  yield fork(watchUserLogin);
}
