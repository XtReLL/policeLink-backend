export interface IDiscrodAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
export interface IDiscrodUser {
  id: string;
  username?: string;
  banner?: number;
  avatar?: string;
}
export interface IDiscrodGuild {
  id: string;
  name: string;
  owner: boolean;
  icon?: string;
}
