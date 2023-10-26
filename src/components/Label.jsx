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
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 20px;
`;

export default Label;