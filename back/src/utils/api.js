import config from '../config';

const defaultHeaders = {
    'Content-Type': 'application/json',
};

export const api = {
    async get(endpoint) {
        const response = await fetch(`${config.apiUrl}${endpoint}`, {
            method: 'GET',
            headers: defaultHeaders,
            credentials: 'include'
        });
        return handleResponse(response);
    },

    async post(endpoint, data) {
        const response = await fetch(`${config.apiUrl}${endpoint}`, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(data),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    async put(endpoint, data) {
        const response = await fetch(`${config.apiUrl}${endpoint}`, {
            method: 'PUT',
            headers: defaultHeaders,
            body: JSON.stringify(data),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    async delete(endpoint) {
        const response = await fetch(`${config.apiUrl}${endpoint}`, {
            method: 'DELETE',
            headers: defaultHeaders,
            credentials: 'include'
        });
        return handleResponse(response);
    }
};

async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Wystąpił błąd podczas wykonywania żądania');
    }
    return response.json();
} 