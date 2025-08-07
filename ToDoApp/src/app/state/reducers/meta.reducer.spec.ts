import { clearState } from './meta.reducer';
import { revokeUserTokenSuccessAction } from '../actions/token.actions';

// Reducer base simple para la prueba
function testReducer(state = { loggedIn: true, data: 'some data' }, action: any) {
  switch(action.type) {
    case 'TEST_ACTION':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

describe('clearState metaReducer', () => {
  const reducerWithMeta = clearState(testReducer);

  it('should reset state to initial when revokeUserTokenSuccessAction is dispatched', () => {
    const initialState = undefined;

    const prevState = { loggedIn: true, data: 'user data' };

    const action = revokeUserTokenSuccessAction();

    const state = reducerWithMeta(prevState, action);

    expect(state).toEqual(testReducer(undefined, {type: '@@INIT'}));
  });

  it('should delegate to original reducer for other actions', () => {
    const prevState = { loggedIn: true, data: 'user data' };
    const action = { type: 'TEST_ACTION', payload: 'new data' };

    const state = reducerWithMeta(prevState, action);

    expect(state).toEqual(testReducer(prevState, action));
  });
});
