import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FlagIcon from '@material-ui/icons/Flag';
import moment from 'moment';

import api from '../../../services/api';
import history from '../../../history';
import './index.scss';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getStudents() {
      try {
        const students = await api.get('/users');
        students.data.map((student) => {
          student['dob'] = moment().diff(student.dob, 'years', false);
          return student;
        })
        setStudents(students.data);
      } catch (error) {
        console.error(error);
      }
    }

    getStudents();
  }, []);

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
      name: "name",
      label: "Nome",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "email",
      label: "E-mail",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "currentBelt.name",
      label: "Faixa",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "phone",
      label: "Telefone",
      options: {
        filter: false,
        sort: false,
        display: false,
      }
    },
    {
      name: "dob",
      label: "Idade",
      options: {
        filter: true,
        sort: true,
        display: false,
      }
    },
    {
      name: "active",
      label: "Ativo",
      options: {
        display: true,
        filter: false,
        sort: false,
        // filterType: 'custom',
        // customFilterListRender: v => v ? "Aluno Ativo" : "Aluno Inativo",
        // filterOptions: {
        //   names: ["Aluno Ativo", "Aluno Inativo"],
        //   logic(active, filterVal) {
        //     console.log(active, filterVal);
        //     if (filterVal.indexOf('Aluno Ativo')) {
        //       return "Aluno Ativo";
        //     }

        //     if (filterVal.indexOf('Aluno Inativo')) {
        //       return "Aluno Inativo";
        //     }
        //   }
        // },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Tooltip title={value ? "Aluno Ativo" : "Aluno Inativo"} placement="top">
              <FlagIcon className={value ? "active" : "inactive"} />
            </Tooltip>
            // value ? "Ativo" : "Inativo"
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
            <Tooltip title="Editar" placement="top">
              <IconButton onClick={() => {
                history.push(`/admin/alunos/${tableMeta.rowData[0]}`)
              }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          );
        }
      }
    },
   ];

   const options = {
     filterType: 'multiselect',
     selectableRows: 'none',
    //  print: false,
    //  download: false,
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
    <div className="Students">
      <h1>Alunos</h1>
      <MUIDataTable
        title="Listagem de Alunos"
        data={students}
        columns={columns}
        options={options}
      />
    </div>
  );
}
