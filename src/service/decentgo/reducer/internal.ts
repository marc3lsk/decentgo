import { IDecentGoInternalState } from "../model";

//
// ActionConstants
//

export type FinalAction = "decentgo/FinalAction";
export const FinalAction: FinalAction = "decentgo/FinalAction";

export type DelayedQueuedAction = "decentgo/DelayedQueuedAction";
export const DelayedQueuedAction: DelayedQueuedAction =
  "decentgo/DelayedQueuedAction";

export type WebSocketConnectionAction = "decentgo/WebSocketConnectionAction";
export const WebSocketConnectionAction: WebSocketConnectionAction =
  "decentgo/WebSocketConnectionAction";

export type IsLoggedInAction = "decentgo/IsLoggedInAction";
export const IsLoggedInAction: IsLoggedInAction = "decentgo/IsLoggedInAction";

export type DatabaseApiIdAction = "decentgo/DatabaseApiIdAction";
export const DatabaseApiIdAction: DatabaseApiIdAction =
  "decentgo/DatabaseApiIdAction";

export type RegisterWebSocketCallback = "decentgo/RegisterWebSocketCallback";
export const RegisterWebSocketCallback: RegisterWebSocketCallback =
  "decentgo/RegisterWebSocketCallback";

export interface IFinalAction {
  type: FinalAction;
  finalAction: any;
}

export interface IDelayedQueuedAction {
  type: DelayedQueuedAction;
  delayedAction: any;
}

export interface IWebSocketConnectionAction {
  type: WebSocketConnectionAction;
  webSocketConnection: WebSocket;
}

export interface IIsLoggedInAction {
  type: IsLoggedInAction;
}

export interface IDatabaseApiIdAction {
  type: DatabaseApiIdAction;
  databaseApiId: number;
}

export interface IRegisterWebSocketCallback {
  type: RegisterWebSocketCallback;
  callback: (event) => any;
}

export type InternalAction =
  | IWebSocketConnectionAction
  | IIsLoggedInAction
  | IDatabaseApiIdAction
  | IDelayedQueuedAction
  | IRegisterWebSocketCallback;

//
// Action creators
//

export function makeFinalAction(finalAction: any): IFinalAction {
  return { type: FinalAction, finalAction };
}

export function makeDelayedQueuedAction(
  delayedAction: any
): IDelayedQueuedAction {
  return { type: DelayedQueuedAction, delayedAction };
}

export function makeWebSocketConnectionAction(
  webSocketConnection: WebSocket
): IWebSocketConnectionAction {
  return { type: WebSocketConnectionAction, webSocketConnection };
}

export function makeIsLoggedInAction(): IIsLoggedInAction {
  return { type: IsLoggedInAction };
}

export function makeDatabaseApiIdAction(
  databaseApiId: number
): IDatabaseApiIdAction {
  return { type: DatabaseApiIdAction, databaseApiId };
}

export function makeRegisterWebSocketCallback(callback: (event: any) => any): IRegisterWebSocketCallback {
  return { type: RegisterWebSocketCallback, callback}
}

//
// Reducers
//

export default function reducer(
  state: IDecentGoInternalState = {
    IsLoggedIn: false,
    DelayedActionQueue: [],
    WebSocketRequestIdCounter: 1000,
    WebSocketCallbackMapping: {}
  },
  action: InternalAction
): IDecentGoInternalState {
  switch (action.type) {
    case WebSocketConnectionAction: {
      return { ...state, WebSocketConnection: action.webSocketConnection };
    }
    case IsLoggedInAction: {
      return { ...state, IsLoggedIn: true };
    }
    case DatabaseApiIdAction: {
      return { ...state, DatabaseApiId: action.databaseApiId };
    }
    case DelayedQueuedAction: {
      return {
        ...state,
        DelayedActionQueue: [...state.DelayedActionQueue, action.delayedAction]
      };
    }
    case RegisterWebSocketCallback: {
      const currentRequestIdCounter = state.WebSocketRequestIdCounter;
      return {
        ...state,
        WebSocketRequestIdCounter: state.WebSocketRequestIdCounter + 1,
        WebSocketCallbackMapping: { ...state.WebSocketCallbackMapping, [currentRequestIdCounter]: {WebSocketRequestIdCounter: currentRequestIdCounter, callback: action.callback } }
      };
    }
    default:
      return state;
  }
}
