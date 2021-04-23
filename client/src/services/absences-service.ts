import axios, {AxiosResponse} from "axios";

const apiUrl: string = process.env.REACT_APP_API_URL as string;
const absencesUrl: string = `${apiUrl}/absences`;

/**
 * fetchAbsences function
 *
 * @return {Promise<AxiosResponse>}
 */
export const fetchAbsences = (): Promise<AxiosResponse> => {
    return axios.get(absencesUrl);
};
