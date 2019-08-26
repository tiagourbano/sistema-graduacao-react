import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';

import store from './store';
import Application from './components/application';
import './index.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <Application />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
