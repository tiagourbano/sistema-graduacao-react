import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import moment from 'moment';

import api from '../../../services/api';
import history from '../../../history';
import CustomToolbar from '../../../components/CustomToolbarDatatable/CustomToolbar';

export default function AdminExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function getExams() {
      try {
        const examsResponse = await api.get('/exams/all');
        if (examsResponse.data !== "") {
          setExams(examsResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getExams();
  }, []);

  function handleAddExam() {
    history.push('/admin/exames/novo');
  }

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        filter: false,
        display: 'excluded',
      }
    },
    {
      name: "startDate",
      label: "Início",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            moment(value).format('DD/MM/YYYY')
          )
        },
      }
    },
    {
      name: "endDate",
      label: "Término",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            moment(value).format('DD/MM/YYYY')
          )
        },
      }
    },
    {
      name: "endDate",
      label: "Expirado",
      options: {
        display: true,
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            moment().isBefore(moment(value)) ? "Não" : "Sim"
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
              <Tooltip title="Editar" placement="top">
                <IconButton onClick={() => {
                  history.push(`/admin/exames/editar/${tableMeta.rowData[0]}`)
                }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Remover" placement="top">
                <IconButton onClick={async () => {
                  if (window.confirm('Tem certeza que deseja remover este exame?')) {
                    const response = await api.delete('/exams', {
                      data: {
                        id: tableMeta.rowData[0]
                      }
                    });

                    if (response.status === 200) {
                      alert('Exame apagado com sucesso!');
                      history.go(0);
                    } else {
                      alert('ERRO: Exame não pode ser apagado!');
                    }
                  }
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Avaliação" placement="top">
                <IconButton onClick={() => {
                  history.push(`/admin/exames/alunos/${tableMeta.rowData[0]}`)
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
    customToolbar: () => {
      return (
        <CustomToolbar onClick={handleAddExam} />
      );
    },
    textLabels: {
      body: {
        noMatch: "Desculpa, nenhum exame encontrado",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Próxima Página",
        previous: "Página Anterior",
        rowsPerPage: "Exames por página:",
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
      <h1>Exames</h1>
      <MUIDataTable
        title="Listagem de Exames"
        data={exams}
        columns={columns}
        options={options}
      />
    </div>
  );
}
