// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    isLoading: true,
    data: [],
    statistics: null,
    chart: null
};

// ==============================|| SLICE - GRATITUDE ||============================== //

const gratitude = createSlice({
    name: 'gratitude',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },

        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        retrieveGratitudeData(state, action) {
            state.isLoading = false;
            state.data = action.payload;
        },

        retrieveKPIDashboard(state, action) {
            state.isLoading = false;
            state.statistics = action.payload.statistics;
            state.chart = action.payload.chart;
        }
    }
});

export default gratitude.reducer;

export const { startLoading, retrieveGratitudeData, retrieveKPIDashboard } = gratitude.actions;
