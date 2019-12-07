import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Icon } from 'semantic-ui-react';

const Vehicle = ({ vehicle }) => {
    console.log('veh', vehicle, vehicle.vin);
    const [image, setImage] = useState(null);

    useEffect(() => {
        vehicle
            .getImage()
            .then(img => setImage(`data:image/png;base64,${img}`));
    }, []);

    return (
        <Card>
            {image && <Image src={image} wrapped />}
            <Card.Content>
                <Card.Header>{vehicle.vin}</Card.Header>
                <Card.Meta>
                    <span className="date">Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user" />
                22 Friends
            </Card.Content>
        </Card>
    );
};

Vehicle.propTypes = {
    vehicle: PropTypes.object.isRequired,
};

export default Vehicle;
