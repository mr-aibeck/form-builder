import React from 'react';
import styled from 'styled-components';

const Checkbox = (props) => {
    return (
        <StyledLabel htmlFor={props.name}>
            <input
                ref={props.innerRef}
                type="checkbox"
                onChange={props.onChange}
                defaultChecked={props.checked}
                name={props.name}
                id={props.id}
            />
            <StyledText>{props.children}</StyledText>
        </StyledLabel>
    );
};

const StyledText = styled.span`
  font-size: 1.125rem;
  line-height: 1.25rem;
  margin-left: 0.25rem;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  display: flex;
  margin-bottom: 0.25rem;
`

export default Checkbox;