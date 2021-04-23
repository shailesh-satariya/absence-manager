import ical from "ical-generator";
import download from "downloadjs";
import moment from "moment";
import {Absence, Member} from "../types";
import {findMember} from "./find-member";
import _ from "lodash";

/**
 * Creates ics calendar file
 *
 * @param absences
 * @param members
 */
export const createICalFile: (absences: Absence[], members: Member[]) => void = (absences: Absence[], members: Member[]): void => {
    const str: string = ical(
        {
            events: absences.map((absence: Absence) => {
                return {
                    start: moment(absence.startDate),
                    end: moment(absence.endDate || absence.startDate),
                    summary: (findMember(absence.userId, members)?.name || absence.userId.toString()) + " - " + _.startCase(_.toLower(absence.type)),
                    description: absence.memberNote
                };
            })
        }
    ).toString();

    download(str, "absences.ics", "text/calendar");
};