import Utils from '../Utils';
import constants from '../constants';

const ComponetFinder = {};

const intersectionFinder = (
    mapCoordinates,
    mapData,
    pointerRadius,
    excludeIdList
) => {
    for (const intersectionEntry of Object.entries(mapData.intersections)) {
        if (!excludeIdList.includes(intersectionEntry[0])) {
            const intersectionData = intersectionEntry[1];
            const distance = Utils.getDistanceBetweenArrayCoords(
                intersectionData.coord,
                mapCoordinates
            );

            if (
                distance <
                constants.DISPLAY.INTERSECTION_RADIUS + pointerRadius
            ) {
                return {
                    type: 'intersection',
                    id: intersectionEntry[0],
                    data: intersectionEntry[1],
                };
            }
        }
    }
    return null;
};

const locationFinder = (
    mapCoordinates,
    mapData,
    pointerRadius,
    excludeIdList
) => {
    for (const locationEntry of Object.entries(mapData.locations)) {
        if (!excludeIdList.includes(locationEntry[0])) {
            const locationData = locationEntry[1];
            const distance = Utils.getDistanceBetweenArrayCoords(
                locationData.coord,
                mapCoordinates
            );

            if (distance < constants.DISPLAY.LOCATION_RADIUS + pointerRadius) {
                return {
                    type: 'location',
                    id: locationEntry[0],
                    data: locationEntry[1],
                };
            }
        }
    }
    return null;
};

ComponetFinder.findComponent = (
    mapCoordinates,
    mapData,
    pointerRadius = 0,
    excludeIdList = []
) => {
    const finderFuncs = [intersectionFinder, locationFinder];
    for (const func of finderFuncs) {
        const component = func(
            mapCoordinates,
            mapData,
            pointerRadius,
            excludeIdList
        );
        if (component) {
            return component;
        }
    }
};

export default ComponetFinder;
