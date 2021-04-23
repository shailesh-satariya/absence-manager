import {
    FETCH_ABSENCES,
    FETCH_ABSENCES_SERVER_ERROR,
    FETCH_ABSENCES_SUCCESS,
    FETCH_MEMBERS,
    FETCH_MEMBERS_SERVER_ERROR,
    FETCH_MEMBERS_SUCCESS,
    NO_SERVER_ERROR,
    SERVER_ERROR
} from "../action-types";
import {Absence, Member} from "../../types";

interface DefaultAction {
    type: undefined | null;
}

interface FetchAbsencesAction {
    type: typeof FETCH_ABSENCES;
}

interface FetchAbsencesServerErrorAction {
    type: typeof FETCH_ABSENCES_SERVER_ERROR;
}

interface FetchAbsencesSuccessAction {
    type: typeof FETCH_ABSENCES_SUCCESS;
    payload: Absence[];
}

interface FetchMembersAction {
    type: typeof FETCH_MEMBERS;
}

interface FetchMembersServerErrorAction {
    type: typeof FETCH_MEMBERS_SERVER_ERROR;
}

interface FetchMembersSuccessAction {
    type: typeof FETCH_MEMBERS_SUCCESS;
    payload: Member[];
}

interface ServerError {
    type: typeof SERVER_ERROR;
}

interface NoServerError {
    type: typeof NO_SERVER_ERROR;
}

export type ActionTypes =
    | DefaultAction
    | FetchAbsencesAction
    | FetchAbsencesServerErrorAction
    | FetchAbsencesSuccessAction
    | FetchMembersAction
    | FetchMembersServerErrorAction
    | FetchMembersSuccessAction
    | ServerError
    | NoServerError;
