import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputMask from 'react-input-mask';
import moment from 'moment';

import api from '../../services/api';
import './index.scss';

export default function Index({ history, match }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    belt: '',
    dob: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    async function loadUserInformation() {
      const user = JSON.parse(localStorage.getItem('user')).user;
      const response = await api.get(`/users/${user.id}`);
      const {name, email, currentBelt, dob, phone, address} = response.data;
      setForm({
        name,
        email,
        belt: currentBelt.name,
        dob: moment(dob).format('DD/MM/YYYY'),
        phone,
        address
      });
    }

    loadUserInformation();
  }, []);

  const handleValueChanges = name => event => {
    setForm({ ...form, [name]: event.target.value });
  };

  async function handleSubmit(ev) {
    ev.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const response = await api.put(`/users/${user.user.id}`, {
      name: form.name,
      email: form.email,
      dob: moment(form.dob, 'DD/MM/YYYY').toDate(),
      phone: form.phone,
      address: form.address
    });

    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify({
        ...user,
        user: {
          ...user.user,
          name: form.name,
          email: form.email,
          dob: form.dob,
          phone: form.phone,
          address: form.address
        }
      }));
      alert('Dados atualizados com sucesso!');
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
            required
          />
        </div>

        <div className="form-group">
          <TextField
            id="standard-email"
            label="E-mail"
            value={form.email}
            onChange={handleValueChanges('email')}
            margin="normal"
            required
          />
        </div>

        <div className="form-group">
          <InputMask
            mask="99/99/9999"
            value={form.dob}
            onChange={handleValueChanges('dob')}
          >
            {() => <TextField
              id="standard-dob"
              label="Data de Nascimento"
              name="dob"
              margin="normal"
              type="text"
              required
              />}
          </InputMask>
        </div>

        <div className="form-group">
          <InputMask
            mask="(99) 99999-9999"
            value={form.phone}
            onChange={handleValueChanges('phone')}
          >
            {() => <TextField
              id="standard-phone"
              label="Celular"
              name="phone"
              margin="normal"
              type="text"
              required
              />}
          </InputMask>
        </div>

        <div className="form-group">
          <TextField
            id="standard-address"
            label="Endereço"
            value={form.address}
            onChange={handleValueChanges('address')}
            margin="normal"
            required
          />
        </div>

        <div className="form-group">
          <TextField
            id="standard-select-currency"
            label="Faixa atual"
            value={form.belt}
            margin="normal"
            disabled
          />
        </div>

        <div className="form-group">
          <br />
          <Button type="submit" variant="contained" color="primary" disableFocusRipple>
          Atualizar Dados
          </Button>
        </div>
      </form>
    </div>
  )
}
