import {FETCH_MEMBERS_SUCCESS} from "../../action-types";
import MembersReducer from "../members-reducer";
import membersList from "../../../test/data/members.json";
import {Member} from "../../../types";

test("returns default initial state of `[]` when no action is passed", () => {
    const newState = MembersReducer([], {type: undefined});
    expect(newState).toEqual([]);
});

test("returns state of array of members upon receiving an action of type `FETCH_MEMBERS_SUCCESS`", () => {
    const members: Member[] = membersList;
    const newState = MembersReducer([], {
        type: FETCH_MEMBERS_SUCCESS,
        payload: [...members]
    });
    expect(newState).toEqual(members);
});
