import _ from 'lodash'
import moment from 'moment'

import productList from './productList.json'
import us30 from './histrical_data/us30.json'
import us100 from './histrical_data/us100.json'
import us500 from './histrical_data/us500.json'
import de30 from './histrical_data/de30.json'
import eu50 from './histrical_data/eu50.json'
import uk100 from './histrical_data/uk100.json'
import jp225 from './histrical_data/jp225.json'
import hk50 from './histrical_data/hk50.json'
import aapl from './histrical_data/aapl.json'
import amzn from './histrical_data/amzn.json'
import goog from './histrical_data/goog.json'
import btc from './histrical_data/btc.json'
import eth from './histrical_data/eth.json'
import xrp from './histrical_data/xrp.json'


const moment2str = _moment => _moment.clone().format('YYYY-MM-DD')
const moment2Year = _moment => _moment.clone().format('YYYY')

const simulate = (_data, _monthlySaving) => {
    let result = [0]
    let principal = [0]
    let chartData = []
    _.reverse(_data).map((d, i) => {
        result[i + 1] = (result[i] + _monthlySaving) * (1 + d['ratio'])
        principal[i + 1] = principal[i] + _monthlySaving
        if (_data.length <= 48) {
            chartData.push({
                name: moment2Year(d['date']),
                date: moment2str(d['date']),
                earnings: (result[i] - principal[i]),
                principal: principal[i]
            })
        } else {
            if (d['date'].month() == 0) {
                chartData.push({
                    name: moment2Year(d['date']),
                    date: moment2str(d['date']),
                    earnings: (result[i] - principal[i]),
                    principal: principal[i]
                })
            }
        }
    })
    if (_data[_data.length - 1]['date'].month() !== 0) {
        chartData.push({
            name: moment2Year(_data[_data.length - 1]['date']),
            date: moment2str(_data[_data.length - 1]['date']),
            earnings: (result[result.length - 1] - principal[principal.length - 1]),
            principal: principal[principal.length - 1]
        })
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
            if (_date >= moment(start) && _date <= moment(end)) {
                filteredData.push({
                    id: i,
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
            data = setData(us100)
            break
        case 'us30':
            data = setData(us30)
            break
        case 'eu50':
            data = setData(eu50)
            break
        case 'uk100':
            data = setData(uk100)
            break
        case 'de40':
            data = setData(de30)
            break
        case 'jp225':
            data = setData(jp225)
            break
        case 'hk50':
            data = setData(hk50)
            break
        case 'appl':
            data = setData(aapl)
            break
        case 'amzn':
            data = setData(amzn)
            break
        case 'goog':
            data = setData(goog)
            break
        case 'btc':
            data = setData(btc)
            break
        case 'eth':
            data = setData(eth)
            break
        default:
            console.log('product is not available')
    }

    res.status(200).json(data)
}
