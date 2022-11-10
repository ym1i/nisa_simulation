import React, {useState, useEffect} from 'react'
import _ from 'lodash'
import Link from 'next/link'
import styled from 'styled-components'
import moment from 'moment'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {Container, TextField, Stack, InputAdornment, Card, CardContent, Typography, CardHeader, Avatar, CardActions, IconButton} from '@mui/material'
import CalculateIcon from '@mui/icons-material/Calculate'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import InfoIcon from '@mui/icons-material/Info'

import Header from '../components/header'
import Segment from '../components/segment'
import StackedBarChart from '../components/barChart'
import se from "react-datepicker";


const moment2str = _moment => _moment.clone().format('YYYY-MM-DD')

const Home = () => {
    const [data, setData] = useState(null)
    const [spx, setSPX] = useState(null)
    const [filteredSPX, setFilteredSPX] = useState([])
    const [simulationResult, setSimulationResult] = useState([])
    const [principal, setPrincipal] = useState([])
    const [monthlySaving, setMonthlySaving] = useState(30000)
    const [startDate, setStartDate] = useState(moment('2012-01-01'))
    const [endDate, setEndDate] = useState(moment('2022-01-01'))
    const [minDate, setMinDate] = useState(moment('1980-01-01'))
    const [maxDate, setMaxDate] = useState(moment())
    const [chartData, setChartData] = useState([])
    const [symbol, setSymbol] = useState('')
    const [selectedItem, setSelectedItem] = useState({})


    const simulate = () => {
        let result = [0]
        let principal = [0]
        let chartData = []
        _.reverse(filteredSPX).map((spx, i) => {
            result[i + 1] = (result[i] + monthlySaving) * (1 + spx['ratio'])
            principal[i + 1] = principal[i] + monthlySaving
            if (filteredSPX.length <= 48) {
                chartData.push({
                    name: spx['date'],
                    earnings: (result[i + 1] - principal[i + 1]),
                    principal: principal[i + 1]
                })
            } else {
                if (i % 12 == 0) {
                    chartData.push({
                        name: spx['date'],
                        earnings: (result[i + 1] - principal[i + 1]),
                        principal: principal[i + 1]
                    })
                }
            }
        })
        setSimulationResult(result)
        setPrincipal(principal)
        setChartData(chartData)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/spx')
            const spx = await response.json()
            setSPX(spx)

            // const _data = await fetch('/api/dataHandler')
            // const data = await _data.json()
            // setData(data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (spx) {
            let _filtered = []
            _.filter(spx['date'], (_date, i) => {
                if (_date >= startDate && _date < endDate) {
                    _filtered.push({
                        id: i,
                        date: moment2str(moment(_date)),
                        close: spx['close'][i],
                        ratio: spx['ratio'][i]
                    })
                }
            })
            setFilteredSPX(_filtered)
        }
    }, [spx, startDate])

    useEffect(() => {
        simulate()
    }, [filteredSPX, monthlySaving])

    const DateRangePicker = () => {
        return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack direction='row' spacing={3} style={{padding: '10px 40px'}}>
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

    return (
        <div>
            <Header/>
            <Container maxWidth='md'>
                <Link href='/dark'>Go to D side</Link>
                <Segment onSubmit={newItem => setSelectedItem(newItem)}/>

                <Card >
                    <CardHeader avatar={<Avatar src={selectedItem['img']}/>} title={selectedItem['label']}/>
                    <CardContent>
                        <Typography gutterBottom variant='h4' component='div'>
                            {selectedItem['label']}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {selectedItem['description']}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton>
                            <InfoIcon/>
                        </IconButton>
                    </CardActions>
                </Card>

                <section style={{margin: '30px 0'}}>
                    <div>
                        <ul style={{padding: '0'}}>
                            <ListWrapper>
                                <LabelWrapper>積立期間</LabelWrapper>
                                <DateRangePicker/>
                            </ListWrapper>
                            <ListWrapper>
                                <LabelWrapper>毎月積立額</LabelWrapper>
                                <TextField label='' sx={{m: 1, width: '25ch'}}
                                           style={{padding: '10px 40px', margin: '0'}} value={monthlySaving}
                                           InputProps={{
                                               endAdornment: <InputAdornment position='end'>円</InputAdornment>
                                           }}
                                           onChange={e => setMonthlySaving(Number(e.target.value))}/>
                            </ListWrapper>
                        </ul>
                    </div>
                </section>

                <div>
                    <StackedBarChart data={chartData}/>
                </div>
            </Container>
        </div>
    )
}

export default Home


const MenuWrapper = styled.ul`
    font-size: 0;
    padding-bottom: 26px;
    display: flex;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    justify-content: space-between;
`

const MenuItem = styled.li`
    display: inline-block;
    text-align: center;
    vertical-align: top;
    width: 50%;
    
    a {
        font-size: 16px;
        line-height: 1.2;
        font-weight: bold;
        text-align: center;
        color: #004fab;
        display: block;
        padding: 160px 0 0;
        height: 50px;
        background-color: #fff;
        background-position: 50% 40px;
        background-repeat: no-repeat;
        text-decoration: none;
    }
`


const ListWrapper = styled.li`
    background: #ECF4FA;
    border-radius: 12px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    height: 70px;
    margin-bottom: 10px;
    
    > div > div {
        /* date picker white BG */
        background: #fff;
    } 
`

const LabelWrapper = styled.label`
    border-radius: 12px 0 0 12px;
    padding: 22px 0;
    width: 155px;
    height: 100%;

    font-size: 1.4rem;
    color: #32353A;
    font-weight: bold;
    background: #DFE0E1;
    display: inline-block;
`

const DatePickerWrapper = styled.div`
    display: flex;
    padding: 10px 0;
    margin-right: 40px;

    input {
        height: 40px;
        border: 1px solid rgba(34,36,38,.15);
        border-radius: 0.28rem 0 0 .28rem;
        background: white;
        color: black;
    }
    
    span {
        padding: 0.58em 0.8em;
        background: #e8e8e8e8;
        border-radius: 0 0.28rem 0.28rem 0;
    }
`