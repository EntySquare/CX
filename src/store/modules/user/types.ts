export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  id?: number;
  name?: string;
  logon_time?: string;
  role: RoleType;
}
