import { combineReducers } from 'redux';
import questionL from './questionL.reducer';
import questionE from './questionE.reducer';
import questionPL from './questionPL.reducer';

export default combineReducers({
    questionL,
    questionE,
    questionPL,
});
