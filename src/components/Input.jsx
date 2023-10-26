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
    border-radius: 0.25rem;
    display: block;
    margin: 0.25rem 0;
    padding: 0.5rem;
`;

const ErrorText = styled.div`
    color: red;
    font-size: 0.875rem;
    line-height: 1rem;
`;

export default Input;