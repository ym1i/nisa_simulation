import _ from 'lodash'
import summary from './summary.json'
import spx from './spx.json'
import moment from 'moment'

const indexList = ['spx', 'ndx', 'dji']
const individualList = ['appl', 'amazon', 'google']

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
                earnings: (result[i + 1] - principal[i + 1]),
                principal: principal[i + 1]
            })
        } else {
            if (i % 12 == 0) {
                chartData.push({
                    name: d['date'],
                    earnings: (result[i + 1] - principal[i + 1]),
                    principal: principal[i + 1]
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

    const setData = (symbol, label, img, wiki, historicalData) => {
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

        return {symbol, label, img, wiki, simulationData, minDate, maxDate, indexList, individualList, summary}
    }

    switch (product) {
        case 'spx':
            data = setData(summary['spx']['symbol'], summary['spx']['label'], summary['spx']['img'], summary['spx']['wiki'], spx)
        default:
            console.log('product is not available')
    }

    res.status(200).json(data)
}
