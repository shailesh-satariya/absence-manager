import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../../test/utils";
import TableBody, {TableBodyProps} from "../table-body";
import {Absence} from "../../../types";
import absenceList from "../../../test/data/absences.json";

const defaultProps: TableBodyProps = {
    data: absenceList,
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
 * Factory function to create a ShallowWrapper for the TableBody component.
 * @function setup
 *
 * @param {TableBodyProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: TableBodyProps = defaultProps): ShallowWrapper => {
    return shallow(<TableBody {...props}/>);
};

describe("render", () => {
    const wrapper: ShallowWrapper = setup();

    test("renders component without an error", () => {
        const componentTableBody = findByTestAttr(wrapper, "component-table-body");

        expect(componentTableBody.length).toBe(1);
    });

    test("renders row element without an error", () => {
        const elementsRow = findByTestAttr(wrapper, "element-row");

        expect(elementsRow.length).toBe(defaultProps.data.length);
    });

    test("renders cell elements without an error", () => {
        const elementsCell = findByTestAttr(wrapper, "element-cell");
        const firstCell = elementsCell.first();
        const secondCell = elementsCell.at(1);
        const absence: Absence = absenceList[0] as Absence;

        expect(elementsCell.length).toBe(defaultProps.data.length * defaultProps.columns.length);
        expect(firstCell.text()).toEqual(absence.type);
        expect(secondCell.text()).toEqual((absence.startDate === absence.endDate) ? absence.startDate : `${absence.startDate} - ${absence.endDate}`);
        expect(secondCell.prop("className")).toEqual("text-nowrap");
    });
});