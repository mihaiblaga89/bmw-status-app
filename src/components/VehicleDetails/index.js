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

const VehicleDetails = ({ vehicle }) => {
    const [vehicleDetails, setVehicleDetails] = useState(null); // loading

    useEffect(() => {
        vehicle
            .getStatus()
            .then(res => setVehicleDetails(res.vehicleStatus)) // success
            .catch(() => setVehicleDetails(undefined)); // fail
    }, []);

    if (vehicleDetails === null) {
        return <Loader active />;
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
    const {
        chargingLevelHv,
        connectionStatus,
        doorLockState,
        remainingRangeElectric,
        remainingRangeFuel,
        mileage,
        updateTime,
        updateReason,
        vehicleCountry,
    } = vehicleDetails;
    let remainingRange = 0;
    if (remainingRangeElectric) remainingRange += remainingRangeElectric;
    if (remainingRangeFuel) remainingRange += remainingRangeFuel;

    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <Grid.Column>
                    Charging:{' '}
                    <Progress
                        percent={chargingLevelHv}
                        indicating={connectionStatus === 'CONNECTED'}
                    />
                </Grid.Column>
                <Grid.Column>Doors: {doorLockState.toLowerCase()}</Grid.Column>
                <Grid.Column>Total range: {remainingRange} km</Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>Mileage: {mileage}</Grid.Column>
                <Grid.Column>
                    Country: <Flag name={vehicleCountry.toLowerCase()} />
                </Grid.Column>
                <Grid.Column>
                    Last update: {updateTime} ({updateReason})
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

VehicleDetails.propTypes = {
    vehicle: PropTypes.object.isRequired,
};

export default VehicleDetails;
