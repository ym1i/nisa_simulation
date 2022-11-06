import _ from 'lodash'
import summary from './summary.json'
import spx from './spx.json'
import moment from 'moment'


const moment2str = _moment => _moment.clone().format('YYYY-MM-DD')

export default function dataHandler(req, res) {
    let data
    const query = req.query
    const {product, start, end} = query

    const setData = (symbol, label, img, wiki, historicalData) => {
        let _filteredData = []
        _.filter(historicalData['date'], (_date, i) => {
            if (_date >= moment(start) && _date < moment(end)) {
                _filteredData.push({
                    id: i,
                    date: moment2str(moment(_date)),
                    close: historicalData['close'][i],
                    ratio: historicalData['ratio'][i]
                })
            }
        })
        return {symbol, label, img, wiki, data: _filteredData}
    }

    switch (product) {
        case 'spx':
            data = setData(summary['spx']['symbol'], summary['spx']['label'], summary['spx']['img'], summary['spx']['wiki'], spx)
        default:
            console.log('product is not available')
    }
    console.log('data = ', data)

    res.status(200).json(summary)
}
