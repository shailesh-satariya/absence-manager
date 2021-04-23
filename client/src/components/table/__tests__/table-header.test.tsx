import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../../test/utils";
import TableHeader, {TableHeaderProps} from "../table-header";
import {Absence} from "../../../types";

const defaultProps: TableHeaderProps = {
    columns: [
        {
            path: "type",
            label: "Type"
        },
        {
            path: "period",
            label: "Period",
            content: (absence: Absence) => {
                return (absence.startDate === absence.endDate) ? absence.startDate : `${absence.startDate} - ${absence.endDate}`;
            },
            options: {
                className: "text-nowrap"
            }
        }
    ]
};

/**
 * Factory function to create a ShallowWrapper for the TableHeader component.
 * @function setup
 *
 * @param {TableProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: TableHeaderProps = defaultProps): ShallowWrapper => {
    return shallow(<TableHeader {...props}/>);
};

describe("render", () => {
    const wrapper: ShallowWrapper = setup();

    test("renders component without an error", () => {
        const componentTableHeader = findByTestAttr(wrapper, "component-table-header");

        expect(componentTableHeader.length).toBe(1);
    });

    test("renders row element without an error", () => {
        const elementRow = findByTestAttr(wrapper, "element-row");

        expect(elementRow.length).toBe(1);
    });

    test("renders head elements without an error", () => {
        const elementsHead = findByTestAttr(wrapper, "element-head");

        expect(elementsHead.length).toBe(defaultProps.columns.length);
    });
});