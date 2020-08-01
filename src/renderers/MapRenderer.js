import RoadRenderer from './RoadRenderer';
import LocationRenderer from './LocationRenderer';
import IntersectionRenderer from './IntersectionRenderer';
import VehicleRenderer from './VehicleRenderer';
import { getStore } from '../redux/store';
import MapDataHandler from '../utils/MapDataHandler';
import { actionCreators } from '../redux/actions';

const REDUX_UPDATE_INTERVAL = 1000;

export default class MapRenderer {
    static lastRenderTimeElapsedList = [];
    static lastRenderTime = performance.now();
    static lastReduxUpdateTime = performance.now();

    static getMapData() {
        return MapDataHandler.mapData;
    }

    static getShowLabels() {
        const curState = getStore().getState();
        const { showToggleDynamicLabels, followCurTripVehicle } = curState;
        const showDynamicLabels = curState.showLabels.dynamic;
        return (
            showToggleDynamicLabels &&
            showDynamicLabels &&
            !followCurTripVehicle
        );
    }

    static getCurTripVehicleId() {
        return getStore().getState().curTripVehicleId;
    }

    static _renderStatic(staticCanvas) {
        const mapData = this.getMapData();
        const showLabels = this.getShowLabels();
        const {
            width: canvasWidth,
            height: canvasHeight,
        } = getStore().getState().canvasDimensions;
        if (mapData && staticCanvas) {
            const staticCtx = staticCanvas.getContext('2d');
            staticCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            staticCtx.fillStyle = '#dddddd';
            staticCtx.fillRect(0, 0, canvasWidth, canvasHeight);

            const logoImage = new Image();
            logoImage.src = '/logo192.png';
            logoImage.onload = () => {
                staticCtx.drawImage(logoImage, 0, 0, 50, 50);
            };

            RoadRenderer.render(staticCtx, mapData, showLabels);
            LocationRenderer.render(staticCtx, mapData, true);
            IntersectionRenderer.render(staticCtx, mapData, false);
        }
    }

    static _renderDynamic(dynamicCanvas) {
        const mapData = this.getMapData();
        const showLabels = this.getShowLabels();
        const {
            width: canvasWidth,
            height: canvasHeight,
        } = getStore().getState().canvasDimensions;
        if (mapData && dynamicCanvas) {
            const dynamicCtx = dynamicCanvas.getContext('2d');
            dynamicCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            VehicleRenderer.render(
                dynamicCtx,
                mapData,
                showLabels,
                this.getCurTripVehicleId()
            );
        }
    }

    static renderAll(statisCanvas, dynamicCanvas) {
        this._renderStatic(statisCanvas);
        this._renderDynamic(dynamicCanvas);

        const now = performance.now();
        const lastRenderTimeElapsed = now - this.lastRenderTime;
        this.lastRenderTimeElapsedList.push(lastRenderTimeElapsed);
        if (this.lastRenderTimeElapsedList.length > 100) {
            this.lastRenderTimeElapsedList.shift();
        }
        if (now - this.lastReduxUpdateTime > REDUX_UPDATE_INTERVAL) {
            const averageRenderTimeElapsed =
                this.lastRenderTimeElapsedList.reduce((a, b) => a + b, 0) /
                this.lastRenderTimeElapsedList.length;
            let averageRendersPerSecond = 1000 / averageRenderTimeElapsed;
            if (this.lastRenderTimeElapsedList.length < 100) {
                averageRendersPerSecond = Number.POSITIVE_INFINITY;
            }
            getStore().dispatch(
                actionCreators.setAverageRendersPerSecond(
                    averageRendersPerSecond
                )
            );
            this.lastReduxUpdateTime = now;
        }
        this.lastRenderTime = now;
    }
}
