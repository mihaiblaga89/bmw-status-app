import React from 'react';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import BMWApi from '@mihaiblaga89/bmw-connecteddrive-api';

import { OPEN_ISSUE_URL } from '../../constants';
import VehicleCard from '../VehicleCard';

const { shell } = window.require('electron');

const HomeTab = () => {
    const { vehicles } = BMWApi;
    if (!vehicles.length) {
        return (
            <Segment placeholder>
                <Header icon>
                    <Icon name="car" />
                    You have no car registered in BMW's Connected Drive or the
                    API is not returning them. If you think this is an issue,
                    please open a new issue on GitHub
                </Header>
                <Button
                    onClick={() => shell.openExternal(OPEN_ISSUE_URL)}
                    primary
                >
                    Open issue
                </Button>
            </Segment>
        );
    }
    return (
        <Segment>
            {vehicles.map(vehicle => (
                <VehicleCard vehicle={vehicle} key={vehicle.vin} />
            ))}
        </Segment>
    );
};

export default HomeTab;
