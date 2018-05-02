import { combineReducers } from 'redux';
import questionL from './questionL.reducer';
import questionE from './questionE.reducer';

export default combineReducers({
    questionL,
    questionE,
});
