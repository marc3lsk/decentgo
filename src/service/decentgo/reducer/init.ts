import { IDecentGoApiStatus } from "../model";

//
// ActionConstants
//

export type InitStartAction = "decentgo/InitStartAction";
export const InitStartAction: InitStartAction = "decentgo/InitStartAction";

export type InitSucessAction = "decentgo/InitSucessAction";
export const InitSucessAction: InitSucessAction = "decentgo/InitSucessAction";

export type InitErrorAction = "decentgo/InitErrorAction";
export const InitErrorAction: InitErrorAction = "decentgo/InitErrorAction";

export interface IInitStartAction {
  type: InitStartAction;
}
export interface IInitSucessAction {
  type: InitSucessAction;
}
export interface IInitErrorAction {
  type: InitErrorAction;
  errorMsg?: string;
}

export type InitActionType = IInitStartAction | IInitSucessAction | IInitErrorAction;

//
// Action creators
//

export function makeInitStartAction(): IInitStartAction {
  return { type: InitStartAction };
}

export function makeInitSuccessAction(): IInitSucessAction {
  return { type: InitSucessAction };
}

export function makeInitErrorAction(errorMsg?: string): IInitErrorAction {
  return { type: InitErrorAction, errorMsg };
}

//
// Reducers
//

export default function reducer(
  state: IDecentGoApiStatus = { IsOk: false, IsPending: false },
  action: InitActionType
): IDecentGoApiStatus {
  switch (action.type) {
    case InitStartAction:
    {
      return { ...state, IsPending: true, IsOk: false };
    }
    case InitSucessAction:
    {
      return { ...state, IsPending: false, IsOk: true };
    }
    case InitErrorAction:
    {
      return { ...state, IsPending: false, IsOk: false, IsError: true, Error: action.errorMsg };
    }
    default:
      return state;
  }
}
