// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import gratitude from './gratitude';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, gratitude });

export default reducers;
