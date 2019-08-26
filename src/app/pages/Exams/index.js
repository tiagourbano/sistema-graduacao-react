import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import moment from 'moment';
import * as _ from 'lodash';

import './index.scss';

export default function Exams({ match }) {
  const [exams, setExams] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user')).user;
  const [nextBelt, setNextBelt] = useState({});

  useEffect(() => {
    async function getExams() {
      try {
        const examsResponse = await api.get('/exams');
        if (examsResponse.data !== "") {
          setExams(examsResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getExams();
  }, []);

  useEffect(() => {
    async function getBelts() {
      try {
        const beltsResponse = await api.get('/belts');
        const currentIndex = _.findIndex(beltsResponse.data, ['_id', currentUser.currentBelt]);
        setNextBelt(beltsResponse.data[currentIndex + 1]);
      } catch (error) {
        console.error(error);
      }
    }

    getBelts();
  }, [currentUser.currentBelt]);

  async function handleApplyExam() {
    const response = await api.patch(`/users/${currentUser.id}/apply-to-exam`);
    alert(response.data.message);
  }

  return (
    <div className="Exams">
      <h1>Próximo Exame</h1>
      <div>
        {
          (exams.length === 0)
            ? (<div className="empty">Ainda não há uma data definida para o próximo exame!</div>)
            : (
                <ul>
                  {
                    exams.map((exam) => (
                      <li key={exam._id}>
                        {moment(exam.startDate).utc().format('DD/MM/YYYY')} - {moment(exam.endDate).utc().format('DD/MM/YYYY')} | <span className="apply" onClick={handleApplyExam}>Aplicar para {nextBelt.name}</span>
                      </li>
                    ))
                  }
                </ul>
              )
        }
      </div>
    </div>
  );
}
