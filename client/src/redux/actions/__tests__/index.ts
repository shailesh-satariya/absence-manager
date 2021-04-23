import moxios from "moxios";
import {Store} from "redux";
import {fetchAbsencesDispatch, fetchMembersDispatch} from "..";
import membersList from "../../../test/data/members.json";
import absenceList from "../../../test/data/absences.json";

import {ActionTypes} from "../../types";
import {RootState} from "../../store";
import {storeFactory} from "../../../test/utils";
import {Absence, Member} from "../../../types";


describe("fetchAbsencesDispatch action creator", () => {
    let store: Store<RootState, ActionTypes>;

    beforeEach(() => {
        moxios.install();
        store = storeFactory();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test("adds response members to state", () => {
        const absences: Absence[] = absenceList as Absence[];

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [...absences]
            });
        });

        return store.dispatch<any>(fetchAbsencesDispatch).then(() => {
            const newState = store.getState();
            expect(newState.absences).toEqual(absences);
        });
    });

    describe("updates serverError state to `true`", () => {
        // NOTE: there's currently no way to simulate server nonresponse with moxios
        test("when server returns 4xx status", () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 404
                });
            });

            // @ts-ignore
            return (
                store
                    .dispatch<any>(fetchAbsencesDispatch)
                    // @ts-ignore
                    .then(() => {
                        const newState = store.getState();
                        expect(newState.serverError).toBe(true);
                    })
            );
        });

        test("when server returns 5xx status", () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 500
                });
            });

            return store.dispatch<any>(fetchAbsencesDispatch).then(() => {
                const newState = store.getState();
                expect(newState.serverError).toBe(true);
            });
        });
    });
});

describe("fetchMembersDispatch action creator", () => {
    let store: Store<RootState, ActionTypes>;

    beforeEach(() => {
        moxios.install();
        store = storeFactory();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test("adds response members to state", () => {
        const members: Member[] = membersList;

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [...members]
            });
        });

        return store.dispatch<any>(fetchMembersDispatch).then(() => {
            const newState = store.getState();
            expect(newState.members).toEqual(members);
        });
    });

    describe("updates serverError state to `true`", () => {
        // NOTE: there's currently no way to simulate server nonresponse with moxios
        test("when server returns 4xx status", () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 404
                });
            });

            // @ts-ignore
            return (
                store
                    .dispatch<any>(fetchMembersDispatch)
                    // @ts-ignore
                    .then(() => {
                        const newState = store.getState();
                        expect(newState.serverError).toBe(true);
                    })
            );
        });

        test("when server returns 5xx status", () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 500
                });
            });

            return store.dispatch<any>(fetchMembersDispatch).then(() => {
                const newState = store.getState();
                expect(newState.serverError).toBe(true);
            });
        });
    });
});
