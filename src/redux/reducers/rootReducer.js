import { reduxConstants, actionTypes } from '../actions';

const INITIAL_STATE = {
    mapDataLoaded: false,
    averageUpdatesPerSecond: Number.POSITIVE_INFINITY,
    averageRendersPerSecond: Number.POSITIVE_INFINITY,
    curMode: reduxConstants.APP_MODE_LIST.VIEW_MAP,
    selectedComponent: null,
    hoveredComponent: null,
    showLabels: {
        dynamic: true,
        static: true,
    },
    showToggleDynamicLabels: true,
    showLowFpsWarning: false,
    shownLowFpsWarning: false,
    curTripVehicle: null,
    canvasDimensions: {
        width: 0,
        height: 0,
    },
    canvasProps: {
        centerX: 0,
        centerY: 0,
        zoom: 0.5,
    },
    canvasOffset: {
        left: 0,
        top: 0,
    },
};

const rootReducer = (curState = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CANVAS_OFFSET: {
            return {
                ...curState,
                canvasOffset: {
                    ...curState.canvasOffset,
                    ...action.payload,
                },
            };
        }
        case actionTypes.UPDATE_AVERAGE_RENDERS_PER_SECOND: {
            return {
                ...curState,
                averageRendersPerSecond: action.payload,
            };
        }
        case actionTypes.UPDATE_AVERAGE_UPDATES_PER_SECOND: {
            return {
                ...curState,
                averageUpdatesPerSecond: action.payload,
            };
        }
        case actionTypes.UPDATE_MAP_DATA_LOADED: {
            return {
                ...curState,
                mapDataLoaded: action.payload,
            };
        }
        case actionTypes.UPDATE_CANVAS_PROPS_BY_ZOOM_FACTOR: {
            const { zoomOffsetFromViewCentre, zoomFactor } = action.payload;
            const zoomCenterInCanvas = {
                x: zoomOffsetFromViewCentre.x + curState.canvasProps.centerX,
                y: zoomOffsetFromViewCentre.y + curState.canvasProps.centerY,
            };

            return {
                ...curState,
                canvasProps: {
                    centerX:
                        curState.canvasProps.centerX -
                        zoomCenterInCanvas.x * (1 - zoomFactor),
                    centerY:
                        curState.canvasProps.centerY -
                        zoomCenterInCanvas.y * (1 - zoomFactor),
                    zoom: curState.canvasProps.zoom * zoomFactor,
                },
            };
        }
        case actionTypes.UPDATE_CANVAS_PROPS_BY_DIFF: {
            return {
                ...curState,
                canvasProps: {
                    centerX: action.payload.centerX
                        ? curState.canvasProps.centerX + action.payload.centerX
                        : curState.canvasProps.centerX,
                    centerY: action.payload.centerY
                        ? curState.canvasProps.centerY + action.payload.centerY
                        : curState.canvasProps.centerY,
                    zoom: action.payload.zoom
                        ? curState.canvasProps.zoom * action.payload.zoom
                        : curState.canvasProps.zoom,
                },
            };
        }
        case actionTypes.UPDATE_CANVAS_PROPS: {
            return {
                ...curState,
                canvasProps: {
                    ...curState.canvasProps,
                    ...action.payload,
                },
            };
        }
        case actionTypes.UPDATE_CANVAS_DIMENSIONS:
            return {
                ...curState,
                canvasDimensions: {
                    ...curState.canvasDimensions,
                    ...action.payload,
                },
            };
        case actionTypes.UPDATE_CUR_MODE:
            return {
                ...curState,
                curMode: action.payload,
            };
        case actionTypes.UPDATE_SELECTED_COMPONENT:
            return {
                ...curState,
                selectedComponent: action.payload,
            };
        case actionTypes.UPDATE_HOVERED_COMPONENT:
            return {
                ...curState,
                hoveredComponent: action.payload,
            };
        case actionTypes.UPDATE_SHOW_DYNAMIC_LABELS:
            return {
                ...curState,
                showLabels: {
                    ...curState.showLabels,
                    dynamic: action.payload,
                },
            };
        case actionTypes.UPDATE_SHOW_STATIC_LABELS: {
            return {
                ...curState,
                showLabels: {
                    ...curState.showLabels,
                    static: action.payload,
                },
            };
        }
        case actionTypes.UPDATE_SHOW_TOGGLE_DYNAMIC_LABELS: {
            return {
                ...curState,
                showToggleDynamicLabels: action.payload,
            };
        }
        case actionTypes.UPDATE_SHOW_FPS_WARNING: {
            if (action.payload && !curState.shownLowFpsWarning) {
                return {
                    ...curState,
                    showLowFpsWarning: true,
                    shownLowFpsWarning: true,
                };
            } else {
                return {
                    ...curState,
                    showLowFpsWarning: false,
                };
            }
        }
        case actionTypes.UPDATE_CUR_TRIP_VEHICLE: {
            return {
                ...curState,
                curTripVehicle: action.payload,
            };
        }
        default:
            return curState;
    }
};

export default rootReducer;
