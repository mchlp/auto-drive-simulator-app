import RoadRenderer from './RoadRenderer';
import LocationRenderer from './LocationRenderer';
import IntersectionRenderer from './IntersectionRenderer';
import VehicleRenderer from './VehicleRenderer';

export default class MapRenderer {
    static renderStatic(staticCtx, mapData, canvasWidth, canvasHeight, showLabels=true) {
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

    static renderDynamic(dynamicCtx, mapData, canvasWidth, canvasHeight, showLabels=false) {
        dynamicCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        VehicleRenderer.render(dynamicCtx, mapData, showLabels);
    }
    static renderAll(
        staticCtx,
        dynamicCtx,
        mapData,
        canvasWidth,
        canvasHeight,
        showDynamicLabels,
        showStaticLabels
    ) {
        this.renderStatic(staticCtx, mapData, canvasWidth, canvasHeight, showStaticLabels);
        this.renderDynamic(dynamicCtx, mapData, canvasWidth, canvasHeight, showDynamicLabels);
    }
}
