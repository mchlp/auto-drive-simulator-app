import React from 'react';
import { Button, Alert } from 'reactstrap';
import { reduxConstants } from '../../redux/actions';
import { connect } from 'react-redux';

function BuildSection({ buildActionHandler, curBuildPointerType }) {
    const buildSectionButtonStyles = {
        fontSize: 10,
    };

    let buildStatusContent;

    const { BUILD_POINTER_TYPE } = reduxConstants;
    switch (curBuildPointerType) {
        case BUILD_POINTER_TYPE.LOCATION: {
            buildStatusContent = (
                <div>
                    <div className="font-weight-bold">
                        You are currently adding a location.
                    </div>
                    Left-click to put down a location.
                    <br />
                    Right-click to cancel.
                </div>
            );
            break;
        }
        case BUILD_POINTER_TYPE.INTERSECTION: {
            buildStatusContent = (
                <div>
                    <div className="font-weight-bold">
                        You are currently adding an intersection.
                    </div>
                    Left-click to put down a intersection.
                    <br />
                    Right-click to cancel.
                </div>
            );
            break;
        }
        case BUILD_POINTER_TYPE.MAJOR_ROAD: {
            buildStatusContent = (
                <div>
                    <div className="font-weight-bold">
                        You are currently building major road.
                    </div>
                    Start by left-clicking on a location or intersection to mark
                    the starting point.
                    <br />
                    After, left-click on another location or intersection to
                    mark the endpoint point.
                    <br />
                    Continue left-clicking on locations or intersections to
                    extend the road.
                    <br />
                    Right-click to cancel.
                </div>
            );
            break;
        }
        case BUILD_POINTER_TYPE.MINOR_ROAD: {
            buildStatusContent = (
                <div>
                    <div className="font-weight-bold">
                        You are currently building minor road.
                    </div>
                    Start by left-clicking on a location or intersection to mark
                    the starting point.
                    <br />
                    After, left-click on another location or intersection to
                    mark the endpoint point.
                    <br />
                    Continue left-clicking on locations or intersections to
                    extend the road.
                    <br />
                    Right-click to cancel.
                </div>
            );
            break;
        }
        case BUILD_POINTER_TYPE.LOCAL_ROAD: {
            buildStatusContent = (
                <div>
                    <div className="font-weight-bold">
                        You are currently building local road.
                    </div>
                    Start by left-clicking on a location or intersection to mark
                    the starting point.
                    <br />
                    After, left-click on another location or intersection to
                    mark the endpoint point.
                    <br />
                    Continue left-clicking on locations or intersections to
                    extend the road.
                    <br />
                    Right-click to cancel.
                </div>
            );
            break;
        }
        case BUILD_POINTER_TYPE.DELETE: {
            buildStatusContent = (
                <div>
                    <div className="font-weight-bold">
                        You are currently deleting components.
                    </div>
                    Left-click on a location or intersection to delete it. All
                    connected roads will be deleted as well.
                    <br />
                    Right-click to cancel.
                </div>
            );
            break;
        }
        default: {
            buildStatusContent = (
                <div>
                    <div className="font-weight-bold">
                        Select one of the grey buttons below to start building!
                    </div>
                    Click on the help button on the top right for details.
                </div>
            );
            break;
        }
    }

    return (
        <div>
            <div
                style={{
                    fontSize: 10,
                }}
            >
                <Alert className="mb-1 mt-2 p-2" color="info">
                    {buildStatusContent}
                </Alert>
                <Button
                    outline
                    color="secondary"
                    className="m-1"
                    style={buildSectionButtonStyles}
                    onClick={() => {
                        buildActionHandler(
                            reduxConstants.BUILD_ACTIONS.ADD_LOCATION
                        );
                    }}
                >
                    Add Location
                </Button>
                <Button
                    outline
                    color="secondary"
                    style={buildSectionButtonStyles}
                    onClick={() => {
                        buildActionHandler(
                            reduxConstants.BUILD_ACTIONS.ADD_INTERSECTION
                        );
                    }}
                    className="m-1"
                >
                    Add Intersection
                </Button>
                <Button
                    outline
                    color="secondary"
                    style={buildSectionButtonStyles}
                    onClick={() => {
                        buildActionHandler(
                            reduxConstants.BUILD_ACTIONS.BUILD_MAJOR_ROAD
                        );
                    }}
                    className="m-1"
                >
                    Build Major Road
                </Button>
                <Button
                    outline
                    color="secondary"
                    style={buildSectionButtonStyles}
                    onClick={() => {
                        buildActionHandler(
                            reduxConstants.BUILD_ACTIONS.BUILD_MINOR_ROAD
                        );
                    }}
                    className="m-1"
                >
                    Build Minor Road
                </Button>
                <Button
                    outline
                    color="secondary"
                    style={buildSectionButtonStyles}
                    onClick={() => {
                        buildActionHandler(
                            reduxConstants.BUILD_ACTIONS.BUILD_LOCAL_ROAD
                        );
                    }}
                    className="m-1"
                >
                    Build Local Road
                </Button>
                <Button
                    outline
                    color="danger"
                    style={buildSectionButtonStyles}
                    onClick={() => {
                        buildActionHandler(
                            reduxConstants.BUILD_ACTIONS.DELETE_COMPONENTS
                        );
                    }}
                    className="m-1"
                >
                    Delete Components
                </Button>
                <Button
                    outline
                    color="info"
                    style={buildSectionButtonStyles}
                    onClick={() => {
                        buildActionHandler(
                            reduxConstants.BUILD_ACTIONS.RESET_POINTER
                        );
                    }}
                    className="m-1"
                >
                    Reset Pointer
                </Button>
                <Button
                    outline
                    color="success"
                    style={buildSectionButtonStyles}
                    onClick={() => {
                        buildActionHandler(
                            reduxConstants.BUILD_ACTIONS.SAVE_MAP
                        );
                    }}
                    className="m-1"
                >
                    Save Map
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    curBuildPointerType: state.curBuildPointerType,
});

export default connect(mapStateToProps)(BuildSection);
