import moxios from "moxios";
import {AxiosResponse} from "axios";
import {fetchAbsences} from "../absences-service";
import absenceList from "../../test/data/absences.json";

describe("fetchAbsences methods", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test("fetchAbsences without error", () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: absenceList
            });
        });

        return fetchAbsences().then(
            (response: AxiosResponse) => {
                expect(response.status).toBe(200);
                expect(response.data.length).toBeGreaterThan(1);
            }
        );
    });
});