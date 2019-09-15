import React from 'react';

export const InputField = ({
    placeholder,
    type = "text"

}) => {
    return(
        <input
            placeholder={placeholder}
            type={type}
        />
    )
};
