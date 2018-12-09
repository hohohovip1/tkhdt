import React from "react";
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router'
import App from "./App";
import {NewUniversity} from "./new-u/new";
import {EditUniversity} from "./edit-u/edit";
export const browserHistory = createHistory();



export class AppRouter extends React.Component{

    render(){
        return(
          <Router history={browserHistory}>
            <Switch>
              <Route exact path="/" component={App}/>
              <Route exact path="/new" component={NewUniversity}/>
              <Route exact path="/edit/:uid" component={EditUniversity}/>
            </Switch>
          </Router>


        );
    }
}
