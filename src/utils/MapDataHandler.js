import { getStore } from '../redux/store';
import { actionCreators, reduxConstants } from '../redux/actions';
import Utils from './Utils';

const MapDataHandler = {};

MapDataHandler.mapData = null;
MapDataHandler.lastUpdateTimeElapsedList = [];
MapDataHandler.lastUpdateTime = performance.now();
MapDataHandler.lastReduxUpdateTime = performance.now();

const REDUX_UPDATE_INTERVAL = 1000;

const updateMapDataListener = (data, manualUpdate = false) => {   
    if (
        manualUpdate ||
        getStore().getState().curMode === reduxConstants.APP_MODE_LIST.VIEW_MAP
    ) {
        MapDataHandler.mapData = data;
    }

    if (!getStore().getState().mapDataLoaded) {
        getStore().dispatch(actionCreators.setMapDataLoaded(true));
    }

    if (getStore().getState().followCurTripVehicle) {
        const curVehicleId = getStore().getState().curTripVehicleId;
        if (MapDataHandler.mapData.vehicles[curVehicleId]) {
            const coords = MapDataHandler.mapData.vehicles[curVehicleId].coord;
            getStore().dispatch(
                actionCreators.setCanvasProps({
                    centerX: Utils.scaleSingleCoord(coords[0]),
                    centerY: Utils.scaleSingleCoord(coords[1]),
                })
            );
        } else {
            getStore().dispatch(actionCreators.setFollowCurTripVehicle(false));
            getStore().dispatch(
                actionCreators.setCurTripVehicleId(
                    reduxConstants.COMPLETED_TRIP_VEHICLE_ID
                )
            );
        }
    }

    // update FPS
    const now = performance.now();
    const lastUpdateTimeElapsed = now - MapDataHandler.lastUpdateTime;
    MapDataHandler.lastUpdateTimeElapsedList.push(lastUpdateTimeElapsed);
    if (MapDataHandler.lastUpdateTimeElapsedList.length > 100) {
        MapDataHandler.lastUpdateTimeElapsedList.shift();
    }
    if (now - MapDataHandler.lastReduxUpdateTime > REDUX_UPDATE_INTERVAL) {
        const averageUpdateTimeElapsed =
            MapDataHandler.lastUpdateTimeElapsedList.reduce(
                (a, b) => a + b,
                0
            ) / MapDataHandler.lastUpdateTimeElapsedList.length;
        let averageUpdatesPerSecond = 1000 / averageUpdateTimeElapsed;
        if (MapDataHandler.lastUpdateTimeElapsedList.length < 100) {
            averageUpdatesPerSecond = Number.POSITIVE_INFINITY;
        }
        getStore().dispatch(
            actionCreators.setAverageUpdatesPerSecond(averageUpdatesPerSecond)
        );
        MapDataHandler.lastReduxUpdateTime = now;
    }
    MapDataHandler.lastUpdateTime = now;
};

MapDataHandler.init = (socket) => {
    socket.on('update-map-data', updateMapDataListener);
};

MapDataHandler.cleanup = (socket) => {
    socket.off('update-map-data', updateMapDataListener);
};

MapDataHandler.updateMapData = (data) => {
    updateMapDataListener(data, true);
};

export default MapDataHandler;
