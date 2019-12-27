import React from 'react';
import BMWApi from '@mihaiblaga89/bmw-connecteddrive-api';
import { Card, Button } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { OPEN_ISSUE_URL } from '../../constants';
import VehicleCard from '../VehicleCard';

const { shell } = window.require('electron');

const IconContainer = styled.span`
    width: 2.5rem;
    height: 2.5rem;
`;

const HomeTab = () => {
    const { vehicles } = BMWApi;
    if (!vehicles.length) {
        return (
            <div className="rainbow-m-around_large">
                <Card
                    title="No vehicles"
                    icon={
                        <IconContainer className="rainbow-background-color_success rainbow-border-radius_circle rainbow-align-content_center">
                            <FontAwesomeIcon
                                icon={faCar}
                                size="lg"
                                className="rainbow-color_white"
                            />
                        </IconContainer>
                    }
                >
                    <div className="rainbow-p-around_xx-small rainbow-align-content_center rainbow-flex_column">
                        <IconContainer className="rainbow-background-color_error rainbow-border-radius_circle rainbow-align-content_center">
                            <FontAwesomeIcon
                                icon={faExclamationCircle}
                                size="lg"
                                className="rainbow-color_white"
                            />
                        </IconContainer>
                        <h1 className="rainbow-p-top_large rainbow-font-size-heading_small rainbow-color_dark-1 p-20">
                            You have no car registered in BMW's Connected Drive
                            or the API is not returning them. If you think this
                            is an issue, please one on GitHub
                        </h1>
                        <Button
                            label="Open issue"
                            onClick={() => shell.openExternal(OPEN_ISSUE_URL)}
                            variant="brand"
                            className="rainbow-m-around_medium"
                        />
                    </div>
                </Card>
            </div>
        );
    }
    return vehicles.map(vehicle => (
        <VehicleCard vehicle={vehicle} key={vehicle.vin} />
    ));
};

export default HomeTab;
