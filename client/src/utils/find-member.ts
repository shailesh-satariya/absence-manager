import {Member} from "../types";

/**
 * Finds member for given user id
 * @param userId
 * @param members
 *
 * @return Member | undefined
 */
export const findMember: (userId: number, members: Member[]) => Member | undefined =
    (userId: number, members: Member[]): Member | undefined => members.find(m => m.userId === userId);