import React, { useEffect, useState } from 'react';
import BMWApi from '@mihaiblaga89/bmw-connecteddrive-api';
import PropTypes from 'prop-types';
import { Loader, Form, Checkbox, Button, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

import DB from '../db';
import { REGION_SELECT_OPTIONS, CREDENTIALS_SERVICE } from '../constants';

// const electron = window.require('electron').remote;
// console.log('el', electron);
// const { ipcRenderer } = electron;

const keytar = window.require('electron').remote.require('keytar');

const Wrapper = styled.div`
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const Login = ({ navigate }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [region, setRegion] = useState(null);
    const [remember, setRemember] = useState(false);

    const initializeBMWApi = async (username, password, reg) => {
        await BMWApi.init({
            region: reg,
            username,
            password,
            debug: true,
        });

        if (remember) {
            await keytar.setPassword(
                CREDENTIALS_SERVICE,
                `${region}::${username}`,
                password
            );
        }
        DB.settings.set('username', username);
        setLoading(false);
        navigate('/dash');
        return true;
    };

    useEffect(() => {
        keytar.findCredentials(CREDENTIALS_SERVICE).then(acc => {
            if (acc.length > 0) {
                const { account, password } = acc[0];
                const reg = account.split('::')[0];
                const username = account.split('::')[1];
                return initializeBMWApi(username, password, reg);
            }
            return setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <Wrapper>
                <Loader active />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div style={{ width: '400px' }}>
                <Form>
                    <Form.Field
                        label="Username"
                        control="input"
                        value={user}
                        required
                        onChange={e => setUser(e.target.value)}
                        placeholder="email@example.com"
                    />
                    <Form.Field
                        label="Password"
                        control="input"
                        required
                        type="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        placeholder="******"
                    />
                    <Form.Field>
                        <Checkbox
                            label="Remember me"
                            checked={remember}
                            onChange={(e, t) => setRemember(t.checked)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Dropdown
                            placeholder="Region"
                            value={region}
                            fluid
                            required
                            selection
                            onChange={(e, { value }) => setRegion(value)}
                            options={REGION_SELECT_OPTIONS}
                        />
                    </Form.Field>
                    <Button type="submit" fluid>
                        Submit
                    </Button>
                </Form>
            </div>
        </Wrapper>
    );
};

Login.propTypes = {
    navigate: PropTypes.func,
};

export default Login;
