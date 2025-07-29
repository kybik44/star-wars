import { useState, useEffect } from 'react';

export const useGlobalLoader = (initialDelay: number = 3000) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return {
    isLoading,
    showLoader,
    hideLoader,
  };
};