
export const apiService = {

    get: (endpoint: string): Promise<any> => {
        return fetch(endpoint)
            .then((response) => {
                return response.json();
            });
    }

};
