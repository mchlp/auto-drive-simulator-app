import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
} from 'reactstrap';
import { connect } from 'react-redux';
import { actionCreators } from '../redux/actions';
import { FaQuestionCircle } from 'react-icons/fa';
import githubIcon from '../assets/github.png';
import locationImg from '../assets/location.png';
import localRoadImg from '../assets/local-road.png';
import minorRoadImg from '../assets/minor-road.png';
import majorRoadImg from '../assets/major-road.png';
import vehicleImg from '../assets/vehicle.png';
import intersectionImg from '../assets/intersection.png';

function AboutModalButton({ showAboutModal, dispatch }) {
    const setIsOpen = (open) => {
        dispatch(actionCreators.setShowAboutModal(open));
    };

    const isOpen = showAboutModal;

    function AboutComponentCard({
        imageSrc,
        imageAlt,
        componentName,
        componentDesc,
    }) {
        return (
            <Card
                style={{ width: 230, borderWidth: 1, borderColor: '#cccccc' }}
                className="mb-2"
            >
                <CardImg
                    top
                    src={imageSrc}
                    alt={imageAlt}
                    height={110}
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <CardBody>
                    <CardText>
                        <div className="font-weight-bold">{componentName}</div>
                        <div
                            style={{
                                fontSize: 12,
                            }}
                        >
                            {componentDesc}
                        </div>
                    </CardText>
                </CardBody>
            </Card>
        );
    }

    const AboutModal = (
        <Modal
            isOpen={isOpen}
            toggle={() => {
                setIsOpen(!isOpen);
            }}
            size="lg"
            scrollable={true}
        >
            <ModalHeader
                toggle={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}
                >
                    <img
                        src={process.env.PUBLIC_URL + '/logo512.png'}
                        alt="App logo"
                        height={30}
                        className="mr-3"
                    />
                    <div>
                        <div>About Auto Drive Simulator</div>
                        <div
                            style={{
                                fontSize: 11,
                                color: 'grey',
                                textAlign: 'center',
                            }}
                        >
                            This about pop-up can be accessed again by clicking{' '}
                            <FaQuestionCircle size={13} /> in the top right.
                        </div>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <div>
                    <div>
                        <div
                            className="mb-1"
                            style={{
                                fontSize: 12,
                                color: 'grey',
                            }}
                        >
                            A web app to simulate a city of fully autonmous
                            driving vehicles.
                        </div>
                        <div
                            style={{
                                fontSize: 12,
                            }}
                        >
                            More detailed description coming soon!
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h5 className="mb-3">Map Components</h5>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            <AboutComponentCard
                                imageSrc={locationImg}
                                imageAlt="Image of a location"
                                componentName="Location"
                                componentDesc={
                                    <div>
                                        These are marked by red circles on the
                                        map. They have automatically generated
                                        unique names by default. These points
                                        serve as the origins and destinations
                                        for vehicle trips.
                                    </div>
                                }
                            />
                            <AboutComponentCard
                                imageSrc={vehicleImg}
                                imageAlt="Image of a vehicle"
                                componentName="Vehicle"
                                componentDesc={
                                    <div>
                                        These are marked by blue circles on the
                                        map. All vehicles have an origin
                                        location and a destination location.
                                        There will be vehicles automatically
                                        spawned to fill the map. They will
                                        maintain a minimum separation distance
                                        from other vehicles and will slow down
                                        or stop accordingly. You can also{' '}
                                        <a href="#starting-a-trip-section">
                                            dispatch your own vehicles
                                        </a>
                                        .
                                    </div>
                                }
                            />
                            <AboutComponentCard
                                imageSrc={intersectionImg}
                                imageAlt="Image of a intersection"
                                componentName="Intersection"
                                componentDesc={
                                    <div>
                                        These can be found where roads meet or
                                        periodically along long road sections.
                                        There are no traffic signals, instead
                                        the vehicles communicate with each other
                                        to determine who has the right-of-way.
                                        If an intersection is empty, approaching
                                        vehicles will proceed through.
                                        Otherwise, they will slow down or stop
                                        until the intersection is cleared.
                                    </div>
                                }
                            />
                            <AboutComponentCard
                                imageSrc={majorRoadImg}
                                imageAlt="Image of a major road"
                                componentName="Major Road"
                                componentDesc={
                                    <div>
                                        A major road is intented to handle
                                        heavier volumes of traffic and vehicles
                                        are able to travel at the highest speed
                                        on these roads. Generally, these roads
                                        will be preferred over other road types
                                        when vehicles are calculating a route.
                                    </div>
                                }
                            />
                            <AboutComponentCard
                                imageSrc={minorRoadImg}
                                imageAlt="Image of a minor road"
                                componentName="Minor Road"
                                componentDesc={
                                    <div>
                                        A minor road is intented to handle
                                        medium volumes of traffic and vehicles
                                        are able to travel at a medium speed on
                                        these roads. Generally, these roads are
                                        given the second-highest preference when
                                        vehicles are calculating a route.
                                    </div>
                                }
                            />
                            <AboutComponentCard
                                imageSrc={localRoadImg}
                                imageAlt="Image of a local road"
                                componentName="Local Road"
                                componentDesc={
                                    <div>
                                        A local road is intented to handle low
                                        volumes of traffic and vehicles travel
                                        the sloweest on these roads. These
                                        usually connect locations to major or
                                        minor roads.
                                    </div>
                                }
                            />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h5 className="mb-3" id="starting-a-trip-section">
                            Starting a Trip
                        </h5>
                        <div
                            style={{
                                fontSize: 12,
                            }}
                        >
                            You can dispatch your own vehicle by selecting an
                            origin location and a destination location from the
                            side menu and then clicking the{' '}
                            <code>Navigate</code> button. The optimal route will
                            be calculated and your vehicle will immediately
                            depart from its origin. You can follow its progress
                            as it travels to its destination on the map.
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h5 className="mb-3">Building a Map</h5>
                        <div
                            style={{
                                fontSize: 12,
                            }}
                        >
                            There is a map building tool which can be accessed
                            by clicking on the{' '}
                            <code>Switch to Create Mode</code> button in the
                            side menu. This will take you to a screen where you
                            can build your own map and download it in JSON
                            format.
                        </div>
                    </div>
                    <hr />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            className="mr-3"
                            style={{
                                fontSize: 12,
                            }}
                        >
                            Check out this project on GitHub!
                        </div>
                        <div
                            className="mr-3"
                            style={{
                                fontSize: 12,
                            }}
                        >
                            <a
                                href="https://github.com/mchlp/auto-drive-simulator-app"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={githubIcon}
                                    height={20}
                                    alt="Github Logo"
                                    className="mr-1"
                                />
                                Frontend
                            </a>
                        </div>
                        <div
                            className="mr-3"
                            style={{
                                fontSize: 12,
                            }}
                        >
                            <a
                                href="https://github.com/mchlp/auto-drive-simulator-api"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={githubIcon}
                                    height={20}
                                    alt="Github Logo"
                                    className="mr-1"
                                />
                                Backend
                            </a>
                        </div>
                    </div>
                    <hr />
                    <div
                        style={{
                            fontSize: 9,
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
            {showAboutModal && AboutModal}
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
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showAboutModal: state.showAboutModal,
    };
};

export default connect(mapStateToProps)(AboutModalButton);
