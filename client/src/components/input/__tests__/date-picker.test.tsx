import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../../test/utils";
import DatePicker, {DatePickerProps} from "../date-picker";

const defaultProps: DatePickerProps = {
    label: "My Date",
    attributes: {
        onChange: (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined) => {
        }
    }
};

/**
 * Factory function to create a ShallowWrapper for the DatePicker component.
 * @function setup
 *
 * @param {DatePickerProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: DatePickerProps = defaultProps): ShallowWrapper => {
    return shallow(<DatePicker {...props}/>);
};

describe("render", () => {
    const wrapper: ShallowWrapper = setup();

    test("renders component without an error", () => {
        const componentDatePicker = findByTestAttr(wrapper, "component-date-picker");

        expect(componentDatePicker.length).toBe(1);
    });

    test("renders label without an error", () => {
        const elementLabel = findByTestAttr(wrapper, "element-label");

        expect(elementLabel.length).toBe(1);
    });

    test("renders date picker without an error", () => {
        const elementDatePicker = findByTestAttr(wrapper, "element-date-picker");

        expect(elementDatePicker.length).toBe(1);
    });

    test("does not render error element", () => {
        const elementError = findByTestAttr(wrapper, "element-error");

        expect(elementError.length).toBe(0);
    });

    test("renders error element without an error", () => {
        wrapper.setProps({error: "Error!"});
        const elementError = findByTestAttr(wrapper, "element-error");

        expect(elementError.length).toBe(1);
    });
});

test("calls `onChange` prop when date picker value is changed", () => {
    const onChangeMock = jest.fn();
    const props: DatePickerProps = {...defaultProps, attributes: {onChange: onChangeMock}};

    const wrapper = setup(props);

    // simulate on change
    const date: Date = new Date();
    const elementDatePicker = findByTestAttr(wrapper, "element-date-picker");
    elementDatePicker.simulate("change", date);

    // expect the mock to have been called once
    expect(onChangeMock).toHaveBeenCalledWith(date);
});

