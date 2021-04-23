import {paginate} from "../paginate";
import {Absence} from "../../types";
import absenceist from "../../test/data/absences.json";

describe("paginate function", () => {
    test("returns correct paginated data", () => {
        const paginated: Absence[] = paginate(absenceist, 2, 10);
        expect(Array.isArray(paginated)).toBe(true);
        expect(paginated.length).toBe(10);
    });
});