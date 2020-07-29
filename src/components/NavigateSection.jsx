import React from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { actionCreators } from '../redux/actions';
import { connect } from 'react-redux';

function NavigateSection({ locationList, startTrip, curTripVehicleId }) {
    const selectOptionStyle = {
        fontSize: 10,
    };

    return (
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
                            <option key={location.id} style={selectOptionStyle}>
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
                            <option key={location.id} style={selectOptionStyle}>
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

const mapStateToProps = (state) => ({
    locationList: [],
    // locationList: state.mapData ? Object.values(state.mapData.locations) : [],
});

export default connect(mapStateToProps)(NavigateSection);
