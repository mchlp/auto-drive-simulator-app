import shortUuid from 'short-uuid';
export default class Utils {
    static canvasProps;
    static canvasWidth;
    static canvasHeight;
    static canvasOffsetLeft;
    static canvasOffsetTop;
    static ready = false;
    static shortUuidGenerator = shortUuid(shortUuid.constants.flickrBase58);

    static generateShortUuid() {
        return this.shortUuidGenerator.generate();
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

    static initUtils(
        canvasProps,
        canvasWidth,
        canvasHeight,
        canvasOffsetLeft,
        canvasOffsetTop
    ) {
        Utils.canvasProps = canvasProps;
        Utils.canvasWidth = canvasWidth;
        Utils.canvasHeight = canvasHeight;
        Utils.canvasOffsetLeft = canvasOffsetLeft;
        Utils.canvasOffsetTop = canvasOffsetTop;
        Utils.ready = true;
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
        return singleCoord * Utils.canvasProps.zoom;
    }

    static unscaleSingleCoord(singleCoord) {
        return singleCoord / Utils.canvasProps.zoom;
    }

    static mapSingleCoord(singleCoord, index) {
        let scaledCoord = Utils.scaleSingleCoord(singleCoord);
        if (index === 0) {
            scaledCoord += Utils.canvasWidth / 2 - Utils.canvasProps.centerX;
        } else if (index === 1) {
            scaledCoord += Utils.canvasHeight / 2 - Utils.canvasProps.centerY;
        }
        return scaledCoord;
    }

    static unmapSingleCoord(singleCoord, index) {
        let unscaledCoord = singleCoord;
        if (index === 0) {
            unscaledCoord -= Utils.canvasWidth / 2 - Utils.canvasProps.centerX;
        } else if (index === 1) {
            unscaledCoord -= Utils.canvasHeight / 2 - Utils.canvasProps.centerY;
        }
        return Utils.unscaleSingleCoord(unscaledCoord);
    }
}
