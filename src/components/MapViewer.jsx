import React, { useEffect } from 'react';
import Map from './Map';
import { useRef, useState } from 'react';
import Utils from '../Utils';
import SelectedDisplay from './SelectedDisplay';
import constants from '../constants';
import ComponentFinder from '../builder/ComponentFinder';
import MapStats from './MapStats';
import { Button } from 'reactstrap';
import LowFpsModal from './LowFpsModal';

export default function MapViewer({
    mapData,
    onSelectComponentChange,
    onHoverComponentChanged,
    onMouseMove,
    onMouseDown,
    curPointerRadius,
    curPointerComponentId,
    cursorStyle,
    averageDataUpdatesPerSecond,
    buildingMap = false,
    curState,
    setCurState,
}) {
    const containerRef = useRef(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [hoveredComponent, setHoveredComponent] = useState(null);
    const [showDynamicLabels, setShowDynamicLabels] = useState(true);
    const [
        showToggleDynamicLabelOption,
        setShowToggleDynamicLabelOption,
    ] = useState(true);
    const [showLowFpsWarning, setShowLowFpsWarning] = useState(false);
    const [shownLowFpsWarning, setShownLowFpsWarning] = useState(false);

    const getMapCoordinatesFromMouseEvent = (event) => {
        const { pageX, pageY } = event;
        const canvasCoordinates = [
            pageX - Utils.canvasOffsetLeft,
            pageY - Utils.canvasOffsetTop,
        ];
        return Utils.unmapArrayCoord(canvasCoordinates);
    };

    useEffect(() => {
        if (
            averageDataUpdatesPerSecond < 20 &&
            showDynamicLabels &&
            !shownLowFpsWarning
        ) {
            setShowLowFpsWarning(true);
            setShownLowFpsWarning(true);
        }
    }, [averageDataUpdatesPerSecond, showDynamicLabels]);

    const mouseMoveHandler = (event) => {
        if (containerRef && containerRef.current && Utils.ready) {
            const mapCoordinates = getMapCoordinatesFromMouseEvent(event);
            if (onMouseMove) {
                onMouseMove(mapCoordinates);
            }
            const curHoveredComponent = ComponentFinder.findComponent(
                mapCoordinates,
                mapData,
                curPointerRadius,
                [curPointerComponentId]
            );
            if (
                (hoveredComponent ? hoveredComponent.id : hoveredComponent) !==
                (curHoveredComponent
                    ? curHoveredComponent.id
                    : curHoveredComponent)
            ) {
                setHoveredComponent(curHoveredComponent);
                if (onHoverComponentChanged) {
                    onHoverComponentChanged(curHoveredComponent);
                }
            }
        }
    };

    const mouseDownHandler = (event) => {
        if (containerRef && containerRef.current && Utils.ready) {
            const mapCoordinates = getMapCoordinatesFromMouseEvent(event);

            if (onMouseDown) {
                onMouseDown(mapCoordinates);
            }

            if (hoveredComponent && selectedComponent !== hoveredComponent) {
                setSelectedComponent(hoveredComponent);
                if (onSelectComponentChange) {
                    onSelectComponentChange(hoveredComponent);
                }
            }
        }
    };

    return (
        <div>
            <LowFpsModal
                isOpen={showLowFpsWarning}
                setIsOpen={setShowLowFpsWarning}
            />
            <div
                style={{
                    background: '#ffffffcc',
                    margin: 10,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div className="mx-2 my-1">
                            <SelectedDisplay
                                componentData={
                                    hoveredComponent || selectedComponent
                                }
                            />
                        </div>
                        <div className="mx-2 my-1">
                            <MapStats
                                mapData={mapData}
                                averageDataUpdatesPerSecond={
                                    averageDataUpdatesPerSecond
                                }
                            />
                        </div>
                    </div>
                    <div
                        className="mx-2 my-1"
                        style={{
                            fontSize: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                    >
                        {showToggleDynamicLabelOption && (
                            <div
                                style={{
                                    fontSize: 10,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    id="show-lables-chkbox"
                                    className="mr-1"
                                    checked={showDynamicLabels}
                                    onChange={(event) => {
                                        setShowDynamicLabels(
                                            event.target.checked
                                        );
                                    }}
                                />
                                <label
                                    htmlFor="show-labels-chkbox"
                                    className="m-0"
                                    onClick={(e) => {
                                        setShowDynamicLabels(
                                            (prevShowLabels) => !prevShowLabels
                                        );
                                    }}
                                    style={{
                                        userSelect: 'none',
                                    }}
                                >
                                    Toggle Vehicle Labels
                                </label>
                            </div>
                        )}
                        <Button
                            color="link"
                            className="ml-2"
                            style={{
                                fontSize: 10,
                            }}
                            onClick={() => {
                                if (
                                    curState ===
                                    constants.APP_STATE_LIST.CREATE_MAP
                                ) {
                                    setCurState(
                                        constants.APP_STATE_LIST.VIEW_MAP
                                    );
                                } else {
                                    setCurState(
                                        constants.APP_STATE_LIST.CREATE_MAP
                                    );
                                }
                            }}
                        >
                            {curState === constants.APP_STATE_LIST.CREATE_MAP
                                ? 'Switch to View Mode'
                                : 'Switch to Create Mode'}
                        </Button>
                    </div>
                </div>
            </div>
            <div
                onMouseMove={mouseMoveHandler}
                onMouseDown={mouseDownHandler}
                ref={containerRef}
                style={{
                    cursor: cursorStyle
                        ? cursorStyle
                        : hoveredComponent
                        ? 'pointer'
                        : 'move',
                }}
            >
                <Map
                    mapData={mapData}
                    showDynamicLabels={
                        showDynamicLabels && showToggleDynamicLabelOption
                    }
                    showToggleDynamicLabelOption={showToggleDynamicLabelOption}
                    setShowToggleDynamicLabelOption={setShowToggleDynamicLabelOption}
                    buildingMap={buildingMap}
                />
            </div>
        </div>
    );
}
