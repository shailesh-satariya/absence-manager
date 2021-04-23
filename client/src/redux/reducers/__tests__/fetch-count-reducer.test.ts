import {FETCH_MEMBERS, FETCH_MEMBERS_SERVER_ERROR, FETCH_MEMBERS_SUCCESS} from "../../action-types";
import FetchCountReducer from "../fetch-count-reducer";
import membersList from "../../../test/data/members.json";

test("returns default initial state of `0` when no action is passed", () => {
    const newState = FetchCountReducer(0, {type: undefined});
    expect(newState).toBe(0);
});

test("returns state of `0` upon receiving an action of type `FETCH_MEMBERS`", () => {
    const newState = FetchCountReducer(0, {type: FETCH_MEMBERS});
    expect(newState).toBe(1);
});

test("returns state of `1` upon receiving an action of type `FETCH_MEMBERS_SERVER_ERROR`", () => {
    const newState = FetchCountReducer(1, {type: FETCH_MEMBERS_SERVER_ERROR});
    expect(newState).toBe(0);
});

test("returns state of `0` upon receiving an action of type `FETCH_MEMBERS_SUCCESS`", () => {
    const newState = FetchCountReducer(1, {
        type: FETCH_MEMBERS_SUCCESS, payload: membersList
    });
    expect(newState).toBe(0);
});