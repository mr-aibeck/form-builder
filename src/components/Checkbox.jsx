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
  font-size: 18px;
  line-height: 20px;
  margin-left: 5px;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  display: flex;
  margin-bottom: 5px;
`

export default Checkbox;