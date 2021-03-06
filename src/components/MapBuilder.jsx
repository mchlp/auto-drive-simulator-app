import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Input, Card, CardBody, Alert } from 'reactstrap';
import MapViewer from './MapViewer';
import constants from '../constants';
import Utils from '../utils/Utils';
import rawMapData from './test.json';
import { actionCreators, reduxConstants } from '../redux/actions';
import { connect } from 'react-redux';
import MapDataHandler from '../utils/MapDataHandler';

function MapBuilder({
    dispatch,
    curMode,
    curBuildPointerType,
    selectedComponent,
    hoveredComponent,
}) {
    const prevSavedMapData = useRef(
        JSON.parse(localStorage.getItem('saved-map-data')) || rawMapData
    );
    const curPointerComponentId = useRef(null);
    const [roadStartWaypointId, setRoadStartWaypointId] = useState(null);
    const [roadType, setRoadType] = useState(null);

    useEffect(() => {
        console.log(curMode);
        MapDataHandler.updateMapData(prevSavedMapData.current);
    }, [curMode]);

    const keyDownHandler = (event) => {
        if (event.key === 'Escape') {
            dispatch(
                actionCreators.setCurBuildPointerType(
                    reduxConstants.BUILD_POINTER_TYPE.NONE
                )
            );
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
        if (
            curBuildPointerType ===
            reduxConstants.BUILD_POINTER_TYPE.INTERSECTION
        ) {
            let nextIntersectionId = curPointerComponentId.current;
            if (
                !nextIntersectionId ||
                !nextIntersectionId.includes('intersection')
            ) {
                nextIntersectionId = `intersection_${Utils.generateShortUuid()}`;
            }
            curPointerComponentId.current = nextIntersectionId;
            const newMapData = {
                ...MapDataHandler.mapData,
                intersections: {
                    ...MapDataHandler.mapData.intersections,
                    [nextIntersectionId]: {
                        ...MapDataHandler.mapData.intersections[
                            nextIntersectionId
                        ],
                        id: nextIntersectionId,
                        coord: mapCoordinates,
                    },
                },
            };
            MapDataHandler.updateMapData(newMapData);
        } else if (
            curBuildPointerType === reduxConstants.BUILD_POINTER_TYPE.LOCATION
        ) {
            let nextLocationId = curPointerComponentId.current;
            let nextLocationName = null;
            let newLocation = false;

            if (!nextLocationId || !nextLocationId.includes('location')) {
                nextLocationId = `location_${Utils.generateShortUuid()}`;
                nextLocationName = constants.getUniqueLocationName();
                newLocation = true;
            }
            curPointerComponentId.current = nextLocationId;

            const newMapData = {
                ...MapDataHandler.mapData,
                locations: {
                    ...MapDataHandler.mapData.locations,
                    [nextLocationId]: {
                        ...MapDataHandler.mapData.locations[nextLocationId],
                        coord: mapCoordinates,
                    },
                },
            };

            if (newLocation) {
                newMapData.locations[nextLocationId].id = nextLocationId;
                newMapData.locations[nextLocationId].name = nextLocationName;
            }

            MapDataHandler.updateMapData(newMapData);
        } else {
            MapDataHandler.updateMapData(prevSavedMapData.current);
            curPointerComponentId.current = null;
        }
    };

    const mouseDownHandler = (mapCoordinates, eventButton) => {
        if (eventButton === 0) {
            if (
                curBuildPointerType ===
                    reduxConstants.BUILD_POINTER_TYPE.INTERSECTION ||
                curBuildPointerType ===
                    reduxConstants.BUILD_POINTER_TYPE.LOCATION
            ) {
                if (!hoveredComponent) {
                    prevSavedMapData.current = MapDataHandler.mapData;
                    curPointerComponentId.current = null;
                }
            } else if (
                curBuildPointerType.includes(reduxConstants.BUILD_POINTER_TYPE.ROAD_SUFFIX)
            ) {
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
            } else if (
                curBuildPointerType === reduxConstants.BUILD_POINTER_TYPE.DELETE
            ) {
                if (hoveredComponent) {
                    deleteComponent(hoveredComponent);
                }
            }
        } else if (eventButton === 2) {
            buildActionHandler(reduxConstants.BUILD_ACTIONS.RESET_POINTER);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            localStorage.setItem(
                'saved-map-data',
                JSON.stringify(getSerializedMap())
            );
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
        return serializedMap;
    };

    const saveMap = () => {
        const serializedMap = getSerializedMap();
        const dataExportStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(serializedMap));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataExportStr);
        downloadAnchorNode.setAttribute('download', serializedMap.id + '.json');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
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
    if (curBuildPointerType === reduxConstants.BUILD_POINTER_TYPE.LOCATION) {
        curPointerRadius = constants.DISPLAY.LOCATION_RADIUS;
    } else if (
        curBuildPointerType === reduxConstants.BUILD_POINTER_TYPE.INTERSECTION
    ) {
        curPointerRadius = constants.DISPLAY.INTERSECTION_RADIUS;
    }

    let cursorStyle = null;
    if (
        curBuildPointerType.includes(reduxConstants.BUILD_POINTER_TYPE.ROAD_SUFFIX) &&
        roadStartWaypointId
    ) {
        cursorStyle = 'crosshair';
    } else if (
        curBuildPointerType === reduxConstants.BUILD_POINTER_TYPE.DELETE
    ) {
        cursorStyle = 'no-drop';
    }

    const buildActionHandler = (buildAction) => {
        switch (buildAction) {
            case reduxConstants.BUILD_ACTIONS.ADD_LOCATION: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                dispatch(
                    actionCreators.setCurBuildPointerType(
                        reduxConstants.BUILD_POINTER_TYPE.LOCATION
                    )
                );
                curPointerComponentId.current = null;
                break;
            }
            case reduxConstants.BUILD_ACTIONS.ADD_INTERSECTION: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                dispatch(
                    actionCreators.setCurBuildPointerType(
                        reduxConstants.BUILD_POINTER_TYPE.INTERSECTION
                    )
                );
                curPointerComponentId.current = null;
                break;
            }
            case reduxConstants.BUILD_ACTIONS.BUILD_MAJOR_ROAD: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                dispatch(
                    actionCreators.setCurBuildPointerType(
                        reduxConstants.BUILD_POINTER_TYPE.MAJOR_ROAD
                    )
                );
                setRoadType(constants.ROAD_TYPES.TYPES.MAJOR);
                break;
            }
            case reduxConstants.BUILD_ACTIONS.BUILD_MINOR_ROAD: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                dispatch(
                    actionCreators.setCurBuildPointerType(
                        reduxConstants.BUILD_POINTER_TYPE.MINOR_ROAD
                    )
                );
                setRoadType(constants.ROAD_TYPES.TYPES.MINOR);
                break;
            }
            case reduxConstants.BUILD_ACTIONS.BUILD_LOCAL_ROAD: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                dispatch(
                    actionCreators.setCurBuildPointerType(
                        reduxConstants.BUILD_POINTER_TYPE.LOCAL_ROAD
                    )
                );
                setRoadType(constants.ROAD_TYPES.TYPES.LOCAL);
                break;
            }
            case reduxConstants.BUILD_ACTIONS.DELETE_COMPONENTS: {
                MapDataHandler.updateMapData(prevSavedMapData.current);
                dispatch(
                    actionCreators.setCurBuildPointerType(
                        reduxConstants.BUILD_POINTER_TYPE.DELETE
                    )
                );
                curPointerComponentId.current = null;
                break;
            }
            case reduxConstants.BUILD_ACTIONS.RESET_POINTER: {
                setRoadStartWaypointId(null);
                MapDataHandler.updateMapData(prevSavedMapData.current);
                dispatch(
                    actionCreators.setCurBuildPointerType(
                        reduxConstants.BUILD_POINTER_TYPE.NONE
                    )
                );
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

    const updateLocationName = (locationId, newLocationName) => {
        MapDataHandler.mapData.locations[locationId].name = newLocationName;
        prevSavedMapData.current = MapDataHandler.mapData;
    };

    return (
        <div className="mt-1">
            <div>
                <MapViewer
                    onMouseMove={mouseMoveHandler}
                    onMouseDown={mouseDownHandler}
                    curPointerRadius={curPointerRadius}
                    curPointerComponentId={curPointerComponentId.current}
                    cursorStyle={cursorStyle}
                    buildActionHandler={buildActionHandler}
                    updateLocationName={updateLocationName}
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
        curBuildPointerType: state.curBuildPointerType,
    };
};

export default connect(mapStateToProps)(MapBuilder);
