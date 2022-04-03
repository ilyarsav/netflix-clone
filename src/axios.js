
import axios from "axios";
import { useState } from "react";

const baseURL = "https://api.themoviedb.org/3";

export const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const request = async (data) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}${data}`)

      if (!response.statusText == "OK") {
        throw new Error(
          `Could not fetch ${baseURL}${data}, status: ${response.status}`
        );
      }

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }

  return { loading, error, request };
};
