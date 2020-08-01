import { getStore } from '../redux/store';
import { actionCreators } from '../redux/actions';
import Utils from './Utils';

const MapDataHandler = {};

MapDataHandler.mapData = null;
MapDataHandler.lastUpdateTimeElapsedList = [];
MapDataHandler.lastUpdateTime = performance.now();
MapDataHandler.lastReduxUpdateTime = performance.now();

const REDUX_UPDATE_INTERVAL = 1000;

const updateMapDataListener = (data) => {
    const mapDataLoadedBefore = !!MapDataHandler.mapData;
    MapDataHandler.mapData = data;
    if (!mapDataLoadedBefore) {
        getStore().dispatch(actionCreators.setMapDataLoaded(true));
    }

    if (getStore().getState().followCurTripVehicle) {
        const curVehicleId = getStore().getState().curTripVehicleId;
        console.log(curVehicleId);
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
            getStore().dispatch(actionCreators.setCurTripVehicleId(null));
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

export default MapDataHandler;
