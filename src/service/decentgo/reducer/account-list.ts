import { IDecentGoAccount, IDecentGoApiStatus } from "../model";

//
// ActionConstants
//

export type FetchAccountList = "decentgo/FetchAccountList";
export const FetchAccountList: FetchAccountList = "decentgo/FetchAccountList";

export type DataForAccountList = "decentgo/DataForAccountList";
export const DataForAccountList: DataForAccountList = "decentgo/DataForAccountList";

export interface IFetchAccountList {
  type: FetchAccountList;
}

export interface IDataForAccountList {
  type: DataForAccountList;
  accounts: IDecentGoAccount[];
}

export type AccountAction = IFetchAccountList | IDataForAccountList;

//
// Action creators
//

export function fetchAccountList(): IFetchAccountList {
  return { type: FetchAccountList };
}

export function dataForAccountList(accounts: IDecentGoAccount[]): IDataForAccountList {
  return { type: DataForAccountList, accounts };
}

//
// Reducers
//

export function accountListReducer(
  state: IDecentGoAccount[] = [],
  action: AccountAction
): IDecentGoAccount[] {
  switch (action.type) {
    case DataForAccountList:
    {
      return action.accounts;
    }
    default:
      return [...state];
  }
}

export function accountListStatusReducer(
  state: IDecentGoApiStatus = { IsPending: false, IsOk: false },
  action: AccountAction
): IDecentGoApiStatus {
  switch (action.type) {
    case FetchAccountList:
    {
      return { ...state, IsPending: true, IsOk: false };
    }
    case DataForAccountList:
    {
      return { ...state, IsPending: false, IsOk: true };
    }
    default:
      return state;
  }
}
