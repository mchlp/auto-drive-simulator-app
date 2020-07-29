import RoadRenderer from './RoadRenderer';
import LocationRenderer from './LocationRenderer';
import IntersectionRenderer from './IntersectionRenderer';
import VehicleRenderer from './VehicleRenderer';
import { getStore } from '../redux/store';
import MapDataHandler from '../utils/MapDataHandler';

export default class MapRenderer {
    static getMapData() {
        return MapDataHandler.mapData;
    }

    static renderStatic(staticCanvas, showLabels = true) {
        const mapData = this.getMapData();
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
            LocationRenderer.render(staticCtx, mapData, showLabels);
            IntersectionRenderer.render(staticCtx, mapData, showLabels);
        }
    }

    static renderDynamic(dynamicCanvas, showLabels = false) {
        const mapData = this.getMapData();
        const {
            width: canvasWidth,
            height: canvasHeight,
        } = getStore().getState().canvasDimensions;
        if (mapData && dynamicCanvas) {
            const dynamicCtx = dynamicCanvas.getContext('2d');
            dynamicCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            VehicleRenderer.render(dynamicCtx, mapData, showLabels);
        }
    }
    static renderAll(
        statisCanvas,
        dynamicCanvas,
        showDynamicLabels,
        showStaticLabels
    ) {
        this.renderStatic(statisCanvas, showStaticLabels);
        this.renderDynamic(dynamicCanvas, showDynamicLabels);
    }
}
