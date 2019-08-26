import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import './index.scss';
import logo from './img/logo.png';

class MenuBar extends Component {
  state = {
    menuBarOpen: true
  }

  toogleMenuBar = () => {
    let { menuBarOpen } = this.state;
    menuBarOpen = !menuBarOpen;

    this.setState({
      menuBarOpen: menuBarOpen
    })
  }

  render() {
    const { menuBarOpen } = this.state;

    return (
      <div className={`MenuBar ${menuBarOpen ? 'open' : 'close'}`}>
        <div className="logo" onClick={this.toogleMenuBar}>
          <img src={ logo } alt="Barbante Jiu-Jitsu" />
          <h1>Barbante Jiu-Jitsu</h1>
        </div>
        <Divider />

        <List component="nav">
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/exames">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Exames" />
          </ListItem>
          <ListItem button component={Link} to="/faixas">
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Faixas" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default MenuBar;
