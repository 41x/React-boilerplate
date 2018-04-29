import { TEST } from '../constants/results';

const results = (state = {}, action) => {
    switch (action.type) {
        case TEST: {
            return state;
        }

        default:
            return state;
    }
};

export default results;
