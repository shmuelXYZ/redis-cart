import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basket: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action) {
      state.basket.push(action.payload);
    },
    deleteItem(state, action) {
      state.basket = state.basket.filter((item) => item.Id !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.basket.find((item) => item.Id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    dicreaseItemQuantity(state, action) {
      const item = state.basket.find((item) => item.Id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) basketSlice.caseReducers.deleteItem(state, action);
    },
    clearBasket(state) {
      state.basket = [];
    },
  },
});

export const { addItem, deleteItem, increaseItemQuantity, dicreaseItemQuantity, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;

export const getTotalQuantity = (state) => state.basket.basket.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (state) => state.basket.basket.reduce((sum, item) => sum + item.totalPrice, 0);

export const getBasket = (state) => state.basket.basket;

// used to determine if the item is already in the basket
/* 
   2 functions the first get id and return another function that get state and use
   the id fromthe outer function to find items exist in the basket or not.
*/
// export const getCurrentQuantityById = (id) => (state) =>
//   state.basket.basket.find((item) => (item.Id === id)?.quantity ?? 0);

export const getCurrentQuantityById = (id) => (state) => state.cart.cart.find((item) => item.Id === id)?.quantity ?? 0;

// export const getCurrentQuantityById = (id) => (state) =>
//   state.cart.cart.find((item) => (item.Id === id ? item.quantity : 0));
