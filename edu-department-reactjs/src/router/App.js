import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../container/Home';
import Creative_Exp from '../container/Creative_Exp';
import NotFound from '../container/NotFound';
import Experience_Creative_Registed from '../component/Experience_Creative_Registed';
import Experience_Creative_Success from '../component/Experience_Creative_Success';
class App extends Component {
    render() {
      return (
          <div>
            <Router>
              <Switch>
                <Route path="/index" component={Home} />
                <Route exact path="/" component={Home} />
                <Route path="/trainghiemsangtao" component={Creative_Exp} />
                <Route path="/dangkitrainghiem_thanhcong" component={Experience_Creative_Success} />
                <Route path="/a" component={Experience_Creative_Registed} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
      );
    }
  }
  
  export default App;