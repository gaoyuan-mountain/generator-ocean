import { createReducer } from '../utils/helpers';

export const appState = {
  rehydrated: false
};

export default {
  app: createReducer(appState, {})
};
