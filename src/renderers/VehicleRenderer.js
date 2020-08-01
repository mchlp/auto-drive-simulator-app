import Utils from '../utils/Utils';
import constants from '../constants';

export default class VehicleRenderer {
    static render(ctx, mapData, showLabels, curTripVehicleId) {
        Object.entries(mapData.vehicles).forEach((vehicleEntry) => {
            const vehicleId = vehicleEntry[0];
            const vehicleData = vehicleEntry[1];

            const coord = Utils.mapArrayCoord(vehicleData.coord);

            if (
                Utils.checkCoordinateInCanvasView(
                    coord,
                    constants.DISPLAY.VEHICLE_RADIUS
                )
            ) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'grey';
                if (curTripVehicleId === vehicleId) {
                    ctx.fillStyle = 'purple';
                } else {
                    ctx.fillStyle = 'blue';
                }
                ctx.setLineDash([]);

                ctx.beginPath();
                ctx.arc(
                    coord[0],
                    coord[1],
                    Utils.scaleSingleCoord(constants.DISPLAY.VEHICLE_RADIUS),
                    0,
                    2 * Math.PI
                );
                ctx.stroke();
                ctx.fill();

                if (showLabels || curTripVehicleId === vehicleId) {
                    ctx.lineJoin = 'round';
                    ctx.miterLimit = 2;
                    const text = `${vehicleId} | Src: ${vehicleData.originId} | Dest: ${vehicleData.destinationId}`;
                    ctx.font = Utils.scaleSingleCoord(15) + 'px Arial';
                    ctx.strokeStyle = 'black';
                    ctx.strokeWidth = Utils.scaleSingleCoord(1);
                    ctx.strokeText(text, coord[0], coord[1]);
                    ctx.fillStyle = 'yellow';
                    ctx.fillText(text, coord[0], coord[1]);
                }
            }
        });
    }
}
