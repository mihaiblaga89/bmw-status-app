import React, { useEffect, useState } from 'react';
import Spinner from '@atlaskit/spinner';
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
// import BMWApi from '@mihaiblaga89/bmw-connecteddrive-api';
import Select from '@atlaskit/select';
import PropTypes from 'prop-types';
import Form, {
    CheckboxField,
    Field,
    FormFooter,
    ErrorMessage,
    HelperMessage,
} from '@atlaskit/form';

import DB from '../db';
import { REGION_SELECT_OPTIONS, CREDENTIALS_SERVICE } from '../constants';

// const electron = window.require('electron').remote;
// console.log('el', electron);
// const { ipcRenderer } = electron;

const keytar = window.require('electron').remote.require('keytar');

const Login = ({ navigate }) => {
    const [loading, setLoading] = useState(true);

    const initializeBMWApi = async (username, password, region, remember) => {
        // await BMWApi.init({
        //     region,
        //     username,
        //     password,
        //     debug: true,
        // });

        if (remember) {
            await keytar.setPassword(
                CREDENTIALS_SERVICE,
                `${region}::${username}`,
                password
            );
        }
        await DB.settings.update({ _id: 'username', value: username });
        const res = await DB.settings.find();
        console.log('res', res);
        navigate('/dash');
        return true;
    };

    useEffect(() => {
        keytar.findCredentials(CREDENTIALS_SERVICE).then(acc => {
            if (acc.length > 0) {
                const { account, password } = acc[0];
                const region = account.split('::')[0];
                const username = account.split('::')[1];
                setLoading(false);
                return initializeBMWApi(username, password, region);
            }
            return setLoading(false);
        });
    }, []);

    if (loading)
        return (
            <div
                style={{
                    display: 'flex',
                    margin: '0 auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                <Spinner size="large" />
            </div>
        );

    return (
        <div
            style={{
                display: 'flex',
                margin: '0 auto',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: '400px',
                    maxWidth: '100%',
                    margin: '0 auto',
                    flexDirection: 'column',
                }}
            >
                <Form
                    onSubmit={({ region, username, password, remember }) => {
                        if (!region)
                            return { region: 'Please select a region' };
                        return initializeBMWApi(
                            username,
                            password,
                            region.value,
                            remember
                        );
                    }}
                >
                    {({ formProps, submitting }) => (
                        <form {...formProps}>
                            <Field
                                name="username"
                                label="User name"
                                isRequired
                                defaultValue="mihaiblaga89@gmail.com"
                            >
                                {({ fieldProps }) => (
                                    <>
                                        <TextField
                                            autoComplete="off"
                                            {...fieldProps}
                                        />
                                    </>
                                )}
                            </Field>
                            <Field
                                name="password"
                                label="Password"
                                defaultValue=""
                                isRequired
                            >
                                {({ fieldProps, error }) => (
                                    <>
                                        <TextField
                                            type="password"
                                            {...fieldProps}
                                        />
                                        {error && (
                                            <ErrorMessage>{error}</ErrorMessage>
                                        )}
                                    </>
                                )}
                            </Field>
                            <Field
                                name="region"
                                label="Region"
                                defaultValue={REGION_SELECT_OPTIONS[0]}
                                isRequired
                            >
                                {({ fieldProps, error }) => (
                                    <>
                                        <Select
                                            options={REGION_SELECT_OPTIONS}
                                            placeholder="Region"
                                            {...fieldProps}
                                        />
                                        <HelperMessage>
                                            If your region is not present in the
                                            list, select EU.
                                        </HelperMessage>
                                        {error && (
                                            <ErrorMessage>{error}</ErrorMessage>
                                        )}
                                    </>
                                )}
                            </Field>
                            <CheckboxField name="remember" defaultIsChecked>
                                {({ fieldProps }) => (
                                    <Checkbox
                                        {...fieldProps}
                                        label="Remember me"
                                    />
                                )}
                            </CheckboxField>

                            <FormFooter>
                                <ButtonGroup>
                                    <Button
                                        type="submit"
                                        appearance="primary"
                                        isLoading={submitting}
                                    >
                                        Login
                                    </Button>
                                </ButtonGroup>
                            </FormFooter>
                        </form>
                    )}
                </Form>
            </div>
        </div>
    );
};

Login.propTypes = {
    navigate: PropTypes.func.isRequired,
};

export default Login;
