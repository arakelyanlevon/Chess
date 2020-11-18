import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

type Props = {
    label: string,
    setValue: (value: string) => void
}

const PasswordField:React.FC<Props> = ({ label, setValue }) => {
    const [showPassword, setShowPassword] = useState<boolean>();

    return <TextField
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        label={label}
        fullWidth
        onChange={e => setValue((e.target as HTMLInputElement)?.value)}
        InputProps={{
            endAdornment: <InputAdornment position='end'>
                <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={e => e.preventDefault()}
                >
                    { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                </IconButton>
            </InputAdornment>
        }}
    />;
}

export default PasswordField;