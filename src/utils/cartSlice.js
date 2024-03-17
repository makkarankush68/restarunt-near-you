import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalBill: 0,
  },
  reducers: {
    addItem: (state, action) => {
      console.log(action.payload);
      const { item, priceToPass } = action.payload;
      console.log(priceToPass);
      state.items.push(item);
      state.totalBill += priceToPass / 100;
    },
    removeItem: (state, action) => {
      let index = state.items.findIndex(
        (item) => JSON.stringify(item) == JSON.stringify(action.payload)
      );
      if (index !== -1) {
        let priceToPass = 0;
        const { price, defaultPrice, finalPrice } =
          state?.items[index]?.card?.info;
        if (finalPrice != undefined) priceToPass = finalPrice;
        else if (defaultPrice != undefined) priceToPass = defaultPrice;
        else if (price != undefined) priceToPass = price;
        state.totalBill -= priceToPass / 100;
        state.items.splice(index, 1);
      }
    },
    clearCart: () => {
      // state.items.lenght = 0;
      //   state.items = [];
      // console.log(current(state));
      return { items: [], totalBill: 0 };
    },
  },
});
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
