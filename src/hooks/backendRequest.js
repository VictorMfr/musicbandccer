import { useSelector } from "react-redux";

const useBackendRequest = () => {
    /// Getting constants
    const BackendUrl = useSelector(state => state.routes.backend);
    const backendRequest = async (requestConfig, isLocal = true) => {
        try {
            const response = await fetch((isLocal? BackendUrl.urlLocal: BackendUrl.url) + requestConfig.url, {
                method: requestConfig.method,
                headers: requestConfig.headers,
                body: JSON.stringify(requestConfig.body)
            });
            console.log(response)
            if (!response.ok) {
                throw new Error('There was an error while fetching to backend');
            }
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    return {
        backendRequest,
    }
}

export default useBackendRequest;