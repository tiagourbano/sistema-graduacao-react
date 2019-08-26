import React, { Component } from 'react';

import './application.scss';
import MenuBar from './MenuBar';
import Content from './Content';

class Application extends Component {
  render() {
    return (
      <div className="Application">
        <MenuBar />
        <Content />
      </div>
    );
  }
}

export default Application;
