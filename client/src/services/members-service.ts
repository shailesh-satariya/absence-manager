import axios, {AxiosResponse} from "axios";

const apiUrl: string = process.env.REACT_APP_API_URL as string;
const membersUrl: string = `${apiUrl}/members`;

/**
 * fetchMembers function
 *
 * @return {Promise<AxiosResponse>}
 */
export const fetchMembers = (): Promise<AxiosResponse> => {
    return axios.get(membersUrl);
};
