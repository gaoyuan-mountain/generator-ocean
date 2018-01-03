import { fork } from 'redux-saga/effects';
import user from './user';
import tasks from './tasks';

export default function* root() {
  yield fork(user);
  yield fork(tasks);
}
