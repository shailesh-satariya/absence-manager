import {combineReducers} from "redux";
import ServerErrorReducer from "./server-error-reducer";
import MembersReducer from "./members-reducer";
import AbsencesReducer from "./absences-reducer";
import FetchCountReducer from "./fetch-count-reducer";

export default combineReducers({
    absences: AbsencesReducer,
    fetchCount: FetchCountReducer,
    members: MembersReducer,
    serverError: ServerErrorReducer
});
