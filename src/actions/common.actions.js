import axios from 'axios';
import { SEARCH_URL } from '../constants/requests';
import { GET_QUESTIONS_FAILURE, GET_QUESTIONS_START, GET_QUESTIONS_SUCCESS } from '../constants/results';


const defaultErrors = {
    getQuestionsError: 'Произошла ошибка! Не удалось получить вопросы.',
};

export const resetQuestions = () => ({ type: GET_QUESTIONS_START });

const getQuestionsStart = () => ({ type: GET_QUESTIONS_START });
const getQuestionsFailure = error => ({ type: GET_QUESTIONS_FAILURE, payload: { error } });
const getQuestionsSuccuess = data => ({ type: GET_QUESTIONS_SUCCESS, payload: { data } });

export function getQuestions (query) {
    return (dispatch) => {
        dispatch(getQuestionsStart());
        return axios({
            method: 'get',
            url: `${SEARCH_URL}&q=${query}`,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data: { items } = {} }) => {
            dispatch(getQuestionsSuccuess(items));
        }).catch(() => {
            dispatch(getQuestionsFailure(defaultErrors.getQuestionsError));
        });
    };
}
