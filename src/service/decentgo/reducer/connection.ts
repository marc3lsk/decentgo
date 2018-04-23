import { IDecentGoApiStatus } from "../model";

//
// ActionConstants
//

export type ConnectionStart = "decentgo/ConnectionStart";
export const ConnectionStart: ConnectionStart = "decentgo/ConnectionStart";

export type ConnectionSuccess = "decentgo/ConnectionSuccess";
export const ConnectionSuccess: ConnectionSuccess = "decentgo/ConnectionSuccess";

export type ConnectionError = "decentgo/ConnectionError";
export const ConnectionError: ConnectionError = "decentgo/ConnectionError";

export interface IConnectionStart {
  type: ConnectionStart;
}
export interface IConnectionSuccess {
  type: ConnectionSuccess;
}
export interface IConnectionError {
  type: ConnectionError;
  errorMsg?: string;
}

export type ConnectionAction = IConnectionStart | IConnectionSuccess | IConnectionError;

//
// Action creators
//

export function connectionStart(): IConnectionStart {
  return { type: ConnectionStart };
}

export function connectionSuccess(): IConnectionSuccess {
  return { type: ConnectionSuccess };
}

export function connectionError(errorMsg?: string): IConnectionError {
  return { type: ConnectionError, errorMsg };
}

//
// Reducers
//

export default function reducer(
  state: IDecentGoApiStatus = { IsOk: false, IsPending: false },
  action: ConnectionAction
): IDecentGoApiStatus {
  switch (action.type) {
    case ConnectionStart:
      return { ...state, IsPending: true, IsOk: false };
    case ConnectionSuccess:
      return { ...state, IsPending: false, IsOk: true };
    case ConnectionError:
      return { ...state, IsPending: false, IsOk: false, IsError: true, Error: action.errorMsg };
    default:
      return state;
  }
}
