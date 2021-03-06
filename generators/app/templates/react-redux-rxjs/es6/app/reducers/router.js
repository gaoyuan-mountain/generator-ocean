import { createReducer } from 'utils/helpers';
import { ActionTypes } from 'constants/index';
import history from 'modules/history';

const { location } = history;
location.state = {};

export const routerState = {
  action: history.action,
  location
};

export default {
  router: createReducer(routerState, {
    [ActionTypes.LOCATION_CHANGE](state, action) {
      const { payload } = action;

      return {
        ...state,
        location: payload.location,
        action: payload.action
      };
    }
  })
};
