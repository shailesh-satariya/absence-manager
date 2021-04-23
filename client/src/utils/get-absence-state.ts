import {Absence, AbsenceState} from "../types";

/**
 * Gets absence state
 *
 * @param absence
 *
 * @return AbsenceState
 */
export const getAbsenceState: (absence: Absence) => AbsenceState = (absence: Absence): AbsenceState => {
    if (absence.confirmedAt !== null) {
        return AbsenceState.Confirmed;
    } else if (absence.rejectedAt !== null) {
        return AbsenceState.Rejected;
    }

    return AbsenceState.Requested;
};