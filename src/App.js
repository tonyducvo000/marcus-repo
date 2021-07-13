import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Layout } from './components/Layout';

class App extends Component{
  render(){
    return(
      <React.Fragment>
        <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/" component={Home} />
            <Route path="/" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
        </Layout>

      </React.Fragment>
    )
  }
}
export default App;