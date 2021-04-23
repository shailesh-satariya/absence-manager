import {
    FETCH_ABSENCES,
    FETCH_ABSENCES_SERVER_ERROR,
    FETCH_ABSENCES_SUCCESS,
    FETCH_MEMBERS,
    FETCH_MEMBERS_SERVER_ERROR,
    FETCH_MEMBERS_SUCCESS
} from "../action-types";
import {ActionTypes} from "../types";

const initialState: number = 0;

/**
 * @function FetchCountReducer
 *
 * @param {number} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {number} - New state.
 */
const FetchCountReducer = (state: number = initialState, action: ActionTypes): number => {
    switch (action.type) {
        case FETCH_ABSENCES:
        case FETCH_MEMBERS:
            return ++state;
        case FETCH_ABSENCES_SUCCESS:
        case FETCH_ABSENCES_SERVER_ERROR:
        case FETCH_MEMBERS_SUCCESS:
        case FETCH_MEMBERS_SERVER_ERROR:
            return --state;
        default:
            return state;
    }
};

export default FetchCountReducer;
