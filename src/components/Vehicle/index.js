import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Icon } from 'semantic-ui-react';

const Vehicle = ({ vehicle }) => {
    console.log('veh', vehicle, vehicle.vin);
    vehicle.getImage().then(console.log);
    return (
        <Card>
            <Image
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={false}
            />
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
