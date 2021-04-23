import React from "react";

export interface SelectOption {
    id: number | string;
    name: number | string;
}

export interface SelectProps {
    label: string;
    error?: string;
    allowEmpty?: boolean;
    options: SelectOption[];
    attributes: React.SelectHTMLAttributes<HTMLSelectElement>;
}

/**
 * Select component
 *
 * @param options
 * @param label
 * @param allowEmpty
 * @param error
 * @param attributes
 * @constructor
 *
 * @return JSX.Element
 */
const Select: React.FC<SelectProps> = ({options, label, allowEmpty, error, attributes}: SelectProps): JSX.Element => {
    const {name, className, id, ...rest} = attributes;
    const classes: string = ["form-control", ...className ? [className] : [], ...error ? ["is-invalid"] : []].join(" ");
    const selectId: string | undefined = id || name;

    return (
        <div className="form-group" data-test="component-select">
            <label htmlFor={selectId} data-test="element-label">{label}</label>
            <select name={name} id={selectId} className={classes} {...rest} data-test="element-select">
                {allowEmpty ? <option value=""/> : null}
                {options.map((option: SelectOption) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger" data-test="element-error">{error}</div>}
        </div>
    );
};

export default Select;
