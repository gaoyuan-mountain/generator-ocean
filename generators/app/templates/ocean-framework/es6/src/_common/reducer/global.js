import { createReducer } from 'common-utils/helper';
import { PROFILE } from 'common-constant/actionType';

export const initialState = {
  profile: {},
  profileReady: false,
};

export default {
  global: createReducer(initialState, {
    [PROFILE.SUCCESS](state, action) {
      return {
        ...state,
        profile: {
          ...action.payload.profile,
        },
        profileReady: true,
      };
    },
  })
};
