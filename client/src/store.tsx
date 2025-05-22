import { configureStore } from '@reduxjs/toolkit';

import basketReducer from './slice/basketSlice';

const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
export default store;
