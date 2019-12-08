/* eslint-disable no-unused-vars */
import React from 'react';
import {
    createMemorySource,
    createHistory,
    LocationProvider,
    Router,
} from '@reach/router';
import styled from 'styled-components';

import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

// const electron = window.require('electron').remote;
// const notifier = window.require('node-notifier');

const source = createMemorySource('/');
const history = createHistory(source);

const Wrapper = styled.div`
    background-color: white;
    height: 100%;
`;

const App = () => (
    <Wrapper>
        <LocationProvider history={history}>
            <Router style={{ height: '100%' }}>
                <Login default path="login" />
                <Dashboard path="dash/*" />
            </Router>
        </LocationProvider>
    </Wrapper>
);

export default App;
