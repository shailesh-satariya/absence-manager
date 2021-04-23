import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../../test/utils";
import Select, {SelectProps} from "../select";

const defaultProps: SelectProps = {
    label: "My Select",
    options: [{id: 1, name: "Foo"}, {id: 2, name: "Bar"}],
    attributes: {
        value: 1
    }
};

/**
 * Factory function to create a ShallowWrapper for the Select component.
 * @function setup
 *
 * @param {SelectProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: SelectProps = defaultProps): ShallowWrapper => {
    return shallow(<Select {...props}/>);
};

describe("render", () => {
    const wrapper: ShallowWrapper = setup();

    test("renders component without an error", () => {
        const componentSelect = findByTestAttr(wrapper, "component-select");

        expect(componentSelect.length).toBe(1);
    });

    test("renders label without an error", () => {
        const elementLabel = findByTestAttr(wrapper, "element-label");

        expect(elementLabel.length).toBe(1);
    });

    test("renders select without an error", () => {
        const elementSelect = findByTestAttr(wrapper, "element-select");

        expect(elementSelect.length).toBe(1);
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

test("calls `onChange` prop when select value is changed", () => {
    const onChangeMock = jest.fn();
    const props: SelectProps = {...defaultProps, attributes: {onChange: onChangeMock}};

    const wrapper = setup(props);

    // simulate on change
    const value: string = "2";
    const elementSelect = findByTestAttr(wrapper, "element-select");
    const event: React.ChangeEvent<HTMLInputElement> = {target: {value: `${value}`}} as React.ChangeEvent<HTMLInputElement>;
    elementSelect.simulate("change", event);

    // expect the mock to have been called once
    expect(onChangeMock).toHaveBeenCalledWith({target: {value: `${value}`}});
});

