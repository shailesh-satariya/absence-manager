import {mount, ReactWrapper} from "enzyme";
import React from "react";
import {Provider} from "react-redux";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import membersList from "../../test/data/members.json";
import absenceList from "../../test/data/absences.json";
import Absences, {initFilter} from "../absences";
import {ActionTypes} from "../../redux/types";
import {RootState} from "../../redux/store";
import {Store} from "redux";
import {Absence} from "../../types";
import {ReactDatePickerProps} from "react-datepicker";

const defaultStore: Store<RootState, ActionTypes> = storeFactory({
    ...DefaultState,
    members: membersList,
    absences: absenceList as Absence[]
});

/**
 * Factory function to create a ReactWrapper for the Absences component.
 * @function setup
 *
 * @param {Store<RootState, ActionTypes>} store
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(<Provider
        store={store}><Absences/></Provider>);
};

describe("render component and elements", () => {
    const wrapper: ReactWrapper = setup();

    test("renders component without an error", () => {
        const componentAbsences = findByTestAttr(wrapper, "component-absences");

        expect(componentAbsences.length).toBe(1);
    });

    test("renders element filter date without an error", () => {
        const elementFilterDate = findByTestAttr(wrapper, "element-filter-date");

        expect(elementFilterDate.length).toBe(1);
    });

    test("renders element filter type without an error", () => {
        const elementFilterType = findByTestAttr(wrapper, "element-filter-type");

        expect(elementFilterType.length).toBe(1);
    });

    test("renders element table without an error", () => {
        const elementTable = findByTestAttr(wrapper, "element-table");

        expect(elementTable.length).toBe(1);
    });

    test("renders element paginator without an error", () => {
        const elementPaginator = findByTestAttr(wrapper, "element-paginator");

        expect(elementPaginator.length).toBe(1);
    });
});

describe("does not render elements when absences is empty", () => {
    const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, absences: []});
    const wrapper: ReactWrapper = setup(store);

    test("does not render element filter date without an error", () => {
        const elementFilterDate = findByTestAttr(wrapper, "element-filter-date");

        expect(elementFilterDate.length).toBe(0);
    });

    test("does not render element filter type without an error", () => {
        const elementFilterType = findByTestAttr(wrapper, "element-filter-type");

        expect(elementFilterType.length).toBe(0);
    });

    test("does not render element table without an error", () => {
        const elementTable = findByTestAttr(wrapper, "element-table");

        expect(elementTable.length).toBe(0);
    });

    test("does not render element paginator without an error", () => {
        const elementPaginator = findByTestAttr(wrapper, "element-paginator");

        expect(elementPaginator.length).toBe(0);
    });
});

describe("state controlled input fields", () => {
    let wrapper: ReactWrapper;
    let originalUseState = React.useState;
    const mockSetState: jest.Mock<number> = jest.fn();

    beforeEach(() => {
        mockSetState.mockClear();
        React.useState = jest.fn(() => [initFilter, mockSetState]) as any;
        wrapper = setup();
    });

    afterEach(() => {
        React.useState = originalUseState;
    });

    test("state filter date updates when filter date element value changes", () => {
        const elementFilterDate = findByTestAttr(wrapper, "element-filter-date");
        const value: Date = new Date();
        ((elementFilterDate.prop("attributes") as ReactDatePickerProps).onChange as Function)(value);
        expect(mockSetState).toHaveBeenCalledWith({...initFilter, date: value});
    });

    test("state filter type updates when filter type element value changes", () => {
        const elementFilterType = findByTestAttr(wrapper, "element-filter-type");
        const value: string = "vacation";
        const event: React.ChangeEvent<HTMLInputElement> = {target: {value: `${value}`}} as React.ChangeEvent<HTMLInputElement>;
        ((elementFilterType.prop("attributes") as React.SelectHTMLAttributes<HTMLSelectElement>).onChange as Function)(event);
        expect(mockSetState).toHaveBeenCalledWith({...initFilter, type: value});
    });

    test("state filter page updates when paginator element's page value changes", () => {
        const elementPaginator = findByTestAttr(wrapper, "element-paginator");
        const value: number = 3;
        (elementPaginator.prop("onPageChange") as Function)(value);
        expect(mockSetState).toHaveBeenCalledWith({...initFilter, page: value});
    });

    test("state filter page updates when paginator element's page size value changes", () => {
        const elementPaginator = findByTestAttr(wrapper, "element-paginator");
        const value: number = 20;
        (elementPaginator.prop("onPageSizeChange") as Function)(value);
        expect(mockSetState).toHaveBeenCalledWith({...initFilter, pageSize: value});
    });
});
