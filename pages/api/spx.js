import spx from './spx.json'

export default function handler(req, res) {
    res.status(200).json(spx)
}
