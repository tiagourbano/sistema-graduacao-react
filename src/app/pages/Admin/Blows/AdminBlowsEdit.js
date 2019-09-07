import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import api from '../../../services/api';

export default function AdminBlowsEdit({ history, match }) {
  const [belts, setBelts] = useState([]);
  const [form, setForm] = useState({
    belt: '',
    description: '',
    videos: '',
  });

  useEffect(() => {
    async function loadBelts() {
      const response = await api.get('/belts');
      setBelts(response.data);
    }

    loadBelts();
  });

  useEffect(() => {
    async function loadBlowInformation() {
      const response = await api.get(`/blows/${match.params.beltId}`);
      const {belt, description, videos} = response.data;
      setForm({
        belt: belt._id,
        description: description.join('\n'),
        videos: videos.join('\n')
      });
    }

    loadBlowInformation();
  }, [match.params.beltId]);

  const handleValueChanges = name => event => {
    setForm({ ...form, [name]: event.target.value });
  };

  async function handleSubmit(ev) {
    ev.preventDefault();

    const response = await api.put(`/blows/${match.params.id}`, {
      belt: form.belt,
      description: form.description.split('\n'),
      videos: form.videos.split('\n'),
    });

    if (response.status === 200) {
      alert('Golpe atualizado com sucesso!');
      history.push('/admin/golpes');
    }
  }

  return (
    <div className="Blow">
      <h1>Editar Golpes</h1>

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="form-group">
          <TextField
            id="standard-select-belt"
            select
            label="Faixa"
            value={form.belt}
            onChange={handleValueChanges('belt')}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          >
            {belts.map(belt => (
              <MenuItem key={belt._id} value={belt._id}>
                {belt.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="form-group">
          <TextField
            id="standard-multiline-description"
            label="Golpes"
            multiline
            rows="6"
            value={form.description}
            onChange={handleValueChanges('description')}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="form-group">
          <TextField
            id="standard-multiline-videos"
            label="Vídeos"
            multiline
            rows="6"
            value={form.videos}
            onChange={handleValueChanges('videos')}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="form-group">
          <br />
          <Button type="submit" variant="contained" color="primary" disableFocusRipple>
          Atualizar
          </Button>
        </div>
      </form>
    </div>
  )
}
