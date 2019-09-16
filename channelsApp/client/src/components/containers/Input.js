import React from 'react';

export const InputField = ({
    placeholder,
    type = "text",
    onChange,
    style = '',
    onKeyPress

}) => {
    return(
        <input
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            className= {style}
            onKeyPress={onKeyPress}
        />
    )
};
