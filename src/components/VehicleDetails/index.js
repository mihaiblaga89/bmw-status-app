import React, { useEffect, useState } from 'react';
import {
    Segment,
    Grid,
    Loader,
    Header,
    Icon,
    Progress,
    Flag,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spinner, Breadcrumb, Breadcrumbs } from 'react-rainbow-components';

import SideBar from '../Sidebar';
import Security from './security';

const VehicleDisplay = ({ location }) => {
    console.log('props', location);
    const { vehicle } = location.state;
    const [vehicleDetails, setVehicleDetails] = useState(null); // loading

    useEffect(() => {
        vehicle
            .getStatus()
            .then(setVehicleDetails) // success
            .catch(() => setVehicleDetails(undefined)); // fail
    }, []);

    if (vehicleDetails === null) {
        return <Spinner />;
    }

    if (vehicleDetails === undefined) {
        return (
            <Segment placeholder>
                <Header icon>
                    <Icon name="bug" />
                    There seems to be an error getting the details for this car
                </Header>
            </Segment>
        );
    }

    console.log('asd', vehicleDetails);

    const Container = styled.div`
        display: flex;
        flex-direction: row;
    `;

    const SidebarContainer = styled.div`
        width: 88px;
    `;

    const ContentContainer = styled.div`
        width: 100%;
        padding: 0 10px;
    `;

    const ContentWrapper = styled.div`
        margin-top: 10px;
    `;

    const renderContent = () => {
        return <Security vehicleDetails={vehicleDetails} />;
    };

    return (
        <Container>
            <SidebarContainer>
                <SideBar />
            </SidebarContainer>
            <ContentContainer>
                <Breadcrumbs>
                    <Breadcrumb label="Breadcrumb Parent" />
                    <Breadcrumb label="Breadcrumb" />
                </Breadcrumbs>
                <ContentWrapper>{renderContent()}</ContentWrapper>
            </ContentContainer>
        </Container>
    );
};

VehicleDisplay.propTypes = {
    location: PropTypes.object,
};

VehicleDisplay.defaultProps = {
    location: {},
};

export default VehicleDisplay;

/* <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column>
                        Charging:{' '}
                        <Progress
                            percent={chargingLevelHv}
                            indicating={connectionStatus === 'CONNECTED'}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        Doors: {doorLockState.toLowerCase()}
                    </Grid.Column>
                    <Grid.Column>
                        Total range: {remainingRangeTotal} km
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>Mileage: {mileage}</Grid.Column>
                    <Grid.Column>
                        Country: <Flag name={vehicleCountry.toLowerCase()} />
                    </Grid.Column>
                    <Grid.Column>
                        Last update: {updateTime.toString()} ({updateReason})
                    </Grid.Column>
                </Grid.Row>
            </Grid> */
