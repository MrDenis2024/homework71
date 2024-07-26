import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartDish, Dish} from '../types';
import {createOrder} from './cartThunks';

export interface CartState {
  createOrderLoading: boolean;
  cartDishes: CartDish[];
}

const initialState: CartState = {
  createOrderLoading: false,
  cartDishes: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);

      if(index !== -1) {
        state.cartDishes[index].amount++;
      } else  {
        state.cartDishes.push({
          amount: 1,
          dish,
        });
      }
    },
    deleteCartDish: (state, {payload: dish} : PayloadAction<CartDish>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.dish.id);

      if(index !== -1) {
        if(state.cartDishes[index].amount > 1) {
          state.cartDishes[index].amount--;
        } else {
          state.cartDishes.splice(index, 1);
        }
      }
    },
    updateDishes: (state, {payload: dishes}: PayloadAction<Dish[]>) => {
      const newCartDishes: CartDish[] = [];
      state.cartDishes.forEach((cartDish: CartDish) => {
        const existingDish = dishes.find(dish => cartDish.dish.id === dish.id);

        if(!existingDish) {
          return;
        }

        newCartDishes.push({
          ...cartDish,
          dish: existingDish,
        });
      });
      state.cartDishes = newCartDishes;
    },
    clearCart: (state) => {
      state.cartDishes = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.createOrderLoading = true;
    }).addCase(createOrder.fulfilled, (state) => {
      state.createOrderLoading = false;
    }).addCase(createOrder.rejected, (state) => {
      state.createOrderLoading = false;
    });
  },
  selectors: {
    selectorCartDishes: (state) => state.cartDishes,
    selectorCreateOrder: (state) => state.createOrderLoading,
  }
});

export const cartReducer = cartSlice.reducer;
export const {addDish, deleteCartDish, updateDishes, clearCart} = cartSlice.actions;
export const {
  selectorCartDishes,
  selectorCreateOrder,
} = cartSlice.selectors;