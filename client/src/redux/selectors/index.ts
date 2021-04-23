import {RootState} from "../store";

export const getFetchCount = (state: RootState) => state.fetchCount;
export const getAbsences = (state: RootState) => state.absences;
export const getMembers = (state: RootState) => state.members;
export const hasServerError = (state: RootState) => state.serverError;