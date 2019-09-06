import 'date-fns';
import ptBrLocale from "date-fns/locale/pt-BR";
import React, { useEffect, useState } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import api from '../../../services/api';

export default function AdminExamsEdit({ history, match }) {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  function handleStartDateChange(date) {
    setSelectedStartDate(date);
  }

  function handleEndDateChange(date) {
    setSelectedEndDate(date);
  }

  useEffect(() => {
    async function loadUserInformation() {
      const response = await api.get(`/exams/${match.params.id}`);
      const {startDate, endDate} = response.data;
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
    }

    loadUserInformation();
  }, [match.params.id]);

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (moment(selectedStartDate).isAfter(moment(selectedEndDate))) {
      alert('Data de início deve ser antes da data de término');
      return;
    }

    const response = await api.put(`/exams/${match.params.id}`, {
      startDate: moment(selectedStartDate).utc().startOf('day').toDate(),
      endDate: moment(selectedEndDate).utc().endOf('day').toDate(),
    });

    if (response.status === 200) {
      alert('Exame atualizado com sucesso!');
      history.push('/admin/exames');
    }
  }

  return (
    <div className="Exam">
      <h1>Editar Exame</h1>

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="form-group">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data de início"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className="form-group">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data de término"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
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
