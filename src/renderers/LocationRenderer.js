import Utils from '../utils/Utils';
import constants from '../constants';

export default class LocationRenderer {
    static render(ctx, mapData, showLabels) {
        Object.entries(mapData.locations).forEach((locationEntry) => {
            const locationId = locationEntry[0];
            const locationData = locationEntry[1];

            const coord = Utils.mapArrayCoord(locationData.coord);
            if (locationId === 'location_pp8yrc5meoRCDoJfxyVpcq') {
                console.log(coord);
            }
            if (
                Utils.checkCoordinateInCanvasView(
                    coord,
                    constants.DISPLAY.LOCATION_RADIUS
                )
            ) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'grey';
                ctx.fillStyle = '#ff0000';
                ctx.setLineDash([]);

                ctx.beginPath();
                ctx.arc(
                    coord[0],
                    coord[1],
                    Utils.scaleSingleCoord(constants.DISPLAY.LOCATION_RADIUS),
                    0,
                    2 * Math.PI
                );
                ctx.stroke();
                ctx.fill();

                if (showLabels) {
                    ctx.font = Utils.scaleSingleCoord(50) + 'px Arial';
                    ctx.strokeStyle = 'white';
                    ctx.strokeWidth = Utils.scaleSingleCoord(2);
                    ctx.strokeText(locationId, coord[0], coord[1]);
                    ctx.fillStyle = 'black';
                    ctx.fillText(locationId, coord[0], coord[1]);
                }
            }
        });
    }
}
