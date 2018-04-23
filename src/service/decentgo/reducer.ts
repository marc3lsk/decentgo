import { combineReducers, Reducer } from "redux";

import InitReducer from "@-/service/decentgo/reducer/init";
import InternalReducer from "@-/service/decentgo/reducer/internal";
import ConnectionReducer from "@-/service/decentgo/reducer/connection";
import LoginReducer from "@-/service/decentgo/reducer/login";
import DatabaseApiAccessReducer from "@-/service/decentgo/reducer/database-api-access";
import {
  accountListReducer,
  accountListStatusReducer
} from "@-/service/decentgo/reducer/account-list";
import {
  dataReducer as accountTransactionHistoryReducer,
  statusReducer as accountTransactionHistoryStatusReducer
} from "@-/service/decentgo/reducer/account-transaction-history";
import { IDecentGoState } from "@-/service/decentgo/model";

export default combineReducers<IDecentGoState>({
  InitStatus: InitReducer,
  ConnectionStatus: ConnectionReducer,
  LoginStatus: LoginReducer,
  DatabaseApiAccessStatus: DatabaseApiAccessReducer,
  AccountList: accountListReducer,
  AccountListStatus: accountListStatusReducer,
  AccountTransactionHistory: accountTransactionHistoryReducer as any, // TYPESCRIPT ???
  AccountTransactionHistoryStatus: accountTransactionHistoryStatusReducer as any,
  InternalState: InternalReducer
});
