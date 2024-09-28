import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (request, handleResponse) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(request.url, {
        method: request.method ? request.method : "GET",
        headers: request.headers ? request.headers : {},
        body: request.body ? JSON.stringify(request.body) : null,
      });

      if (!response.ok)
         throw new Error("Request failed!");

      const jsonResponse = await response.json();
      handleResponse(jsonResponse);
      setIsLoading(false);
    } catch (exception) {
      setIsLoading(false);
      setError(exception.message || "Something went wrong!");
    }
    
  }, []);

  return {
    sendRequest,
    error,
    isLoading,
  };
};

export default useHttp;
