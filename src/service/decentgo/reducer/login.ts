import { IDecentGoApiStatus } from "../model";

//
// ActionConstants
//

export type LoginStart = "decentgo/LoginStart";
export const LoginStart: LoginStart = "decentgo/LoginStart";

export type LoginSuccess = "decentgo/LoginSuccess";
export const LoginSuccess: LoginSuccess = "decentgo/LoginSuccess";

export type LoginError = "decentgo/LoginError";
export const LoginError: LoginError = "decentgo/LoginError";

export interface ILoginStart {
  type: LoginStart;
}
export interface ILoginSuccess {
  type: LoginSuccess;
}
export interface ILoginError {
  type: LoginError;
  errorMsg?: string;
}

export type LoginAction = ILoginStart | ILoginSuccess | ILoginError;

//
// Action creators
//

export function loginStart(): ILoginStart {
  return { type: LoginStart };
}

export function loginSuccess(): ILoginSuccess {
  return { type: LoginSuccess };
}

export function loginError(errorMsg?: string): ILoginError {
  return { type: LoginError, errorMsg };
}

//
// Reducers
//

export default function reducer(
  state: IDecentGoApiStatus = { IsOk: false, IsPending: false },
  action: LoginAction
): IDecentGoApiStatus {
  switch (action.type) {
    case LoginStart:
    {
      return { ...state, IsPending: true, IsOk: false };
    }
    case LoginSuccess:
    {
      return { ...state, IsPending: false, IsOk: true };
    }
    case LoginError:
    {
      return { ...state, IsPending: false, IsOk: false, IsError: true, Error: action.errorMsg };
    }
    default:
      return state;
  }
}
