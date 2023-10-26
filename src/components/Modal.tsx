import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from 'styled-components';
import Button from './Button';

type ModalProps = {
    children: ReactNode,
    onSubmit?: Function,
    onClose?: Function,
    show: boolean,
    title?: string,
}

const Modal = (props: ModalProps) => {
    let portalWrapper = document.getElementById("modal") as HTMLElement;

    const handleCloseClick: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>
        = (e) => {
            props.onClose && props.onClose(e);
        };

    const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement>
        = (e) => {
        props.onSubmit && props.onSubmit(e);
    };

    return createPortal(
        <>
            {props.show ?
                <ModalOverlay onClick={(e) => handleCloseClick(e)}>
                    <StyledModal onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitle>{props.title}</ModalTitle>
                            <CloseBtn onClick={(e) => handleCloseClick(e)}>×</CloseBtn>
                        </ModalHeader>
                        <ModalContent> {props.children} </ModalContent>
                        <ModalFooter>
                            <Button onClick={handleCloseClick}>
                                Cancel
                            </Button>

                            <Button onClick={(e: any) => handleSubmitClick(e)}>Submit</Button>
                        </ModalFooter>
                    </StyledModal>
                </ModalOverlay> : null
            },
        </>, portalWrapper
    );
};

const ModalOverlay = styled.div`
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
`;

const StyledModal = styled.div`
    background: white;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem; 
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 20rem;
    min-width: 30vw;
    margin: 0 0.625rem;
    padding: 1rem;
`;

const ModalHeader = styled.header`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

const ModalTitle = styled.h2`
    margin: 0;
`;

const CloseBtn = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.5rem;
`;

const ModalContent = styled.main`
    flex-grow: 1;
`;

const ModalFooter = styled.footer`
    display: flex;
    gap: 0.625rem;
`;

export default Modal;
