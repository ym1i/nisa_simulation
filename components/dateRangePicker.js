import React from 'react'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {Stack, TextField} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'


const DateRangePicker = ({start, end, min, max, onStartChange, onEndChange}) => {

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack direction='row' spacing={3}>
                <DatePicker views={['year', 'month']} label='From' minDate={min} maxDate={max}
                            value={start} onChange={_date => onStartChange(_date)}
                            renderInput={params => <TextField {...params} />}/>
                <DatePicker views={['year', 'month']} label='To' minDate={min} maxDate={max} value={end}
                            onChange={_date => onEndChange(_date)}
                            renderInput={params => <TextField {...params} />}/>
            </Stack>
        </LocalizationProvider>
    )
}

export default DateRangePicker