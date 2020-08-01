import React, { useEffect, useState } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { actionCreators } from '../redux/actions';
import MapDataHandler from '../utils/MapDataHandler';
import { connect } from 'react-redux';

function NavigateSection({
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
        if (a.id < b.id) {
            return -1;
        } else if (a.id > b.id) {
            return 1;
        }
        return 0;
    });

    console.log(locationList);

    const selectOptionStyle = {
        fontSize: 10,
    };

    let Content;
    if (curTripVehicleId && curTripVehicleData) {
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
                    {curTripVehicleData.originId}
                </div>
                <div>
                    <span className="font-weight-bold">Destination: </span>
                    {curTripVehicleData.destinationId}
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
                    <Label
                        for="navigate-origin"
                        className="font-weight-bold mb-1 mt-2"
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
                                    style={selectOptionStyle}
                                >
                                    {location.id}
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
                                    style={selectOptionStyle}
                                >
                                    {location.id}
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
});

export default connect(mapStateToProps)(NavigateSection);
