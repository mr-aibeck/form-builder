import React, { useEffect } from 'react';
import FormBuilder from './components/FormBuilder';
import Form from './components/Form';
import useLocalStorage from "./hooks/useLocalStorage";
import styled from "styled-components";

function App() {
    const [fields, setFields] = useLocalStorage('fields', []);

    useEffect(() => {
        localStorage.setItem('fields', JSON.stringify(fields));
    }, [fields]);

    return (
        <AppContainer>
            <FormBuilder fields={fields} setFields={setFields} />
            {fields.length ? <Form fields={fields} setFields={setFields} /> : ''}
        </AppContainer>
    );
}

const AppContainer = styled.div`
    display: grid;
    grid-gap: 1.25rem;
    max-width: 50rem;
    margin: 0 auto;
    padding: 1.25rem;
`;

export default App;
