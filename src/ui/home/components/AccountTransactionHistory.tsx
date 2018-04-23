import * as React from "react";
import { RouteComponentProps, Route, match as IRouteMatch } from "react-router";

import {
  IDecentGoAccount,
  IDecentGoApiStatus,
  IDecentGoAccountTransactionHistory,
  fetchAccountTransactionHistory
} from "@-/service/decentgo";
import { IAppState } from "@-/store/model";
import { connect } from "react-redux";

interface IAccountTransactionHistoryPropsFromStore {
  accountId?: string;
  accounts: IDecentGoAccount[];
  accountTransactionHistory: IDecentGoAccountTransactionHistory[];
  accountTransactionHistoryStatus: IDecentGoApiStatus;
}

interface IAccountTransactionHistoryConnectedActions extends RouteComponentProps<any> {
  fetchAccountTransactionHistory: typeof fetchAccountTransactionHistory;
}

interface IAccountTransactionHistoryProps
  extends IAccountTransactionHistoryPropsFromStore,
    IAccountTransactionHistoryConnectedActions,
    RouteComponentProps<any> {}

class AccountTransactionHistory extends React.Component<IAccountTransactionHistoryProps, object> {
  public componentDidUpdate(): void {
    if (
      this.props.accountTransactionHistoryStatus.CorrelationId !==
        this.props.match.params.accountId ||
      (!this.props.accountTransactionHistoryStatus.IsPending &&
        !this.props.accountTransactionHistoryStatus.IsOk)
    ) {
      this.props.fetchAccountTransactionHistory(this.props.match.params.accountId);
    }
  }

  public render(): React.ReactElement<object> {
    const account = this.props.accounts.filter(
      x => x.AccountId === this.props.match.params.accountId
    )[0];
    return (
      <>
        {this.props.accountTransactionHistoryStatus.IsPending && (
          <p>fetching transaction history ...</p>
        )}
        {!this.props.accountTransactionHistoryStatus.IsPending &&
          account && (
            <>
              <h1>
                {account.AccountName} <small>({account.AccountId})</small>
              </h1>
              <p>Transaction history</p>
              {this.props.accountTransactionHistory.length === 0 && <p>no transactions ...</p>}
              {this.props.accountTransactionHistory.length > 0 && (
                <table className="table">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.accountTransactionHistory.map((accountTransactionHistory, i) => (
                      <tr key={i}>
                        <td>{accountTransactionHistory.From}</td>
                        <td>{accountTransactionHistory.To}</td>
                        <td>{accountTransactionHistory.Amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
      </>
    );
  }
}

function mapStateToProps(state: IAppState): IAccountTransactionHistoryPropsFromStore {
  return {
    accountId: state.homePage.AccountId,
    accounts: state.decentgo.AccountList,
    accountTransactionHistory: state.decentgo.AccountTransactionHistory,
    accountTransactionHistoryStatus: state.decentgo.AccountTransactionHistoryStatus
  };
}

const mapDispatchToProps = {
  fetchAccountTransactionHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactionHistory);
