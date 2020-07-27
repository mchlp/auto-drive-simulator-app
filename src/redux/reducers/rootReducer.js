import { reduxConstants, actionTypes } from '../actions';

const INITIAL_STATE = {
    mapData: null,
    curMode: reduxConstants.APP_MODE_LIST.VIEW_MAP,
    lastUpdateTimeElapsedList: [],
    lastUpdateTime: Date.now(),
    selectedComponent: null,
    hoveredComponent: null,
    showLabels: {
        dynamic: true,
        static: true,
    },
};

const rootReducer = (curState = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CUR_MODE:
            return {
                ...curState,
                curMode: action.payload,
            };
        case actionTypes.UPDATE_MAP_DATA:
            const newLastUpdateTimeElapsedList = [
                ...curState.lastUpdateTimeElapsedList,
            ];
            const now = Date.now();
            const lastUpdateTimeElapsed = now - curState.lastUpdateTime;
            newLastUpdateTimeElapsedList.push(lastUpdateTimeElapsed);
            if (newLastUpdateTimeElapsedList.length > 100) {
                newLastUpdateTimeElapsedList.shift();
            }
            return {
                ...curState,
                mapData: action.payload,
                lastUpdateTime: now,
                lastUpdateTimeElapsedList: newLastUpdateTimeElapsedList,
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
        default:
            return curState;
    }
};

export default rootReducer;
