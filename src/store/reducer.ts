import { combineReducers, Reducer } from "redux";
import { routerReducer } from "react-router-redux";
import { IAppState } from "./model";
import { rootReducer as dgRootReducer } from "@-/service/decentgo";
import { IDecentGoState } from "@-/service/decentgo/model";
import { homePageReducer } from "@-/ui/home";

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  routing: routerReducer,
  decentgo: dgRootReducer,
  homePage: homePageReducer as any
});
