import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { updateCurrentUser } from '../../actions/users';

import './index.scss';

const auth = true;

export default function Header () {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileImage = useSelector(state => state.user.profileImage);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileImage === null && currentUser && currentUser.picture) {
      dispatch(updateCurrentUser(currentUser.picture));
    }
  })

  function toogleMenu(event) {
    setProfileMenuOpen(!profileMenuOpen);
    setAnchorEl(event.currentTarget);
  }

  return (
    <div className="Header">
      <AppBar position="static">
        <Toolbar>
          <div className="space"> </div>
          {auth && (
            <div>
              <span className="welcome">Olá, seja bem-vindo!</span>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toogleMenu}
                color="inherit"
              >
                {
                  (profileImage)
                    ? <img src={profileImage} alt="Face" className="face-image" />
                    : <AccountCircle />
                }
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={profileMenuOpen}
                onClose={toogleMenu}
              >
                <MenuItem onClick={toogleMenu} component={Link} to="/meus-dados" >Meus Dados</MenuItem>
                <MenuItem onClick={toogleMenu} component={Link} to="/sair" >Sair</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
