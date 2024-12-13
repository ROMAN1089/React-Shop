import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IcartItem, IcartState } from "./types";

const initialState: IcartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IcartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((i) => i.id === action.payload);
      if (index !== -1) {
        const item = state.items[index];
        state.total -= item.price * item.quantity;
        state.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
