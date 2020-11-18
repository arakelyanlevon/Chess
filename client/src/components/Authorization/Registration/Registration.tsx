import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';

import PasswordField from '../../common/PasswordField';
import { Row, Main, Icon } from './styles';

export const Registration:React.FC = () => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');

    return (
        <Main>
            <Row item lg={3} md={6} sm={8} xs={12}>
                <TextField
                    variant='outlined'
                    label='Username'
                    fullWidth
                    onChange={e => setName((e.target as HTMLInputElement)?.value)}
                    InputProps={{
                        endAdornment: 
                            <Icon>
                                <PersonIcon />
                            </Icon>
                        
                    }}
                />
            </Row>
            <Row item lg={3} md={6} sm={8} xs={12}>
               <PasswordField
                    label='Password'
                    setValue={setPassword}
               />
            </Row>
            <Row item lg={3} md={6} sm={8}xs={12}>
                <PasswordField
                    label='Repeat password'
                    setValue={setRepeatedPassword}
                />
            </Row>
        </Main>
    )
}