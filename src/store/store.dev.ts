import { applyMiddleware, compose, createStore, Store } from "redux";
import { IAppState } from "./model";
import { rootReducer } from "./reducer";
import { routerMiddleware } from "react-router-redux";
import { History } from "history";
import { fakeMiddleware as dgMiddleware } from "@-/service/decentgo";

interface IHotModule {
  hot?: { accept: (path: string, callback: () => void) => void };
}

declare const require: (name: String) => any;
declare const module: IHotModule;

export function configureStore(history: History): Store<IAppState> {
  const routingMiddleware = routerMiddleware(history);
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = composeEnhancers(applyMiddleware(routingMiddleware, ...dgMiddleware));

  const result = createStore<IAppState>(rootReducer, enhancers);

  if (module.hot) {
    module.hot.accept("./reducer", () => {
      const nextRootReducer: any = require("./reducer").rootReducer;
      result.replaceReducer(nextRootReducer);
    });
  }

  return result;
}
