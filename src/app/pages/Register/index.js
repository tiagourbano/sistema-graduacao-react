import React, { useEffect, useState } from 'react'
import api from '../../services/api';

export default function Index({ history, match }) {
  const [belts, setBelts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    belt: ''
  });

  useEffect(() => {
    async function loadBelts() {
      console.log(match.params.facebookId);
      const response = await api.get('/belts');
      setBelts(response.data);
    }

    loadBelts();
  }, [match.params.facebookId]);

  function handleValueChanges(ev) {
    const {name, value} = ev.target;
    setForm({...form, [name]: value});
  }

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
      history.push('/faixas');
    }
  }

  return (
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="name" value={form.name} onChange={handleValueChanges} />
        </div>
        <div className="form-group">
          <label>E-mail:</label>
          <input type="email" name="email" value={form.email} onChange={handleValueChanges} />
        </div>
        <div className="form-group">
          <label>Faixa atual:</label>
          <select name="belt" onChange={handleValueChanges}>
            {
              belts.map((belt) => (
                <option value={belt._id} key={belt._id}>{belt.name}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <button type="submit">Salvar Dados</button>
        </div>
      </form>
    </div>
  )
}
