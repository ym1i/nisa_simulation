import _ from 'lodash'
import productList from './productList.json'
import spx from './spx.json'
import moment from 'moment'


const moment2str = _moment => _moment.clone().format('YYYY-MM-DD')

const simulate = (_data, _monthlySaving) => {
    let result = [0]
    let principal = [0]
    let chartData = []
    _.reverse(_data).map((d, i) => {
        result[i + 1] = (result[i] + _monthlySaving) * (1 + d['ratio'])
        principal[i + 1] = principal[i] + _monthlySaving
        if (_data.length <= 48) {
            chartData.push({
                name: d['date'],
                earnings: (result[i] - principal[i]),
                principal: principal[i]
            })
        } else {
            if (i % 12 == 0) {
                chartData.push({
                    name: d['date'],
                    earnings: (result[i] - principal[i]),
                    principal: principal[i]
                })
            }
        }
    })

    return {result, principal, chartData}
}

export default function dataHandler(req, res) {
    let data
    const query = req.query
    const {product, start, end, monthlysaving} = query

    const setData = (historicalData) => {
        const size = _.size(historicalData["date"])
        const minDate = moment(historicalData["date"][size - 1])
        const maxDate = moment(historicalData["date"][0])

        let filteredData = []
        _.filter(historicalData['date'], (_date, i) => {
            if (_date >= moment(start) && _date < moment(end)) {
                filteredData.push({
                    id: i,
                    date: moment2str(moment(_date)),
                    close: historicalData['close'][i],
                    ratio: historicalData['ratio'][i]
                })
            }
        })

        const simulationData = simulate(filteredData, parseInt(monthlysaving))

        return {simulationData, minDate, maxDate, productList}
    }

    switch (product) {
        case 'spx':
            data = setData(spx)
        case 'ndx':
            data = setData(spx)
        case 'dji':
            data = setData(spx)
        case 'aapl':
            data = setData(spx)
        case 'amzn':
            data = setData(spx)
        case 'goog':
            data = setData(spx)
        default:
            console.log('product is not available')
    }

    res.status(200).json(data)
}
