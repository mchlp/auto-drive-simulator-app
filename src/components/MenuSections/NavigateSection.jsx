import React, { useEffect, useState } from 'react';
import { FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { actionCreators, reduxConstants } from '../../redux/actions';
import MapDataHandler from '../../utils/MapDataHandler';
import { connect } from 'react-redux';

function NavigateSection({
    curMode,
    curTripVehicleId,
    mapDataLoaded,
    socket,
    followCurTripVehicle,
    dispatch,
}) {
    const [curTripVehicleData, setCurTripVehicleData] = useState(null);

    const startTrip = (startWaypointId, endWaypointId) => {
        if (socket) {
            socket.emit('start-trip', {
                originId: startWaypointId,
                destinationId: endWaypointId,
            });
        }
    };

    useEffect(() => {
        if (
            curTripVehicleId &&
            curTripVehicleId !== reduxConstants.COMPLETED_TRIP_VEHICLE_ID
        ) {
            setCurTripVehicleData(
                MapDataHandler.mapData.vehicles[curTripVehicleId]
            );
        }
    }, []); // should only trigger on mount, not on every curTripVehicleId change

    useEffect(() => {
        if (socket) {
            const startTripResListener = (startTripRes) => {
                if (startTripRes) {
                    setCurTripVehicleData(startTripRes);
                    dispatch(
                        actionCreators.setCurTripVehicleId(startTripRes.id)
                    );
                    dispatch(actionCreators.setFollowCurTripVehicle(true));
                }
            };
            socket.on('start-trip-res', startTripResListener);
            return () => {
                socket.off('start-trip-res', startTripResListener);
            };
        }
    }, [socket, dispatch]);

    const locationList = mapDataLoaded
        ? Object.values(MapDataHandler.mapData.locations)
        : [];

    locationList.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    const selectOptionStyle = {
        fontSize: 10,
    };

    let Content;
    if (curMode === reduxConstants.APP_MODE_LIST.CREATE_MAP) {
        Content = (
            <div>
                Starting a trip is not allowed when building a map. Switch to
                View Mode to start a trip.
            </div>
        );
    } else if (
        curTripVehicleId &&
        curTripVehicleId !== reduxConstants.COMPLETED_TRIP_VEHICLE_ID &&
        curTripVehicleData
    ) {
        Content = (
            <div
                style={{
                    fontSize: 12,
                }}
            >
                <div>
                    <span className="font-weight-bold">Vehicle ID: </span>
                    {curTripVehicleId}
                </div>
                <div>
                    <span className="font-weight-bold">Origin: </span>
                    {curTripVehicleData.origin.name}
                </div>
                <div>
                    <span className="font-weight-bold">Destination: </span>
                    {curTripVehicleData.destination.name}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}
                    className="my-1"
                >
                    <input
                        type="checkbox"
                        id="follow-cur-trip-chkbox"
                        className="mr-1"
                        checked={followCurTripVehicle}
                        onChange={(event) => {
                            const checked = event.target.checked;
                            dispatch(
                                actionCreators.setFollowCurTripVehicle(checked)
                            );
                        }}
                    />
                    <label
                        htmlFor="follow-cur-trip-chkbox"
                        className="m-0"
                        style={{
                            userSelect: 'none',
                            fontSize: 10,
                        }}
                    >
                        Toggle Follow Current Trip Vehicle
                    </label>
                </div>
                <Button
                    className="mt-2"
                    color="primary"
                    style={{
                        fontSize: 10,
                    }}
                    onClick={() => {
                        setCurTripVehicleData(null);
                        dispatch(actionCreators.setCurTripVehicleId(null));
                        dispatch(actionCreators.setFollowCurTripVehicle(false));
                    }}
                >
                    Start a New Trip
                </Button>
            </div>
        );
    } else {
        Content = (
            <div
                style={{
                    fontSize: 10,
                }}
            >
                <div>
                    {curTripVehicleId ===
                        reduxConstants.COMPLETED_TRIP_VEHICLE_ID && (
                        <Alert
                            className="mb-1 mt-2 p-2"                            
                            color="success"
                        >
                            <div className="font-weight-bold">
                                You have reached your destination!
                            </div>
                            You can start a new trip below.
                        </Alert>
                    )}
                    <Label
                        for="navigate-origin"
                        className="font-weight-bold mb-1 mt-1"
                    >
                        Origin
                    </Label>
                    <Input
                        style={selectOptionStyle}
                        type="select"
                        name="select"
                        id="navigate-origin"
                    >
                        {locationList.map((location) => {
                            return (
                                <option
                                    key={location.id}
                                    value={location.id}
                                    style={selectOptionStyle}
                                >
                                    {location.name}
                                </option>
                            );
                        })}
                    </Input>
                </div>
                <div>
                    <Label
                        for="navigate-dest"
                        className="font-weight-bold mb-1 mt-2"
                    >
                        Destination
                    </Label>
                    <Input
                        style={selectOptionStyle}
                        type="select"
                        name="select"
                        id="navigate-dest"
                    >
                        {locationList.map((location) => {
                            return (
                                <option
                                    key={location.id}
                                    value={location.id}
                                    style={selectOptionStyle}
                                >
                                    {location.name}
                                </option>
                            );
                        })}
                    </Input>
                </div>
                <Button
                    className="mt-2"
                    color="primary"
                    style={{
                        fontSize: 10,
                    }}
                    onClick={() => {
                        startTrip(
                            document.getElementById('navigate-origin').value,
                            document.getElementById('navigate-dest').value
                        );
                    }}
                >
                    Navigate
                </Button>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-1">
                {curTripVehicleId ? 'Trip Progress' : 'Start a Trip'}
            </div>
            {Content}
        </div>
    );
}

const mapStateToProps = (state) => ({
    mapDataLoaded: state.mapDataLoaded,
    curTripVehicleId: state.curTripVehicleId,
    followCurTripVehicle: state.followCurTripVehicle,
    curMode: state.curMode,
});

export default connect(mapStateToProps)(NavigateSection);
