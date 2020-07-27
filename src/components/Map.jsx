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
    mapData,
    showDynamicLabels,
    curMode,
    showToggleDynamicLabelOption,
    dispatch,
}) {
    const staticCanvasRef = useRef(null);
    const dynamicCanvasRef = useRef(null);
    const canvasContainerRef = useRef(null);

    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
    const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
    const [canvasProps, setCanvasProps] = useState({
        centerX: 0,
        centerY: 0,
        zoom: 0.5,
    });

    useEffect(() => {
        setCanvasHeight(window.innerHeight);
        setCanvasWidth(window.innerWidth);
    }, []);

    const dragging = useRef(false);
    const lastDragCoord = useRef(null);

    const keyDownHandler = (event) => {
        const eventKey = event.key;
        let deltaX = 0;
        let deltaY = 0;
        switch (eventKey) {
            case 'ArrowUp':
                deltaY = -50;
                break;
            case 'ArrowDown':
                deltaY = 50;
                break;
            case 'ArrowLeft':
                deltaX = -50;
                break;
            case 'ArrowRight':
                deltaX = 50;
                break;
        }
        setCanvasProps((prevCanvasProps) => {
            return {
                centerX: prevCanvasProps.centerX + deltaX,
                centerY: prevCanvasProps.centerY + deltaY,
                zoom: prevCanvasProps.zoom,
            };
        });
    };

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    useEffect(() => {
        if (canvasContainerRef.current) {
            canvasContainerRef.current.addEventListener('wheel', onZoom, {
                passive: false,
            });
            return () => {
                canvasContainerRef.current.removeEventListener('wheel', onZoom);
            };
        }
    }, [canvasContainerRef]);

    useEffect(() => {
        Utils.initUtils(
            canvasProps,
            canvasWidth,
            canvasHeight,
            canvasContainerRef.current.offsetLeft,
            canvasContainerRef.current.offsetTop
        );
    }, [canvasWidth, canvasHeight, canvasProps]);

    useEffect(() => {
        if (
            mapData &&
            staticCanvasRef &&
            staticCanvasRef.current &&
            dynamicCanvasRef &&
            dynamicCanvasRef.current
        ) {
            const staticCanvasObj = staticCanvasRef.current;
            const dynamicCanvasObj = dynamicCanvasRef.current;
            const staticCtx = staticCanvasObj.getContext('2d');
            const dynamicCtx = dynamicCanvasObj.getContext('2d');
            MapRenderer.renderAll(
                staticCtx,
                dynamicCtx,
                mapData,
                canvasWidth,
                canvasHeight,
                showDynamicLabels,
                true
            );
        }
    }, [
        staticCanvasRef,
        dynamicCanvasRef,
        canvasProps,
        canvasWidth,
        canvasHeight,
        showDynamicLabels,
    ]);

    useEffect(() => {
        if (mapData && dynamicCanvasRef && dynamicCanvasRef.current) {
            if (curMode === reduxConstants.APP_MODE_LIST.CREATE_MAP) {
                const staticCanvasObj = staticCanvasRef.current;
                const dynamicCanvasObj = dynamicCanvasRef.current;
                const staticCtx = staticCanvasObj.getContext('2d');
                const dynamicCtx = dynamicCanvasObj.getContext('2d');
                MapRenderer.renderAll(
                    staticCtx,
                    dynamicCtx,
                    mapData,
                    canvasWidth,
                    canvasHeight,
                    showDynamicLabels,
                    true
                );
            } else {
                const dynamicCanvasObj = dynamicCanvasRef.current;
                const dynamicCtx = dynamicCanvasObj.getContext('2d');
                MapRenderer.renderDynamic(
                    dynamicCtx,
                    mapData,
                    canvasWidth,
                    canvasHeight,
                    showDynamicLabels
                );
            }
        }
    }, [dynamicCanvasRef, mapData]);

    const onDragStart = (event) => {
        event.preventDefault();
        if (mapData) {
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

            setCanvasProps((prevCanvasProps) => ({
                ...prevCanvasProps,
                centerX: prevCanvasProps.centerX - (curCoord.x - lastCoord.x),
                centerY: prevCanvasProps.centerY - (curCoord.y - lastCoord.y),
            }));
            lastDragCoord.current = curCoord;
        }
    };

    const onZoom = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (mapData) {
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

            setCanvasProps((prevCanvasProps) => {
                const zoomCenterInCanvasView = {
                    x: pageX - staticCanvasRef.current.offsetLeft,
                    y: pageY - staticCanvasRef.current.offsetTop,
                };

                const zoomOffsetFromViewCentre = {
                    x: zoomCenterInCanvasView.x - canvasWidth / 2,
                    y: zoomCenterInCanvasView.y - canvasHeight / 2,
                };

                const zoomCenterInCanvas = {
                    x: zoomOffsetFromViewCentre.x + prevCanvasProps.centerX,
                    y: zoomOffsetFromViewCentre.y + prevCanvasProps.centerY,
                };

                const newZoom = prevCanvasProps.zoom * curZoomFactor;

                return {
                    centerX:
                        prevCanvasProps.centerX -
                        zoomCenterInCanvas.x * (1 - curZoomFactor),
                    centerY:
                        prevCanvasProps.centerY -
                        zoomCenterInCanvas.y * (1 - curZoomFactor),
                    zoom: newZoom,
                };
            });
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
                height: canvasHeight,
                width: canvasWidth,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1,
            }}
        >
            {mapData ? (
                <div>
                    <canvas
                        style={{
                            position: 'absolute',
                            zIndex: 2,
                        }}
                        ref={dynamicCanvasRef}
                        width={canvasWidth}
                        height={canvasHeight}
                    />
                    <canvas
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                        }}
                        ref={staticCanvasRef}
                        width={canvasWidth}
                        height={canvasHeight}
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
    mapData: state.mapData,
    showDynamicLabels: state.showLabels.dynamic,
    showToggleDynamicLabelOption: state.showToggleDynamicLabelOption,
});

export default connect(mapStateToProps)(Map);
