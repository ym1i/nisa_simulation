import Head from 'next/head'
import {DefaultSeo} from 'next-seo'

import '../styles/globals.css'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={darkTheme}>
            <Head>
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width'/>
                <meta name='google-site-verification' content='IUGn3Hc0DTC7Ur226R014yyXxZ5zX9ieNzeZEtCvl3U' />
            </Head>
            <DefaultSeo
                defaultTitle='積立シミュレータ | Savings Simulator'
                description='S&P500、ナスダック、NYダウなどの米国株式指数や日経平均、欧州株式指数、アップル、アマゾンなどのGAFA銘柄の過去データを利用して、
                任意の期間•任意の積立額で積立した場合の運用結果をシミュレーションできます。'
                openGraph={{
                    type: 'website',
                    title: '積立シミュレータ | Savings Simulator',
                    description: 'S&P500、ナスダック、NYダウなどの米国株式指数や日経平均、欧州株式指数、アップル、アマゾンなどのGAFA銘柄の過去データを利用して、\n' +
                        '任意の期間•任意の積立額で積立した場合の運用結果をシミュレーションできます。',
                    site_name: '積立シミュレータ | Savings Simulator',
                    url: 'https://sim.lndex.me/',
                    images: [
					 {
					 　url: 'https://sim.lndex.me/us100.svg',
					   width: 800,
					   height: 600,
					   alt: 'Og Image Alt',
					   type: 'image/jpeg',
					 },
					],
                }}
            />
            <CssBaseline/>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
