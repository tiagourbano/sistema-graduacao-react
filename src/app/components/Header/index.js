import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import './index.scss';

const auth = true;

class Header extends Component {
  state = {
    profileMenuOpen: false,
    anchorEl: null,
  }

  toogleMenu = (event) => {
    let { profileMenuOpen } = this.state;
    profileMenuOpen = !profileMenuOpen;

    this.setState({
      profileMenuOpen: profileMenuOpen,
      anchorEl: event.currentTarget
    });
  }

  render() {
    const { profileMenuOpen, anchorEl } = this.state;

    return (
      <div className="Header">
        <AppBar position="static">
          <Toolbar>
            <div className="space"> </div>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.toogleMenu}
                  color="inherit"
                >
                  <AccountCircle />
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
                  onClose={this.toogleMenu}
                >
                  <MenuItem onClick={this.toogleMenu} component={Link} to="/meus-dados" >Meus Dados</MenuItem>
                  <MenuItem onClick={this.toogleMenu} component={Link} to="/sair" >Sair</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
