import axios from "axios"
import { prodHost, apiKey } from "../env.dev.js";


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
    const { source, destination, asset, refuel } = req.body

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
        res.status(error.response.status).json({ error: error.response.data });
    }
}

const createSwap = async (req, res) => {
    const { source, destination, amount, asset, sourceAddress,
            destinationAddress, refuel, referenceId } = req.body
    try {
        const response = await axios.post(`${prodHost}/api/private/swaps`, {
            source,
            destination,
            amount,
            asset,
            source_address: sourceAddress,
            destination_address: destinationAddress,
            refuel,
            reference_id: referenceId
        }, {
            headers: {
                'X-LS-APIKEY': apiKey,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data)
    } catch (error) {
        res.status(error.response.status).json({ error: error.response.data });
    }
}

const getSwap = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const response = await axios.get(`${prodHost}/api/private/swaps/${id}`, {
          headers: {
            'X-LS-APIKEY': apiKey
          }
        });
        res.json(response.data)
      } catch (error) {
        res.status(error.response.status).json({ error: error.response.data });
      }
}

const deleteSwap = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await axios.delete(`${prodHost}/api/private/swaps/${id}`, {
          headers: {
            'X-LS-APIKEY': apiKey
          }
        });
        res.json(response.data)
      } catch (error) {
        res.status(error.response.status).json({ error: error.response.data });
      }
}

export {
    getNetworks,
    getQuote,
    createSwap,
    getSwap,
    deleteSwap
}
