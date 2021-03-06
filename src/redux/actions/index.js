const reduxConstants = {};
reduxConstants.APP_MODE_LIST = {
    VIEW_MAP: 'view_map',
    CREATE_MAP: 'create_map',
};

reduxConstants.COMPLETED_TRIP_VEHICLE_ID = '__trip_completed__';

reduxConstants.BUILD_ACTIONS = {
    ADD_LOCATION: 'ADD_LOCATION',
    ADD_INTERSECTION: 'ADD_INTERSECTION',
    BUILD_MAJOR_ROAD: 'BUILD_MAJOR_ROAD',
    BUILD_MINOR_ROAD: 'BUILD_MINOR_ROAD',
    BUILD_LOCAL_ROAD: 'BUILD_LOCAL_ROAD',
    DELETE_COMPONENTS: 'DELETE_COMPONENTS',
    RESET_POINTER: 'RESET_POINTER',
    SAVE_MAP: 'SAVE_MAP',
};

reduxConstants.BUILD_POINTER_TYPE = {
    INTERSECTION: 'intersection',
    LOCATION: 'location',
    NONE: 'none',
    ROAD_SUFFIX: '_road',
    MAJOR_ROAD: 'major_road',
    MINOR_ROAD: 'minor_road',
    LOCAL_ROAD: 'local_road',
    DELETE: 'delete',
};

const actionTypes = {
    UPDATE_MAP_DATA_LOADED: 'UPDATE_MAP_DATA_LOADED',
    UPDATE_AVERAGE_RENDERS_PER_SECOND: 'UPDATE_AVERAGE_RENDERS_PER_SECOND',
    UPDATE_AVERAGE_UPDATES_PER_SECOND: 'UPDATE_AVERAGE_UPDATES_PER_SECOND',
    UPDATE_CUR_MODE: 'UPDATE_CUR_MODE',
    UPDATE_CUR_BUILD_POINTER_TYPE: 'UPDATE_CUR_BUILD_POINTER_TYPE',
    UPDATE_SELECTED_COMPONENT: 'UPDATE_SELECTED_COMPONENT',
    UPDATE_HOVERED_COMPONENT: 'UPDATE_HOVERED_COMPONENT',
    UPDATE_SHOW_DYNAMIC_LABELS: 'UPDATE_SHOW_DYNAMIC_LABELS',
    UPDATE_SHOW_STATIC_LABELS: 'UPDATE_SHOW_STATIC_LABELS',
    UPDATE_SHOW_TOGGLE_DYNAMIC_LABELS: 'UPDATE_SHOW_TOGGLE_DYNAMIC_LABELS',
    UPDATE_SHOW_FPS_WARNING: 'UPDATE_SHOW_FPS_WARNING',
    UPDATE_SHOW_ABOUT_MODAL: 'UPDATE_SHOW_ABOUT_MODAL',
    UPDATE_CUR_TRIP_VEHICLE_ID: 'UPDATE_CUR_TRIP_VEHICLE_ID',
    UPDATE_FOLLOW_CUR_TRIP_VEHICLE: 'UPDATE_FOLLOW_CUR_TRIP_VEHICLE',
    UPDATE_CANVAS_DIMENSIONS: 'UPDATE_CANVAS_DIMENSIONS',
    UPDATE_CANVAS_PROPS_BY_DIFF: 'UPDATE_CANVAS_PROPS_BY_DIFF',
    UPDATE_CANVAS_PROPS: 'UPDATE_CANVAS_PROPS',
    UPDATE_CANVAS_PROPS_BY_ZOOM_FACTOR: 'UPDATE_CANVAS_PROPS_BY_ZOOM_FACTOR',
    UPDATE_CANVAS_OFFSET: 'UPDATE_CANVAS_OFFSET',
};

const actionCreators = {};

actionCreators.setCurBuildPointerType = (buildPointerType) => ({
    type: actionTypes.UPDATE_CUR_BUILD_POINTER_TYPE,
    payload: buildPointerType,
});

actionCreators.setShowAboutModal = (showAboutModal) => ({
    type: actionTypes.UPDATE_SHOW_ABOUT_MODAL,
    payload: showAboutModal,
});

actionCreators.setFollowCurTripVehicle = (followCurTripVehicle) => ({
    type: actionTypes.UPDATE_FOLLOW_CUR_TRIP_VEHICLE,
    payload: followCurTripVehicle,
});

actionCreators.setCanvasOffset = (canvasOffset) => ({
    type: actionTypes.UPDATE_CANVAS_OFFSET,
    payload: canvasOffset,
});

actionCreators.setCanvasPropsZoom = (zoomFactor, zoomOffsetFromViewCentre) => ({
    type: actionTypes.UPDATE_CANVAS_PROPS_BY_ZOOM_FACTOR,
    payload: { zoomOffsetFromViewCentre, zoomFactor },
});

actionCreators.setCanvasPropsDiff = (canvasPropsDiff) => ({
    type: actionTypes.UPDATE_CANVAS_PROPS_BY_DIFF,
    payload: canvasPropsDiff,
});

actionCreators.setCanvasProps = (canvasProps) => ({
    type: actionTypes.UPDATE_CANVAS_PROPS,
    payload: canvasProps,
});

actionCreators.setCanvasDimensions = (canvasDimensions) => ({
    type: actionTypes.UPDATE_CANVAS_DIMENSIONS,
    payload: canvasDimensions,
});

actionCreators.setCurMode = (curMode) => ({
    type: actionTypes.UPDATE_CUR_MODE,
    payload: curMode,
});

actionCreators.setSelectedComponent = (selectedComponent) => ({
    type: actionTypes.UPDATE_SELECTED_COMPONENT,
    payload: selectedComponent,
});

actionCreators.setHoveredComponent = (hoveredComponent) => ({
    type: actionTypes.UPDATE_HOVERED_COMPONENT,
    payload: hoveredComponent,
});

actionCreators.setShowDynamicLabels = (showDynamicLabels) => ({
    type: actionTypes.UPDATE_SHOW_DYNAMIC_LABELS,
    payload: showDynamicLabels,
});

actionCreators.setShowStaticLabels = (showStaticLabels) => ({
    type: actionTypes.UPDATE_SHOW_STATIC_LABELS,
    payload: showStaticLabels,
});

actionCreators.setShowToggleDynamicLabels = (showToggleDynamicLabels) => ({
    type: actionTypes.UPDATE_SHOW_TOGGLE_DYNAMIC_LABELS,
    payload: showToggleDynamicLabels,
});

actionCreators.setShowFpsWarning = (showFpsWarning) => ({
    type: actionTypes.UPDATE_SHOW_FPS_WARNING,
    payload: showFpsWarning,
});

actionCreators.setCurTripVehicleId = (curTripVehicleId) => ({
    type: actionTypes.UPDATE_CUR_TRIP_VEHICLE_ID,
    payload: curTripVehicleId,
});

actionCreators.setMapDataLoaded = (mapDataLoaded) => ({
    type: actionTypes.UPDATE_MAP_DATA_LOADED,
    payload: mapDataLoaded,
});

actionCreators.setAverageUpdatesPerSecond = (avgUpdatesPerSecond) => ({
    type: actionTypes.UPDATE_AVERAGE_UPDATES_PER_SECOND,
    payload: avgUpdatesPerSecond,
});

actionCreators.setAverageRendersPerSecond = (avgRendersPerSecond) => ({
    type: actionTypes.UPDATE_AVERAGE_RENDERS_PER_SECOND,
    payload: avgRendersPerSecond,
});

export { actionCreators, reduxConstants, actionTypes };
