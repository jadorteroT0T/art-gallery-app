import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isSnackbarOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setSnackbarOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isSnackbarOpen = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSnackbarOpen } = uiSlice.actions;
