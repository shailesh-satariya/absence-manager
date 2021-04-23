import {getAbsenceState} from "../get-absence-state";
import {Absence, AbsenceState} from "../../types";
import absenceList from "../../test/data/absences.json";

describe("findMember function", () => {
    test("returns correct state", () => {
        const absence: Absence = absenceList[0] as Absence;
        const state: AbsenceState = getAbsenceState(absence);
        expect(state.length).toBeGreaterThanOrEqual(1);
    });
});