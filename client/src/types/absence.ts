import {AbsenceType} from "./absence-type";

export interface Absence {
    admitterId: null | number;
    admitterNote: string;
    confirmedAt: string;
    createdAt: string;
    crewId: number;
    endDate: null | string;
    id: number;
    memberNote: string;
    rejectedAt: null | string;
    startDate: string;
    type: AbsenceType;
    userId: number;
}