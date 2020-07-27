import React from 'react';
import MenuSection from './MenuSection';
import SelectedDisplay from './SelectedDisplay';
import NavigateSection from './NavigateSection';
import MapStats from './MapStats';
import { connect } from 'react-redux';
import { actionCreators, reduxConstants } from '../redux/actions';
import { Button } from 'reactstrap';

function Menu({
    socket,
    showToggleDynamicLabels,
    curMode,
    showDynamicLabels,
    dispatch,
}) {
    const startTrip = (startWaypointId, endWaypointId) => {
        if (socket) {
            socket.emit('start-trip', {
                originId: startWaypointId,
                destinationId: endWaypointId,
            });
        }
    };
    return (
        <div
            style={{
                background: '#ffffffcc',
                margin: 10,
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: 300,
                position: 'fixed',
                borderRadius: 5,
            }}
        >
            <MenuSection sectionName="Selected Component">
                <SelectedDisplay />
            </MenuSection>
            <MenuSection sectionName="Start a Trip">
                <NavigateSection />
            </MenuSection>
            <MenuSection sectionName="Map Stats">
                <MapStats />
            </MenuSection>
            <MenuSection sectionName="Menu Settings">
                {showToggleDynamicLabels && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                        className="my-1"
                    >
                        <input
                            type="checkbox"
                            id="show-lables-chkbox"
                            className="mr-1"
                            checked={showDynamicLabels}
                            onChange={(event) => {
                                dispatch(
                                    actionCreators.setShowDynamicLabels(
                                        event.target.checked
                                    )
                                );
                            }}
                        />
                        <label
                            htmlFor="show-labels-chkbox"
                            className="m-0"
                            onClick={(e) => {
                                dispatch(
                                    actionCreators.setShowDynamicLabels(
                                        !showDynamicLabels
                                    )
                                );
                            }}
                            style={{
                                userSelect: 'none',
                                fontSize: 10,
                            }}
                        >
                            Toggle Vehicle Labels
                        </label>
                    </div>
                )}
                <div>
                    <Button
                        color="link"
                        style={{
                            fontSize: 10,
                            padding: 0,
                        }}
                        onClick={() => {
                            if (
                                curMode ===
                                reduxConstants.APP_MODE_LIST.CREATE_MAP
                            ) {
                                dispatch(
                                    actionCreators.setCurMode(
                                        reduxConstants.APP_MODE_LIST.VIEW_MAP
                                    )
                                );
                            } else {
                                dispatch(
                                    actionCreators.setCurMode(
                                        reduxConstants.APP_MODE_LIST.CREATE_MAP
                                    )
                                );
                            }
                        }}
                    >
                        {curMode === reduxConstants.APP_MODE_LIST.CREATE_MAP
                            ? 'Switch to View Mode'
                            : 'Switch to Create Mode'}
                    </Button>
                </div>
            </MenuSection>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        selectedComponent: state.selectedComponent,
        hoveredComponent: state.hoveredComponent,
        showToggleDynamicLabels: state.showToggleDynamicLabels,
        curMode: state.curMode,
        showDynamicLabels: state.showLabels.dynamic,
    };
};

export default connect(mapStateToProps)(Menu);
