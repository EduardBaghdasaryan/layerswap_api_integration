import { useEffect, useState } from "react";
import axios from "axios";

const useNetworks = () => {
  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/networks`
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
        `${process.env.NEXT_PUBLIC_API_URL}/quote`,
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
  const createSwap = async () => {
    try {
      const { data: response } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/swaps`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/swaps/${id}`,
      body
    );

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

export { useNetworks, useQuote, useSwaps };
