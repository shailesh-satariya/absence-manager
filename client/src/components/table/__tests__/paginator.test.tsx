import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../../test/utils";
import Paginator, {PaginatorProps} from "../paginator";

const defaultProps: PaginatorProps = {
    count: 90,
    pageSizes: [10, 20, 50],
    page: 2,
    pageSize: 10,
    onPageChange: (page: number): void => {
    },
    onPageSizeChange: (pageSize: number): void => {
    }
};

/**
 * Factory function to create a ShallowWrapper for the Paginator component.
 * @function setup
 *
 * @param {PaginatorProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: PaginatorProps = defaultProps): ShallowWrapper => {
    return shallow(<Paginator {...props}/>);
};

describe("render", () => {
    const wrapper: ShallowWrapper = setup();

    test("renders component without an error", () => {
        const componentPaginator = findByTestAttr(wrapper, "component-paginator");

        expect(componentPaginator.length).toBe(1);
    });

    test("renders page size elements without an error", () => {
        const elementsPageSize = findByTestAttr(wrapper, "element-page-size");

        expect(elementsPageSize.length).toBe(defaultProps.pageSizes.length);
    });

    test("renders page size all element without an error", () => {
        const elementPageSizeAll = findByTestAttr(wrapper, "element-page-size-all");

        expect(elementPageSizeAll.length).toBe(1);
    });

    test("renders first page element without an error", () => {
        const elementPageSizeFirst = findByTestAttr(wrapper, "element-page-first");

        expect(elementPageSizeFirst.length).toBe(1);
    });

    test("renders previous page element without an error", () => {
        const elementPagePrev = findByTestAttr(wrapper, "element-page-prev");

        expect(elementPagePrev.length).toBe(1);
    });

    test("renders next page element without an error", () => {
        const elementPageNext = findByTestAttr(wrapper, "element-page-next");

        expect(elementPageNext.length).toBe(1);
    });

    test("renders last page element without an error", () => {
        const elementPageLast = findByTestAttr(wrapper, "element-page-last");

        expect(elementPageLast.length).toBe(1);
    });

    test("renders page number element without an error", () => {
        const elementPageNumber = findByTestAttr(wrapper, "element-page-number");

        expect(elementPageNumber.length).toBeGreaterThanOrEqual(1);
    });
});

test("calls `onPageSizeChange` prop when page size link is clicked", () => {
    const onChangeMock = jest.fn();
    const props: PaginatorProps = {...defaultProps, onPageSizeChange: onChangeMock};

    const wrapper = setup(props);

    // simulate on change
    const elementsPageSize = findByTestAttr(wrapper, "element-page-size");
    elementsPageSize.first().simulate("click");

    // expect the mock to have been called once
    expect(onChangeMock).toHaveBeenCalledWith(defaultProps.pageSizes[0]);
});

test("calls `onPageChange` prop when page number link is clicked", () => {
    const onChangeMock = jest.fn();
    const props: PaginatorProps = {...defaultProps, onPageChange: onChangeMock};

    const wrapper = setup(props);

    // simulate on change
    const elementsPageNumber = findByTestAttr(wrapper, "element-page-number");
    elementsPageNumber.first().simulate("click");

    // expect the mock to have been called once
    expect(onChangeMock).toHaveBeenCalledWith(1);
});