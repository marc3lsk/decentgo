import * as React from "react";
import { Route } from "react-router-dom";
import { HomePage, HomePageAccountList } from "./RoutePaths";
import { Home } from "../../ui/home";
import { RouteComponentProps, Switch } from "react-router";

const NoMatch = () => <h1 style={{ color: "red" }}>Page not found!</h1>;

export class App extends React.Component<object, object> {
  public render(): React.ReactElement<App> {
    return (
      <div>
        <Switch>
          <Route exact path={HomePage} component={Home} />
          <Route path={HomePageAccountList} component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
