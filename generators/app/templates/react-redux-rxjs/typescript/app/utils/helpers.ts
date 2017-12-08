export function createReducer(initialState: Object, handlers: Object) {
  return (state: Object = initialState, action) => {
    if ({}.hasOwnProperty.call(handlers, action['type'])) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}
