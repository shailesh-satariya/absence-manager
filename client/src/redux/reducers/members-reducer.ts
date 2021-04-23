import {Member} from "../../types";
import {ActionTypes} from "../types";
import {FETCH_MEMBERS_SUCCESS} from "../action-types";

const initialState: Member[] = [];

/**
 * @function AbsencesReducer
 *
 * @param {Member[]} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {Member[]} - New state.
 */
const MembersReducer = (state: Member[] = initialState, action: ActionTypes): Member[] => {
    switch (action.type) {
        case FETCH_MEMBERS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export default MembersReducer;