import * as consts from '../constants/results';

const INITIAL_STATE = {};
const questionPL = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case consts.GET_QUESTIONS_BY_TAG_START: {
            return {
                ...state,
                questionsByTagLoading: true,
                questionsByTagLoadingError: undefined,
            };
        }

        case consts.GET_QUESTIONS_BY_TAG_FAILURE: {
            return {
                ...state,
                questionsByTagLoading: false,
                questionsByTagLoadingError: action.payload.error,
            };
        }

        case consts.GET_QUESTIONS_BY_TAG_SUCCESS: {
            return {
                ...state,
                questionsByTagLoading: false,
                questions: action.payload.data,
            };
        }

        case consts.GET_QUESTIONS_BY_USER_ID_START: {
            return {
                ...state,
                questionsByUserIdLoading: true,
                questionsByUserIdLoadingError: undefined,
            };
        }

        case consts.GET_QUESTIONS_BY_USER_ID_FAILURE: {
            return {
                ...state,
                questionsByUserIdLoading: false,
                questionsByUserIdLoadingError: action.payload.error,
            };
        }

        case consts.GET_QUESTIONS_BY_USER_ID_SUCCESS: {
            return {
                ...state,
                questionsByTagLoading: false,
                questions: action.payload.data,
            };
        }

        case consts.SET_TAG: {
            return {
                ...state,
                tag: action.payload.tag,
                author: undefined,
            };
        }

        case consts.SET_AUTHOR: {
            return {
                ...state,
                author: action.payload.author,
                tag: undefined,
            };
        }

        case consts.RESET_PL: {
            return INITIAL_STATE;
        }

        default:
            return state;
    }
};

export default questionPL;
