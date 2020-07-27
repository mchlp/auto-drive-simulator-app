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
    mapData,
    curMode,
    selectedComponent,
    hoveredComponent,
    dispatch,
}) {
    const containerRef = useRef(null);
    const [
        showToggleDynamicLabelOption,
        setShowToggleDynamicLabelOption,
    ] = useState(true);
    const [showLowFpsWarning, setShowLowFpsWarning] = useState(false);
    const [shownLowFpsWarning, setShownLowFpsWarning] = useState(false);

    const [curTripVehicleId, setCurTripVehicleId] = useState(null);    

    useEffect(() => {
        if (socket) {
            const startTripResListener = (startTripRes) => {
                if (startTripRes) {
                    setCurTripVehicleId(startTripRes.id);
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
        if (
            averageUpdatesPerSecond < 20 &&
            showDynamicLabels &&
            !shownLowFpsWarning
        ) {
            setShowLowFpsWarning(true);
            setShownLowFpsWarning(true);
        }
    }, [averageUpdatesPerSecond, showDynamicLabels]);

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
                hoveredComponent &&
                selectedComponent.id !== hoveredComponent.id
            ) {
                dispatch(actionCreators.setSelectedComponent(hoveredComponent));
            }
        }
    };

    return (
        <div>
            <LowFpsModal
                isOpen={showLowFpsWarning}
                setIsOpen={setShowLowFpsWarning}
            />
            <Menu socket={socket}/>
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
                    showDynamicLabels={
                        showDynamicLabels && showToggleDynamicLabelOption
                    }
                    showToggleDynamicLabelOption={showToggleDynamicLabelOption}
                    setShowToggleDynamicLabelOption={
                        setShowToggleDynamicLabelOption
                    }
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const averageUpdateTimeElapsed =
        state.lastUpdateTimeElapsedList.reduce((a, b) => a + b, 0) /
        state.lastUpdateTimeElapsedList.length;
    let averageUpdatesPerSecond = 1000 / averageUpdateTimeElapsed;
    if (state.lastUpdateTimeElapsedList.length < 100) {
        averageUpdatesPerSecond = Number.POSITIVE_INFINITY;
    }
    return {
        curMode: state.curMode,
        averageUpdatesPerSecond,
        mapData: state.mapData,
        selectedComponent: state.selectedComponent,
        hoveredComponent: state.hoveredComponent,
    };
};

export default connect(mapStateToProps)(MapViewer);
