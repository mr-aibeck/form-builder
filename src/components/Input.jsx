import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
    return (
        <>
            <StyledInput
                id={props.id}
                type={props.type}
                ref={props.innerRef}
                placeholder={props.placeholder}
                disabled={props.disabled}
                name={props.name}
                value={props.value}
                required={props.required}
                onChange={props.onChange}
                pattern={props.pattern}
            />
            {props.errorText && <ErrorText>{props.errorText}</ErrorText>}
        </>
    );
};

const StyledInput = styled.input`
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;
    margin: 5px 0;
    padding: 8px;
`;

const ErrorText = styled.div`
    color: red;
    font-size: 14px;
    line-height: 16px;
`;

export default Input;