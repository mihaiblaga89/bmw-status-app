import React, { useEffect, useState } from 'react';
import BMWApi from '@mihaiblaga89/bmw-connecteddrive-api';
import styled from 'styled-components';
import { Input, Select, Button, Spinner } from 'react-rainbow-components';

import DB from '../db';
import { REGION_SELECT_OPTIONS, CREDENTIALS_SERVICE } from '../constants';
import { navigate } from '../utils/history';

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

const Login = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [region, setRegion] = useState(REGION_SELECT_OPTIONS[0].value);
    const [remember, setRemember] = useState(false);

    const initializeBMWApi = async (username, password, reg) => {
        await BMWApi.init({
            region: reg || region,
            username: username || user,
            password: password || pass,
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
        navigate('/dash/vehicles');
        return true;
    };

    const onSubmit = e => {
        e.preventDefault();
        initializeBMWApi();
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
                <Spinner size="large" />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div style={{ width: '400px' }}>
                <form onSubmit={onSubmit}>
                    <Input
                        label="Username"
                        value={user}
                        required
                        type="email"
                        placeholder="email@example.com"
                        name="email"
                        onChange={e => setUser(e.target.value)}
                    />
                    <Input
                        className="mt-25"
                        label="Password"
                        value={pass}
                        required
                        type="password"
                        placeholder="******"
                        onChange={e => setPass(e.target.value)}
                    />
                    <Select
                        className="mt-25"
                        label="Region"
                        value={region}
                        required
                        options={REGION_SELECT_OPTIONS}
                        onChange={e => setRegion(e.target.value)}
                    />
                    <Input
                        className="mt-25"
                        checked={remember}
                        onChange={e => setRemember(e.target.checked)}
                        type="checkbox"
                        label="Remember me"
                    />
                    <Button
                        className="mt-25"
                        label="Submit"
                        shaded
                        type="submit"
                    />
                </form>
            </div>
        </Wrapper>
    );
};

export default Login;
