import React from 'react';

export const Button = ({
    btnText,
    onClick,
    className

}) =>
{
    return (
        <button type="button" onClick={onClick} className={className}>
            {btnText}
        </button>
    );

};