import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Select from './Select';
import Modal from "./Modal";

const formElements = {
    text: (field, value, onChange) =>
        <Input
            type="text"
            name={field.name}
            id={field.name || field.id}
            value={value}
            required={field.required}
            onChange={onChange}
        />,
    password: (field, value, onChange) =>
        <Input
            type="password"
            name={field.name}
            id={field.name || field.id}
            required={field.required}
            value={field.value}
            onChange={onChange}
        />,
    textarea: (field, value, onChange) =>
        <StyledTextarea
            id={field.name || field.id}
            name={field.name}
            value={value}
            required={field.required}
            onChange={onChange}
        />,
    select: (field, value, onChange) =>
        <Select
            id={field.name || field.id}
            name={field.name}
            options={field.options}
            onChange={onChange}
        />,
    radio: (field, value, onChange) => (
        <Radio
            id={field.id}
            name={field.name}
            value={value}
            checked={field.checked}
            onChange={onChange}
        >
            {field.label}
        </Radio>
    ),
    checkbox: (field, value, onChange) => (
        <Checkbox
            onChange={onChange}
            id={field.name || field.id}
            name={field.name}
            checked={field.checked}
        >
            {field.label}
        </Checkbox>
    ),
};

const Form = ({ fields, setFields }) => {
    const [formData, setFormData] = useState(() => {
        const initialFormData = {};
        fields.forEach((field) => {
            initialFormData[field.name] = field.value || '';
        });
        return initialFormData;
    });

    const [openModal, setOpenModal] = useState(false);

    const handleFieldChange = (field, value, index) => {
        const updatedFields = [...fields];
        updatedFields[index] = { ...field, value: value };
        setFields(updatedFields);

        if (field.pattern) {
            const patternStr = field.pattern;
            const regex = new RegExp(patternStr, "ig");

            setFormData({
                ...formData,
                [field.name]: value.replace(regex, ""),
            });
        } else {
            setFormData({
                ...formData,
                [field.name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://example.com/api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => {
            if (response.status === 200) {
                console.log('Form data sent successfully');
            } else {
                console.error('Failed to send form data to the server');
            }
        }).catch((error) => {
            console.error('Error:', error);
        });

        setOpenModal(false);
    };

    function handleModal(e) {
        e.preventDefault();
        setOpenModal(true);
    }

    return (
        <StyledForm>
            <StyledTitle>Form</StyledTitle>

            {fields.map((field, index) => (
                <FieldWrap key={index}>
                    {(field.type !== 'checkbox' && field.type !== 'radio') ? <label htmlFor={field.name}>{field.label}</label> : null}
                    {formElements[field.type](
                        field,
                        formData[field.name],
                        (e) => handleFieldChange(
                            field,
                            field.type === 'checkbox' ? e.target.checked : e.target.value,
                            index
                        ),
                    )}
                </FieldWrap>
            ))}

            <Button onClick={(e) => handleModal(e)}>Submit</Button>

            <Modal
                show={openModal}
                title="Form Data"
                onClose={() => setOpenModal(false)}
                onSubmit={(e) => handleSubmit(e)}
            >
                {Object.entries(formData).map(([key, value]) => (
                    <StyledFormData key={key}>
                        <span>{key}: </span>
                        <span> {value.toString() }</span>
                    </StyledFormData>
                ))}
            </Modal>
        </StyledForm>
    );
};

const StyledTitle = styled.h2`
    text-align: center;
`;

const StyledForm = styled.form`
    background: white;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
`;

const StyledTextarea = styled.textarea`
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    display: block;
    margin: 0.25rem 0;
    padding: 0.5rem;
    width: 100%;
`

const FieldWrap = styled.fieldset`
    border: none;
    display: flex;
    flex-direction: column;
    margin-top: 0.625rem;
    padding: 0;
`

const StyledFormData = styled.div`
    margin: 1.25rem 0;
`;

export default Form;