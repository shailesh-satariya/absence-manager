import {FETCH_ABSENCES_SUCCESS} from "../../action-types";
import AbsencesReducer from "../absences-reducer";
import absenceList from "../../../test/data/absences.json";
import {Absence} from "../../../types";

test("returns default initial state of `[]` when no action is passed", () => {
    const newState = AbsencesReducer([], {type: undefined});
    expect(newState).toEqual([]);
});

test("returns state of array of members upon receiving an action of type `FETCH_ABSENCES_SUCCESS`", () => {
    const absences: Absence[] = absenceList as Absence[];
    const newState = AbsencesReducer([], {
        type: FETCH_ABSENCES_SUCCESS,
        payload: [...absences]
    });
    expect(newState).toEqual(absences);
});
