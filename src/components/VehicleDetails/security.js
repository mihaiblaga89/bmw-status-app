import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCar,
    faDoorOpen,
    faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Tile from '../Tile';

const Security = ({ vehicleDetails }) => {
    const {
        hood,
        connectionStatus,
        doorLockState,
        remainingRangeTotal,
        mileage,
        updateTime,
        updateReason,
        windowDriverFront,
        windowDriverRear,
        windowPassengerFront,
        windowPassengerRear,
        rearWindow,
    } = vehicleDetails;

    const getWindowStatus = () => {
        const windowStatuses = {
            windowDriverFront,
            windowDriverRear,
            windowPassengerFront,
            windowPassengerRear,
            rearWindow,
        };

        return {
            status: Object.values(windowStatuses).every(
                status => status === 'CLOSED'
            )
                ? 'CLOSED'
                : 'OPEN',
            reason: Object.entries(windowStatuses).filter(
                entry => entry[1] !== 'CLOSED'
            ),
        };
    };

    return (
        <div className="react-rainbow-admin-dashboard_section rainbow-align-content_space-between">
            <Tile
                title="Doors"
                label={doorLockState}
                labelClassName={
                    doorLockState === 'SECURED' ? 'label-green' : 'label-red'
                }
                icon={<FontAwesomeIcon icon={faDoorOpen} size="3x" />}
            />

            <Tile
                title="Hood"
                label={hood}
                labelClassName={hood === 'CLOSED' ? 'label-green' : 'label-red'}
                icon={<FontAwesomeIcon icon={faCar} size="3x" />}
            />

            <Tile
                title="Windows"
                label={getWindowStatus().status}
                labelClassName={
                    getWindowStatus().status === 'CLOSED'
                        ? 'label-green'
                        : 'label-red'
                }
                icon={<FontAwesomeIcon icon={faWindowMaximize} size="3x" />}
            />
        </div>
    );
};

Security.propTypes = {
    vehicleDetails: PropTypes.object.isRequired,
};

export default Security;
