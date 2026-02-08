import { useEffect, useState } from "react";

/**
 * In-memory cache shared across app
 * Key: string
 * Value: API response
 */
const cache = new Map();

/**
 * Optimized fetch hook
 *
 * @param {Function} fetchFn   - API function
 * @param {string} cacheKey   - Unique key for caching (optional)
 * @param {Array} deps        - Dependency array
 */
const useFetch = (fetchFn, cacheKey, deps = []) => {
  const [data, setData] = useState(
    cacheKey ? cache.get(cacheKey) ?? null : null
  );
  const [loading, setLoading] = useState(
    cacheKey ? !cache.has(cacheKey) : true
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      // ✅ Serve from cache if available
      if (cacheKey && cache.has(cacheKey)) {
        setData(cache.get(cacheKey));
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn();
        if (!active) return;

        // ✅ Cache result
        if (cacheKey) {
          cache.set(cacheKey, result);
        }

        setData(result);
      } catch (err) {
        if (active) {
          setError(err?.message || "Something went wrong");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
};

export default useFetch;
