import React from "react";
import _ from "lodash";
import {Column} from "../../types";

export interface TableBodyProps {
    columns: Column[];
    data: Record<string, any>[];
}

/**
 * TableBody component
 *
 * @param data
 * @param columns
 * @constructor
 *
 * @return JSX.Element
 */
const TableBody: React.FC<TableBodyProps> = ({data, columns}: TableBodyProps): JSX.Element => {
    /**
     * Renders cell content
     * @param item any
     * @param column Column
     *
     * @return JSX.Element | string | null
     */
    const renderCell = (item: Record<string, any>, column: Column): JSX.Element | string | null => {
        if (column.content) return column.content(item);
        else return _.get(item, column.path);
    };

    return (
        <tbody data-test="component-table-body">
        {
            data.map((item: Record<string, any>) => (
                <tr data-test="element-row" key={item.id}>
                    {columns.map((column: Column) => (
                        <td data-test="element-cell"
                            key={item._id + (column.path || column.key)} {...column.options || {}}>
                            {renderCell(item, column)}
                        </td>
                    ))}
                </tr>
            ))
        }
        </tbody>
    );
};

export default TableBody;
