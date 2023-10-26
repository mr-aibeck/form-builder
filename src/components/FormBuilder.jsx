import React, { useState, useRef } from 'react';
import styled from "styled-components";
import Input from "./Input";
import Label from "./Label";
import Checkbox from "./Checkbox";
import Button from "./Button";
import Select from "./Select";

const formElementOptions = [
    { value: 'text', label: 'Text Input' },
    { value: 'password', label: 'Password Input' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select Dropdown' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'checkbox', label: 'Checkboxes' },
];

const FormBuilder = ({ fields, setFields }) => {
    // Refs
    const labelRef = useRef();
    const idRef = useRef();
    const nameRef = useRef();
    const typeRef = useRef();
    const defaultValueRef = useRef();
    const defaultValueCheckRef = useRef();
    const preCheckedRef = useRef();
    const requiredRef = useRef();
    const optionRef = useRef();
    const usePatternCheckRef = useRef();
    const patternRef = useRef();

    // States
    const [isNameFilled, setIsNameFilled] = useState(true);
    const [options, setOptions] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [isDefaultValueChecked, setIsDefaultValueChecked] = useState(false);
    const [isPatternChecked, setIsPatternChecked] = useState(false);

    const isSelectionControls = ['radio', 'checkbox', 'select'].includes(selectedType);

    const addOption = () => {
        setOptions([...options, optionRef.current.value]);
        optionRef.current.value = '';
    };

    const removeOption = (index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };

    const addField = () => {
        const isPrechecked = preCheckedRef.current?.checked;
        const defaultValue = isDefaultValueChecked ? defaultValueRef.current?.value : '';
        const isRequired = requiredRef.current?.checked;

        if (!nameRef.current.value) {
            setIsNameFilled(false);
            return;
        } else {
            setIsNameFilled(true);
        }

        const newField = {
            label: labelRef.current?.value,
            id: idRef.current?.value,
            name: nameRef.current.value,
            type: typeRef.current?.value,
            value: defaultValue,
            required: isRequired,
            withLabel: !isSelectionControls,
            pattern: isPatternChecked ? patternRef.current?.value : ''
        };

        if (isSelectionControls && selectedType !== 'select') {
            newField.checked = isPrechecked;
        }

        if (selectedType === 'select') {
            newField.options = options;
        }

        setFields([...fields, newField]);

        nameRef.current.value = '';
        labelRef.current.value = '';
        requiredRef.current.checked = false;
        idRef.current.value = '';

        if (optionRef.current) {
            setOptions([]);
            optionRef.current.value = '';
        }

        if (!isSelectionControls) {
            defaultValueCheckRef.current.value = ''
        }
    };

    const removeField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value)
    }

    const handleDefaultValueCheckedChange = () => {
        setIsDefaultValueChecked(!isDefaultValueChecked);
        if (defaultValueRef.current) {
            defaultValueRef.current.disabled = !isDefaultValueChecked;
        }
    };

    return (
        <StyledFormBuilder>
            <div>
                <StyledTitle>Dynamic Form Builder</StyledTitle>
                <Label>
                    Form Element Label
                    <Input innerRef={labelRef} type="text" placeholder="Label" />
                </Label>
                <Label>
                    Form Element Name
                    <Input
                        innerRef={nameRef}
                        type="text"
                        placeholder="Name"
                        errorText={!isNameFilled && 'Element Name is reqired'}
                    />
                </Label>
                <Label>
                    Form Element ID
                    <Input innerRef={idRef} type="text" placeholder="ID" />
                </Label>
                <Label>
                    Select Element Type
                    <Select
                        innerRef={typeRef}
                        onChange={handleTypeChange}
                        options={formElementOptions}
                        isFormSelect={true}
                    />
                </Label>
                {selectedType === 'select' ? (
                    <Label>
                        Select Options
                        <ColumnWrapper>
                            <Input innerRef={optionRef} type="text" placeholder="Option" />
                            <Button onClick={addOption}>Add Option</Button>
                        </ColumnWrapper>
                        <ul>
                            {options.map((option, index) => (
                                <li key={index}>
                                    <ColumnWrapper key={index}>
                                        <OptionName>{option}</OptionName>
                                        <Button onClick={() => removeOption(index)}>Remove</Button>
                                    </ColumnWrapper>
                                </li>
                            ))}
                        </ul>
                    </Label>
                ) : null}
                <Label>
                    <Checkbox
                        innerRef={defaultValueCheckRef}
                        type="checkbox"
                        onChange={handleDefaultValueCheckedChange}
                        checked={isDefaultValueChecked}
                    >
                        Default Value
                    </Checkbox>
                    <Input
                        innerRef={defaultValueRef}
                        type="text"
                        placeholder="Default Value"
                        disabled={!isDefaultValueChecked}
                    />
                </Label>
                {isSelectionControls ?
                    <Checkbox
                        innerRef={preCheckedRef}
                        type="checkbox"
                    >
                        Default Checked
                    </Checkbox> : null
                }

                <Label>
                    <Checkbox
                        innerRef={usePatternCheckRef}
                        type="checkbox"
                        onChange={() => setIsPatternChecked(!isPatternChecked)}
                        checked={isPatternChecked}
                    >
                        Pattern for validation
                    </Checkbox>
                    <Input
                        innerRef={patternRef}
                        type="text"
                        placeholder="Pattern for validation"
                        disabled={!isPatternChecked}
                    />
                </Label>

                <Label>
                    <Checkbox
                        innerRef={requiredRef}
                        type="checkbox"
                    >
                        Required
                    </Checkbox>
                </Label>

                <Button onClick={addField}>Add Field</Button>
            </div>
            {fields.length ?
                <div>
                    <StyledTitle>Form Elements</StyledTitle>
                        {fields.map((field, index) => (
                            <StyledFormItem key={index}>
                                {field.label ? <div><b>Element Name:</b> {field.name}</div> : null}
                                <div><b>Element Type:</b> {field.type}</div>
                                {field.type === 'select' && <Select options={field.options} />}
                                <Button onClick={() => removeField(index)}>Remove</Button>
                            </StyledFormItem>
                        ))}
                </div> : null
            }
        </StyledFormBuilder>
    );
};

const StyledFormBuilder = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

    @media (max-width: 768px) {
      display: block;
    }
`;

const StyledTitle = styled.h2`
    font-size: 24px;
    line-height: 28px;
`

const ColumnWrapper = styled.div`
    align-items: center;
    display: flex;
    gap: 10px;
    width: 100%;

    button {
      width: 50%;
    }
`

const OptionName = styled.div`
    flex-grow: 1;
`

const StyledFormItem = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 12px 10px;
`

export default FormBuilder;