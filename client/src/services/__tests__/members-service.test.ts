import moxios from "moxios";
import {AxiosResponse} from "axios";
import {fetchMembers} from "../members-service";
import membersList from "../../test/data/members.json";

describe("fetchMembers methods", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test("fetchMembers without error", () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: membersList
            });
        });

        return fetchMembers().then(
            (response: AxiosResponse) => {
                expect(response.status).toBe(200);
                expect(response.data.length).toBeGreaterThan(1);
            }
        );
    });
});