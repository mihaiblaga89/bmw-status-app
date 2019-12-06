import React from 'react';
import { Menu, Segment, Container } from 'semantic-ui-react';
import BMWApi from '@mihaiblaga89/bmw-connecteddrive-api';
import Vehicle from '../components/Vehicle';

const Dashboard = () => {
    console.log(BMWApi.vehicles[0]);
    return (
        <Container>
            <Menu pointing secondary>
                <Menu.Item name="home" active />
                <Menu.Item name="messages" />
                <Menu.Item name="friends" />
                <Menu.Menu position="right">
                    <Menu.Item name="logout" />
                </Menu.Menu>
            </Menu>
            <Segment>
                {BMWApi.vehicles.map(vehicle => (
                    <Vehicle vehicle={vehicle} key={vehicle.vin} />
                ))}
            </Segment>
        </Container>
    );
};

export default Dashboard;
