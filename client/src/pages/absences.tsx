import React, {useCallback} from "react";
import {Absence, AbsenceType, Column, Member} from "../types";
import {useSelector} from "react-redux";
import {getAbsences, getMembers} from "../redux/selectors";
import Table from "../components/table/table";
import _ from "lodash";
import moment from "moment";
import Paginator from "../components/table/paginator";
import {paginate} from "../utils/paginate";
import DatePicker from "../components/input/date-picker";
import Select, {SelectOption} from "../components/input/select";
import {createICalFile} from "../utils/ical-file-creator";
import {findMember} from "../utils/find-member";
import {getAbsenceState} from "../utils/get-absence-state";

export interface AbsencesFilterProps {
    date: Date | null;
    type: AbsenceType | "";
    page: number;
    pageSize: number;
}

export const initFilter: AbsencesFilterProps = {
    date: null,
    type: "",
    page: 1,
    pageSize: 10
};

const typeOptions: SelectOption[] = Object.keys(AbsenceType)
    .map(key => ({id: key, name: _.startCase(_.toLower(key))}));

/**
 * Absences component
 *
 * @constructor
 *
 * @return JSX.Element
 */
const Absences: React.FC = (): JSX.Element => {
    const absences: Absence[] = useSelector(getAbsences);
    const members: Member[] = useSelector(getMembers);
    const [filter, setFilter] = React.useState(initFilter);


    const {date, type, page, pageSize}: AbsencesFilterProps = filter;
    let filtered: Absence[] = (filter.date || filter.type) ? absences.filter((a: Absence) => {
        const timestamp: number = (filter.date === null) ? 0 : moment(filter.date).unix();
        return (filter.type === "" || filter.type === a.type) &&
            (filter.date === null || (a.endDate === null ?
                timestamp === moment(a.startDate).unix() :
                (timestamp >= moment(a.startDate).unix()) && timestamp <= moment(a.endDate).unix()));
    }) : absences;
    const paginated: Absence[] = paginate(filtered, page, pageSize) as Absence[];

    /**
     * onFilterChange
     *
     * @param changes
     */
    const onFilterChange: (changes: Partial<AbsencesFilterProps>) => void = (changes: Partial<AbsencesFilterProps>): void => {
        setFilter({...filter, ...changes});
    };

    /**
     * findMemberCallback
     */
    const findMemberCallback: ((userId: number) => (Member | undefined)) =
        useCallback((userId: number) => findMember(userId, members), [members]);

    const columns: Column[] = [
        {
            path: "userId",
            label: "Member",
            content: (absence: Absence) => {
                const member: Member | undefined = findMemberCallback(absence.userId);

                return member ? member.name : "";
            }
        },
        {
            path: "type",
            label: "Type",
            content: (absence: Absence): string => {
                return _.startCase(_.toLower(absence.type));
            }
        },
        {
            path: "period",
            label: "Period",
            content: (absence: Absence): string => {
                return (absence.startDate === absence.endDate) ? absence.startDate : `${absence.startDate} - ${absence.endDate}`;
            },
            options: {
                className: "text-nowrap"
            }
        },
        {
            path: "memberNote",
            label: "Member Note"
        },
        {
            path: "status",
            label: "Status",
            content: (absence: Absence): string => {
                return getAbsenceState(absence);
            }
        },
        {
            path: "admitterNote",
            label: "Admitter note"
        }
    ];
    const filterElm: JSX.Element =
        <div className="form-row">
            <div className="col-md-5">
                <DatePicker data-test="element-filter-date" label={"Date"}
                            attributes={{
                                selected: date,
                                name: "date",
                                onChange: (date: Date) => onFilterChange({date, page: 1})
                            }}/>
            </div>
            <div className="col-md-5">
                <Select data-test="element-filter-type" label={"Type"} options={typeOptions} allowEmpty={true}
                        attributes={{
                            name: "type", value: type,
                            onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
                                onFilterChange({type: ((event.target.value as AbsenceType) || null), page: 1})
                        }}/>
            </div>
            <div className="col-md-2 d-flex align-items-end">
                <div className="form-group">
                    <button type="button" className="btn btn-primary"
                            onClick={() => createICalFile(filtered, members)}>Download
                        iCal file
                    </button>
                </div>
            </div>
        </div>;


    return (
        <div data-test="component-absences">
            {absences.length ? filterElm : null}
            {
                filtered.length ?
                    <React.Fragment>
                        <Table data-test="element-table" columns={columns} data={paginated}/>
                        <Paginator data-test="element-paginator" count={filtered.length} page={page} pageSize={pageSize}
                                   pageSizes={[10, 20, 50]}
                                   onPageChange={(page: number) => onFilterChange({page})}
                                   onPageSizeChange={(pageSize: number) => onFilterChange({page: 1, pageSize})}/>
                    </React.Fragment>
                    :
                    <h3 datat-test="element-no-records">No records found!</h3>
            }
        </div>);
};

export default Absences;