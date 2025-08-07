import { selectTokenState, selectTokenLoadSuccess, selectToken, selectTokenExists } from './tokens.selectors';
import { IRootStateModel } from '../models/states/root.state.model';
import { ITokensState } from '../models/interfaces/tokens.interface';
import { ITasksState } from '../models/interfaces/tasks.interfaces';

describe('Tokens Selectors', () => {
  const mockTokensState: ITokensState = {
    loading: false,
    loadSuccess: true,
    loadError: false,
    token: 'mock-token',
    exists: true,
  };

  const mockTasksState: ITasksState = {
    loading: false,
    loadSuccess: false,
    loadError: false,
    tasks: []
  };

  const mockRootState: IRootStateModel = {
    tokens: mockTokensState,
    tasks: mockTasksState,
  };

  it('should select the tokens state slice', () => {
    const result = selectTokenState(mockRootState);
    expect(result).toEqual(mockTokensState);
  });

  it('should select loadSuccess property', () => {
    const result = selectTokenLoadSuccess.projector(mockTokensState);
    expect(result).toBe(true);
  });

  it('should select token property', () => {
    const result = selectToken.projector(mockTokensState);
    expect(result).toBe('mock-token');
  });

  it('should select exists property', () => {
    const result = selectTokenExists.projector(mockTokensState);
    expect(result).toBe(true);
  });
});
