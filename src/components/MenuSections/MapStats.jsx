import React from 'react';
import { connect } from 'react-redux';
import MapDataHandler from '../../utils/MapDataHandler';

function MapStats({
    mapDataLoaded,
    averageUpdatesPerSecond,
    averageRendersPerSecond,
}) {
    let Content;
    const statRowStyle = {};

    if (mapDataLoaded) {
        const mapData = MapDataHandler.mapData;
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
                <div style={statRowStyle}>
                    Avg Renders/Sec: {averageRendersPerSecond.toFixed(2)}
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
    return {
        averageUpdatesPerSecond: state.averageUpdatesPerSecond,
        averageRendersPerSecond: state.averageRendersPerSecond,
        mapDataLoaded: state.mapDataLoaded,
    };
};

export default connect(mapStateToProps)(MapStats);
