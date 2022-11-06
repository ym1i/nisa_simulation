import '../styles/globals.css'
// import 'semantic-ui-css/semantic.min.css'
// import 'react-datepicker/dist/react-datepicker.css'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function MyApp({Component, pageProps}) {
    // return <Component {...pageProps} />
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
