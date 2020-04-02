import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import moment from 'moment';
import * as _ from 'lodash';

import api from '../../../services/api';
import history from '../../../history';

import './AdminExamsAvaliationStudent.scss';

export default function AdminExamsAvaliation({ match }) {
  const [student, setStudents] = useState({});
  const [blows, setBlows] = useState({
    description: [],
    belt: {
      name: null
    },
    videos: []
  });
  const [dateExam, setDateExam] = useState({
    startDate: '',
    endDate: ''
  });
  const [qty, setQty] = useState({
    quantidade_0: 0,
    quantidade_1: 0,
    quantidade_2: 0,
    quantidade_3: 0,
    quantidade_4: 0,
    quantidade_5: 0,
    quantidade_6: 0,
    quantidade_7: 0,
    quantidade_8: 0,
    quantidade_9: 0,
    quantidade_10: 0,
  });
  const [form, setForm] = useState({
    note: '',
  });

  useEffect(() => {
    async function getStudentsByExam() {
      try {
        const studentResponse = await api.get(`/users/${match.params.userId}`);
        if (studentResponse.data !== "") {
          setStudents(studentResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getStudentsByExam();
  }, [match.params.userId]);

  useEffect(() => {
    async function loadExamInformation() {
      const response = await api.get(`/exams/${match.params.examId}`);
      const { startDate, endDate } = response.data;
      setDateExam({
        startDate: moment(startDate).format('DD/MM/YYYY'),
        endDate: moment(endDate).format('DD/MM/YYYY')
      });
    }

    loadExamInformation();
  }, [match.params.examId]);

  useEffect(() => {
    async function loadBlowsByBeltId() {
      const blowsResponse = await api.get(`/blows/${match.params.beltId}`);
      setBlows(blowsResponse.data);
    }

    loadBlowsByBeltId();
  }, [match.params.beltId]);

  const fillFormFields = () => {
    if (!_.isNil(student.historyBelt)) {
      student.historyBelt.forEach((history) => {
        if (history.examId === match.params.examId && history.status !== 'pending') {
          const quantidades = {};

          history.blows.forEach((value, id) => {
            const index = `quantidade_${id}`;
            quantidades[index] = value;
          });

          setForm({note: history.note});
          setQty(quantidades);
        }
      });
    }
  }

  useEffect(() => {
    fillFormFields();
  }, [match.params.examId, student]);

  function handleDecrement(id) {
    const index = `quantidade_${id}`;

    if (_.isNil(qty[index])) {
      setQty({...qty, [index]: 0});
    }

    if (qty[index] === 0 || isNaN(qty[index])) {
      setQty({...qty, [index]: 0});
    } else {
      let quantity = qty[index];
      quantity = quantity - 1;
      setQty({...qty, [index]: quantity});
    }
  };

  function handleIncrement(id) {
    const index = `quantidade_${id}`;

    if (_.isNil(qty[index])) {
      setQty({...qty, [index]: 1});
    }

    let quantity = qty[index];
    !isNaN(quantity)
      ? quantity = quantity + 1
      : quantity = 1;

    setQty({...qty, [index]: quantity });
  };

  const handleValueChanges = name => event => {
    setForm({ ...form, [name]: event.target.value });
  };

  async function handleApprove() {
    const historyBelt = handleUpdateHistoryBelt('approved');
    const studentResponse = await api.put(`/users/${match.params.userId}`, {
      currentBelt: match.params.beltId,
      historyBelt
    });

    if (studentResponse.status === 200) {
      alert('Aluno Aprovado!');
      history.push(`/admin/exames/alunos/${match.params.examId}`);
    }
  }

  async function handleFail() {
    const historyBelt = handleUpdateHistoryBelt('failed');
    const studentResponse = await api.put(`/users/${match.params.userId}`, {
      currentBelt: getCurrentBeltInExam(),
      historyBelt
    });

    if (studentResponse.status === 200) {
      alert('Aluno Reprovado!');
      history.push(`/admin/exames/alunos/${match.params.examId}`);
    }
  }

  function handleUpdateHistoryBelt(status) {
    const { historyBelt } = student;

    historyBelt.map((history) => {
      if (history.examId === match.params.examId) {
        history.blows = Object.values(qty);
        history.note = form.note;
        history.status = status;
      }
      return history;
    });

    return historyBelt;
  }

  function getCurrentBeltInExam() {
    const { historyBelt } = student;
    let currentBelt = '';

    historyBelt.forEach((history) => {
      if (history.examId === match.params.examId) {
        currentBelt = history.currentBelt._id;
      }
    });

    return currentBelt;
  }

  return (
    <div className="AdminExamsAvaliationStudent">
      <h1>Exame: { dateExam.startDate } à { dateExam.endDate }</h1>
      <h2>Aluno: { student.name }</h2>
      <h2>Faixa: { blows.belt.name }</h2>
      <form>
        {
          blows.description && blows.description.map((blow, id) => (
            <div key={id} className="blow-group">
              <div className="quantity">
                <IconButton disableRipple={true} disableFocusRipple={true} onClick={() => handleDecrement(id) }>
                  <RemoveCircleIcon />
                </IconButton>
                <IconButton disableRipple={true} disableFocusRipple={true} onClick={() => handleIncrement(id) }>
                  <AddCircleIcon />
                </IconButton>
                <TextField
                  id={"quantidade" + id}
                  label="Quantidade"
                  value={qty["quantidade_" + id]}
                  // onChange={handleChange(id)}
                  margin="normal"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="blow">
                {blow}
              </div>
              <br /><br />
            </div>
          ))
        }

        <div className="form-group">
          <TextField
            id="standard-multiline-note"
            label="Observações"
            multiline
            rows="6"
            value={form.note}
            onChange={handleValueChanges('note')}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="form-group">
          <Button
            variant="contained"
            className="failed"
            size="medium"
            onClick={() => handleFail()}
          >
            <ThumbDownIcon /> Reprovar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="approved"
            size="medium"
            onClick={() => handleApprove()}
          >
            Aprovar <ThumbUpIcon />
          </Button>
        </div>
      </form>
    </div>
  );
}
