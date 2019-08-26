import { combineReducers } from 'redux';
import clientsReducer from './clientsReducer';

const rootReducer = combineReducers({
    clients: clientsReducer
})

export default rootReducer;
