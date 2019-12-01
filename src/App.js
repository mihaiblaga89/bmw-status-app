/* eslint-disable no-unused-vars */
import React from 'react';
import {
    createMemorySource,
    createHistory,
    LocationProvider,
    Router,
} from '@reach/router';

import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

const electron = window.require('electron').remote;
const notifier = window.require('node-notifier');

const source = createMemorySource('/');
const history = createHistory(source);

const App = () => (
    <div style={{ backgroundColor: 'white', height: '100%' }}>
        <LocationProvider history={history}>
            <Router style={{ height: '100%' }}>
                <Login path="/" />
                <Dashboard path="/dash" />
            </Router>
        </LocationProvider>
    </div>
);

// const App = () => {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//             </header>
//         </div>
//     );
// };

export default App;
