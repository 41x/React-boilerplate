import axios from 'axios';
import {
    SEARCH_URL, questionByIdUrl, answersByQuestionIdUrl,
    questionsByTag, questionsByUserIdUrl
} from '../constants/requests';
import {
    GET_ANSWERS_BY_QUESTION_ID_FAILURE, GET_ANSWERS_BY_QUESTION_ID_START,
    GET_ANSWERS_BY_QUESTION_ID_SUCCESS, GET_QUESTION_BY_ID_FAILURE,
    GET_QUESTION_BY_ID_START, GET_QUESTION_BY_ID_SUCCESS, GET_QUESTIONS_BY_TAG_FAILURE,
    GET_QUESTIONS_BY_TAG_START, GET_QUESTIONS_BY_TAG_SUCCESS, GET_QUESTIONS_BY_USER_ID_FAILURE,
    GET_QUESTIONS_BY_USER_ID_START, GET_QUESTIONS_BY_USER_ID_SUCCESS, GET_QUESTIONS_FAILURE,
    GET_QUESTIONS_START, GET_QUESTIONS_SUCCESS, RESET_E, RESET_L, RESET_PL, SET_AUTHOR, SET_TAG
} from '../constants/results';


const defaultErrors = {
    getQuestionsError: 'Произошла ошибка! Не удалось получить вопросы.',
    getQuestionsByTagError: 'Произошла ошибка! Не удалось получить вопросы по тегу.',
    getQuestionsByUserIdError: 'Произошла ошибка! Не удалось получить вопросы пользователя.',
    getQuestionError: 'Произошла ошибка! Не удалось получить данные вопроса.',
    getAnswersError: 'Произошла ошибка! Не удалось получить ответы по данному вопросу.',
};

export const resetL = () => ({ type: RESET_L });
export const resetPL = () => ({ type: RESET_PL });
export const resetE = () => ({ type: RESET_E });

const getQuestionsStart = () => ({ type: GET_QUESTIONS_START });
const getQuestionsFailure = error => ({ type: GET_QUESTIONS_FAILURE, payload: { error } });
const getQuestionsSuccess = data => ({ type: GET_QUESTIONS_SUCCESS, payload: { data } });

/**
 * Получить вопросы по строке запроса.
 * @param {string} query - Строка запроса.
 */
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
            dispatch(getQuestionsSuccess(items));
        }).catch(() => {
            dispatch(getQuestionsFailure(defaultErrors.getQuestionsError));
        });
    };
}

const getQuestionByIdStart = () => ({ type: GET_QUESTION_BY_ID_START });
const getQuestionByIdFailure = error => ({ type: GET_QUESTION_BY_ID_FAILURE, payload: { error } });
const getQuestionByIdSuccess = data => ({ type: GET_QUESTION_BY_ID_SUCCESS, payload: { data } });

/**
 * Получить данные вопроса по id.
 * @param {string} id - id вопроса.
 */
export function getQuestionById (id) {
    return (dispatch) => {
        dispatch(getQuestionByIdStart());
        return axios({
            method: 'get',
            url: questionByIdUrl(id),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data: { items } = {} }) => {
            dispatch(getQuestionByIdSuccess(items));
        }).catch(() => {
            dispatch(getQuestionByIdFailure(defaultErrors.getQuestionError));
        });
    };
}

const getAnswersByQuestionIdStart = () => ({ type: GET_ANSWERS_BY_QUESTION_ID_START });
const getAnswersByQuestionIdFailure = error => ({
    type: GET_ANSWERS_BY_QUESTION_ID_FAILURE,
    payload: { error }
});
const getAnswersByQuestionIdSuccess = data => ({
    type: GET_ANSWERS_BY_QUESTION_ID_SUCCESS,
    payload: { data }
});

/**
 * Получить ответы по id вопроса.
 * @param {string} id - id вопроса.
 */
export function getAnswersByQuestionId (id) {
    return (dispatch) => {
        dispatch(getAnswersByQuestionIdStart());
        return axios({
            method: 'get',
            url: answersByQuestionIdUrl(id),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data: { items } = {} }) => {
            dispatch(getAnswersByQuestionIdSuccess(items));
        }).catch(() => {
            dispatch(getAnswersByQuestionIdFailure(defaultErrors.getQuestionError));
        });
    };
}

const getQuestionsByTagStart = () => ({ type: GET_QUESTIONS_BY_TAG_START });
const getQuestionsByTagFailure = error => ({
    type: GET_QUESTIONS_BY_TAG_FAILURE,
    payload: { error }
});
const getQuestionsByTagSuccess = data => ({
    type: GET_QUESTIONS_BY_TAG_SUCCESS,
    payload: { data }
});
const setTag = tag => ({
    type: SET_TAG,
    payload: { tag }
});

/**
 * Получить вопросы по тегу.
 * @param {string} tag.
 */
export function getQuestionsByTag (tag) {
    return (dispatch) => {
        dispatch(getQuestionsByTagStart());
        return axios({
            method: 'get',
            url: questionsByTag(tag),
            headers: { 'Content-Type': 'application/json' },
        }).then(({ data: { items } = {} }) => {
            dispatch(getQuestionsByTagSuccess(items));
            dispatch(setTag(tag));
        }).catch(() => {
            dispatch(getQuestionsByTagFailure(defaultErrors.getQuestionsByTagError));
        });
    };
}

const getQuestionsByUserIdStart = () => ({ type: GET_QUESTIONS_BY_USER_ID_START });
const getQuestionsByUserIdFailure = error => ({
    type: GET_QUESTIONS_BY_USER_ID_FAILURE,
    payload: { error }
});
const getQuestionsByUserIdSuccess = data => ({
    type: GET_QUESTIONS_BY_USER_ID_SUCCESS,
    payload: { data }
});
const setAuthor = author => ({
    type: SET_AUTHOR,
    payload: { author }
});

/**
 * Получить вопросы по user id.
 * @param {string} userId - Идентификатор пользователя.
 * @param {string} author - Имя автора.
 */
export function getQuestionsByUserId (userId, author) {
    return (dispatch) => {
        dispatch(getQuestionsByUserIdStart());
        return axios({
            method: 'get',
            url: questionsByUserIdUrl(userId),
            headers: { 'Content-Type': 'application/json' },
        }).then(({ data: { items } = {} }) => {
            const questions = items || [];
            // sorting by view count
            const sorted = questions.sort((a, b) => {
                return (b.view_count || 0) - (a.view_count || 0);
            });
            dispatch(getQuestionsByUserIdSuccess(sorted));
            if (author) {
                dispatch(setAuthor(author));
            }
        }).catch(() => {
            dispatch(getQuestionsByUserIdFailure(defaultErrors.getQuestionsByUserIdError));
        });
    };
}
