import * as consts from '../constants/results';

const INITIAL_STATE = {};
const questionE = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case consts.GET_QUESTION_BY_ID_START: {
            return {
                ...state,
                questionLoading: true,
                questionLoadingError: undefined,
            };
        }

        case consts.GET_QUESTION_BY_ID_FAILURE: {
            return {
                ...state,
                questionLoading: false,
                questionLoadingError: action.payload.error,
            };
        }

        case consts.GET_QUESTION_BY_ID_SUCCESS: {
            return {
                ...state,
                questionLoading: false,
                question: action.payload.data[0],
            };
        }

        case consts.GET_ANSWERS_BY_QUESTION_ID_START: {
            return {
                ...state,
                answersLoading: true,
                answersLoadingError: undefined,
            };
        }

        case consts.GET_ANSWERS_BY_QUESTION_ID_FAILURE: {
            return {
                ...state,
                answersLoading: false,
                answersLoadingError: action.payload.error,
            };
        }

        case consts.GET_ANSWERS_BY_QUESTION_ID_SUCCESS: {
            return {
                ...state,
                answersLoading: false,
                answers: action.payload.data,
            };
        }

        case consts.RESET_E: {
            return INITIAL_STATE;
        }


        default:
            return state;
    }
};

export default questionE;
