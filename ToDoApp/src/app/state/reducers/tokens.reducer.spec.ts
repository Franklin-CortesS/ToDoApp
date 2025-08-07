import { tokensReducer, initialTokensState } from './tokens.reducer';
import {
  loadUserTokenAction,
  loadUserTokenSuccessAction,
  loadUserTokenErrorAction,
  revokeUserTokenAction,
  revokeUserTokenErrorAction
} from '../actions/token.actions';

describe('tokensReducer', () => {

  it('should set loading true on loadUserTokenAction', () => {
    const action = loadUserTokenAction({ userCredentials: { email: 'test@example.com' } });
    const state = tokensReducer(initialTokensState, action);

    expect(state.loading).toBeTrue();
    expect(state.loadSuccess).toBeFalse();
    expect(state.loadError).toBeFalse();
  });

  it('should set token and exists, loadSuccess true on loadUserTokenSuccessAction', () => {
    const token = 'abc123token';
    const exists = true;
    const action = loadUserTokenSuccessAction({ token, exists });
    const state = tokensReducer(initialTokensState, action);

    expect(state.loading).toBeFalse();
    expect(state.loadSuccess).toBeTrue();
    expect(state.loadError).toBeFalse();
    expect(state.token).toBe(token);
    expect(state.exists).toBe(exists);
  });

  it('should set loadError true on loadUserTokenErrorAction', () => {
    const action = loadUserTokenErrorAction();
    const state = tokensReducer(initialTokensState, action);

    expect(state.loading).toBeFalse();
    expect(state.loadSuccess).toBeFalse();
    expect(state.loadError).toBeTrue();
  });

  it('should set loading true on revokeUserTokenAction and loadSuccess true', () => {
    const action = revokeUserTokenAction();
    const state = tokensReducer(initialTokensState, action);

    expect(state.loading).toBeTrue();
    expect(state.loadSuccess).toBeTrue();
    expect(state.loadError).toBeFalse();
  });

  it('should set loading false, loadSuccess true on revokeUserTokenErrorAction', () => {
    const action = revokeUserTokenErrorAction();
    const state = tokensReducer(initialTokensState, action);

    expect(state.loading).toBeFalse();
    expect(state.loadSuccess).toBeTrue();
    expect(state.loadError).toBeFalse();
  });

});
