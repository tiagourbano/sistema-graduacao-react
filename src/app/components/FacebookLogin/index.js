import React from 'react';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import api from '../../services/api';
import history from '../../history';

import { updateCurrentUser } from '../../actions/users';

export default function FacebookLoginComponent() {
  const dispatch = useDispatch();

  async function responseFacebook(response) {
    const authenticate = await api.post('/users/authenticate', {
      name: response.name,
      facebookId: response.userID
    });

    dispatch(updateCurrentUser(response.picture.data.url));

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
      localStorage.setItem('user', JSON.stringify({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
      }));
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
