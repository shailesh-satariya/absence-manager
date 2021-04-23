import React from "react";

export interface Column {
    path: string;
    label: string;
    content?: (data: any) => JSX.Element | string | null;
    key?: string;
    options?: React.TdHTMLAttributes<HTMLTableDataCellElement>;
}

export interface SortColumn {
    path: string;
    order: "asc" | "desc";
}