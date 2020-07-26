import Utils from '../Utils';
import constants from '../constants';

export default class RoadRenderer {
    static render(ctx, mapData, showLabels) {
        const drawRoadLines = (mode) => {
            Object.entries(mapData.roads).forEach((roadEntry) => {
                const roadId = roadEntry[0];
                const roadData = roadEntry[1];

                const startCoord = Utils.mapArrayCoord(
                    Utils.getCoordFromWaypoint(roadData.start, mapData)
                );
                const endCoord = Utils.mapArrayCoord(
                    Utils.getCoordFromWaypoint(roadData.end, mapData)
                );

                if (startCoord && endCoord) {
                    if (mode === 'pavement') {
                        if (
                            roadData.type === constants.ROAD_TYPES.TYPES.LOCAL
                        ) {
                            ctx.lineWidth = Utils.scaleSingleCoord(
                                constants.ROAD_TYPES.WIDTH.LOCAL
                            );
                        } else if (
                            roadData.type === constants.ROAD_TYPES.TYPES.MINOR
                        ) {
                            ctx.lineWidth = Utils.scaleSingleCoord(
                                constants.ROAD_TYPES.WIDTH.MINOR
                            );
                        } else if (
                            roadData.type === constants.ROAD_TYPES.TYPES.MAJOR
                        ) {
                            ctx.lineWidth = Utils.scaleSingleCoord(
                                constants.ROAD_TYPES.WIDTH.MAJOR
                            );
                        }

                        ctx.strokeStyle = 'black';
                        ctx.lineJoin = 'round';
                        ctx.setLineDash([]);
                        ctx.beginPath();
                        ctx.moveTo(...startCoord);
                        ctx.lineTo(...endCoord);
                        ctx.stroke();
                    } else if (mode === 'center-line') {
                        ctx.lineWidth = Utils.scaleSingleCoord(1);
                        ctx.strokeStyle = 'yellow';
                        if (
                            roadData.type === constants.ROAD_TYPES.TYPES.LOCAL
                        ) {
                            ctx.setLineDash([
                                Utils.scaleSingleCoord(5),
                                Utils.scaleSingleCoord(5),
                            ]);
                            ctx.beginPath();
                            ctx.moveTo(...startCoord);
                            ctx.lineTo(...endCoord);
                            ctx.stroke();
                        } else if (
                            roadData.type === constants.ROAD_TYPES.TYPES.MINOR
                        ) {
                            ctx.setLineDash([]);
                            ctx.beginPath();
                            ctx.moveTo(...startCoord);
                            ctx.lineTo(...endCoord);
                            ctx.stroke();
                        } else if (
                            roadData.type === constants.ROAD_TYPES.TYPES.MAJOR
                        ) {
                            ctx.setLineDash([]);
                            ctx.beginPath();
                            ctx.moveTo(...startCoord);
                            ctx.lineTo(...endCoord);
                            ctx.stroke();

                            const roadSlope = {
                                x: endCoord[0] - startCoord[0],
                                y: endCoord[1] - startCoord[1],
                            };

                            const roadPerpSlopeNormalized = {
                                x:
                                    -roadSlope.y /
                                    Math.sqrt(
                                        Math.pow(roadSlope.x, 2) +
                                            Math.pow(roadSlope.y, 2)
                                    ),
                                y:
                                    roadSlope.x /
                                    Math.sqrt(
                                        Math.pow(roadSlope.x, 2) +
                                            Math.pow(roadSlope.y, 2)
                                    ),
                            };

                            ctx.strokeStyle = 'white';
                            ctx.setLineDash([
                                Utils.scaleSingleCoord(3),
                                Utils.scaleSingleCoord(5),
                            ]);

                            // draw left lane lines
                            ctx.beginPath();
                            ctx.moveTo(
                                startCoord[0] +
                                    Utils.scaleSingleCoord(
                                        roadPerpSlopeNormalized.x * 25
                                    ),
                                startCoord[1] +
                                    Utils.scaleSingleCoord(
                                        roadPerpSlopeNormalized.y * 25
                                    )
                            );
                            ctx.lineTo(
                                endCoord[0] +
                                    Utils.scaleSingleCoord(
                                        roadPerpSlopeNormalized.x * 25
                                    ),
                                endCoord[1] +
                                    Utils.scaleSingleCoord(
                                        roadPerpSlopeNormalized.y * 25
                                    )
                            );
                            ctx.stroke();

                            // draw right lane lines
                            ctx.beginPath();
                            ctx.moveTo(
                                startCoord[0] -
                                    Utils.scaleSingleCoord(
                                        roadPerpSlopeNormalized.x * 25
                                    ),
                                startCoord[1] -
                                    Utils.scaleSingleCoord(
                                        roadPerpSlopeNormalized.y * 25
                                    )
                            );
                            ctx.lineTo(
                                endCoord[0] -
                                    Utils.scaleSingleCoord(
                                        roadPerpSlopeNormalized.x * 25
                                    ),
                                endCoord[1] -
                                    Utils.scaleSingleCoord(
                                        roadPerpSlopeNormalized.y * 25
                                    )
                            );
                            ctx.stroke();
                        }
                        ctx.lineJoin = 'round';
                    }
                }
            });
        };

        drawRoadLines('pavement');
        drawRoadLines('center-line');
    }
}
