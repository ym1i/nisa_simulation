import data from './data.json'

export default function dataHandler(req, res) {
    res.status(200).json(data)
}
