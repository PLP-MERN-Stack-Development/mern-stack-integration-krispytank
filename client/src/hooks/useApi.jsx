// src/hooks/useApi.jsx
import { useState } from 'react';
import api from '../services/api';

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, url, data = null, params = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api({ method, url, data, params });
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}
