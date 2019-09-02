import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import BeltIcon from '../Icons/Belt';

import { isAdmin } from '../../auth';

import './index.scss';
import logo from './img/logo.png';

class MenuBar extends Component {
  state = {
    menuBarOpen: true,
    menuColor: '#450204'
  }

  toogleMenuBar = () => {
    let { menuBarOpen } = this.state;
    menuBarOpen = !menuBarOpen;

    this.setState({
      menuBarOpen: menuBarOpen
    })
  }

  handleClick = (item) => {
    this.setState({menuColor: '#450204'})

    if (item.currentTarget.textContent === 'Faixas') {
      this.setState({menuColor: '#FFFFFF'})
    }
  }

  render() {
    const { menuBarOpen, menuColor } = this.state;

    return (
      <div className={`MenuBar ${menuBarOpen ? 'open' : 'close'}`}>
        <div className="logo" onClick={this.toogleMenuBar}>
          <img src={ logo } alt="Barbante Jiu-Jitsu" />
          <h1>Barbante Jiu-Jitsu</h1>
        </div>
        <Divider />

        <List component="nav">
          <ListItem button component={NavLink} to="/" exact activeClassName="active-item" onClick={this.handleClick.bind('home')}>
            <ListItemIcon>
              <HomeIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={NavLink} to="/exames" exact activeClassName="active-item" onClick={this.handleClick.bind('exames')}>
            <ListItemIcon>
              <ListAltIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Exames" />
          </ListItem>
          <ListItem button component={NavLink} to="/faixas" exact activeClassName="active-item" onClick={this.handleClick.bind('faixas')}>
            <ListItemIcon>
              <BeltIcon fill={menuColor} width={40} height={40} />
            </ListItemIcon>
            <ListItemText primary="Faixas" />
          </ListItem>

          {
            isAdmin() && (
              <>
                <Divider />
                <ListItem button component={NavLink} to="/admin/alunos" exact activeClassName="active-item" onClick={this.handleClick.bind('alunos')}>
                  <ListItemIcon>
                    <GroupIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Alunos" />
                </ListItem>
              </>
            )
          }
        </List>
      </div>
    );
  }
}

export default MenuBar;
