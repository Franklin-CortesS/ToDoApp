export interface ITokensState {
  loading: boolean;
  loadSuccess: boolean;
  loadError: boolean;
  token: string | null;
  exists: boolean;
}

export interface ICredentials {
  email: string;
}