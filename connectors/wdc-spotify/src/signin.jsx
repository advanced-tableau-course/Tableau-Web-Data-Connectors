import * as React from 'react';
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
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from './logo';
import { GetTokenFromCode } from './spotify';
import { useLocation } from 'react-router-dom';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import './assets/fonts/fonts.css'


const theme = createTheme({
    palette: {
        background: {
            default: "#D1D7DC"
        },
        primary: {
            main: '#23292E',
        },

    },
    typography: {
        fontFamily: [

            'Inter',

        ].join(','),
    },

});

export default function SignIn(props) {
    const [token, setToken] = React.useState('');
    const [showToken, setShowToken] = React.useState(false);
    const location = useLocation();
    const submit = () => {
        console.log(token)
        tableau.password = token;
        tableau.connectionName = "Spotify Data"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    };


    React.useEffect(() => {
        if (location?.state?.token) {
            setToken(location.state.token);
            console.log(token);
        }

    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ backgroundColor: '#EEF0F2', padding: '40px 20px', borderRadius: '15px',boxShadow:1 }} component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >

                    <Logo color="#23292E" height="100px"></Logo>


                    <Typography component="h4" variant="h4" sx={{
                        fontWeight: 'bold',
                        marginTop: '20px',
                    }}>
                        SPOTIFY WDC

                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <TextField
                                margin="normal"
                                required
                                value={token}
                                onChange={e => setToken(e.target.value)}
                                name="token"
                                label="Spotify Refresh Token"
                                type={showToken ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowToken(!showToken)}
                                                //onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showToken ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}></TextField>
                        </FormControl>
                        <Button

                            onClick={getSpotifyToken}
                            variant="contained"
                            sx={{ mt: 3, mb: 2, height: '55px' }}
                        >Get Token</Button>
                        <Box sx={{paddingX:'8px'}}>
                            <Button
                                onClick={submit}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 ,height: '45px'}}
                            >
                                Connect
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
};

const getSpotifyToken = () => {
    console.log('here');
    const CLIENT_ID = "edbc94f7d20a44a59c8b7734bf90c8ed"
    const REDIRECT_URI = "http://localhost:5173/token"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const SCOPES = "playlist-read-private user-top-read user-read-recently-played user-library-read"
    const RESPONSE_TYPE = "code"
    window.location.replace(`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`)
};



