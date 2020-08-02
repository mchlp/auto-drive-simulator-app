import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Input, Card, CardBody, Alert } from 'reactstrap';
import MapViewer from './MapViewer';
import constants from '../constants';
import Utils from '../utils/Utils';
import rawMapData from './test.json';
import { actionCreators, reduxConstants } from '../redux/actions';
import { connect } from 'react-redux';
import MapDataHandler from '../utils/MapDataHandler';

const POINTER_TYPE = {
    INTERSECTION: 'intersection',
    LOCATION: 'location',
    NONE: 'none',
    ROAD: 'road',
    SAVE_MAP: 'save_map',
    DELETE: 'delete',
};

function MapBuilder({
    dispatch,
    curMode,
    selectedComponent,
    hoveredComponent,
}) {
    const prevSavedMapData = useRef(
        JSON.parse(localStorage.getItem('saved-map-data')) || rawMapData
    );
    const curPointerComponentId = useRef(null);
    const [roadStartWaypointId, setRoadStartWaypointId] = useState(null);
    const [roadType, setRoadType] = useState(null);
    const [curPointerType, setCurPointerType] = useState(POINTER_TYPE.NONE);
    const [saveMapData, setSaveMapData] = useState('');

    useEffect(() => {
        console.log(curMode);
        MapDataHandler.updateMapData(prevSavedMapData.current);
    }, [curMode]);

    const keyDownHandler = (event) => {
        if (event.key === 'Escape') {
            setCurPointerType(POINTER_TYPE.NONE);
            curPointerComponentId.current = null;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    const mouseMoveHandler = (mapCoordinates) => {
        if (curPointerType === POINTER_TYPE.INTERSECTION) {
            let nextIntersectionId = curPointerComponentId.current;
            if (
                !nextIntersectionId ||
                !nextIntersectionId.includes('intersection')
            ) {
                nextIntersectionId = `intersection_${Utils.generateShortUuid()}`;
            }
            curPointerComponentId.current = nextIntersectionId;
            MapDataHandler.updateMapData({
                ...MapDataHandler.mapData,
                intersections: {
                    ...MapDataHandler.mapData.intersections,
                    [nextIntersectionId]: {
                        id: nextIntersectionId,
                        coord: mapCoordinates,
                    },
                },
            });
        } else if (curPointerType === POINTER_TYPE.LOCATION) {
            let nextLocationId = curPointerComponentId.current;
            if (!nextLocationId || !nextLocationId.includes('location')) {
                nextLocationId = `location_${Utils.generateShortUuid()}`;
            }
            curPointerComponentId.current = nextLocationId;

            MapDataHandler.updateMapData({
                ...MapDataHandler.mapData,
                locations: {
                    ...MapDataHandler.mapData.locations,
                    [nextLocationId]: {
                        id: nextLocationId,
                        coord: mapCoordinates,
                    },
                },
            });
        } else {
            MapDataHandler.updateMapData(prevSavedMapData.current);
            curPointerComponentId.current = null;
        }
    };

    const mouseDownHandler = (mapCoordinates) => {
        if (
            curPointerType === POINTER_TYPE.INTERSECTION ||
            curPointerType === POINTER_TYPE.LOCATION
        ) {
            if (!hoveredComponent) {
                prevSavedMapData.current = MapDataHandler.mapData;
                curPointerComponentId.current = null;
            }
        } else if (curPointerType === POINTER_TYPE.ROAD) {
            if (hoveredComponent) {
                if (!roadStartWaypointId) {
                    // road start point
                    setRoadStartWaypointId(hoveredComponent.id);
                } else {
                    // road end point
                    const nextRoadId = `road_${Utils.generateShortUuid()}`;

                    const newMapData = {
                        ...prevSavedMapData.current,
                        roads: {
                            ...prevSavedMapData.current.roads,
                            [nextRoadId]: {
                                id: nextRoadId,
                                type: roadType,
                                start: roadStartWaypointId,
                                end: hoveredComponent.id,
                            },
                        },
                    };
                    prevSavedMapData.current = newMapData;
                    MapDataHandler.updateMapData(newMapData);
                    setRoadStartWaypointId(hoveredComponent.id);
                }
            }
        } else if (curPointerType === POINTER_TYPE.DELETE) {
            if (hoveredComponent) {
                deleteComponent(hoveredComponent);
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            localStorage.setItem('saved-map-data', getSerializedMap());
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const getSerializedMap = () => {
        const serializedMap = {
            id: `map_${Utils.generateShortUuid()}`,
            locations: prevSavedMapData.current.locations,
            intersections: prevSavedMapData.current.intersections,
            vehicles: {},
            roads: prevSavedMapData.current.roads,
        };
        return JSON.stringify(serializedMap);
    };

    const saveMap = () => {
        setCurPointerType(POINTER_TYPE.SAVE_MAP);
        setSaveMapData(getSerializedMap());
    };

    const deleteComponent = (deleteComponent) => {
        if (deleteComponent && deleteComponent.id) {
            const newMapData = JSON.parse(
                JSON.stringify(prevSavedMapData.current)
            );

            if (newMapData.intersections[deleteComponent.id]) {
                delete newMapData.intersections[deleteComponent.id];
            }

            if (newMapData.locations[deleteComponent.id]) {
                delete newMapData.locations[deleteComponent.id];
            }

            for (const roadId of Object.keys(prevSavedMapData.current.roads)) {
                if (
                    prevSavedMapData.current.roads[roadId].start ===
                        deleteComponent.id ||
                    prevSavedMapData.current.roads[roadId].end ===
                        deleteComponent.id
                ) {
                    delete newMapData.roads[roadId];
                }
            }

            prevSavedMapData.current = newMapData;
            curPointerComponentId.current = null;
            MapDataHandler.updateMapData(newMapData);
        }
    };

    let curPointerRadius = 0;
    if (curPointerType === POINTER_TYPE.LOCATION) {
        curPointerRadius = constants.DISPLAY.LOCATION_RADIUS;
    } else if (curPointerType === POINTER_TYPE.INTERSECTION) {
        curPointerRadius = constants.DISPLAY.INTERSECTION_RADIUS;
    }

    let cursorStyle = null;
    if (curPointerType === POINTER_TYPE.ROAD && roadStartWaypointId) {
        cursorStyle = 'crosshair';
    } else if (curPointerType === POINTER_TYPE.DELETE) {
        cursorStyle = 'no-drop';
    }

    const buildActionHandler = (buildAction) => {
        switch (buildAction) {
            case reduxConstants.BUILD_ACTIONS.ADD_LOCATION: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                setCurPointerType(POINTER_TYPE.LOCATION);
                curPointerComponentId.current = null;
                break;
            }
            case reduxConstants.BUILD_ACTIONS.ADD_INTERSECTION: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                setCurPointerType(POINTER_TYPE.INTERSECTION);
                curPointerComponentId.current = null;
                break;
            }
            case reduxConstants.BUILD_ACTIONS.BUILD_MAJOR_ROAD: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                setCurPointerType(POINTER_TYPE.ROAD);
                setRoadType(constants.ROAD_TYPES.TYPES.MAJOR);
                break;
            }
            case reduxConstants.BUILD_ACTIONS.BUILD_MINOR_ROAD: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                setCurPointerType(POINTER_TYPE.ROAD);
                setRoadType(constants.ROAD_TYPES.TYPES.MINOR);
                break;
            }
            case reduxConstants.BUILD_ACTIONS.BUILD_LOCAL_ROAD: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                setCurPointerType(POINTER_TYPE.ROAD);
                setRoadType(constants.ROAD_TYPES.TYPES.LOCAL);
                break;
            }
            case reduxConstants.BUILD_ACTIONS.DELETE_COMPONENTS: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                setCurPointerType(POINTER_TYPE.DELETE);
                curPointerComponentId.current = null;
                break;
            }
            case reduxConstants.BUILD_ACTIONS.RESET_POINTER: {
                setRoadStartWaypointId(null);
                MapDataHandler.updateMapData(prevSavedMapData.current);
                setCurPointerType(POINTER_TYPE.NONE);
                curPointerComponentId.current = null;
                break;
            }
            case reduxConstants.BUILD_ACTIONS.SAVE_MAP: {
                saveMap();
                break;
            }
            default:
                break;
        }
    };

    return (
        <div className="mt-1">
            {curPointerType === POINTER_TYPE.SAVE_MAP && (
                <Alert className="mt-2">
                    <div className="mb-2">
                        Copy the map data below to your clipboard.
                    </div>
                    <Input type="text" value={saveMapData} readOnly={true} />
                </Alert>
            )}
            <div>
                <MapViewer
                    onMouseMove={mouseMoveHandler}
                    onMouseDown={mouseDownHandler}
                    curPointerRadius={curPointerRadius}
                    curPointerComponentId={curPointerComponentId.current}
                    cursorStyle={cursorStyle}
                    buildActionHandler={buildActionHandler}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        curMode: state.curMode,
        selectedComponent: state.selectedComponent,
        hoveredComponent: state.hoveredComponent,
    };
};

export default connect(mapStateToProps)(MapBuilder);
