import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from './logo';
import { GetTokenFromCode } from './spotify';
import { useNavigate } from 'react-router-dom';





export default function Token() {
    let navigate = useNavigate();

    useEffect(() => {
        var searchParams = new URLSearchParams(location.search);
        var access_code = searchParams.get("code");
        if (access_code) {
            //location.search = '';
            
            console.log(access_code)
            GetTokenFromCode(access_code).then((token) => {
                console.log('Got Token')
                console.log(token)
                //tableau.password = token.refresh_token;
                //setToken(token.refresh_token);
                navigate('/',{state:{token:token}})
            });


           

        } else {

        }
    }, []);

    return (
       <div>Getting Token</div>
    );
};




