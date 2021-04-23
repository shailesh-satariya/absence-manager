import React from "react";
import {useSelector} from "react-redux";
import {getFetchCount} from "../redux/selectors";
import Loader from "../components/loader";
import Absences from "./absences";

const Pages: React.FC = (): JSX.Element => {
    const fetchCount: number = useSelector(getFetchCount);

    if (fetchCount > 0) {
        return <Loader data-test="element-loader"/>;
    }

    return <Absences data-test="element-absences"/>;
};

export default Pages;