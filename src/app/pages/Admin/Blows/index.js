import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import api from '../../../services/api';
import history from '../../../history';
import CustomToolbar from '../../../components/CustomToolbarDatatable/CustomToolbar';

export default function AdminBlows() {
  const [blows, setBlows] = useState([]);

  useEffect(() => {
    async function getBlows() {
      try {
        const blowsResponse = await api.get('/blows');
        if (blowsResponse.data !== "") {
          setBlows(blowsResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getBlows();
  }, []);

  function handleAddBlow() {
    history.push('/admin/golpes/novo');
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
      name: "belt._id",
      label: "BeltID",
      options: {
        filter: false,
        display: 'excluded',
      }
    },
    {
      name: "belt.name",
      label: "Faixa",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "videos",
      label: "Vídeos",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            value.length > 0 && value[0] !== '' ? "Sim" : "Não"
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
                  history.push(`/admin/golpes/editar/${tableMeta.rowData[0]}/${tableMeta.rowData[1]}`)
                }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Remover" placement="top">
                <IconButton onClick={async () => {
                  if (window.confirm('Tem certeza que deseja remover estes golpes?')) {
                    const response = await api.delete('/blows', {
                      data: {
                        id: tableMeta.rowData[0]
                      }
                    });

                    if (response.status === 200) {
                      alert('Golpes apagado com sucesso!');
                      history.go(0);
                    } else {
                      alert('ERRO: Golpes não pode ser apagado!');
                    }
                  }
                }}>
                  <DeleteIcon />
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
    rowsPerPage: 20,
    pagination: false,
    customToolbar: () => {
      return (
        <CustomToolbar onClick={handleAddBlow} />
      );
    },
    textLabels: {
      body: {
        noMatch: "Desculpa, nenhum golpe encontrado",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Próxima Página",
        previous: "Página Anterior",
        rowsPerPage: "Golpes por página:",
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
      <h1>Golpes</h1>
      <MUIDataTable
        title="Listagem de Golpes"
        data={blows}
        columns={columns}
        options={options}
      />
    </div>
  );
}
