import {findMember} from "../find-member";
import {Absence, Member} from "../../types";
import absenceList from "../../test/data/absences.json";
import memberList from "../../test/data/members.json";

describe("findMember function", () => {
    test("returns correct member", () => {
        const absence: Absence = absenceList[0] as Absence;
        const member: Member | undefined = findMember(absence.userId, memberList);
        expect(member).not.toBeUndefined();
        expect(member?.userId).toBe(absence.userId);
    });
});