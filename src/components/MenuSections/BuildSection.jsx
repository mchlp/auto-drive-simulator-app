import React from 'react';
import { Button } from 'reactstrap';
import { reduxConstants } from '../../redux/actions';

export default function BuildSection({ buildActionHandler }) {
    return (
        <div>
            <div>
                <Button
                    color="primary"
                    className="m-1"
                    onClick={() => {
                        buildActionHandler(
                            reduxConstants.BUILD_ACTIONS.ADD_LOCATION
                        );
                    }}
                >
                    Add Location
                </Button>
                <Button
                    color="primary"
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
                    color="primary"
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
                    color="primary"
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
                    color="primary"
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
                    color="primary"
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
                    color="primary"
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
                    color="success"
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
