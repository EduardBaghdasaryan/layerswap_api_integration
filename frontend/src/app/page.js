"use client";
import { useState } from "react";
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

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleDestinationChange = (event) => {
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
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      {" "}
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
                <MenuItem value={10}>USDT</MenuItem>
                <MenuItem value={20}>ETH</MenuItem>
                <MenuItem value={30}>BTC</MenuItem>
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
