import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

const useNetworks = () => {
  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/networks`);
        if (response.error) {
          console.log('error getting networks', response.error);
        } else {
          setSources(response.data.sources);
          setDestinations(response.data.destinations);
        }
      } catch (error) {
        console.log('error getting networks', error);
      }
    };

    fetchData();
  }, []);

  return {
    sources,
    destinations,
  };
};

const useQuote = () => {
  const [quote, setQuote] = useState({});
  const getQuote = async body => {
    try {
      const { data: response } = await axios.post(`${API_URL}/quote`, body);
      if (response.error) {
        console.log('error getting quote', response.error);
      } else {
        setQuote(response.data);
      }
    } catch (error) {
      console.log('error getting quote', error);
    }
  };
  return {
    quote,
    getQuote,
  };
};

const useCreateSwap = () => {
  const createSwap = async body => {
    try {
      const { data: response } = await axios.post(`${API_URL}/swaps`, body);

      if (response.error) {
        console.log('error creating swap', response.error);
      } else {
        return response.data;
      }
    } catch (error) {
      console.log('error creating swap', error);
    }
  };

  return {
    createSwap,
  };
};

const useGetSwap = () => {
  const [swap, setSwap] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getSwap = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/swaps/${id}`);
        if (response.error) {
          console.log('error getting networks', response.error);
        } else {
          setSwap(response.data);
        }
      } catch (error) {
        console.log('error getting networks', error);
      }
    };

    getSwap();
  }, [id]);

  return {
    swap,
  };
};

const useSwaps = () => {
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    const getSwaps = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/swaps`);
        setSwaps(response);
      } catch (error) {
        console.log('error getting networks', error);
      }
    };

    getSwaps();
  }, []);

  const { id } = useParams();
  const cancelSwap = async () => {
    try {
      const { data: response } = await axios.delete(`${API_URL}/swaps/${id}`);
      if (response.error) {
        console.log('error delleting swap by id', response.error);
      } else {
        console.log(response.data);
        setSwaps(response.data);
      }
    } catch (error) {
      console.log('error delleting swap by id', error);
    }
  };

  return {
    swaps,
    setSwaps,
    cancelSwap,
  };
};

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);

  const updateCurrencies = ({
    sourceFilterBy,
    destFilterBy,
    sources,
    destinations,
  }) => {
    const sourceCurrencies = getCurrencies(sourceFilterBy, sources);
    const destCurrencies = getCurrencies(destFilterBy, destinations);
    const intersectCurrencies = sourceCurrencies.filter(n =>
      destCurrencies.some(n2 => n.name === n2.name),
    );
    setCurrencies(intersectCurrencies);
  };

  const getCurrencies = (filterBy, data) => {
    const currencies = [];
    if (filterBy) {
      const foundData = data.find(source => source.name === filterBy);
      if (foundData) {
        foundData.networks.forEach(network => {
          network.currencies.forEach(currency => {
            if (
              currencies.findIndex(item => item.name === currency.name) === -1
            ) {
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

export {
  useNetworks,
  useQuote,
  useCreateSwap,
  useCurrencies,
  useGetSwap,
  useSwaps,
};
