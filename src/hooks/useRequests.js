import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getReceivedRequests, reviewRequest as apiReview } from '../services/connectionService';

export function useRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getReceivedRequests()
      .then(r => setRequests(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const reviewRequest = async (requestId, status) => {
    try {
      await apiReview(requestId, status);
      setRequests(prev => prev.filter(r => r._id !== requestId));
      if (status === 'accepted') toast.success('Connection accepted! 💕');
      else toast('Request declined');
    } catch { toast.error('Something went wrong'); }
  };

  return { requests, loading, reviewRequest };
}
