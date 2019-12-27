/* eslint-disable no-unused-vars */
import React from 'react';
import { LocationProvider, Router } from '@reach/router';
import styled from 'styled-components';
import { Application } from 'react-rainbow-components';

import 'typeface-roboto/index.css';
import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { history } from './utils/history';

// const electron = window.require('electron').remote;
// const notifier = window.require('node-notifier');

const Wrapper = styled.div`
    background-color: white;
    height: 100%;
`;

const App = () => (
    <Application style={{ height: '100%' }}>
        <Wrapper>
            <LocationProvider history={history}>
                <Router style={{ height: '100%' }}>
                    <Login default path="login" />
                    <Dashboard path="dash/*" />
                </Router>
            </LocationProvider>
        </Wrapper>
    </Application>
);

export default App;
