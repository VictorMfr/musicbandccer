import { useSelector } from "react-redux";


const useBackendRequest = () => {
    const BackendUrl = useSelector(state => state.routes.backend.url);

    const backendRequest = async (requestConfig) => {
        try {
            const response = await fetch(BackendUrl + requestConfig.url, {
                method: requestConfig.method,
                headers: requestConfig.headers,
                body: JSON.stringify(requestConfig.body)
            });
            if (!response.ok) {
                throw new Error('There was an error while fetching to backend');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    return {
        backendRequest,
    }
}

export default useBackendRequest;