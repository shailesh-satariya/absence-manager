import _ from "lodash";

export const paginate: (items: any[], pageNumber: number, pageSize: number) => any[] =
    (items: any[], pageNumber: number, pageSize: number): any[] => {
        const startIndex = (pageNumber - 1) * pageSize;
        return _(items)
            .slice(startIndex)
            .take(pageSize)
            .value();
    };
