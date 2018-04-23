import { IDecentGoApiStatus, IDecentGoAccountTransactionHistory } from "../model";

//
// ActionConstants
//

export type FetchAccountTransactionHistory = "decentgo/FetchAccountTransactionHistory";
export const FetchAccountTransactionHistory: FetchAccountTransactionHistory = "decentgo/FetchAccountTransactionHistory";

export type DataForAccountTransactionHistory = "decentgo/DataForAccountTransactionHistory";
export const DataForAccountTransactionHistory: DataForAccountTransactionHistory = "decentgo/DataForAccountTransactionHistory";

export interface IFetchAccountTransactionHistory {
  type: FetchAccountTransactionHistory;
  accountId: string;
}

export interface IDataForAccountTransactionHistory {
  type: DataForAccountTransactionHistory;
  history: IDecentGoAccountTransactionHistory[];
}

export type AccountTransactionHistoryAction = IFetchAccountTransactionHistory | IDataForAccountTransactionHistory;

//
// Action creators
//

export function fetchAccountTransactionHistory(accountId: string): IFetchAccountTransactionHistory {
  return { type: FetchAccountTransactionHistory, accountId };
}

export function dataForAccountTransactionHistory(history: IDecentGoAccountTransactionHistory[]): IDataForAccountTransactionHistory {
  return { type: DataForAccountTransactionHistory, history };
}

//
// Reducers
//

export function dataReducer(
  state: IDecentGoAccountTransactionHistory[] = [],
  action: AccountTransactionHistoryAction
): IDecentGoAccountTransactionHistory[] {
  switch (action.type) {
    case DataForAccountTransactionHistory:
    {
      return action.history;
    }
    default:
      return [...state];
  }
}

export function statusReducer(
  state: IDecentGoApiStatus = { IsPending: false, IsOk: false },
  action: AccountTransactionHistoryAction
): IDecentGoApiStatus {
  switch (action.type) {
    case FetchAccountTransactionHistory:
    {
      return { ...state, IsPending: true, IsOk: false, CorrelationId: action.accountId };
    }
    case DataForAccountTransactionHistory:
    {
      return { ...state, IsPending: false, IsOk: true };
    }
    default:
      return state;
  }
}
