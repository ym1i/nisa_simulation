import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {Grid} from '@mui/material'


const StackedBarChart = ({data}) => {
    const [date, setDate] = useState()
    const [principal, setPrincipal] = useState()
    const [earnings, setEarnings] = useState()

    useEffect(() => {
        if (data.length > 0) {
            setDate(data[data.length - 1]['name'])
            setPrincipal(data[data.length - 1]['principal'])
            setEarnings(data[data.length - 1]['earnings'])
        }
    }, [data])


    const handleMouseEnter = (e) => {
        setDate(e['name'])
        setPrincipal(e['principal'])
        setEarnings(e['earnings'])
    }

    const Tooltip = () => {
        return (
            <TooltipWrapper>
                <TooltipDate>{date}</TooltipDate>
                <TooltipTotal>
                    <span style={{fontSize: '1.2rem', lineHeight: '1.5'}}>元本 + 収益</span>
                    <span
                        style={{
                            fontSize: '2.0rem',
                            textAlign: 'right'
                        }}>{parseInt(principal) + parseInt(earnings)}円</span>
                </TooltipTotal>
                <TooltipItems>
                    <div>
                        <TooltipItemLabel bgcolor={'#4AAAED'}>元本</TooltipItemLabel>
                        <TooltipItemValue>{principal}円</TooltipItemValue>
                    </div>
                    <div>
                        <TooltipItemLabel bgcolor={'#F54058'}>収益</TooltipItemLabel>
                        <TooltipItemValue>{parseInt(earnings)}円</TooltipItemValue>
                    </div>
                </TooltipItems>
            </TooltipWrapper>
        )
    }

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
                            {/*<Tooltip/>*/}
                            <Legend/>
                            <Bar dataKey='principal' stackId='a' fill='#4AAAED'
                                 onMouseEnter={e => handleMouseEnter(e)}/>
                            <Bar dataKey='earnings' stackId='a' fill='#F54058'/>
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid xs={12} md={4} sx={{display: 'flex', alignItems: 'center', padding: '20px'}}>
                    <Tooltip/>
                </Grid>
            </Grid>
        </div>
    )

}

export default StackedBarChart


const TooltipWrapper = styled.div`
    width: 280px;
    border: 1px solid #EEEEEE;
    font-weight: bold;
`

const TooltipDate = styled.div`
    color: #FFF;
    font-weight: bold;
    background: #4AAAED;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 1.6rem;
`

const TooltipTotal = styled.div`
    flex-direction: column;
    justify-content: space-evenly;
    height: 78px;
    background-color: #fff;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
`

const TooltipItems = styled.div`
    padding: 8px 12px;
    background: #EEEEEE;
    
    > div {
        display: block;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
    }
`

const TooltipItemLabel = styled.span`
    font-size: 1.2rem;
    justify-content: start;
    display: flex;
    // justify-content: center;
    align-items: center;
    padding-right: 10px;
    
    &:before {
        ${(props) => `background-color: ${props.bgcolor}`};
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
`

const TooltipItemValue = styled.span`
    font-size: 1.4rem;
    display: block;
    text-align: right;
`
