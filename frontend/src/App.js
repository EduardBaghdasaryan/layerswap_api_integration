"use client";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
} from "@mui/material";

import { useCurrencies, useNetworks, useQuote, useCreateSwap } from "./hooks";

export default function App() {
  const { sources, destinations } = useNetworks();
  const { quote, getQuote } = useQuote();
  const { createSwap } = useCreateSwap();
  const { currencies, updateCurrencies } = useCurrencies();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSourceChange = (event) => {
    updateCurrencies({
      sourceFilterBy: event.target.value,
      destFilterBy: destination,
      sources,
      destinations,
    });
    setSource(event.target.value);
    if (event.target.value && destination && currency) {
      getQuote({
        source: event.target.value,
        destination,
        asset: currency,
        refuel: true,
      });
    }
  };

  const handleDestinationChange = (event) => {
    updateCurrencies({
      sourceFilterBy: source,
      destFilterBy: event.target.value,
      sources,
      destinations,
    });
    setDestination(event.target.value);
    if (source && event.target.value && currency) {
      getQuote({
        source,
        destination: event.target.value,
        asset: currency,
        refuel: true,
      });
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const showMin = () => {
    setAmount(quote?.min_amount || 0);
  };

  const showMax = () => {
    setAmount(quote?.max_amount || 0);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    if (source && destination && event.target.value) {
      getQuote({
        source,
        destination,
        asset: event.target.value,
        refuel: true,
      });
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id } = await createSwap({
      source,
      destination,
      amount: +amount,
      destinationAddress: address,
      asset: currency,
      refuel: false,
    });
    navigate(`/swaps/${id}`);
  };
  return (
    <>
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => { navigate('/swaps')}}
                  >
                    Swaps List
                  </Button>
                </div>
              </Grid>
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
                  placeholder={quote?.min_amount + "-" + quote?.max_amount}
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
                  {quote?.min_amount && quote?.max_amount && (
                    <p style={{ margin: "0 2px" }}>
                      Range: {quote.min_amount} - {quote.max_amount}
                    </p>
                  )}
                </div>
                {quote?.fee_amount && <p>Fee: {quote.fee_amount}</p>}
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
    </>
  );
}
