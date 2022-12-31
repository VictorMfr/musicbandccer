import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";


const useBackendRequest = () => {
    /// Getting constants
    const BackendUrl = useSelector(state => state.routes.backend);
    const backendRequest = useCallback(async (requestConfig, isLocal = false) => {
        try {
            const response = await fetch((isLocal ? BackendUrl.urlLocal : BackendUrl.url) + requestConfig.url, {
                method: requestConfig.method,
                headers: requestConfig.headers,
                body: JSON.stringify(requestConfig.body)
            });
            if (!response.ok) {
                throw new Error('ERROR_FETCHING');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }, [BackendUrl.url, BackendUrl.urlLocal])

    return useMemo(() => {
        return {
            backendRequest
        }
    }, [backendRequest])

}

export default useBackendRequest;