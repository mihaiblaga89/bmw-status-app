import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Placeholder, Modal } from 'semantic-ui-react';

import carPlaceholder from '../../assets/images/car-placeholder.jpg';
import VehicleDisplay from '../VehicleDetails';

const VehicleCard = ({ vehicle }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        vehicle
            .getImage()
            .then(setImage)
            .catch(() => setImage(carPlaceholder));
    }, []);

    const VCard = (
        <Card>
            {image ? (
                <Image src={image} wrapped />
            ) : (
                <Placeholder>
                    <Placeholder.Image square />
                </Placeholder>
            )}
            <Card.Content>
                <Card.Header>{vehicle.name}</Card.Header>
                <Card.Meta>
                    <span>{vehicle.vin}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    );
    return (
        <Modal size="large" trigger={VCard}>
            <Modal.Header>{vehicle.name}</Modal.Header>
            <Modal.Content>
                <VehicleDisplay vehicle={vehicle} />
            </Modal.Content>
        </Modal>
    );
};

VehicleCard.propTypes = {
    vehicle: PropTypes.object.isRequired,
};

export default VehicleCard;
