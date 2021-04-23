import React from "react";
import {Pagination} from "react-bootstrap";
import _ from "lodash";

export interface PaginatorProps {
    count: number;
    page: number;
    pageSize: number;
    pageSizes: number[];
    onPageChange: Function;
    onPageSizeChange: Function;
}

/**
 * Paginator component
 *
 * @param count number
 * @param page number
 * @param pageSizes number
 * @param pageSize number[]
 * @param onPageChange Function
 * @param onPageSizeChange Function
 * @constructor
 *
 * @return JSX.Element | null
 */
const Paginator: React.FC<PaginatorProps> = ({count, page, pageSizes, pageSize, onPageChange, onPageSizeChange}: PaginatorProps): JSX.Element | null => {
    if (!count)
        return null;

    page = page || 1;
    pageSize = pageSize || 25;
    pageSizes = pageSizes || [5, 10, 25, 50, 100];

    const totalPages = Math.ceil(count / pageSize);
    const pageBegin = Math.min((page - ((page - 1) % 5)), totalPages);
    const pageEnd = Math.min(pageBegin + 4, totalPages);
    const pages = _.range(pageBegin, pageEnd + 1);

    return (
        <div className="row" data-test="component-paginator">
            <div className="col">
                <Pagination>
                    {pageSizes.map((size: number) => (
                        <Pagination.Item data-test="element-page-size" key={size} active={pageSize === size}
                                         onClick={() => onPageSizeChange(size)}>{size}</Pagination.Item>
                    ))}
                </Pagination>
            </div>
            <div className="col pagination justify-content-center">
                <Pagination>
                    <Pagination.Item
                        data-test="element-page-size-all"
                        onClick={() => onPageSizeChange(Math.max(...pageSizes))}>{(page - 1) * pageSize + 1}...{Math.min(page * pageSize, count)} / {count}</Pagination.Item>
                </Pagination>
            </div>
            <div className="col pagination justify-content-end">
                <Pagination>
                    <Pagination.First data-test="element-page-first" onClick={() => onPageChange(1)}
                                      disabled={page === 1}/>
                    <Pagination.Prev data-test="element-page-prev" onClick={() => onPageChange(page - 1)}
                                     disabled={page === 1}/>

                    {pages.map((p: number) => (
                        <Pagination.Item data-test="element-page-number" key={p} active={page === p}
                                         onClick={() => onPageChange(p)}>{p}</Pagination.Item>
                    ))}

                    <Pagination.Next data-test="element-page-next" onClick={() => onPageChange(page + 1)}
                                     disabled={page === totalPages}/>
                    <Pagination.Last data-test="element-page-last" onClick={() => onPageChange(totalPages)}
                                     disabled={page === totalPages}/>

                </Pagination>
            </div>
        </div>

    );
};

export default Paginator;
