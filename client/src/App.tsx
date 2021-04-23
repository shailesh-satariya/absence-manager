import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {fetchAbsencesDispatch, fetchMembersDispatch, setNoServerError} from "./redux/actions";
import Pages from "./pages";
import {hasServerError} from "./redux/selectors";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = (): JSX.Element => {
    const serverError: boolean = useSelector(hasServerError);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchMembersDispatch);
        dispatch(fetchAbsencesDispatch);
    }, [dispatch]);

    React.useEffect(() => {
        if (serverError) {
            toast.error("Server error!", {
                position: "bottom-right",
                onClose: () => dispatch(setNoServerError)
            });
        }
    }, [serverError, dispatch]);

    return (
        <div data-test="component-app" className="d-flex flex-column vh-100 vw-100">
            <nav data-test="element-nav" className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand">Absence Manager</span>
            </nav>
            <div className="flex-1 overflow-auto">
                <div className="container p-5">
                    <Pages data-test="element-pages"/>
                </div>
            </div>

            <ToastContainer data-test="element-toast-container"/>
        </div>
    );
};

export default App;
