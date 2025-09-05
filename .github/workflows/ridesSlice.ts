import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Ride {
  id: string;
  from: string;
  to: string;
  date: string;
  price: number;
  seats: number;
  driver: {
    id: string;
    name: string;
  };
}

interface RidesState {
  rides: Ride[];
  currentRide: Ride | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RidesState = {
  rides: [],
  currentRide: null,
  isLoading: false,
  error: null,
};

export const fetchRides = createAsyncThunk('rides/fetchRides', async () => {
  const response = await fetch('/api/rides');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
});

export const createRide = createAsyncThunk(
  'rides/createRide',
  async (rideData: Omit<Ride, 'id' | 'driver'>) => {
    const response = await fetch('/api/rides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rideData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
);

const ridesSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRides.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rides = action.payload;
      })
      .addCase(fetchRides.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch rides';
      })
      .addCase(createRide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rides.push(action.payload);
      })
      .addCase(createRide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create ride';
      });
  },
});

export const { clearError } = ridesSlice.actions;
export default ridesSlice.reducer;