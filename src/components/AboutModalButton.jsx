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
                <img
                    src={process.env.PUBLIC_URL + '/logo512.png'}
                    alt="App logo"
                    height={30}
                    className="mr-3"
                />
                About Auto Drive Simulator
            </ModalHeader>
            <ModalBody>
                <div>
                    <div
                        style={{
                            fontSize: 12,
                            color: 'grey',
                        }}
                    >
                        A web app to simulate a city of fully autonmous driving
                        vehicles.
                    </div>
                    <hr />
                    <div
                        style={{
                            fontSize: 8,
                        }}
                    >
                        Icons made by{' '}
                        <a
                            href="https://www.flaticon.com/authors/freepik"
                            title="Freepik"
                        >
                            Freepik
                        </a>{' '}
                        from{' '}
                        <a href="https://www.flaticon.com/" title="Flaticon">
                            www.flaticon.com
                        </a>
                    </div>
                </div>
            </ModalBody>
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
