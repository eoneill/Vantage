import { createSlice } from "@reduxjs/toolkit";

export const currentViewSlice = createSlice({
  name: "currentView",
  initialState: {
    // theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light",
    theme: "light",
    currentMetric: "default",
    currentEndpoint: "/",
    performanceMetrics: {
      FCP: false,
      SI: false,
      LCP: false,
      TTI: false,
      TBT: false,
      CLS: false,
    },
    runValueArr: [],
    runValueArrSort: [],
  },
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    changeMetric: (state, action) => {
      const regex = /Performance|Accessibility|Best Practices|SEO|default/;
      if (regex.test(action.payload)) state.currentMetric = action.payload;
      else throw "changeMetric payload incorrect";
    },
    changeEndpoint: (state, action) => {
      state.currentEndpoint = action.payload;
    },
    changePerformanceMetrics: (state, action) => {
      state.performanceMetrics[action.payload] =
        !state.performanceMetrics[action.payload];
    },
    addRunValue: (state, action) => {
      const run = action.payload;
      if (!state.runValueArr.includes(run)) {
        if (state.runValueArr.length >= 2) state.runValueArr.shift();
        state.runValueArr.push(run);
        state.runValueArrSort = state.runValueArr.slice().sort();
      }
    },
  },
});

export const {
  changeTheme,
  changeMetric,
  changeEndpoint,
  changePerformanceMetrics,
  addRunValue,
} = currentViewSlice.actions;

export const getTheme = (state) => state.currentView.theme;
export const getCurrentMetric = (state) => state.currentView.currentMetric;
export const getCurrentEndpoint = (state) => state.currentView.currentEndpoint;
export const selectPerformanceMetrics = (state) =>
  state.currentView.performanceMetrics;

export default currentViewSlice.reducer;
