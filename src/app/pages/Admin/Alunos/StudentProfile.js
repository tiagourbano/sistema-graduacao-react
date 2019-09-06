import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputMask from 'react-input-mask';
import SelectMultiChips from '../../../components/SelectMultiChips';
import moment from 'moment';

import api from '../../../services/api';
import './index.scss';

export default function Index({ history, match }) {
  const [belts, setBelts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    belt: '',
    dob: '',
    phone: '',
    address: '',
    active: '',
  });

  const [selectedRoles, setSelectedRoles] = useState([]);
  const roles = [
    { value: 'student', label: 'Aluno' },
    { value: 'admin', label: 'Admin' },
    { value: 'teacher', label: 'Professor' },
    { value: 'master', label: 'Mestre' },
  ];

  useEffect(() => {
    async function loadUserInformation() {
      const response = await api.get(`/users/${match.params.id}`);
      const {name, email, currentBelt, dob, phone, address, active} = response.data;
      setForm({
        name,
        email,
        belt: currentBelt._id,
        dob: moment(dob).format('DD/MM/YYYY'),
        phone,
        address,
        active,
      });

      setSelectedRoles(roles.filter((role) => response.data.roles.includes(role.value)));
    }

    loadUserInformation();
  }, [match.params.id]);

  useEffect(() => {
    async function loadBelts() {
      const response = await api.get('/belts');
      setBelts(response.data);
    }

    loadBelts();
  }, [match.params.id]);

  const handleValueChanges = name => event => {
    setForm({ ...form, [name]: event.target.value });
  };

  function handleChangeMulti(value) {
    setSelectedRoles(value);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    const response = await api.put(`/users/${match.params.id}`, {
      name: form.name,
      email: form.email,
      dob: moment(form.dob, 'DD/MM/YYYY').toDate(),
      phone: form.phone,
      address: form.address,
      currentBelt: form.belt,
      active: form.active,
      roles: selectedRoles.map((role) => role.value),
    });

    if (response.status === 200) {
      alert('Dados atualizados com sucesso!');
      history.push('/admin/alunos');
    }
  }

  return (
    <div className="Profile">
      <h1>Dados</h1>
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
            id="standard-select-belt"
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
          <FormControl component="fieldset">
            <FormLabel component="legend">O aluno está:</FormLabel>
            <RadioGroup
              name="active"
              value={`${form.active}`}
              onChange={handleValueChanges('active')}
            >
              <FormControlLabel value="true" control={<Radio />} label="Ativo" />
              <FormControlLabel value="false" control={<Radio />} label="Inativo" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="form-group">
          <SelectMultiChips
            label="Papel"
            placeholder=""
            options={roles}
            selectedOptions={selectedRoles}
            onChange={handleChangeMulti}
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
