import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import moment from 'moment';
import * as _ from 'lodash';

import api from '../../../services/api';
import history from '../../../history';

import './AdminExamsAvaliation.scss';

export default function AdminExamsAvaliation({ match }) {
  const [students, setStudents] = useState([]);
  const [dateExam, setDateExam] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    async function getStudentsByExam() {
      try {
        const studentsResponse = await api.get(`/users/exam/${match.params.examId}`);
        if (studentsResponse.data !== "") {
          const filterUserHistoryBelt = filterHistoryBelt(studentsResponse.data);
          setStudents(filterUserHistoryBelt);
        }
      } catch (error) {
        console.error(error);
      }
    }

    function filterHistoryBelt(users) {
      const newUsers = [];
      users.forEach((user) => {
        const isApplied = user.historyBelt.some((history) => !_.isNil(history.examId) && history.examId._id === match.params.examId);
        if (isApplied) {
          const historyBelt = user.historyBelt.filter((history) => !_.isNil(history.examId) && history.examId._id === match.params.examId);
          user.historyBelt = historyBelt[0];
          newUsers.push(user);
        }
      });

      return newUsers;
    }

    getStudentsByExam();
  }, [match.params.examId]);

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


  const columns = [
    {
      name: "_id",
      label: "USER ID",
      options: {
        filter: false,
        display: 'excluded',
      }
    },
    {
      name: "historyBelt.examId._id",
      label: "EXAM ID",
      options: {
        filter: false,
        display: 'excluded',
      }
    },
    {
      name: "historyBelt.appliedBelt._id",
      label: "BELT ID",
      options: {
        filter: false,
        display: 'excluded',
      }
    },
    {
      name: "name",
      label: "Nome",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "historyBelt.currentBelt.name",
      label: "Faixa/Grau atual",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "historyBelt.appliedBelt.name",
      label: "Faixa/Grau pretendido",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "historyBelt.status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          let statusT;
          let icon;

          switch(value) {
            case 'pending':
              statusT = 'Pendente';
              icon = <ThumbsUpDownIcon className={value} />
              break;
            case 'failed':
              statusT = 'Reprovado';
              icon = <ThumbDownIcon className={value} />
              break;
            case 'approved':
              statusT = 'Aprovado';
              icon = <ThumbUpIcon className={value} />
              break;
            default:
              break;
          }

          return (
            <Tooltip title={statusT} placement="top">
              {icon}
            </Tooltip>
          )
        },
      }
    },
    {
      name: "action",
      label: "Ações",
      options: {
        display: true,
        print: false,
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Tooltip title="Avaliar Aluno" placement="top">
                <IconButton onClick={() => {
                  history.push(`/admin/exames/aluno/avaliar/${tableMeta.rowData[0]}/${tableMeta.rowData[1]}/${tableMeta.rowData[2]}`)
                }}>
                  <FontDownloadIcon />
                </IconButton>
              </Tooltip>
            </>
          );
        }
      }
    },
  ];

  const options = {
    filterType: 'multiselect',
    selectableRows: 'none',
    print: false,
    download: false,
    textLabels: {
      body: {
        noMatch: "Desculpa, nenhum aluno encontrado",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Próxima Página",
        previous: "Página Anterior",
        rowsPerPage: "Alunos por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Ver Colunas",
        filterTable: "Filtrar Tabela",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "LIMPAR",
      },
      viewColumns: {
        title: "Exibir Colunas",
        titleAria: "Exibir/Esconder Colunas da Tabela",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    }
  };

  return (
    <div className="Exams">
      <h1>Exame - { dateExam.startDate } à { dateExam.endDate }</h1>
      <MUIDataTable
        title="Listagem de Alunos aplicados"
        data={students}
        columns={columns}
        options={options}
      />
    </div>
  );
}
