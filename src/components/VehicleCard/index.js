import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import carPlaceholder from '../../assets/images/car-placeholder.jpg';
import { navigate } from '../../utils/history';

const VehicleCard = ({ vehicle }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        vehicle
            .getImage()
            .then(setImage)
            .catch(() => setImage(carPlaceholder));
    }, []);

    const IconContainer = styled.span`
        width: 2.5rem;
        height: 2.5rem;
    `;

    return (
        <div className="rainbow-m-around_large">
            <Card
                isLoading={!image}
                actions={
                    <Button
                        label="View details"
                        variant="outline-brand"
                        onClick={() =>
                            navigate('/dash/vehicle-details', {
                                state: { vehicle },
                                replace: true,
                            })
                        }
                    />
                }
                icon={
                    <IconContainer className="rainbow-background-color_success rainbow-border-radius_circle rainbow-align-content_center">
                        <FontAwesomeIcon
                            icon={faCar}
                            size="lg"
                            className="rainbow-color_white"
                        />
                    </IconContainer>
                }
                title={vehicle.name}
            >
                <div className="rainbow-p-around_xx-large rainbow-align-content_center rainbow-flex_column">
                    <img src={image} alt="car" />
                </div>
            </Card>
        </div>
    );
};

VehicleCard.propTypes = {
    vehicle: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

VehicleCard.defaultProps = {
    onClick: () => {},
};

export default VehicleCard;
