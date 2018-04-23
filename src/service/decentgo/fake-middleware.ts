import { FetchAccountList } from "@-/service/decentgo/reducer/account-list";
import { fetchAccountList, dataForAccountList } from "@-/service/decentgo/reducer/account-list";

import {
  FetchAccountTransactionHistory,
  IFetchAccountTransactionHistory
} from "@-/service/decentgo/reducer/account-transaction-history";

import {
  fetchAccountTransactionHistory,
  dataForAccountTransactionHistory
} from "@-/service/decentgo/reducer/account-transaction-history";

export const fetchAccountListAsync = ({ dispatch, getState }) => next => action => {
  if (action.type === FetchAccountList) {
    setTimeout(
      () =>
        dispatch(
          dataForAccountList([
            { AccountId: "fake_1", AccountName: "first" },
            { AccountId: "fake_2", AccountName: "second" }
          ])
        ),
      1000
    );
  }
  return next(action);
};

export const fetchAccountTransactionHistoryAsync = ({ dispatch, getState }) => next => action => {
  if (action.type === FetchAccountTransactionHistory) {
    setTimeout(
      () =>
        dispatch(
          action.accountId === "fake_1"
            ? dataForAccountTransactionHistory([
                { AccountId: action.accountId, From: "first", To: "second", Amount: 122 },
                { AccountId: action.accountId, From: "second", To: "first", Amount: 221 }
              ])
            : dataForAccountTransactionHistory([])
        ),
      1000
    );
  }
  return next(action);
};

export default [fetchAccountListAsync, fetchAccountTransactionHistoryAsync];
