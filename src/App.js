import React, { useEffect, useState, useRef } from 'react';
import MapBuilder from './components/MapBuilder';
import MapViewer from './components/MapViewer';
import { connect } from 'react-redux';
import { actionCreators, actionTypes, reduxConstants } from './redux/actions';
import MapDataHandler from './utils/MapDataHandler';

function App({ socket, curMode, dispatch }) {
    useEffect(() => {
        MapDataHandler.init(socket);
        return () => {
            MapDataHandler.cleanup(socket);
            socket.disconnect();
        };
    }, []);

    let Content;
    if (curMode === reduxConstants.APP_MODE_LIST.VIEW_MAP) {
        Content = <MapViewer socket={socket} />;
    } else if (curMode === reduxConstants.APP_MODE_LIST.CREATE_MAP) {
        Content = <MapBuilder />;
    }

    return <div className="App">{Content}</div>;
}

const mapStateToProps = (state) => {
    return {
        curMode: state.curMode,
    };
};

export default connect(mapStateToProps)(App);
