import { RouterState } from "react-router-redux";
import { IDecentGoState } from "@-/service/decentgo/model";
import { IHomePageState } from "@-/ui/home";

export interface IAppState {
  routing: RouterState;
  decentgo: IDecentGoState;
  homePage: IHomePageState;
}
