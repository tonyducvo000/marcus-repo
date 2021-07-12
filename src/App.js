import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
class App extends Component{
  render(){
    return(
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/" component={Home} />
            <Route path="/" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>

      </React.Fragment>
    )
  }
}
export default App;