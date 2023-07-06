import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

const useNetworks = () => {
  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${API_URL}/networks`
        );
        if (response.error) {
          console.log("error getting networks", response.error);
        } else {
          setSources(response.data.sources);
          setDestinations(response.data.destinations);
        }
      } catch (error) {
        console.log("error getting networks", error);
      }
    };

    fetchData();
  }, []);

  return {
    sources,
    destinations,
  };
};

const useQuote = async () => {
  const [quote, setQuote] = useState({});
  const getQuote = async (body) => {
    try {
      const { data: response } = await axios.post(
        `${API_URL}/quote`,
        body
      );
      if (response.error) {
        console.log("error getting quote", response.error);
      } else {
        setQuote(response.data);
      }
    } catch (error) {
      console.log("error getting quote", error);
    }
  };
  return {
    quote,
    getQuote,
  };
};

const useSwaps = async () => {
  const [swap, setSwap] = useState({});
  const createSwap = async (body) => {
    try {
      const { data: response } = await axios.post(
        `${API_URL}/swaps`,
        body
      );

      if (response.error) {
        console.log("error creating swap", response.error);
      } else {
        setSwap(response.data);
      }
    } catch (error) {
      console.log("error creating swap", error);
    }
  };

  const getSwap = async (id) => {
    const { data: response } = await axios.get(
      `${API_URL}/swaps/${id}`);

    if (response.error) {
      console.log("error creating swap", response.error);
    } else {
      setSwap(response.data);
    }
  };

  return {
    swap,
    createSwap,
    getSwap,
  };
};

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);

  const updateCurrencies = ({
    sourceFilterBy, destFilterBy, sources, destinations
  }) => {
    const sourceCurrencies = getCurrencies(sourceFilterBy, sources);
    const destCurrencies = getCurrencies(destFilterBy, destinations);
    const intersectCurrencies = sourceCurrencies.filter(n => destCurrencies.some(n2 => n.name === n2.name));
    setCurrencies(intersectCurrencies);
  };

  const getCurrencies = (filterBy, data) => {
    const currencies = [];
    if (filterBy) {
      const foundData = data.find((source) => source.name === filterBy);
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
    return currencies;
  };

  return {
    currencies,
    updateCurrencies,
  };
};

export { useNetworks, useQuote, useSwaps, useCurrencies };
