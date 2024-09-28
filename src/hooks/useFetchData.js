import { useState, useEffect } from 'react';

export function useFetchData(request, handleResponse = null) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const processRequest = async(request, handleResponse) => {
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
            if (handleResponse) {
                handleResponse(jsonResponse);
            }
            setIsLoading(false);
            } catch (exception) {
            setIsLoading(false);
            setError(exception.message || "Something went wrong!");
            }
        };
        processRequest(request, handleResponse);    
    }, [request, handleResponse]);
    return { isLoading, error};
}