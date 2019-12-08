import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Placeholder } from 'semantic-ui-react';

import carPlaceholder from '../../assets/images/car-placeholder.jpg';

const Vehicle = ({ vehicle, onClick }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        vehicle
            .getImage()
            .then(setImage)
            .catch(() => setImage(carPlaceholder));
    }, []);

    return (
        <Card onClick={onClick}>
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
};

Vehicle.propTypes = {
    vehicle: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Vehicle;
