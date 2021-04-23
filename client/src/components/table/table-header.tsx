import React from "react";
import {Column} from "../../types";

export interface TableHeaderProps {
    columns: Column[];
}

/**
 * TableHeader component
 *
 * @param columns
 * @constructor
 *
 * @return JSX.Element
 */
const TableHeader: React.FC<TableHeaderProps> = ({columns}: TableHeaderProps): JSX.Element => {
    return (
        <thead data-test="component-table-header">
        <tr data-test="element-row">
            {columns.map(column => (
                <th
                    data-test="element-head"
                    key={column.path || column.key}
                    className="text-nowrap"
                >
                    {column.label}
                </th>
            ))}
        </tr>
        </thead>
    );
};

export default TableHeader;
