import React from 'react';
import { connect } from 'react-redux';

function MapStats({ mapData, averageUpdatesPerSecond }) {
    let Content;
    const statRowStyle = {};

    if (mapData) {
        Content = (
            <div>
                <div style={statRowStyle}>Map ID: {mapData.id}</div>
                <div style={statRowStyle}>
                    Total Vehicles: {Object.keys(mapData.vehicles).length}
                </div>
                <div style={statRowStyle}>
                    Total Intersections:{' '}
                    {Object.keys(mapData.intersections).length}
                </div>
                <div style={statRowStyle}>
                    Total Locations: {Object.keys(mapData.locations).length}
                </div>
                <div style={statRowStyle}>
                    Total Roads: {Object.keys(mapData.roads).length}
                </div>
                <div style={statRowStyle}>
                    Avg Updates/Sec: {averageUpdatesPerSecond.toFixed(2)}
                </div>
            </div>
        );
    } else {
        Content = <div>Map data not loaded.</div>;
    }

    return (
        <div
            style={{
                fontSize: 12,
            }}
        >
            {Content}
        </div>
    );
}

const mapStateToProps = (state) => {
    const averageUpdateTimeElapsed =
        state.lastUpdateTimeElapsedList.reduce((a, b) => a + b, 0) /
        state.lastUpdateTimeElapsedList.length;
    let averageUpdatesPerSecond = 1000 / averageUpdateTimeElapsed;
    if (state.lastUpdateTimeElapsedList.length < 100) {
        averageUpdatesPerSecond = Number.POSITIVE_INFINITY;
    }
    return {
        averageUpdatesPerSecond,
        mapData: state.mapData,
    };
};

export default connect(mapStateToProps)(MapStats);
