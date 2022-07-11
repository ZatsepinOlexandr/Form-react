import React from "react"

export const Input = ({ name, label, value, handleChange, handleBlur, setError, error, touched }) => {
    return (<p>
        <label htmlFor={name}>{label}</label>
        <br />
        <input
            className={"input"}
            type={name}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            onSelect={() => setError(null)}
            value={value}
        />
        {touched && error && (
            <p className={"error"}>{error}</p>
        )}
    </p>)
}