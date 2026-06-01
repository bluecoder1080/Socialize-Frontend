import { useState, useEffect } from 'react';
import { getConnections } from '../services/connectionService';

export function useConnections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading]         = useState(true);
  useEffect(() => {
    getConnections()
      .then(r => setConnections(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);
  return { connections, loading };
}
