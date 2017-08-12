
export const apiHelper = {

    get: (endpoint: string): Promise<any> => {
        return fetch(endpoint)
            .then((response) => {
                return response.json();
            });
    }

};
