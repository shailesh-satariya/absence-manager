import React from "react";
import ReactDatePicker, {ReactDatePickerProps} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export interface DatePickerProps {
    label: string;
    error?: string;
    attributes: ReactDatePickerProps;
}

/**
 * DatePicket element
 *
 * @param label
 * @param error
 * @param attributes
 * @constructor
 */
const DatePicker: React.FC<DatePickerProps> = ({label, error, attributes}: DatePickerProps): JSX.Element => {
    const {name, className, id, wrapperClassName, onChange, ...rest} = attributes;
    const classes: string = ["form-control", ...className ? [className] : [], ...error ? ["is-invalid"] : []].join(" ");
    const wrapperClasses: string = ["form-control", ...wrapperClassName ? [wrapperClassName] : [], ...error ? ["is-invalid"] : []].join(" ");
    const datePickerId: string | undefined = id || name;

    return (
        <div className="form-group" data-test="component-date-picker">
            <label htmlFor={datePickerId} data-test="element-label">{label}</label>
            <ReactDatePicker data-test="element-date-picker" name={name} id={datePickerId} className={classes}
                             wrapperClassName={wrapperClasses}
                             onChange={onChange} {...rest} />
            {error && <div className="alert alert-danger" data-test="element-error">{error}</div>}
        </div>
    );
};

export default DatePicker;