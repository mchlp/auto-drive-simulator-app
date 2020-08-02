import Utils from '../utils/Utils';
import constants from '../constants';

export default class IntersectionRenderer {
    static render(ctx, mapData, showLabels) {
        Object.entries(mapData.intersections).forEach((intersectionEntry) => {
            const intersectionId = intersectionEntry[0];
            const intersectionData = intersectionEntry[1];

            const coord = Utils.mapArrayCoord(intersectionData.coord);
            if (
                Utils.checkCoordinateInCanvasView(
                    coord,
                    constants.DISPLAY.INTERSECTION_RADIUS
                )
            ) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'grey';
                // ctx.fillStyle = '#00ff00';
                ctx.fillStyle = 'black';
                ctx.setLineDash([]);

                ctx.beginPath();
                ctx.arc(
                    coord[0],
                    coord[1],
                    Utils.scaleSingleCoord(
                        constants.DISPLAY.INTERSECTION_RADIUS
                    ),
                    0,
                    2 * Math.PI
                );
                // ctx.stroke();
                ctx.fill();

                if (showLabels) {
                    ctx.font = Utils.scaleSingleCoord(50) + 'px Roboto';
                    ctx.strokeStyle = 'white';
                    ctx.strokeWidth = Utils.scaleSingleCoord(2);
                    ctx.strokeText(intersectionId, coord[0], coord[1]);
                    ctx.fillStyle = 'black';
                    ctx.fillText(intersectionId, coord[0], coord[1]);
                }
            }
        });
    }
}
