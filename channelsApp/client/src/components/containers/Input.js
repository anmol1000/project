import React from 'react';

export const InputField = ({
    placeholder,
    type = "text",
    onChange,
    style = '',
    onKeyPress,
    value

}) => {
    return(
        <input
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            className= {style}
            onKeyPress={onKeyPress}
            value={value}
        />
    )
};
