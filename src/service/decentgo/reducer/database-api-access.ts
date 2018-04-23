import { IDecentGoApiStatus } from "../model";

//
// ActionConstants
//

export type DatabaseApiAccessStart = "decentgo/DatabaseApiAccessStart";
export const DatabaseApiAccessStart: DatabaseApiAccessStart = "decentgo/DatabaseApiAccessStart";

export type DatabaseApiAccessSuccess = "decentgo/DatabaseApiAccessSuccess";
export const DatabaseApiAccessSuccess: DatabaseApiAccessSuccess = "decentgo/DatabaseApiAccessSuccess";

export type DatabaseApiAccessError = "decentgo/DatabaseApiAccessError";
export const DatabaseApiAccessError: DatabaseApiAccessError = "decentgo/DatabaseApiAccessError";

export interface IDatabaseApiAccessStart {
  type: DatabaseApiAccessStart;
}
export interface IDatabaseApiAccessSuccess {
  type: DatabaseApiAccessSuccess;
}
export interface IDatabaseApiAccessError {
  type: DatabaseApiAccessError;
  errorMsg?: string;
}

export type DatabaseApiAccessAction = IDatabaseApiAccessStart | IDatabaseApiAccessSuccess | IDatabaseApiAccessError;

//
// Action creators
//

export function databaseApiAccessStart(): IDatabaseApiAccessStart {
  return { type: DatabaseApiAccessStart };
}

export function databaseApiAccessSuccess(): IDatabaseApiAccessSuccess {
  return { type: DatabaseApiAccessSuccess };
}

export function databaseApiAccessError(errorMsg?: string): IDatabaseApiAccessError {
  return { type: DatabaseApiAccessError, errorMsg };
}

//
// Reducers
//

export default function reducer(
  state: IDecentGoApiStatus = { IsOk: false, IsPending: false },
  action: DatabaseApiAccessAction
): IDecentGoApiStatus {
  switch (action.type) {
    case DatabaseApiAccessStart:
      return { ...state, IsPending: true, IsOk: false };
    case DatabaseApiAccessSuccess:
      return { ...state, IsPending: false, IsOk: true };
    case DatabaseApiAccessError:
      return { ...state, IsPending: false, IsOk: false, IsError: true, Error: action.errorMsg };
    default:
      return state;
  }
}
