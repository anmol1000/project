import React from 'react';

export const Button = ({
    btnText,
    onClick

}) =>
{
    return (
        <button type="button" onClick={onClick}>
            {btnText}
        </button>
    );

};