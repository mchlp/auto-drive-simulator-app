import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export default function LowFpsModal({ isOpen, setIsOpen }) {
    return (
        <Modal
            isOpen={isOpen}
            toggle={() => {
                setIsOpen(!isOpen);
            }}
        >
            <ModalHeader
                toggle={() => {
                    setIsOpen(!isOpen);
                }}
            >
                Low FPS Detected
            </ModalHeader>
            <ModalBody>
                It has been detected at the map is running at a lower than
                optimal frame rate. It may help to hide the labels by toggling
                the <code>Toggle Labels</code> checkbox
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    );
}
