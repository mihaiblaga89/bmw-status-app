import React from 'react';
// import { Menu, Container } from 'semantic-ui-react';
import { Router } from '@reach/router';
import {
    AvatarMenu,
    Avatar,
    MenuDivider,
    MenuItem,
} from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';

import HomeTab from '../components/tabs/home';
import logo from '../assets/images/bmw.png';
import DB from '../db';
import VehicleDetails from '../components/VehicleDetails';

const NotFound = () => <div>Not found</div>;

const Dashboard = () => {
    const username = DB.settings.get('username');
    return (
        <div>
            <div className="rainbow-align-content_space-between rainbow-p-vertical_small rainbow-p-horizontal_medium react-rainbow-global-header rainbow-background-color_white">
                <img src={logo} height="40" width="40" alt="rainbow logo" />
                <div className="rainbow-flex rainbow-align_center">
                    <AvatarMenu
                        id="avatar-menu"
                        icon={<FontAwesomeIcon icon={faUser} />}
                        assistiveText={username}
                        menuAlignment="right"
                        menuSize="small"
                        avatarSize="large"
                        title={username}
                    >
                        <li className="rainbow-p-horizontal_small rainbow-align_center rainbow-flex">
                            <Avatar
                                icon={<FontAwesomeIcon icon={faUser} />}
                                assistiveText={username}
                                title={username}
                                size="medium"
                            />
                            <div className="rainbow-m-left_x-small">
                                <p className="rainbow-font-size-text_medium rainbow-color_dark-1">
                                    {username}
                                </p>
                            </div>
                        </li>
                        <MenuDivider variant="space" />
                        <MenuItem
                            label="Logout"
                            icon={<FontAwesomeIcon icon={faPowerOff} />}
                            iconPosition="left"
                        />
                    </AvatarMenu>
                </div>
            </div>
            <Router style={{ height: '100%' }}>
                <NotFound default />
                <HomeTab path="vehicles" />
                <VehicleDetails path="vehicle-details" />
            </Router>
        </div>
    );
};

export default Dashboard;
