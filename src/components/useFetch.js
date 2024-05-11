import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);  // Initialize as true, indicating fetch is in progress
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();  // Create an abort controller for cleanup

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            });

        return () => {
            abortCont.abort();  // Abort the fetch on cleanup
        };
    }, [url]);  // Ensure useEffect is called when URL changes

    return { data, isPending, error };
}

export default useFetch;
