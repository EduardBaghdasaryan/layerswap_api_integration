"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
} from "@mui/material";

export default function Home() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [address, setAddress] = useState("");
  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [quote, setQuote] = useState({})

  const updateCurrencies = (src, dest) => {
    let currencies = []
    addCurrencies(src, sources, currencies);
    addCurrencies(dest, destinations, currencies);
    setCurrencies(currencies);
  }

  const addCurrencies = (filterBy, data, currencies) => {
    if (filterBy) {
      const foundData = data.find(source => source.name === filterBy);
      if (foundData) {
        foundData.networks.forEach(network => {
          network.currencies.findIndex(currency => {
            if (currencies.findIndex(item => item.name === currency.name) === -1) {
              currencies.push(currency);
            }
          });
        });
      }
    }
  }

  const getQuote = async () => {
    try {
      const body = {
        source,
        destination,
        asset: currency,
        refuel: true
      };
      const response = await axios.post('http://localhost:3000/quote', body);
      setQuote(response.data.data)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSourceChange = (event) => {
    updateCurrencies(event.target.value, destination);
    setSource(event.target.value);
    if (source && destination && currency) {
      getQuote()
    }
  };

  const handleDestinationChange = (event) => {
    updateCurrencies(source, event.target.value);
    setDestination(event.target.value);
    if (source && destination && currency) {
      getQuote()
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const showMin = () => {
    setAmount(quote.min_amount)
  }

  const showMax = () => {
    setAmount(quote.max_amount)
  }

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    if (source && destination && currency) {
      getQuote()
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(amount);
    try {
      const body = {
        source,
        destination,
        amount,
        sourceAddress : address,
        destinationAddress : '0xe688b84b23f322a994A53dbF8E15FA82CDB71127',
        asset: currency,
        refuel: false,
        referenceId : "145127"
      };
      const response = await axios.post('http://localhost:3000/swaps', body);
      console.log(response.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
    console.log("Form submitted!");
  };

  useEffect(() => {
    axios.get('http://localhost:3000/networks').then((response) => {
      if (response.data) {
        if (response.data.error) {
          console.log("error getting netowrks", response.data.error)
        } else {
          setSources(response.data.data.sources);
          setDestinations(response.data.data.destinations);
        }
      }
    });
  
    return () => {
      // TODO
    }
  }, [])
  
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <form onSubmit={handleSubmit}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="source-label">Source</InputLabel>
                <Select
                  labelId="source-label"
                  id="source"
                  value={source}
                  label="Source"
                  onChange={handleSourceChange}
                >
                  {sources.map(({ logo, display_name, name }, index) => (
                    <MenuItem key={index} value={name}>
                      {display_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="destination-label">Destination</InputLabel>
                  <Select
                    labelId="destination-label"
                    id="destination"
                    value={destination}
                    label="Destination"
                    onChange={handleDestinationChange}
                  >
                  {destinations.map(({ logo, display_name, name }, index) => (
                    <MenuItem key={index} value={name}>
                      {display_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label="Amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder={quote.min_amount + "-" +  quote.max_amount} 
              />
              <Select
                id="currency-select"
                style={{ minWidth: 80 }}
                value={currency}
                onChange={handleCurrencyChange}
              >
               {currencies.map(({ logo, display_name, name }, index) => (
                  <MenuItem key={index} value={name}>
                    {display_name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={showMin}
              >
                min
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={showMax}
              >
                max
              </Button>
              {quote.min_amount && quote.max_amount && (
                <p style={{ margin: "0 2px" }}>
                  Range: {quote.min_amount} - {quote.max_amount}
                </p>
              )}
            </div>
            {quote.fee_amount && <p>Fee: {quote.fee_amount}</p>}
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Address"
                value={address}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Swap
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
