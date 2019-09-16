import React from 'react';

export const InputField = ({
    placeholder,
    type = "text",
    onChange,
    style = ''

}) => {
    return(
        <input
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            className= {style}
        />
    )
};
