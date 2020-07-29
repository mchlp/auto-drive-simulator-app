import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MapRenderer from '../renderers/MapRenderer';
import Utils from '../Utils';
import { reduxConstants, actionCreators } from '../redux/actions';
import { connect } from 'react-redux';

const SHOW_LABEL_MIN_ZOOM_LEVEL = 0.4;

function Map({
    showDynamicLabels,
    curMode,
    showToggleDynamicLabelOption,
    dispatch,
    canvasProps,
    canvasDimensions,
    mapLoaded,
}) {
    const staticCanvasRef = useRef(null);
    const dynamicCanvasRef = useRef(null);
    const canvasContainerRef = useRef(null);

    useEffect(() => {
        console.log('rerender');
        dispatch(
            actionCreators.setCanvasDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        );
        dispatch(
            actionCreators.setCanvasProps({
                centerX: 0,
                centerY: 0,
                zoom: 0.5,
            })
        );
    }, []);

    const dragging = useRef(false);
    const lastDragCoord = useRef(null);

    const keyDownHandler = (event) => {
        const eventKey = event.key;
        let deltaX = 0;
        let deltaY = 0;
        switch (eventKey) {
            case 'ArrowUp':
                deltaY = 50;
                break;
            case 'ArrowDown':
                deltaY = -50;
                break;
            case 'ArrowLeft':
                deltaX = 50;
                break;
            case 'ArrowRight':
                deltaX = -50;
                break;
            default:
                break;
        }
        dispatch(
            actionCreators.setCanvasPropsDiff({
                centerX: deltaX,
                centerY: deltaY,
                zoom: 1,
            })
        );
    };

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    useEffect(() => {
        if (canvasContainerRef.current) {
            const curCanvasContainerRef = canvasContainerRef.current;
            curCanvasContainerRef.addEventListener('wheel', onZoom, {
                passive: false,
            });
            return () => {
                curCanvasContainerRef.removeEventListener('wheel', onZoom);
            };
        }
    }, [canvasContainerRef, mapLoaded]);

    useEffect(() => {
        Utils.initUtils(
            canvasProps,
            canvasDimensions.width,
            canvasDimensions.height,
            canvasContainerRef.current.offsetLeft,
            canvasContainerRef.current.offsetTop
        );
    }, [canvasDimensions, canvasProps]);

    useEffect(() => {
        MapRenderer.renderAll(
            staticCanvasRef.current,
            dynamicCanvasRef.current,
            showDynamicLabels,
            true
        );
    }, [
        staticCanvasRef,
        dynamicCanvasRef,
        canvasProps,
        canvasDimensions,
        showDynamicLabels,
        mapLoaded,
    ]);

    const renderDynamicElements = () => {
        console.log('render');
        if (curMode === reduxConstants.APP_MODE_LIST.CREATE_MAP) {
            MapRenderer.renderAll(
                staticCanvasRef.current,
                dynamicCanvasRef.current,
                showDynamicLabels,
                true
            );
        } else {
            MapRenderer.renderDynamic(
                dynamicCanvasRef.current,
                showDynamicLabels
            );
        }
        window.requestAnimationFrame(renderDynamicElements);
    };

    useEffect(() => {
        window.requestAnimationFrame(renderDynamicElements);
    }, []);

    const onDragStart = (event) => {
        event.preventDefault();
        if (mapLoaded) {
            dragging.current = true;
            lastDragCoord.current = {
                x: event.screenX,
                y: event.screenY,
            };
        }
    };

    const onDragEnd = (event) => {
        dragging.current = false;
        lastDragCoord.current = null;
    };

    const lastDragEvent = useRef(null);
    const onDragMove = (event) => {
        const DRAG_UPDATE_LIMIT_MS = 1000 / 30;
        const now = Date.now();
        if (
            dragging.current &&
            (!lastDragEvent.current ||
                now - lastDragEvent.current > DRAG_UPDATE_LIMIT_MS)
        ) {
            lastDragEvent.current = now;
            const lastCoord = {
                x: lastDragCoord.current.x,
                y: lastDragCoord.current.y,
            };
            const curCoord = {
                x: event.screenX,
                y: event.screenY,
            };

            dispatch(
                actionCreators.setCanvasPropsDiff({
                    zoom: 1,
                    centerX: -(curCoord.x - lastCoord.x),
                    centerY: -(curCoord.y - lastCoord.y),
                })
            );
            lastDragCoord.current = curCoord;
        }
    };

    const onZoom = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (mapLoaded) {
            const { pageX, pageY, deltaY } = event;

            const ZOOM_FACTOR = 1.25;
            let curZoomFactor = 1;
            if (deltaY > 0) {
                // zoom out
                curZoomFactor = 1 / ZOOM_FACTOR;
            } else if (deltaY < 0) {
                // zoom in
                curZoomFactor = ZOOM_FACTOR;
            }

            const zoomCenterInCanvasView = {
                x: pageX - staticCanvasRef.current.offsetLeft,
                y: pageY - staticCanvasRef.current.offsetTop,
            };

            const zoomOffsetFromViewCentre = {
                x: zoomCenterInCanvasView.x - canvasDimensions.width / 2,
                y: zoomCenterInCanvasView.y - canvasDimensions.height / 2,
            };

            const zoomCenterInCanvas = {
                x: zoomOffsetFromViewCentre.x + canvasProps.centerX,
                y: zoomOffsetFromViewCentre.y + canvasProps.centerY,
            };

            dispatch(
                actionCreators.setCanvasPropsDiff({
                    centerX: -(zoomCenterInCanvas.x * (1 - curZoomFactor)),
                    centerY: -(zoomCenterInCanvas.y * (1 - curZoomFactor)),
                    zoom: curZoomFactor,
                })
            );
        }
        return false;
    };

    useEffect(() => {
        if (canvasProps.zoom < SHOW_LABEL_MIN_ZOOM_LEVEL) {
            if (showToggleDynamicLabelOption) {
                dispatch(actionCreators.setShowToggleDynamicLabels(false));
            }
        } else {
            if (!showToggleDynamicLabelOption) {
                dispatch(actionCreators.setShowToggleDynamicLabels(true));
            }
        }
    }, [canvasProps.zoom]);

    return (
        <div
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onMouseMove={onDragMove}
            ref={canvasContainerRef}
            style={{
                height: canvasDimensions.height,
                width: canvasDimensions.width,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1,
            }}
        >
            {mapLoaded ? (
                <div>
                    <canvas
                        style={{
                            position: 'absolute',
                            zIndex: 2,
                        }}
                        ref={dynamicCanvasRef}
                        height={canvasDimensions.height}
                        width={canvasDimensions.width}
                    />
                    <canvas
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                        }}
                        ref={staticCanvasRef}
                        height={canvasDimensions.height}
                        width={canvasDimensions.width}
                    />
                </div>
            ) : (
                <div>Loading map data...</div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    curMode: state.curMode,
    mapLoaded: !!state.mapData,
    showDynamicLabels: state.showLabels.dynamic,
    showToggleDynamicLabelOption: state.showToggleDynamicLabelOption,
    canvasProps: state.canvasProps,
    canvasDimensions: state.canvasDimensions,
});

export default connect(mapStateToProps)(Map);