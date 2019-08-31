import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateCurrentUser } from '../../actions/users';

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem('user');
    dispatch(updateCurrentUser(null));
  });

  return <Redirect to="/login" />;
}
