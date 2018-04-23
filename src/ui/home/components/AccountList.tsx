import * as React from "react";
import { Link } from "react-router-dom";

import { ListGroup } from "reactstrap";

import {
  IDecentGoAccount
} from "@-/service/decentgo";

import { makeAccountSelectedAction } from "../reducer";

export default ({
  accounts,
  connectedAccountSelectedAction
}: {
  accounts: IDecentGoAccount[];
  connectedAccountSelectedAction: typeof makeAccountSelectedAction;
}) => (
  <ListGroup>
    {accounts.map(account => (
      <Link
        key={account.AccountId}
        to={`/${account.AccountId}`}
        onClick={event => connectedAccountSelectedAction(account.AccountId)}
        className="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1 text-truncate">{account.AccountName}</h5>
        </div>
        <p className="mb-1">{account.AccountId}</p>
      </Link>
    ))}
  </ListGroup>
);
