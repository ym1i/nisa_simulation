import React, {useEffect, useState} from 'react'
import moment from 'moment'
import styled from 'styled-components'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {Grid} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CalculateIcon from '@mui/icons-material/Calculate'


const StackedBarChart = ({data}) => {
    //console.log('barChart.js \n | data = ', data)
    const [date, setDate] = useState()
    const [principal, setPrincipal] = useState()
    const [earnings, setEarnings] = useState()

    useEffect(() => {
        if (data.length > 0) {
            setDate(data[data.length - 1]['date'])
            setPrincipal(data[data.length - 1]['principal'])
            setEarnings(data[data.length - 1]['earnings'])
        }
    }, [data])


    // const handleMouseEnter = (e) => {
    //     setDate(e['name'])
    //     setPrincipal(e['principal'])
    //     setEarnings(e['earnings'])
    // }

    const FixedTooltip = () =>
        <TooltipWrapper>
            <Date><CalendarMonthIcon fontSize='medium' sx={{ marginRight: '5px' }}/>{moment(date).clone().format('YYYY-MM-DD')}</Date>
            <TotalValue>{(Number(principal) + Number(earnings)).toLocaleString(undefined, {maximumFractionDigits: 0})}円</TotalValue>
            <Detail>
                <div>
                    <span style={{display: 'flex', margin: '0 10px'}}><CalculateIcon sx={{color: '#4AAAED', marginRight: '5px', fontSize: 18}}/>元本</span>
                    <span>{Number(principal).toLocaleString()}円</span>
                </div>
                <div>
                    <span style={{display: 'flex', margin: '0 10px'}}><CalculateIcon sx={{color: '#F54058', marginRight: '5px', fontSize: 18}}/>収益</span>
                    <span>{Number(earnings).toLocaleString(undefined, {maximumFractionDigits: 0})}円</span>
                </div>
            </Detail>
        </TooltipWrapper>


    return (
        <div>
            <Grid container>
                <Grid xs={12} md={8} sx={{padding: '20px'}}>
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart width={500} height={300} data={data}
                                  margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey='name'/>
                            <YAxis/>
                            {/*<Tooltip content={CustomTooltip}/>*/}
                            <Legend/>
                            {/*<Bar dataKey='principal' stackId='a' fill='#4AAAED' onMouseEnter={e => handleMouseEnter(e)}/>*/}
                            <Bar dataKey='principal' stackId='a' fill='#4AAAED'/>
                            <Bar dataKey='earnings' stackId='a' fill='#F54058'/>
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid xs={12} md={4} sx={{display: 'flex', alignItems: 'center', padding: '20px'}}>
                    <FixedTooltip/>
                </Grid>
            </Grid>
        </div>
    )

}

export default StackedBarChart


const TooltipWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    background-color: rgb(146 151 179 / 13%);
    border-radius: 14px;
    border: 1px solid rgba(16 18 27 / 40%);
    padding: 20px;
    cursor: pointer;
    transition: 0.3s ease;
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
        font-size: 14px
    }
`