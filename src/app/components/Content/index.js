import React, { Component } from 'react';

import Header from './../Header';
import Routes from '../../routes';
import './index.scss';

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <Header />
        <div className="content-wrap">
          <Routes />
        </div>
      </div>
    );
  }
}

export default Content;
