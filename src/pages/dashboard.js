import React, { useState } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import BMWApi from '@mihaiblaga89/bmw-connecteddrive-api';
import { Router } from '@reach/router';

import HomeTab from '../components/tabs/home';
import VehicleTab from '../components/tabs/vehicle';

const Dashboard = props => {
    console.log(BMWApi.vehicles[0]);
    console.log('rt', props);
    return (
        <Container>
            <Menu pointing secondary>
                <Menu.Item name="home" active />
                <Menu.Menu position="right">
                    <Menu.Item name="logout" />
                </Menu.Menu>
            </Menu>

            <Router style={{ height: '100%' }}>
                <HomeTab default path="vehicles" />
                <VehicleTab path="vehicle/:vin" />
            </Router>
        </Container>
    );
};

export default Dashboard;
