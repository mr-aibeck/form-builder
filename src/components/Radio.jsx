import React from 'react';
import styled from 'styled-components';

const Radio = (props) => {
    return (
        <StyledRadio>
            <input
                ref={props.innerRef}
                type="radio"
                onChange={props.onChange}
                defaultChecked={props.checked}
                name={props.name}
                value={props.value}
                id={props.id || props.value}
            />
            <StyledLabel htmlFor={props.id || props.value}>{props.children}</StyledLabel>
        </StyledRadio>
    );
};

const StyledLabel = styled.label`
  cursor: pointer;
  font-size: 18px;
  line-height: 20px;
  margin-left: 5px;
`;

const StyledRadio = styled.span`
  display: flex;
`

export default Radio;