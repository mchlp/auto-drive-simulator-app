import React, { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import MapRenderer from '../renderers/MapRenderer';
import { actionCreators } from '../redux/actions';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

const SHOW_LABEL_MIN_ZOOM_LEVEL = 0.4;

function Map({
    showToggleDynamicLabels,
    dispatch,
    canvasProps,
    canvasDimensions,
    mapLoaded,
    followCurTripVehicle,
}) {
    const staticCanvasRef = useRef(null);
    const dynamicCanvasRef = useRef(null);
    const canvasContainerRef = useRef(null);

    useEffect(() => {
        dispatch(
            actionCreators.setCanvasProps({
                centerX: 0,
                centerY: 0,
                zoom: 0.5,
            })
        );

        const onWindowResize = () => {
            dispatch(
                actionCreators.setCanvasDimensions({
                    height: window.innerHeight,
                    width: window.innerWidth,
                })
            );
        };

        onWindowResize();
        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
        };
    }, [dispatch]);

    const dragging = useRef(false);
    const lastDragCoord = useRef(null);

    useEffect(() => {
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

        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, [dispatch]);

    const onZoom = useCallback(
        (event) => {
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

                if (followCurTripVehicle) {
                    dispatch(
                        actionCreators.setCanvasPropsZoom(curZoomFactor, {
                            x: 0,
                            y: 0,
                        })
                    );
                } else {
                    const zoomCenterInCanvasView = {
                        x: pageX - staticCanvasRef.current.offsetLeft,
                        y: pageY - staticCanvasRef.current.offsetTop,
                    };

                    const zoomOffsetFromViewCentre = {
                        x:
                            zoomCenterInCanvasView.x -
                            canvasDimensions.width / 2,
                        y:
                            zoomCenterInCanvasView.y -
                            canvasDimensions.height / 2,
                    };

                    dispatch(
                        actionCreators.setCanvasPropsZoom(
                            curZoomFactor,
                            zoomOffsetFromViewCentre
                        )
                    );
                }
            }
            return false;
        },
        [canvasDimensions, dispatch, mapLoaded, followCurTripVehicle]
    );

    useEffect(() => {
        if (canvasContainerRef.current) {
            dispatch(
                actionCreators.setCanvasOffset({
                    left: canvasContainerRef.current.offsetLeft,
                    top: canvasContainerRef.current.offsetTop,
                })
            );
            const curCanvasContainerRef = canvasContainerRef.current;
            curCanvasContainerRef.addEventListener('wheel', onZoom, {
                passive: false,
            });
            return () => {
                curCanvasContainerRef.removeEventListener('wheel', onZoom);
            };
        }
    }, [canvasContainerRef, mapLoaded, dispatch, onZoom]);

    const curWindowRequestAnimationFrame = useRef(null);
    useEffect(() => {
        const renderMap = () => {
            MapRenderer.renderAll(
                staticCanvasRef.current,
                dynamicCanvasRef.current
            );
            curWindowRequestAnimationFrame.current = window.requestAnimationFrame(
                renderMap
            );
        };
        curWindowRequestAnimationFrame.current = window.requestAnimationFrame(
            renderMap
        );

        return () => {
            window.cancelAnimationFrame(curWindowRequestAnimationFrame.current);
        };
    }, []);

    const onDragStart = (event) => {
        event.preventDefault();
        if (mapLoaded && !followCurTripVehicle) {
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
        const now = performance.now();
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

    useEffect(() => {
        if (canvasProps.zoom < SHOW_LABEL_MIN_ZOOM_LEVEL) {
            if (showToggleDynamicLabels) {
                dispatch(actionCreators.setShowToggleDynamicLabels(false));
            }
        } else {
            if (!showToggleDynamicLabels) {
                dispatch(actionCreators.setShowToggleDynamicLabels(true));
            }
        }
    }, [canvasProps.zoom, showToggleDynamicLabels, dispatch]);

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
                overflow: 'hidden',
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
                <div
                    style={{
                        backgroundColor: '#dddddd',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <div className="mb-2">
                            <Spinner type="grow" color="primary" size="m" />
                        </div>
                        <div>Connecting to server...</div>
                        <div>This may take a minute while the server starts.</div>
                    </div>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    curMode: state.curMode,
    mapLoaded: state.mapDataLoaded,
    showDynamicLabels: state.showLabels.dynamic,
    showToggleDynamicLabels: state.showToggleDynamicLabels,
    canvasProps: state.canvasProps,
    canvasDimensions: state.canvasDimensions,
    followCurTripVehicle: state.followCurTripVehicle,
});

export default connect(mapStateToProps)(Map);
