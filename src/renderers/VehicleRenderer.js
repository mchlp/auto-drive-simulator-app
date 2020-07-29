import Utils from '../utils/Utils';
import constants from '../constants';

export default class VehicleRenderer {
    static render(ctx, mapData, showLabels) {
        Object.entries(mapData.vehicles).forEach((vehicleEntry) => {
            const vehicleId = vehicleEntry[0];
            const vehicleData = vehicleEntry[1];

            const coord = Utils.mapArrayCoord(vehicleData.coord);

            ctx.lineWidth = 2;
            ctx.strokeStyle = 'grey';
            ctx.fillStyle = 'blue';
            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.arc(
                coord[0],
                coord[1],
                Utils.scaleSingleCoord(10),
                0,
                2 * Math.PI
            );
            ctx.stroke();
            ctx.fill();

            if (showLabels) {
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
        });
    }
}
