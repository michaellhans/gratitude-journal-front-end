const BASE_API_URL = 'http://localhost:3000/api';
const ENDPOINTS = {
    kpiDashboard: `${BASE_API_URL}/gratitude/kpi-dashboard`,
    gratitude: `${BASE_API_URL}/gratitude`
};

export const fetchKPIDashboard = async (startDate, endDate) => {
    const params = new URLSearchParams({ startDate, endDate });

    try {
        const response = await fetch(`${ENDPOINTS.kpiDashboard}?${params}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching KPI dashboard:', error);
        throw error;
    }
};

export const fetchGratitudeData = async (date) => {
    const params = new URLSearchParams({ date });

    try {
        const response = await fetch(`${ENDPOINTS.gratitude}?${params}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { gratitude } = await response.json();
        return gratitude;
    } catch (error) {
        console.error('Error fetching gratitude data:', error);
        throw error;
    }
};
