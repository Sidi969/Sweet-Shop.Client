// Konfigurimi i API-s
const CONFIG = {
    API_BASE_URL: "http://localhost:5000/api",
    ENDPOINTS: {
        sweets: "/sweets",
        search: "/sweets/search",
        category: "/sweets/category"
    }
};

// Helper funksion per fetch me error handling
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(CONFIG.API_BASE_URL + url, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: "Gabim i panjohur" }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        // DELETE kthen 200 me body, PUT kthen 204 pa body
        if (response.status === 204) return null;
        return await response.json();

    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
}

// API funksionet
const SweetsAPI = {
    getAll: () => apiRequest(CONFIG.ENDPOINTS.sweets),
    getById: (id) => apiRequest(`${CONFIG.ENDPOINTS.sweets}/${id}`),
    search: (q) => apiRequest(`${CONFIG.ENDPOINTS.search}?q=${encodeURIComponent(q)}`),
    getByCategory: (cat) => apiRequest(`${CONFIG.ENDPOINTS.category}/${encodeURIComponent(cat)}`),
    create: (data) => apiRequest(CONFIG.ENDPOINTS.sweets, { method: "POST", body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`${CONFIG.ENDPOINTS.sweets}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id) => apiRequest(`${CONFIG.ENDPOINTS.sweets}/${id}`, { method: "DELETE" })
};
