import spx from './histrical_data/us500.json'

export default function handler(req, res) {
    res.status(200).json(spx)
}
