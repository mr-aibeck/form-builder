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
  font-size: 1.125rem;
  line-height: 1.25rem;
  margin-left: 0.25rem;
`;

const StyledRadio = styled.span`
  display: flex;
`

export default Radio;