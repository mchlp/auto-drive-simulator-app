import React from 'react';
import { connect } from 'react-redux';
import { actionCreators, reduxConstants } from '../../redux/actions';
import { Button } from 'reactstrap';

function MapSettings({
    curMode,
    showToggleDynamicLabels,
    showDynamicLabels,
    followCurTripVehicle,
    dispatch,
}) {
    return (
        <div>
            {showToggleDynamicLabels &&
                !followCurTripVehicle &&
                curMode === reduxConstants.APP_MODE_LIST.VIEW_MAP && (
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
                            id="show-labels-chkbox"
                            className="mr-1"
                            checked={showDynamicLabels}
                            onChange={(event) => {
                                const checked = event.target.checked;
                                dispatch(
                                    actionCreators.setShowDynamicLabels(checked)
                                );
                            }}
                        />
                        <label
                            htmlFor="show-labels-chkbox"
                            className="m-0"
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
                            curMode === reduxConstants.APP_MODE_LIST.CREATE_MAP
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
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showToggleDynamicLabels: state.showToggleDynamicLabels,
        curMode: state.curMode,
        showDynamicLabels: state.showLabels.dynamic,
        followCurTripVehicle: state.followCurTripVehicle,
    };
};

export default connect(mapStateToProps)(MapSettings);
