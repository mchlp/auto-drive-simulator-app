import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { actionCreators } from '../redux/actions';
import { FaQuestionCircle } from 'react-icons/fa';

function AboutModalButton({ showAboutModal, dispatch }) {
    const setIsOpen = (open) => {
        dispatch(actionCreators.setShowAboutModal(open));
    };

    const isOpen = showAboutModal;

    const AboutModal = (
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
                About
            </ModalHeader>
            <ModalBody>About the app.</ModalBody>
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

    return (
        <div>
            {showAboutModal ? (
                AboutModal
            ) : (
                <div
                    style={{
                        margin: 5,
                        position: 'fixed',
                        right: 0,
                        top: 0,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    <FaQuestionCircle size={25} />
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showAboutModal: state.showAboutModal,
    };
};

export default connect(mapStateToProps)(AboutModalButton);
