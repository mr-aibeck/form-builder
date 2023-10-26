import React from 'react';
import styled from 'styled-components';

const Label = ({ children }) => {
    return (
        <StyledLabel>{children}</StyledLabel>
    );
};

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 1.125rem;
    line-height: 1.25rem;
    margin-bottom: 1.25rem;
`;

export default Label;