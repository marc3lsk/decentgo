import * as React from "react";
import { connect } from "react-redux";

import { RouteComponentProps, Route, match as IMatch } from "react-router";
import { Link } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

import {
  IDecentGoAccount,
  IDecentGoApiStatus,
  IDecentGoAccountTransactionHistory,
  fetchAccountList,
  fetchAccountTransactionHistory
} from "@-/service/decentgo";
import { IAppState } from "@-/store/model";

import AccountList from "./components/AccountList";
import AccountTransactionHistory from "./components/AccountTransactionHistory";
import { makeAccountSelectedAction } from "./reducer";

interface IHomeConnectedActions {
  fetchAccountList: typeof fetchAccountList;
  fetchAccountTransactionHistory: typeof fetchAccountTransactionHistory;
  connectedAccountSelectedAction: typeof makeAccountSelectedAction;
}

interface IHomePropsFromStore {
  accountId?: string;
  accounts: IDecentGoAccount[];
  fetchAccountListStatus: IDecentGoApiStatus;
  accountTransactionHistory: IDecentGoAccountTransactionHistory[];
}

interface IHomeProps extends IHomePropsFromStore, IHomeConnectedActions, RouteComponentProps<any> {}

class Home extends React.Component<IHomeProps, object> {
  public componentDidMount(): void {
    this.props.fetchAccountList();
  }

  public render(): React.ReactElement<object> {
    return (
      <Container className="mt-5">
        <Row>
          <Col md="3">
            {true ===
              (this.props.fetchAccountListStatus.IsPending === false &&
                this.props.accounts.length === 0) && <p>no accounts ...</p>}
            {true ===
              (this.props.fetchAccountListStatus.IsPending === true &&
                this.props.accounts.length === 0) && <p>fetching accounts ...</p>}
            <AccountList
              accounts={this.props.accounts}
              connectedAccountSelectedAction={this.props.connectedAccountSelectedAction}
            />
          </Col>
          <Col md="9">
            <Route path={`/:accountId`} component={AccountTransactionHistory} />
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state: IAppState): IHomePropsFromStore {
  return {
    accountId: state.homePage.AccountId,
    accounts: state.decentgo.AccountList,
    fetchAccountListStatus: state.decentgo.AccountListStatus,
    accountTransactionHistory: state.decentgo.AccountTransactionHistory
  };
}

const mapDispatchToProps = {
  fetchAccountList,
  fetchAccountTransactionHistory,
  connectedAccountSelectedAction: makeAccountSelectedAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
