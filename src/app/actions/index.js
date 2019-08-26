import {
    GET_ALL_CLIENTS,
    ADD_CLIENT,
    UPDATE_CLIENT,
    REMOVE_CLIENT,
    SET_ORDER,
    SET_SEARCH,
    SET_UPDATE_CLIENT
 } from './types';

const getDate = () => new Date().getTime();

const generateId = () => Math.floor(Math.random() * 100000 + 100000);

const prepareClient = (client) => {
    const id = generateId();
    const createdAt = getDate();
    const updatedAt = getDate();
    return { ...client, id, createdAt, updatedAt };
}

const data = [
    {
        id: 1,
        name: "Tiago",
        address: "Rua bla bla bla bla",
        email: "tiago@gmail.com",
        cpf: "000.000.000-00",
        createdAt: getDate(),
        updatedAt: getDate()
    },
    {
        id: 2,
        name: "Joao",
        address: "Rua teste te ste",
        email: "joao@gmail.com",
        cpf: "111.111.111-11",
        createdAt: getDate(),
        updatedAt: getDate()
    }
];


export const getAllClients = () => ({ type: GET_ALL_CLIENTS, data });

export const addClient = (client) => ({ type: ADD_CLIENT, client: prepareClient(client) });

export const updateClient = (id, client) => ({ type: UPDATE_CLIENT, client: { id, ...client, updatedAt: getDate()} });

export const removeClient = (id) => ({ type: REMOVE_CLIENT, id });

export const setOrder = (ev) => ({ type: SET_ORDER, order: ev.target.value });

export const setSearch = (ev) => ({ type: SET_SEARCH, search: ev.target.value });

export const setUpdateClient = (client) => ({ type: SET_UPDATE_CLIENT, client });
