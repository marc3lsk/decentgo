import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store } from "redux";
import { Provider } from "react-redux";
import { createHashHistory } from "history";
import { ConnectedRouter } from "react-router-redux";

import { IAppState } from "@-/store/model";
import { App } from "@-/ui/layout/App";

declare const require: (name: String) => any;

const history = createHashHistory();

const store: Store<IAppState> =
  process.env.NODE_ENV !== "production"
    ? (require("./store/store.dev") as any).configureStore(history)
    : (require("./store/store.prod") as any).configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter store={store} history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app")
);
