import {AxiosResponse} from "axios";
import {Dispatch} from "redux";
import {
    FETCH_ABSENCES,
    FETCH_ABSENCES_SERVER_ERROR,
    FETCH_ABSENCES_SUCCESS,
    FETCH_MEMBERS,
    FETCH_MEMBERS_SERVER_ERROR,
    FETCH_MEMBERS_SUCCESS,
    NO_SERVER_ERROR
} from "../action-types";
import * as Services from "../../services";
import {Absence, Member} from "../../types";


/**
 * Returns Redux Thunk function that dispatches NO_SERVER_ERROR action
 * @function setNoServerError
 *
 * @returns {function} - Redux Thunk function.
 */
export const setNoServerError = () => (dispatch: Dispatch) => {
    dispatch({type: NO_SERVER_ERROR});
};

/**
 * Dispatch axios action to fetch absences
 * @param dispatch
 *
 * @return Promise
 */
export const fetchAbsencesDispatch = (dispatch: Dispatch): Promise<void> => {
    const addAbsencesFn = (absences: Absence[]): void => {
        dispatch({
            type: FETCH_ABSENCES_SUCCESS,
            payload: absences
        });
    };

    dispatch({
        type: FETCH_ABSENCES
    });

    return Services.fetchAbsences().then((response: AxiosResponse) => {
        addAbsencesFn(response.data);
    }).catch(() => {
        dispatch({type: FETCH_ABSENCES_SERVER_ERROR});
    });
};

/**
 * Dispatch axios action to fetch members
 * @param dispatch
 *
 * @return Promise
 */
export const fetchMembersDispatch = (dispatch: Dispatch): Promise<void> => {
    const addMembersFn = (members: Member[]): void => {
        dispatch({
            type: FETCH_MEMBERS_SUCCESS,
            payload: members
        });
    };

    dispatch({
        type: FETCH_MEMBERS
    });

    return Services.fetchMembers().then((response: AxiosResponse) => {
        addMembersFn(response.data);
    }).catch(() => {
        dispatch({type: FETCH_MEMBERS_SERVER_ERROR});
    });
};


/**
 * Returns Redux Thunk function that dispatches FETCH_ABSENCES action
 *     after axios promise resolves
 * @function fetchAbsencesDispatch
 * @returns {function} - Redux Thunk function.
 */
export const fetchAbsences = () => {
    return fetchAbsencesDispatch;
};

/**
 * Returns Redux Thunk function that dispatches FETCH_MEMBERS action
 *     after axios promise resolves
 * @function fetchAbsencesDispatch
 * @returns {function} - Redux Thunk function.
 */
export const fetchMembers = () => {
    return fetchMembersDispatch;
};
