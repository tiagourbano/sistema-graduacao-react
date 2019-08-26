import {
    GET_ALL_CLIENTS,
    ADD_CLIENT,
    UPDATE_CLIENT,
    REMOVE_CLIENT,
    SET_ORDER,
    SET_SEARCH,
    SET_UPDATE_CLIENT
 } from '../actions/types';

 export default (state = { order: "a-z", search: "" }, action) => {
    switch(action.type) {
        case GET_ALL_CLIENTS:
            return {
                ...state,
                clients: action.data
            };
        case ADD_CLIENT:
            return {
                ...state,
                clients: state.clients.concat([action.client])
            };
        case UPDATE_CLIENT:
            return {
                ...state,
                client: null,
                clients: state.clients.map((_client) => (_client.id === action.client.id) ? action.client : _client)
            };
        case REMOVE_CLIENT:
            return {
                ...state,
                clients: state.clients.filter((_client) => _client.id !== action.id)
            };
        case SET_ORDER:
            return {
                ...state,
                order: action.order
            }
        case SET_SEARCH:
            return {
                ...state,
                search: action.search
            }
        case SET_UPDATE_CLIENT:
            return {
                ...state,
                client: action.client
            }
        default:
            return state;
    }
}
