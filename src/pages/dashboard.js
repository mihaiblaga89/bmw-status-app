import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Router } from '@reach/router';

import HomeTab from '../components/tabs/home';

const Dashboard = () => {
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
            </Router>
        </Container>
    );
};

export default Dashboard;
