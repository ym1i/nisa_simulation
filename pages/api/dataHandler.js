import _ from 'lodash'
import productList from './productList.json'
import us500 from './histrical_data/us500.json'
import us30 from './histrical_data/us30.json'
import moment from 'moment'


const moment2str = _moment => _moment.clone().format('YYYY-MM-DD')

const simulate = (_data, _monthlySaving) => {
    console.log('_data = ', _data)
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
            if (d['date'].month() == 0) {
                chartData.push({
                    name: d['date'],
                    earnings: (result[i] - principal[i]),
                    principal: principal[i]
                })
            }
        }
    })
    if (chartData[chartData.length - 1]['name'] != _data[_data.length - 1]['date']) {

    }

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
                    // date: moment2str(moment(_date)),
                    date: moment(_date),
                    close: historicalData['close'][i],
                    ratio: historicalData['ratio'][i]
                })
            }
        })

        const simulationData = simulate(filteredData, parseInt(monthlysaving))

        return {simulationData, minDate, maxDate, productList}
    }

    switch (product) {
        case 'us500':
            data = setData(us500)
            break
        case 'us100':
            data = setData(us500)
            break
        case 'us30':
            data = setData(us30)
            break
        case 'eu50':
            data = setData(us500)
            break
        case 'uk100':
            data = setData(us500)
            break
        case 'de40':
            data = setData(us500)
            break
        case 'jp225':

            data = setData(us500)
            break
        case 'hk50':
            data = setData(us500)
            break
        case 'appl':
            data = setData(us500)
            break
        case 'amzn':
            data = setData(us500)
            break
        case 'goog':
            data = setData(us500)
            break
        case 'btc':
            data = setData(us500)
            break
        case 'eth':
            data = setData(us500)
            break
        default:
            console.log('product is not available')
    }

    res.status(200).json(data)
}
