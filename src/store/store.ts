import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { projectsSlice } from './gallery';
import { uiSlice } from './ui';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    projects: projectsSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
