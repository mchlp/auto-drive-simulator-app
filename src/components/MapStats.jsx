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

    if (mapData) {
        Content = (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    height: '40pt',
                }}
            >
                <div className="font-weight-bold mx-1">Map Data</div>
                <div className="mx-1">Map ID: {mapData.id}</div>
                <div className="mx-1">
                    Total Vehicles: {Object.keys(mapData.vehicles).length}
                </div>
                <div className="mx-1">
                    Total Intersections:{' '}
                    {Object.keys(mapData.intersections).length}
                </div>
                <div className="mx-1">
                    Total Locations: {Object.keys(mapData.locations).length}
                </div>
                <div className="mx-1">
                    Total Roads: {Object.keys(mapData.roads).length}
                </div>
                <div className="mx-1">
                    Avg Canvas Updates/Sec: {averageUpdatesPerSecond.toFixed(2)}
                </div>
                <div className="mx-1">
                    Avg Data Updates/Sec:{' '}
                    {averageDataUpdatesPerSecond.toFixed(2)}
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
