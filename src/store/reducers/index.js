// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import student from './student';
import major from './major';
import itb from './itb';
import gratitude from './gratitude';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, student, major, itb, gratitude });

export default reducers;
