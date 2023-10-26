import React from 'react';
import styled from 'styled-components';

const Select = (props) => {
    return (
        <StyledSelect
            ref={props.innerRef}
            onChange={props.onChange}
            name={props.name}
        >
            {props.options.map((element) => (
                <option key={props.isFormSelect ? element.value : element} value={props.isFormSelect ? element.value : element}>
                    {props.isFormSelect ? element.label : element}
                </option>
            ))}
        </StyledSelect>
    );
};

const StyledSelect = styled.select`
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 5px 5px 5px 0px;
  padding: 8px;
  width: 100%;
`;

export default Select;