import axios from "axios"
import { prodHost } from "../env.dev.js";


const getNetworks = async (req, res) => {
    try {
        const response = await axios.get(`${prodHost}/api/public/networks`, {
          headers: {
            'accept': `application/json'`,
          }
        });
        res.json(response.data)
      } catch (error) {
        res.status(error.response.status).json({ error: error.response.data });
      }
}

const getQuote = async (req, res) => {
    const {source, destination, asset, refuel} = req.body

    try {
        const response = await axios.post(`${prodHost}/api/public/quote`, {
          source,
          destination,
          asset,
          refuel
        }, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        res.json(response.data)

      } catch (error) {
        res.status(error.response.status).json({ error:error.response.data });
      }
}

export {
    getNetworks,
    getQuote
}
