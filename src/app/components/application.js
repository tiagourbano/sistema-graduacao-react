import React from 'react';

import './application.scss';
import MenuBar from './MenuBar';
import Content from './Content';

export default function Application() {
  return (
    <div className="Application">
      <MenuBar />
      <Content />
    </div>
  );
}
