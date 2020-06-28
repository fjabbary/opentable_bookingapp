import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import AOS from 'aos';
import ReduxToastr from 'react-redux-toastr';


// Import scenes
import Home from './Home/Home';
import { history } from '../store';

class App extends React.Component {
  componentDidMount() {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: 'ease-in-out-sine',
      delay: 100
    });
  }

  render() {
    return (
      <main>
        <Router history={history}>
          <Switch>
            <Route path="/" render={props => <Home {...props} />} />
          </Switch>
        </Router>
        <ReduxToastr position="top-right" />
      </main>
    );
  }
}

export default App;
