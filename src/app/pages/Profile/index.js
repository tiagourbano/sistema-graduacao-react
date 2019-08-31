import React, { useEffect, useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../../services/api';

import './index.scss';

export default function Index({ history, match }) {
  const [belts, setBelts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    belt: ''
  });

  useEffect(() => {
    async function loadBelts() {
      const response = await api.get('/belts');
      setBelts(response.data);
    }

    loadBelts();
  }, [match.params.facebookId]);

  const handleValueChanges = name => event => {
    setForm({ ...form, [name]: event.target.value });
  };

  async function handleSubmit(ev) {
    ev.preventDefault();

    const response = await api.post('/users', {
      name: form.name,
      email: form.email,
      password: match.params.facebookId,
      currentBelt: form.belt,
      roles: ['student'],
      active: false
    });

    if (response.status === 201) {
      const currentUser = JSON.parse(localStorage.getItem('user'));

      localStorage.setItem('user', JSON.stringify({
        ...currentUser,
        user: response.data.data
      }));
      history.push('/faixas');
    }
  }

  return (
    <div className="Profile">
      <h1>Meus Dados</h1>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="form-group">
          <TextField
            id="standard-name"
            label="Nome"
            value={form.name}
            onChange={handleValueChanges('name')}
            margin="normal"
          />
        </div>

        <div className="form-group">
          <TextField
            id="standard-name"
            label="E-mail"
            value={form.email}
            onChange={handleValueChanges('email')}
            margin="normal"
          />
        </div>

        <div className="form-group">
          <TextField
            id="standard-select-currency"
            select
            label="Faixa atual"
            value={form.belt}
            onChange={handleValueChanges('belt')}
            margin="normal"
          >
            {belts.map(belt => (
              <MenuItem key={belt._id} value={belt._id}>
                {belt.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="form-group">
          <br />
          <Button type="submit" variant="contained" color="primary">
          Atualizar Dados
          </Button>
        </div>
      </form>
    </div>
  )
}
