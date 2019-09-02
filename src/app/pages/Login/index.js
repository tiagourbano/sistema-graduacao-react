import React from 'react';
import FacebookLoginComponent from './../../components/FacebookLogin';

import './index.scss';

export default function Login() {
  return (
    <div className="Login">
      <div>
        <p>Para acessar a todo conteúdo, basta clicar no botão abaixo e fazer seu login.</p>
        <FacebookLoginComponent />
      </div>
    </div>
  );
}
