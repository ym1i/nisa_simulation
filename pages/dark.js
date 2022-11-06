import React, {useState, useEffect} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import moment from 'moment'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, InputAdornment, Stack, TextField} from '@mui/material'


const Dark = () => {
    const [stockData, setStockData] = useState(null)
    const [historicalData, setHistoricalData] = useState(null)
    const [startDate, setStartDate] = useState(moment('2012-01-01'))
    const [endDate, setEndDate] = useState(moment('2022-01-01'))
    const [minDate, setMinDate] = useState(moment('1980-01-01'))
    const [maxDate, setMaxDate] = useState(moment())
    const [monthlySaving, setMonthlySaving] = useState(30000)


    useEffect(() => {
        const fetchData = async () => {
            const res1 = await fetch('/api/spx')
            const _historicalData = await res1.json()
            setHistoricalData(_historicalData)

            const res2 = await fetch('/api/dataHandler')
            const _stockData = await res2.json()
            setStockData(_stockData)
        }
        fetchData()
    }, [])

    const DateRangePicker = () => {
        return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack direction='row' spacing={3}>
                    <DatePicker views={['year', 'month']} label='From' minDate={minDate} maxDate={maxDate}
                                value={startDate} onChange={_date => setStartDate(_date)}
                                renderInput={params => <TextField {...params} />}/>
                    <DatePicker views={['year', 'month']} label='To' minDate={minDate} maxDate={maxDate} value={endDate}
                                onChange={_date => setEndDate(_date)}
                                renderInput={params => <TextField {...params} />}/>
                </Stack>
            </LocalizationProvider>
        )
    }

    const handleClick = item => {
        console.log(`${item} has been clicked.`)
    }

    const StockListing = ({item}) => {
        return (
            <ListItem onClick={() => handleClick(item)} style={{cursor: 'pointer'}}>
                <ListItemAvatar>
                    <Avatar src={item['img']} alt={item['label']}/>
                </ListItemAvatar>
                <ListItemText primary={item['label']}/>
            </ListItem>
        )
    }

    return (
        <Container>
            <App>
                <Header>Simulator</Header>
                <Wrapper>
                    <Main>
                        <MainHeader>
                            <HeaderMenu>
                                <Menu>株式指数</Menu>
                                <Menu>個別銘柄</Menu>
                            </HeaderMenu>
                        </MainHeader>
                        <ContentWrapper>
                            <ContentHeader>
                                <List>
                                    {_.map(stockData, item => <StockListing item={item}/>)}
                                </List>
                            </ContentHeader>
                            <ContentSection>
                                <div>積立設定</div>
                                <ul>
                                    <li>
                                        <div style={{width: '150px'}}>積立期間</div>
                                        <DateRangePicker/>
                                    </li>
                                    <li>
                                        <div style={{width: '150px'}}>毎月積立額</div>
                                        <TextField label='' style={{margin: '0'}} value={monthlySaving}
                                                   InputProps={{
                                                       endAdornment: <InputAdornment position='end'>円</InputAdornment>
                                                   }}
                                                   onChange={e => setMonthlySaving(Number(e.target.value))}/>
                                    </li>
                                </ul>
                            </ContentSection>
                        </ContentWrapper>
                    </Main>
                </Wrapper>
            </App>
        </Container>
    )
}

export default Dark


const Container = styled.div`
    background: #333;
    color: #fff;
    font-family:  "Poppins", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2em;
    width: 100%;
    height: 100vh;
    background-image: url('neon.png');
    background-size: cover;
    background-position: center;
`

const App = styled.div`
    background-color: rgba(16 18 27 / 40%);
    max-width: 1250px;
    max-height: 860px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    width: 100%;
    border-radius: 14px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    font-size: 15px;
    font-weight: 500;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 58px;
    width: 100%;
    border-bottom: 1px solid rgba(113 119 144 / 25%);;
    padding: 0 30px;
    white-space: nowrap;
`

const Wrapper = styled.div`
    display: flex;
    flex-grow: 1;
    overflow: hidden;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const MainHeader = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    height: 58px;
    flex-shrink: 0;
`

const HeaderMenu = styled.div`
    display: flex;
    align-items: center;
    margin: auto;
`

const Menu = styled.a`
    padding: 20px 24px;
    text-decoration: none;
    color: rgb(113 119 144 / 78%);
    border-bottom: 2px solid transparent;
    transition: 0.3s;
    cursor: pointer;
    background-color: transparent;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: #f9fafb;
    padding: 20px 40px;
    height: 100%;
    overflow: auto;
    background-color: rgba(16 18 27 / 40%);
`

const ContentHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    border-radius: 14px;
    padding: 20px 40px;
    background-color: rgb(146 151 179 / 13%);
    padding-left: 0;
    margin: 0;
    border-radius: 14px;
    border: 1px solid rgba(16 18 27 / 40%);
    cursor: pointer;
    
    ul {
        width: 100%;
    }
    
    ul li + li {
        border-top: 1px solid rgba(113 119 144 / 25%);
    }
`

const ContentHeaderItems = styled.div`

`

const ContentSection = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    
    > div {
        // .content-section-title
        color: #999ba5;
        margin-bottom: 14px;
    }
    
    ul {
        // .content-section ul
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: space-around;
        background-color: rgb(146 151 179 / 13%);
        padding-left: 0;
        margin: 0;
        border-radius: 14px;
        border: 1px solid rgba(16 18 27 / 40%);
        cursor: pointer;
    }
    
    ul li {
        // .content-section ul li
        list-style: none;
        padding: 10px 18px;
        display: flex;
        align-items: center;
        font-size: 16px;
        width: 100%;
        height: 100%;
        white-space: nowrap;
        transition: 0.3s;
    }
    
    ul li + li {
        border-top: 1px solid rgba(113 119 144 / 25%);
    }
    
    ul li div {
        display: flex;
        align-items: center;
        
    }
`