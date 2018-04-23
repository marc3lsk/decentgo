export interface IDecentGoState {
  ConnectionStatus: IDecentGoApiStatus;
  LoginStatus: IDecentGoApiStatus;
  InitStatus: IDecentGoApiStatus;
  DatabaseApiAccessStatus: IDecentGoApiStatus;
  AccountList: IDecentGoAccount[];
  AccountListStatus: IDecentGoApiStatus;
  AccountTransactionHistory: IDecentGoAccountTransactionHistory[];
  AccountTransactionHistoryStatus: IDecentGoApiStatus;
  InternalState: IDecentGoInternalState;
}

export interface IDecentGoApiStatus {
  IsPending: boolean;
  IsOk: boolean;
  IsError?: boolean;
  Error?: string;
  CorrelationId?: string | number;
}

export interface IDecentGoAccount {
  AccountName: string;
  AccountId: string;
}

export interface IDecentGoAccountTransactionHistory {
  AccountId: string;
  From: string;
  To: string;
  Amount: number;
}

export interface IDecentGoInternalState {
  WebSocketConnection?: WebSocket;
  IsLoggedIn: boolean;
  DatabaseApiId?: number;
  DelayedActionQueue: any[];
  WebSocketRequestIdCounter: number;
  WebSocketCallbackMapping: IWebSocketRequestStateMapping;
}

interface IWebSocketRequestStateMapping { [id: number]: IWebSocketRequestState; }

export interface IWebSocketRequestState {
  WebSocketRequestIdCounter: number;
  callback: any;
}
