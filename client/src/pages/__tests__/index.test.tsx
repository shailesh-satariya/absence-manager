import {mount, ReactWrapper} from "enzyme";
import React from "react";
import {Provider} from "react-redux";
import {findByTestAttr, storeFactory} from "../../test/utils";
import Pages from "../index";
import {ActionTypes} from "../../redux/types";
import {RootState} from "../../redux/store";
import {Store} from "redux";
import {FETCH_MEMBERS} from "../../redux/action-types";


const defaultStore: Store<RootState, ActionTypes> = storeFactory();

/**
 * Factory function to create a ReactWrapper for the Pages component.
 * @function setup
 *
 * @param {Store<RootState, ActionTypes>} store
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(<Provider
        store={store}><Pages/></Provider>);
};


describe("render elements", () => {
    const store: Store<RootState, ActionTypes> = storeFactory();
    const wrapper: ReactWrapper = setup(store);

    test("renders absences when fetchCount is 0", () => {
        const elementLoader = findByTestAttr(wrapper, "element-loader");
        const elementAbsences = findByTestAttr(wrapper, "element-absences");
        expect(elementLoader.length).toBe(0);
        expect(elementAbsences.length).toBe(1);
    });

    test("renders loader when fetchCount is not 0", () => {
        store.dispatch({type: FETCH_MEMBERS});

        wrapper.update();

        const elementLoader = findByTestAttr(wrapper, "element-loader");
        const elementAbsences = findByTestAttr(wrapper, "element-absences");
        expect(elementLoader.length).toBe(1);
        expect(elementAbsences.length).toBe(0);
    });
});