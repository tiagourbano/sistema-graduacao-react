import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import BeltIcon from '../Icons/Belt';

import { isAdmin } from '../../auth';

import './index.scss';
import logo from './img/logo.png';

export default function MenuBar() {
  const [state, setState] = useState({
    menuBarOpen: true,
    menuColor: '#450204',
    selectedItem: -1
  });

  function toogleMenuBar() {
    setState({menuBarOpen: !state.menuBarOpen})
  }

  function handleClick(item) {
    setState({...state, menuColor: '#450204', selectedItem: item.currentTarget.textContent})

    if (item.currentTarget.textContent === 'Faixas') {
      setState({...state, menuColor: '#FFFFFF', selectedItem: item.currentTarget.textContent})
    }
  }

  const { menuBarOpen, menuColor, selectedItem } = state;
  return (
    <div className={`MenuBar ${menuBarOpen ? 'open' : 'close'}`}>
      <div className="logo" onClick={toogleMenuBar}>
        <img src={ logo } alt="Barbante Jiu-Jitsu" />
        <h1>Barbante Jiu-Jitsu</h1>
      </div>
      <Divider />

      <List component="nav">
        <ListItem button component={Link} to="/" selected={selectedItem === 'Home'} onClick={handleClick.bind('home')}>
          <ListItemIcon>
            <HomeIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/exames" selected={selectedItem === 'Exames'} onClick={handleClick.bind('exames')}>
          <ListItemIcon>
            <ListAltIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Exames" />
        </ListItem>
        <ListItem button component={Link} to="/faixas" selected={selectedItem === 'Faixas'} onClick={handleClick.bind('faixas')}>
          <ListItemIcon>
            <BeltIcon fill={menuColor} width={40} height={40} />
          </ListItemIcon>
          <ListItemText primary="Faixas" />
        </ListItem>
        <ListItem button component={Link} to="/defesa-pessoal" selected={selectedItem === 'Defesa Pessoal'} onClick={handleClick.bind('defesaPessoal')}>
          <ListItemIcon>
            <DirectionsWalkIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Defesa Pessoal" />
        </ListItem>

        {
          isAdmin() && (
            <>
              <Divider />
              <ListItem button component={Link} to="/admin/alunos" selected={selectedItem === 'Alunos'} onClick={handleClick.bind('alunos')}>
                <ListItemIcon>
                  <GroupIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Alunos" />
              </ListItem>
              <ListItem button component={Link} to="/admin/exames" selected={selectedItem === 'Exames Listagem'} onClick={handleClick.bind('examesListagem')}>
                <ListItemIcon>
                  <ListAltIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Exames Listagem" />
              </ListItem>
              <ListItem button component={Link} to="/admin/golpes" selected={selectedItem === 'Golpes Listagem'} onClick={handleClick.bind('examesListagem')}>
                <ListItemIcon>
                  <AccessibilityIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Golpes Listagem" />
              </ListItem>
            </>
          )
        }
      </List>
    </div>
  );
}
