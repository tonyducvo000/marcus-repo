
import {BrowserRouter as Router, Route, Switch} from 'reat-router-dom';

import reactDom from 'react-dom';

function App() {
  return (
    <React.Fragment> 
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/" component={Home} />
          <Route exact path="/" component={Home} />
          <Route  component={404} />

        </Switch>

      </Router>

    </React.Fragment>    
  );
}

export default App;
