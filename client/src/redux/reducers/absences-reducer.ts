import {Absence} from "../../types";
import {ActionTypes} from "../types";
import {FETCH_ABSENCES_SUCCESS} from "../action-types";

const initialState: Absence[] = [];

/**
 * @function AbsencesReducer
 *
 * @param {Absence[]} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {Absence[]} - New state.
 */
const AbsencesReducer = (state: Absence[] = initialState, action: ActionTypes): Absence[] => {
    switch (action.type) {
        case FETCH_ABSENCES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export default AbsencesReducer;