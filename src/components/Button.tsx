import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonProps = {
    children: ReactNode,
    onClick?: Function | undefined,
}

const Button = (props: ButtonProps) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        props.onClick && props.onClick(e);
    };

    return (
        <StyledButton onClick={handleClick}>
            {props.children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
  background: rgb(25, 118, 210);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  display: block;
  margin: 5px 0;
  padding: 8px;
  width: 100%;

  &:hover {
    background: rgb(21, 101, 192);
  }
  
  &:active {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px
  }
`;

export default Button;