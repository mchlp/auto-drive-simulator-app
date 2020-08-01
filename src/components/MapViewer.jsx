import React, { useEffect } from 'react';
import Map from './Map';
import { useRef } from 'react';
import Utils from '../utils/Utils';
import ComponentFinder from '../builder/ComponentFinder';
import LowFpsModal from './LowFpsModal';
import { connect } from 'react-redux';
import Menu from './Menu';
import { actionCreators } from '../redux/actions';

function MapViewer({
    onMouseMove,
    onMouseDown,
    curPointerRadius,
    curPointerComponentId,
    cursorStyle,
    socket,
    averageUpdatesPerSecond,
    selectedComponent,
    hoveredComponent,
    dispatch,
    showDynamicLabels,
    showLowFpsWarning,
    mapDataLoaded,
    canvasOffset,
}) {
    const containerRef = useRef(null);

    const getMapCoordinatesFromMouseEvent = (event) => {
        const { pageX, pageY } = event;
        const canvasCoordinates = [
            pageX - canvasOffset.left,
            pageY - canvasOffset.top,
        ];
        return Utils.unmapArrayCoord(canvasCoordinates);
    };

    useEffect(() => {
        if (averageUpdatesPerSecond < 20 && showDynamicLabels) {
            dispatch(actionCreators.setShowFpsWarning(true));
        }
    }, [averageUpdatesPerSecond, showDynamicLabels, dispatch]);

    const mouseMoveHandler = (event) => {
        if (mapDataLoaded && containerRef && containerRef.current) {
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
        if (containerRef && containerRef.current) {
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
        mapDataLoaded: state.mapDataLoaded,
        averageUpdatesPerSecond: state.averageUpdatesPerSecond,
        selectedComponent: state.selectedComponent,
        hoveredComponent: state.hoveredComponent,
        showDynamicLabels: state.showLabels.dynamic,
        showLowFpsWarning: state.showLowFpsWarning,
        canvasOffset: state.canvasOffset,
    };
};

export default connect(mapStateToProps)(MapViewer);
