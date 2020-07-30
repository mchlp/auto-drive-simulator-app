import React, { useEffect } from 'react';
import Map from './Map';
import { useRef, useState } from 'react';
import Utils from '../utils/Utils';
import SelectedDisplay from './SelectedDisplay';
import constants from '../constants';
import ComponentFinder from '../builder/ComponentFinder';
import MapStats from './MapStats';
import { Button } from 'reactstrap';
import LowFpsModal from './LowFpsModal';
import MenuSection from './MenuSection';
import NavigateSection from './NavigateSection';
import { actionCreators, reduxConstants } from '../redux/actions';
import { connect } from 'react-redux';
import Menu from './Menu';

function MapViewer({
    onMouseMove,
    onMouseDown,
    curPointerRadius,
    curPointerComponentId,
    cursorStyle,
    socket,
    averageUpdatesPerSecond,
    curMode,
    selectedComponent,
    hoveredComponent,
    dispatch,
    showToggleDynamicLabelOption,
    showDynamicLabels,
    showLowFpsWarning,
    mapDataLoaded,
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (socket) {
            const startTripResListener = (startTripRes) => {
                if (startTripRes) {
                    dispatch(actionCreators.setCurTripVehicle(startTripRes));
                    console.log(startTripRes);
                }
            };
            socket.on('start-trip-res', startTripResListener);
            return () => {
                socket.off('start-trip-res', startTripResListener);
            };
        }
    }, [socket]);

    const getMapCoordinatesFromMouseEvent = (event) => {
        const { pageX, pageY } = event;
        const canvasCoordinates = [
            pageX - Utils.canvasOffsetLeft,
            pageY - Utils.canvasOffsetTop,
        ];
        return Utils.unmapArrayCoord(canvasCoordinates);
    };

    useEffect(() => {
        if (averageUpdatesPerSecond < 20 && showDynamicLabels) {
            dispatch(actionCreators.setShowFpsWarning(true));
        }
    }, [averageUpdatesPerSecond, showDynamicLabels]);

    const mouseMoveHandler = (event) => {
        if (
            mapDataLoaded &&
            containerRef &&
            containerRef.current &&
            Utils.ready
        ) {
            const mapCoordinates = getMapCoordinatesFromMouseEvent(event);
            if (onMouseMove) {
                onMouseMove(mapCoordinates);
            }
            const curHoveredComponent = ComponentFinder.findComponent(
                mapCoordinates,
                curPointerRadius,
                [curPointerComponentId]
            );
            if (
                (hoveredComponent ? hoveredComponent.id : hoveredComponent) !==
                (curHoveredComponent
                    ? curHoveredComponent.id
                    : curHoveredComponent)
            ) {
                dispatch(
                    actionCreators.setHoveredComponent(curHoveredComponent)
                );
            }
        }
    };

    const mouseDownHandler = (event) => {
        if (containerRef && containerRef.current && Utils.ready) {
            const mapCoordinates = getMapCoordinatesFromMouseEvent(event);

            if (onMouseDown) {
                onMouseDown(mapCoordinates);
            }

            if (
                !selectedComponent ||
                (hoveredComponent &&
                    selectedComponent.id !== hoveredComponent.id)
            ) {
                dispatch(actionCreators.setSelectedComponent(hoveredComponent));
            }
        }
    };

    return (
        <div>
            {showLowFpsWarning && (
                <LowFpsModal
                    isOpen={showLowFpsWarning}
                    setIsOpen={(open) => {
                        dispatch(actionCreators.setShowFpsWarning(open));
                    }}
                />
            )}
            <Menu socket={socket} />
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
                <Map />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        curMode: state.curMode,
        mapDataLoaded: state.mapDataLoaded,
        averageUpdatesPerSecond: state.averageUpdatesPerSecond,
        selectedComponent: state.selectedComponent,
        hoveredComponent: state.hoveredComponent,
        showDynamicLabels: state.showLabels.dynamic,
        showLowFpsWarning: state.showLowFpsWarning,
    };
};

export default connect(mapStateToProps)(MapViewer);
