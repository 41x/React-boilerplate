import * as consts from '../constants/results';

const results = (state = {}, action) => {
    switch (action.type) {
        case consts.GET_QUESTIONS_START: {
            return {
                ...state,
                questionsLoading: true,
                questionsLoadingError: undefined,
            };
        }

        case consts.GET_QUESTIONS_FAILURE: {
            return {
                ...state,
                questionsLoading: false,
                questionsLoadingError: action.payload.error,
            };
        }

        case consts.GET_QUESTIONS_SUCCESS: {
            return {
                ...state,
                questionsLoading: false,
                questions: action.payload.data,
            };
        }

        default:
            return state;
    }
};

export default results;
