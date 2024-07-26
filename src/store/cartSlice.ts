import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartDish, Dish, OrderMutation,} from '../types';
import {completeOrder, createOrder, fetchOrders,} from './cartThunks';

export interface CartState {
  createOrderLoading: boolean;
  fetchOrdersLoading: boolean;
  deleteOrderLoading: boolean;
  orders: OrderMutation[];
  cartDishes: CartDish[];
}

const initialState: CartState = {
  createOrderLoading: false,
  fetchOrdersLoading: false,
  deleteOrderLoading: false,
  orders: [],
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

    builder.addCase(fetchOrders.pending, (state) => {
      state.fetchOrdersLoading = true;
    }).addCase(fetchOrders.fulfilled, (state, {payload: orders}) => {
      state.fetchOrdersLoading = false;
      state.orders = orders;
    }).addCase(fetchOrders.rejected, (state) => {
      state.fetchOrdersLoading = false;
    });

    builder.addCase(completeOrder.pending, (state) => {
      state.deleteOrderLoading = true;
    }).addCase(completeOrder.fulfilled, (state) => {
      state.deleteOrderLoading = false;
    }).addCase(completeOrder.rejected, (state) => {
      state.deleteOrderLoading = false;
    });
  },
  selectors: {
    selectorCartDishes: (state) => state.cartDishes,
    selectorCreateOrder: (state) => state.createOrderLoading,
    selectorFetchOrdersLoading: (state) => state.fetchOrdersLoading,
    selectorOrders: (state) => state.orders,
    selectorDeleteOrderLoading: (state) => state.deleteOrderLoading,
  }
});

export const cartReducer = cartSlice.reducer;
export const {addDish, deleteCartDish, updateDishes, clearCart} = cartSlice.actions;
export const {
  selectorCartDishes,
  selectorCreateOrder,
  selectorFetchOrdersLoading,
  selectorOrders,
  selectorDeleteOrderLoading,
} = cartSlice.selectors;