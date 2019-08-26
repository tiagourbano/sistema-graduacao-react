import React from 'react';
import FacebookLogin from 'react-facebook-login';
import api from '../../services/api';
import history from '../../history';

// import { Container } from './styles';

export default function FacebookLoginComponent() {
  async function responseFacebook(response) {
    const authenticate = await api.post('/users/authenticate', {
      name: response.name,
      facebookId: response.userID
    });

    if (authenticate.status === 201) {
      localStorage.setItem('user', JSON.stringify({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
        user: authenticate.data.data
      }));
      history.push('/faixas');
    } else {
      localStorage.setItem('user', JSON.stringify({isLoggedIn: true}));
      history.push('/cadastro/' + response.userID);
    }
  };

  return(
    <FacebookLogin
      appId="896884760686690"
      autoLoad={false}
      reauthenticate={true}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  )
}
