import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { getFeed, sendRequest } from '../services/feedService';

export function useFeed() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const exitX = useRef(0);

  useEffect(() => {
    getFeed()
      .then(r  => setUsers(r.data.data || []))
      .catch(() => toast.error('Failed to load feed'))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = async (userId, status) => {
    exitX.current = status === 'interested' ? 600 : -600;
    setUsers(prev => prev.slice(1));
    try {
      await sendRequest(userId, status);
      if (status === 'interested') toast.success('Liked! 💕', { duration: 1500 });
    } catch (err) {
      const msg = err?.response?.data?.message || '';
      if (!msg.includes('Already')) toast.error('Something went wrong');
    }
  };

  return { users, loading, handleAction, exitX };
}
