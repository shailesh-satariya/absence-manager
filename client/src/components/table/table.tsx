import React from "react";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import {Column} from "../../types";

export interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
}

/**
 * Table component
 *
 * @param columns
 * @param data
 * @constructor
 *
 * @return JSX.Element
 */
const Table: React.FC<TableProps> = ({columns, data}: TableProps): JSX.Element => {
    return (
        <table data-test="component-table" className="table table-striped table-bordered">
            <TableHeader data-test="element-table-header" columns={columns}/>
            <TableBody data-test="element-table-body" data={data} columns={columns}/>
        </table>
    );
};

export default Table;
