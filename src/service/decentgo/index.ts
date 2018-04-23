import {
  IDecentGoApiStatus,
  IDecentGoState,
  IDecentGoAccount,
  IDecentGoAccountTransactionHistory
} from "./model";
import rootReducer from "./reducer";
import middleware from "./middleware";
import _middleware from "./fake-middleware";
import { loginStart } from "./reducer/login";
import { fetchAccountList } from "./reducer/account-list";
import { fetchAccountTransactionHistory } from "./reducer/account-transaction-history";
const urlDecentGoWebSocketApi = "wss://stage.decentgo.com:8090/";

export {
  IDecentGoApiStatus,
  IDecentGoState,
  IDecentGoAccount,
  IDecentGoAccountTransactionHistory,
  rootReducer,
  middleware,
  loginStart,
  fetchAccountList,
  fetchAccountTransactionHistory,
  urlDecentGoWebSocketApi
};
