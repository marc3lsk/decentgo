import { applyMiddleware, compose, createStore, Store } from "redux";
import { IAppState } from "./model";
import { rootReducer } from "./reducer";
import { routerMiddleware } from "react-router-redux";
import { History } from "history";
import { middleware as dgMiddleware } from "@-/service/decentgo";

export function configureStore(history: History): Store<IAppState> {
  const routingMiddleware = routerMiddleware(history);
  const enhancers = compose(applyMiddleware(routingMiddleware, ...dgMiddleware));

  return createStore<IAppState>(rootReducer, enhancers);
}
