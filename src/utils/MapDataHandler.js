import { getStore } from '../redux/store';
import { actionCreators } from '../redux/actions';

const MapDataHandler = {};

MapDataHandler.mapData = null;

const updateMapDataListener = (data) => {
    if (!MapDataHandler.mapData) {
        getStore().dispatch(actionCreators.setMapData(data));
    }
    MapDataHandler.mapData = data;
};

MapDataHandler.init = (socket) => {
    socket.on('update-map-data', updateMapDataListener);
};

MapDataHandler.cleanup = (socket) => {
    socket.off('update-map-data', updateMapDataListener);
};

export default MapDataHandler;
