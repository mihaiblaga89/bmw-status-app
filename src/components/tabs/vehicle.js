import React, { useEffect } from 'react';
import { Segment, Button } from 'semantic-ui-react';

const VehicleTab = (...args) => {
    console.log('asd', args);
    return (
        <Segment>
            <Button labelPosition="left" icon="left chevron" content="Back" />
        </Segment>
    );
};

export default VehicleTab;
