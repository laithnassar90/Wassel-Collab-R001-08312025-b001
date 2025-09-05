import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    loading: false,
    error: null
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setNotifications, setLoading, setError } = notificationsSlice.actions;
export default notificationsSlice.reducer;