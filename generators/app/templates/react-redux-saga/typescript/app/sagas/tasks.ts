import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import TaskService from '../services/task';
import { ActionTypes } from '../constants';

export function* fetchTasks(action) {
  try {
    const [ tasks ] = yield all([
      call(TaskService.fetchTasks)
    ]);

    yield put({
      type: ActionTypes.FETCH_TASKS.SUCCESS,
      payload: {
        data: tasks.data
      },
    });
  } catch (error) {
    yield put({
      type: ActionTypes.FETCH_TASKS.FAILED,
      payload: { message: error.message, status: error.status },
      error: true
    });
  }
}

export function* watchFetchTasks() {
  yield takeEvery(ActionTypes.FETCH_TASKS.REQUEST, fetchTasks);
}

export default function* tasks() {
  yield fork(watchFetchTasks);
}
