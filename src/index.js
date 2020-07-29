import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

let socketUrl = 'http://localhost:3001';
if (process.env.NODE_ENV === 'production') {
    socketUrl = 'https://auto-drive-simulator-api.herokuapp.com/';
}
const socket = io(socketUrl);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={configureStore()}>
            <App socket={socket} />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
