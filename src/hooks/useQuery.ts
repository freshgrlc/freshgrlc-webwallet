import { useLocation } from 'react-router';

/**
 *
 * A custom hook that builds on useLocation to parse the query string for you.
 *
 * https://reactrouter.com/web/example/query-parameters
 */
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}
