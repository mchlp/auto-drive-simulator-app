const reduxConstants = {};
reduxConstants.APP_MODE_LIST = {
    VIEW_MAP: 'view_map',
    CREATE_MAP: 'create_map',
};

const actionTypes = {
    UPDATE_MAP_DATA: 'UPDATE_MAP_DATA',
    UPDATE_CUR_MODE: 'UPDATE_CUR_MODE',
    UPDATE_SELECTED_COMPONENT: 'UPDATE_SELECTED_COMPONENT',
    UPDATE_HOVERED_COMPONENT: 'UPDATE_HOVERED_COMPONENT',
    UPDATE_SHOW_DYNAMIC_LABELS: 'UPDATE_SHOW_DYNAMIC_LABELS',
    UPDATE_SHOW_STATIC_LABELS: 'UPDATE_SHOW_STATIC_LABELS',
    UPDATE_SHOW_TOGGLE_DYNAMIC_LABELS: 'UPDATE_SHOW_TOGGLE_DYNAMIC_LABELS',
    UPDATE_SHOW_FPS_WARNING: 'UPDATE_SHOW_FPS_WARNING',
    UPDATE_CUR_TRIP_VEHICLE: 'UPDATE_CUR_TRIP_VEHICLE',
    UPDATE_CANVAS_DIMENSIONS: 'UPDATE_CANVAS_DIMENSIONS',
    UPDATE_CANVAS_PROPS_BY_DIFF: 'UPDATE_CANVAS_PROPS_BY_DIFF',
    UPDATE_CANVAS_PROPS: 'UPDATE_CANVAS_PROPS',
    UPDATE_CANVAS_PROPS_BY_ZOOM_FACTOR: 'UPDATE_CANVAS_PROPS_BY_ZOOM_FACTOR',
};

const actionCreators = {};

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

actionCreators.setMapData = (mapData) => ({
    type: actionTypes.UPDATE_MAP_DATA,
    payload: mapData,
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

actionCreators.setCurTripVehicle = (curTripVehicle) => ({
    type: actionTypes.UPDATE_CUR_TRIP_VEHICLE,
    payload: curTripVehicle,
});

export { actionCreators, reduxConstants, actionTypes };
