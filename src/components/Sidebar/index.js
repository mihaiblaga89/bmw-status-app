import React, { useState } from 'react';
import { Sidebar, SidebarItem } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCar,
    faUnlockAlt,
    faCarBattery,
} from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    const [selectedItem, setSelectedItem] = useState('security');

    return (
        <Sidebar selectedItem={selectedItem} onSelect={console.log}>
            <SidebarItem
                icon={<FontAwesomeIcon icon={faUnlockAlt} size="2x" />}
                name="security"
                label="Security"
            />
            <SidebarItem
                icon={<FontAwesomeIcon icon={faCarBattery} size="2x" />}
                name="battery"
                label="Battery"
            />
            <SidebarItem
                icon={<FontAwesomeIcon icon={faCar} size="2x" />}
                name="Components"
                label="Components"
            />
            <SidebarItem
                icon={<FontAwesomeIcon icon={faCar} size="2x" />}
                name="Messages"
                label="Messages"
            />
            <SidebarItem
                icon={<FontAwesomeIcon icon={faCar} size="2x" />}
                name="Charts"
                label="Charts"
            />
        </Sidebar>
    );
};

export default SideBar;
