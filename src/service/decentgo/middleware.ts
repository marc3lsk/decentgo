import {
  InitStartAction,
  InitSucessAction,
  InitErrorAction
} from "@-/service/decentgo/reducer/init";
import {
  makeInitStartAction,
  makeInitSuccessAction,
  makeInitErrorAction
} from "@-/service/decentgo/reducer/init";

import {
  FinalAction,
  WebSocketConnectionAction,
  IsLoggedInAction,
  DatabaseApiIdAction,
  RegisterWebSocketCallback
} from "@-/service/decentgo/reducer/internal";
import {
  makeFinalAction,
  makeWebSocketConnectionAction,
  makeDelayedQueuedAction,
  makeRegisterWebSocketCallback,
  makeIsLoggedInAction,
  makeDatabaseApiIdAction
} from "@-/service/decentgo/reducer/internal";

import {
  ConnectionStart,
  ConnectionSuccess,
  ConnectionError
} from "@-/service/decentgo/reducer/connection";
import {
  connectionStart,
  connectionSuccess,
  connectionError
} from "@-/service/decentgo/reducer/connection";

import { LoginStart, LoginSuccess, LoginError } from "@-/service/decentgo/reducer/login";
import { loginStart, loginSuccess, loginError } from "@-/service/decentgo/reducer/login";

import {
  DatabaseApiAccessStart,
  DatabaseApiAccessSuccess,
  DatabaseApiAccessError
} from "@-/service/decentgo/reducer/database-api-access";
import {
  databaseApiAccessStart,
  databaseApiAccessSuccess,
  databaseApiAccessError
} from "@-/service/decentgo/reducer/database-api-access";

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

import { IDecentGoState, IDecentGoAccount, IDecentGoAccountTransactionHistory } from "./model";

import { urlDecentGoWebSocketApi } from "@-/service/decentgo";

interface IStateContainer {
  decentgo: IDecentGoState;
}

const ID_LOGIN = 1;
const ID_DATABASE_API_ACCESS = 2;

const actionInterceptorAsync = ({ dispatch, getState }) => next => action => {
  const { decentgo } = getState() as IStateContainer;
  if (action.type === FetchAccountList) {
    initializeWebSocketDatabaseApiAccessAndDispatchOrEnqueueAction(
      dispatch,
      decentgo,
      action,
      getState
    );
  }
  if (action.type === FetchAccountTransactionHistory) {
    initializeWebSocketDatabaseApiAccessAndDispatchOrEnqueueAction(
      dispatch,
      decentgo,
      action,
      getState
    );
  }
  if (action.type === FinalAction && action.finalAction.type === FetchAccountList) {
    const ws = decentgo.InternalState.WebSocketConnection;
    if (ws) {
      dispatch(
        makeRegisterWebSocketCallback(event => {
          const data = JSON.parse(event.data);
          const accounts = data.result.map(
            values =>
              ({
                AccountName: values[0],
                AccountId: values[1]
              } as IDecentGoAccount)
          );
          dispatch(dataForAccountList(accounts));
        })
      );
      ws.send(
        JSON.stringify({
          id: decentgo.InternalState.WebSocketRequestIdCounter,
          method: "call",
          params: [0, "lookup_accounts", ["", 100]]
        })
      );
    }
  }
  if (action.type === FinalAction && action.finalAction.type === FetchAccountTransactionHistory) {
    const ws = decentgo.InternalState.WebSocketConnection;
    if (ws) {
      dispatch(
        makeRegisterWebSocketCallback(event => {
          const data = JSON.parse(event.data);
          console.log("account history weird data", data);
          const accountTransactionHistory = (data.result || [])
            .filter(x => x.op && x.op.length > 1 && x.op[1].from && x.op[1].to && x.op[1].amount)
            .map(result => {
              const op = result.op.slice(1, 2)[0];
              return {
                AccountId: action.finalAction.accountId,
                From: op.from,
                To: op.to,
                Amount: op.amount.amount
              } as IDecentGoAccountTransactionHistory;
            });
          dispatch(dataForAccountTransactionHistory(accountTransactionHistory));
        })
      );
      ws.send(
        JSON.stringify({
          id: decentgo.InternalState.WebSocketRequestIdCounter,
          method: "call",
          params: [
            decentgo.InternalState.DatabaseApiId,
            "get_relative_account_history",
            [action.finalAction.accountId, 1, 100, 10000]
          ]
        })
      );
    }
  }
  return next(action);
};

function initializeWebSocketDatabaseApiAccessAndDispatchOrEnqueueAction(
  dispatch: any,
  decentgoState: IDecentGoState,
  delayedAction: any,
  getState: any
): void {
  if (!decentgoState.InitStatus.IsPending && !decentgoState.InitStatus.IsOk) {
    dispatch(makeInitStartAction());
    dispatch(connectionStart());
    const ws = new WebSocket(urlDecentGoWebSocketApi);
    ws.addEventListener("message", event => {
      const data = JSON.parse(event.data);
      if (data.id === ID_LOGIN) {
        dispatch(makeIsLoggedInAction());
        dispatch(loginSuccess());
        dispatch(databaseApiAccessStart());
        ws.send(
          JSON.stringify({
            id: ID_DATABASE_API_ACCESS,
            method: "call",
            params: [1, "history", []]
          })
        );
      } else if (data.id === ID_DATABASE_API_ACCESS) {
        dispatch(makeInitSuccessAction());
        dispatch(makeDatabaseApiIdAction(data.result));
        dispatch(databaseApiAccessSuccess());
        const { decentgo } = getState() as IStateContainer;
        decentgo.InternalState.DelayedActionQueue.forEach(enqueuedDelayedAction =>
          dispatch(makeFinalAction(enqueuedDelayedAction))
        );
        dispatch(makeFinalAction(delayedAction));
      } else {
        const { decentgo } = getState() as IStateContainer;
        if (decentgo.InternalState.WebSocketCallbackMapping[data.id]) {
          decentgo.InternalState.WebSocketCallbackMapping[data.id].callback(event);
        }
      }
    });
    ws.onopen = event => {
      dispatch(connectionSuccess());
      dispatch(makeWebSocketConnectionAction(ws));
      ws.send(
        JSON.stringify({
          id: ID_LOGIN,
          method: "call",
          params: [1, "login", ["", ""]]
        })
      );
    };
  } else if (decentgoState.InitStatus.IsPending) {
    dispatch(makeDelayedQueuedAction(delayedAction));
  } else if (decentgoState.InitStatus.IsOk) {
    dispatch(makeFinalAction(delayedAction));
  }
}

export default [actionInterceptorAsync];
