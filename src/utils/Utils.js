import shortUuid from 'short-uuid';
import { getStore } from '../redux/store';
export default class Utils {
    static shortUuidGenerator = shortUuid(shortUuid.constants.flickrBase58);

    static generateShortUuid() {
        return this.shortUuidGenerator.generate();
    }

    static getCanvasViewCutoffs() {
        const { canvasDimensions } = getStore().getState();
        const cutoffs = {
            left: 0,
            right: canvasDimensions.width,
            top: 0,
            bottom: canvasDimensions.height,
        };
        return cutoffs;
    }

    static checkCoordinateInCanvasView(canvasCoordinateArray, radius = 0) {
        // console.log(canvasCoordinateArray);
        const canvasCutoffs = this.getCanvasViewCutoffs();
        const withinLeft =
            canvasCoordinateArray[0] + radius / 2 >= canvasCutoffs.left;
        const withinRight =
            canvasCoordinateArray[0] - radius / 2 <= canvasCutoffs.right;
        const withinTop =
            canvasCoordinateArray[1] + radius / 2 >= canvasCutoffs.top;
        const withinBottom =
            canvasCoordinateArray[1] - radius / 2 <= canvasCutoffs.bottom;
        return withinLeft && withinRight && withinTop && withinBottom;
    }

    static getCoordFromWaypoint(waypointName, mapData) {
        if (waypointName.startsWith('intersection')) {
            return mapData.intersections[waypointName].coord;
        } else if (waypointName.startsWith('location')) {
            return mapData.locations[waypointName].coord;
        }
        return null;
    }

    static getDistanceBetweenArrayCoords(arrayCoord1, arrayCoord2) {
        let squareSum = 0;
        for (let i = 0; i < arrayCoord1.length; i++) {
            squareSum += Math.pow(arrayCoord2[i] - arrayCoord1[i], 2);
        }
        return Math.sqrt(squareSum);
    }

    static mapArrayCoord(arrayCoord) {
        if (arrayCoord) {
            return arrayCoord.map(Utils.mapSingleCoord);
        }
        return null;
    }

    static unmapArrayCoord(arrayCoord) {
        if (arrayCoord) {
            return arrayCoord.map(Utils.unmapSingleCoord);
        }
        return null;
    }

    static scaleSingleCoord(singleCoord) {
        const canvasProps = getStore().getState().canvasProps;
        return singleCoord * canvasProps.zoom;
    }

    static unscaleSingleCoord(singleCoord) {
        const canvasProps = getStore().getState().canvasProps;
        return singleCoord / canvasProps.zoom;
    }

    static mapSingleCoord(singleCoord, index) {
        let scaledCoord = Utils.scaleSingleCoord(singleCoord);
        const { canvasDimensions, canvasProps } = getStore().getState();
        if (index === 0) {
            scaledCoord += canvasDimensions.width / 2 - canvasProps.centerX;
        } else if (index === 1) {
            scaledCoord += canvasDimensions.height / 2 - canvasProps.centerY;
        }
        return scaledCoord;
    }

    static unmapSingleCoord(singleCoord, index) {
        let unscaledCoord = singleCoord;
        const { canvasDimensions, canvasProps } = getStore().getState();
        if (index === 0) {
            unscaledCoord -= canvasDimensions.width / 2 - canvasProps.centerX;
        } else if (index === 1) {
            unscaledCoord -= canvasDimensions.height / 2 - canvasProps.centerY;
        }
        return Utils.unscaleSingleCoord(unscaledCoord);
    }
}
