import React from 'react';

export const InputField = ({
    placeholder,
    type = "text",
    onChange

}) => {
    return(
        <input
            placeholder={placeholder}
            type={type}
            onChange={onChange}
        />
    )
};
