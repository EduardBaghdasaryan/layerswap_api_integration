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

  const handleSourceChange = (event) => {
    updateCurrencies(event.target.value, destination);
    setSource(event.target.value);
  };

  const handleDestinationChange = (event) => {
    updateCurrencies(source, event.target.value);
    setDestination(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted!");
  };

  useEffect(() => {
    axios.get('https://partner-api.layerswap.io/api/public/networks').then((response) => {
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
