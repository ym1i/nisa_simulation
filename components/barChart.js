import React, {useEffect, useState} from 'react'
import moment from 'moment'
import styled from 'styled-components'
import {BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {Grid, ListItem, ListItemText, ListItemAvatar, Avatar} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CalculateIcon from '@mui/icons-material/Calculate'
import CircleIcon from '@mui/icons-material/Circle'
import ScheduleIcon from '@mui/icons-material/Schedule'
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen'


const StackedBarChart = ({data, product, start, end, monthly}) => {
    const [date, setDate] = useState()
    const [principal, setPrincipal] = useState()
    const [earnings, setEarnings] = useState()
    const moment2str = _moment => _moment.clone().format('YYYY-MM-DD')

    useEffect(() => {
        if (data.length > 0) {
            setDate(data[data.length - 1]['date'])
            setPrincipal(data[data.length - 1]['principal'])
            setEarnings(data[data.length - 1]['earnings'])
        }
    }, [data])

    const FixedTooltip = () =>
        <TooltipWrapper>
            <Date><CalendarMonthIcon fontSize='medium'
                                     sx={{marginRight: '5px'}}/>{moment(date).clone().format('YYYY-MM-DD')}</Date>
            <TotalValue>
                <div>{(Number(principal) + Number(earnings)).toLocaleString(undefined, {maximumFractionDigits: 0})}円</div>
                <div style={{fontSize: '18px', color: '#f00', fontWeight: 'normal'}}>{(Number(earnings) / Number(principal) * 100).toFixed(2)} %</div>
            </TotalValue>
            <Detail>
                <div>
                    <span style={{display: 'flex', margin: '0 10px'}}><CalculateIcon
                        sx={{color: '#4AAAED', marginRight: '5px', fontSize: 18}}/>元本</span>
                    <span>{Number(principal).toLocaleString()}円</span>
                </div>
                <div>
                    <span style={{display: 'flex', margin: '0 10px'}}><CalculateIcon
                        sx={{color: '#F54058', marginRight: '5px', fontSize: 18}}/>収益</span>
                    <span>{Number(earnings).toLocaleString(undefined, {maximumFractionDigits: 0})}円</span>
                </div>
            </Detail>
        </TooltipWrapper>

    const ProductInfo = () =>
        <TooltipWrapper>
            <div style={{display: 'flex', alignSelf: 'center'}}>
                <StyledListItem>
                    <ListItemAvatar>
                        <Avatar src={product['img']} alt={product['label']}/>
                    </ListItemAvatar>
                    <ListItemText primary={product['label']} style={{fontSize: '28px', fontWeight: 'bold'}}/>
                </StyledListItem>
            </div>
            <div style={{padding: '10px'}}>
                <ScheduleIcon sx={{marginRight: '5px'}}/>{moment2str(start)} - {moment2str(end)}
            </div>
            <div style={{padding: '10px'}}>
                <CurrencyYenIcon sx={{marginRight: '5px'}}/>{monthly}
            </div>
        </TooltipWrapper>

    const CustomLegend = (label1, label2) =>
        <LegendWrapper>
            <span style={{color: '#4AAAED'}}><CircleIcon sx={{ fontSize: 8 }}/> {label1}</span>
            <span style={{color: '#F54058'}}><CircleIcon sx={{ fontSize: 8 }} /> {label2}</span>
        </LegendWrapper>

    return (
        <ChartWrapper>
            <Grid container>
                <Grid xs={12} md={8} sx={{padding: '20px'}}>
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart width={500} height={300} data={data}
                                  margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey='name'/>
                            <YAxis/>
                            <Legend content={CustomLegend('元本', '収益')}/>
                            <Bar dataKey='principal' stackId='a' fill='#4AAAED'/>
                            <Bar dataKey='earnings' stackId='a' fill='#F54058'/>
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid xs={12} md={4} sx={{display: 'flex', alignItems: 'center', padding: '20px'}}>
                    <ProductInfo/>
                </Grid>
                <Grid xs={12} md={8} sx={{padding: '20px'}}>
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart width={500} height={300} data={data}
                                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey='name'/>
                            <YAxis/>
                            <Legend content={CustomLegend('元本', 'トータル')}/>
                            <Line type='monotone' dataKey='principal' stroke='#4AAAED' dot={false}/>
                            <Line type='monotone' dataKey='total' stroke='#F54058' dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid xs={12} md={4} sx={{display: 'flex', alignItems: 'center', padding: '20px'}}>
                    <FixedTooltip/>
                </Grid>
            </Grid>
        </ChartWrapper>
    )

}

export default StackedBarChart


const ChartWrapper = styled.div`
    ul {
        flex-direction: initial;
        background-color: transparent;
        border: none;
    }
    
    ul li {
        font-size: 14px;
    }
    
    ul li + li {
        border-top: none;
    }
`

const TooltipWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: flex-start;
    width: -webkit-fill-available;
    font-size: 16px;
    background-color: rgb(146 151 179 / 13%);
    border-radius: 14px;
    border: 1px solid rgba(16 18 27 / 40%);
    padding: 20px;
    cursor: pointer;
    transition: 0.3s ease;
    
    div {
        display: flex;
        justify-content: center;
    }
`

const StyledListItem = styled(ListItem)`
    border-bottom: 1px solid rgba(113 119 144 / 25%);
    
    div span {
        font-size: 28px;
        font-weight: bold;
    }
`

const Date = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(113 119 144 / 25%);
    font-size: 18px;
    font-weight: 600;
`

const TotalValue = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.6em;
    margin-top: 20px;
    border-bottom: 1px solid rgba(113 119 144 / 25%);
    padding-bottom: 20px;
`

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 16px;
    
    > div {
        display: flex;
        padding: 0 0 8px 0;
        font-size: 14px;
        width: 100%;
        justify-content: center;
    }
`

const LegendWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    
    span {
        display: flex;
        align-items: center;
        padding: 10px;
        font-size: 12px;
    }
    
    svg {
        margin-right: 5px;
    }
`