import React, { useRef } from 'react';
import { useEffect } from 'react';

export default function MapStats({ mapData, averageDataUpdatesPerSecond }) {
    const lastUpdateTimeElapsedList = useRef([]);
    const lastUpdateTime = useRef(null);

    useEffect(() => {
        const now = Date.now();
        let lastUpdateTimeElapsed = 0;
        if (lastUpdateTime.current) {
            lastUpdateTimeElapsed = now - lastUpdateTime.current;
        }
        lastUpdateTime.current = now;
        lastUpdateTimeElapsedList.current.push(lastUpdateTimeElapsed);
        if (lastUpdateTimeElapsedList.current.length > 100) {
            lastUpdateTimeElapsedList.current.shift();
        }
    }, [mapData]);

    let Content;

    const averageUpdateTimeElapsed =
        lastUpdateTimeElapsedList.current.reduce((a, b) => a + b, 0) /
        lastUpdateTimeElapsedList.current.length;
    const averageUpdatesPerSecond = 1000 / averageUpdateTimeElapsed;

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
                    Avg Updates/Sec:{' '}
                    {Math.min(
                        averageDataUpdatesPerSecond,
                        averageUpdatesPerSecond
                    ).toFixed(2)}
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
