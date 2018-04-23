import { IHomePageState } from "./model";

//
// ActionConstants
//

export type AccountSelectedAction = "home/AccountSelectedAction";
export const AccountSelectedAction: AccountSelectedAction = "home/AccountSelectedAction";

export interface IAccountSelectedAction {
  type: AccountSelectedAction;
  accountId: string;
}

export type HomeAction = IAccountSelectedAction;

//
// Action creators
//

export function makeAccountSelectedAction(accountId: string): IAccountSelectedAction {
  return { type: AccountSelectedAction, accountId };
}

//
// Reducers
//

export default function reducer(
  state: IHomePageState = { },
  action: HomeAction
): IHomePageState {
  switch (action.type) {
    case AccountSelectedAction:
    {
      return { ...state, AccountId: action.accountId };
    }
    default:
      return state;
  }
}
